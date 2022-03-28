import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import { queues, signin, singup } from './routes';
import { httpLogStream, logger } from './utils/logger';

// Get Environment form .env
dotenv.config();
const { PORT, MONGO_URI, SECRET } = process.env;
const app = express();

// Setting CORS, JSON, Morgan
const morganformat = ':remote-addr :method :url HTTP/:http-version :status';
app.use(morgan(morganformat, { stream: httpLogStream }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setting Routers
app.use('/queue', queues);
app.use('/signin', signin);
app.use('/signup', singup);

// Connect MongoDB with Mongoose
mongoose.Promise = global.Promise;
if (MONGO_URI !== undefined) {
  mongoose
    .connect(MONGO_URI)
    .then(() => logger.info('Successfully connected to MongoDB'))
    .catch((e) => logger.error(e));
}

app.listen(PORT, () => {
  logger.info(`Server listening at http://localhost:${PORT}`);
});
