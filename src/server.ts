import 'reflect-metadata';
import express, { Response, Request, NextFunction } from 'express';
import 'express-async-errors';

import uploadConfig from './config/upload';
import { AppError } from './errors/AppError';
import { router } from './routes/index';
import './database';

const app = express();
const port = 3333;

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(router);
app.use(
  (err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    console.error(err);

    return response.status(500).json({
      status: 'error',
      message: err.message,
    });
  },
);

app.listen(port, () => {
  console.log('\x1b[32m', `🚀 Server started on port ${port}`);
  console.log('\x1b[34m', `➡️  http://localhost:${port}`);
});
