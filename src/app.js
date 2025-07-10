import {swaggerUiExpress, specs} from './config/swaggerConfig.js';

import express from 'express';
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';
import addLogger from './middlewares/logger.middleware.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(addLogger);

app.use('/api/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/mocks',mocksRouter);

export default app;