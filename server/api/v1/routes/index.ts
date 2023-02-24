import express from 'express';
import authRoutes from './auth';
import userRoutes from './user';
import postRoutes from './post';
import uploadRoutes from './upload';

const app = express();

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/posts', postRoutes);
app.use('/upload', uploadRoutes);

export default app;
