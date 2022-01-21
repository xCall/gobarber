import 'reflect-metadata';
import express from 'express';

import uploadConfig from './config/upload';
import { router } from './routes/index';
import './database';

const app = express();
const port = 3333;

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(router);

app.listen(port, () => {
  console.log('\x1b[32m', `🚀 Server started on port ${port}`);
  console.log('\x1b[34m', `➡️  http://localhost:${port}`);
});
