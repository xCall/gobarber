import express from 'express';

import './database';

const app = express();
const port = 3333;

app.use(express.json());
// app.use(routes);

app.listen(port, () => {
  console.log('\x1b[32m', `🚀 Server started on port ${port}`);
  console.log('\x1b[34m', `➡️  http://localhost:${port}`);
});
