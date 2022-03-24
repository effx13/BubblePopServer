import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { queues, signin, singup } from './routes';

// Get Environment form .env
dotenv.config();
const { PORT, MONGO_URI, SECRET } = process.env;
const app = express();

// Setting CORS, JSON
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
    .then(() => console.log('Successfully connected to mongodb'))
    .catch((e) => console.error(e));
}

app.listen(PORT, () => {
  console.log(`🚀 Server listening at http://localhost:${PORT}`);
});
