import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import routesV1 from './api/v1/routes';
import connectDB from './config/db';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

connectDB();
app.use(express.json());
app.use(cors());
app.use('/api/v1', routesV1);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});