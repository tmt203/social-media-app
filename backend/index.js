const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');
dotenv.config();


const DB = process.env.MONGO_URL
  .replace("<username>", process.env.MONGO_USERNAME)
  .replace("<password>", process.env.MONGO_PASSWORD);

mongoose
  .connect(DB)
  .then(() => {
    console.log('Connected to MongoDB.');
  });


app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.all('*', (req, res, next) => {
  next(new AppError(`Can not find ${req.originalUrl} on this server`, 404));
})
app.use(globalErrorHandler);

app.listen(3000, () => console.log('Backend server is running.'));