import { AuthenticateUserService } from '@modules/users/services/AuthenticateUserService';
import { Router } from 'express';

import { UsersRepository } from '../../repositories/UsersRepository';

const port = 3333;

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const usersRepository = new UsersRepository();

  const authenticateUser = new AuthenticateUserService(usersRepository);

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  delete user.password;

  console.log(
    '\x1b[34m',
    `✔ POST - (Sessions) ➡️  http://localhost:${port}/sessions`,
  );

  return response.json({ user, token });

  /*   console.log(
      '\x1b[31m',
      `✗ POST - (Sessions) ➡️  http://localhost:${port}/sessions`,
    );
   */
});

export { sessionsRouter };
