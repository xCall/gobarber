import { Router } from 'express';

const port = 3333;

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    console.log('\x1b[34m', `✔ POST - (Users) ➡️  http://localhost:${port}/users`);

    return response.send();
  } catch (err) {
    console.log('\x1b[31m', `✗ POST - (Users) ➡️  http://localhost:${port}/users`);
    return response.status(400).json({ error: err.message });
  }
});

export { usersRouter };
