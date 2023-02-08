import express from 'express';
import authRoutes from './auth';
import userRoutes from './user';

const app = express();

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

export default app;
