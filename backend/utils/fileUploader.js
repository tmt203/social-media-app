const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/images'));
  },
  filename: (req, file, cb) => {
    console.log(req.body.name);
    cb(null, req.body.name);
  }
});

module.exports = multer({ storage });