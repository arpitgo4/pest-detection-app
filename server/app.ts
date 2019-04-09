
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import path from 'path';

import {
    errorHandler,
    jwtRefresher,
    jwtHandler,
    loggerMiddleware,
} from './middlewares';

import {
    authRouter,
    pestRouter,
} from './routes';

const app = express();

app.set('json spaces', 4);
app.disable('etag');
app.use(cors());

if (process.env.NODE_ENV !== 'production') {
    app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true, }));

app.use('/static/uploads', express.static(path.resolve('static/uploads')));
app.get('/api/v1/health', (_, res) => res.status(200).json({}));
app.use('/api/v1/auth', authRouter);

app.use(jwtHandler);

app.use('/api/v1/pest', pestRouter);

app.use(jwtRefresher);


app.use('*', (req, res, next) => next(new Error('api not found')));

app.use(loggerMiddleware);
app.use(errorHandler);

module.exports = app;
