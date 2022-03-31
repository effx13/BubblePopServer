import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import { login, queues, signup } from '@src/routes';
import { httpLogStream, logger } from '@src/utils';
import { findLastQueue } from '@src/scheduler';
import { scheduleJob } from 'node-schedule';
import { errorHandler, notFoundErrorHandler } from './middleware';

// Get Environment form .env
dotenv.config();
const { PORT, MONGO_URI, SECRET } = process.env;

// Configure Express
const app = express();

// Setting CORS, JSON, Morgan middleware
const morganFormat = ':remote-addr :method :url HTTP/:http-version :status';
app.use(morgan(morganFormat, { stream: httpLogStream }));
app.use(cookieParser(SECRET));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setting Routers
app.use('/queue', queues);
app.use('/signup', signup);
app.use('/login', login);

// Setting Error Handler
app.use(notFoundErrorHandler);
app.use(errorHandler);

// Connect MongoDB with Mongoose
mongoose.Promise = global.Promise;
if (MONGO_URI !== undefined) {
  mongoose
    .connect(MONGO_URI)
    .then(() => logger.info('Successfully connected to MongoDB'))
    .catch((e) => logger.error(e));
}

// Start Scheduler
scheduleJob('* * * * *', findLastQueue);

app.listen(PORT, () => {
  logger.info(`Server listening at http://localhost:${PORT}`);
});
