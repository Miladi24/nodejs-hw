import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

import { logger } from './middleware/logger.js';
import { connectMongoDB } from './db/connectMongoDB.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

import authRoutes from './routes/authRoutes.js';
import notesRoutes from './routes/notesRoutes.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(logger);

const PORT = process.env.PORT ?? 3000;


app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);


app.use(notFoundHandler);
app.use(errorHandler);


await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
