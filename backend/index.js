const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');
const conversationRoute = require('./routes/conversationRoute');
const messageRoute = require('./routes/messageRoute');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');
dotenv.config();


// MongoDB configuration
const DB = process.env.MONGO_URL
  .replace("<username>", process.env.MONGO_USERNAME)
  .replace("<password>", process.env.MONGO_PASSWORD);

mongoose
  .connect(DB)
  .then(() => {
    console.log('Connected to MongoDB.');
  });

// Middlewares
app.use('/images', express.static(path.join(__dirname, './public/images')));
app.enable('trust proxy');
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

// Routes
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute)
app.all('*', (req, res, next) => {
  next(new AppError(`Can not find ${req.originalUrl} on this server`, 404));
})
app.use(globalErrorHandler);

// Run server
app.listen(5000, () => console.log('Backend server is running on port 5000.'));