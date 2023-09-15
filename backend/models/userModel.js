const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please enter your first name.']
  },
  email: {
    type: String,
    required: [true, 'Please enter your email address.'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email.']
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  profilePicture: {
    type: String,
    default: ''
  },
  coverPictures: {
    type: String, 
    default: ''
  },
  followers: {
    type: Array,
    default: [],
  },
  followings: {
    type: Array,
    default: [],
  },
  desc: {
    type: String,
    max: 50,
  },
  city: {
    type: String,
    max: 50,
  },
  from: {
    type: String,
    max: 50,
  },
  relationship: {
    type: Number,
    enum: [1, 2, 3],
  },
  password: {
    type: String,
    required: [true, 'A user must have a password.'],
    min: 6,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password.'],
    validate: {
      validator: function (v) {
        return this.password === v;
      },
      message: 'Confirm password is not correct.'
    }
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  }, 
}, {
  timestamps: true,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
}

userSchema.methods.changedPasswordAfter = async function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
}

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
}

module.exports = mongoose.model('User', userSchema);