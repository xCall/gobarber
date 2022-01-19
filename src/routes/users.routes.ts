import { Router } from 'express';

import { CreateUserService } from '../services/CreateUserService';

const port = 3333;

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const createUserService = new CreateUserService();
    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    delete user.password;

    console.log('\x1b[34m', `✔ POST - (Users) ➡️  http://localhost:${port}/users`);

    return response.json(user);
  } catch (err) {
    console.log('\x1b[31m', `✗ POST - (Users) ➡️  http://localhost:${port}/users`);
    return response.status(400).json({ error: err.message });
  }
});

export { usersRouter };
