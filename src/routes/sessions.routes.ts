import { Router } from 'express';

import { AuthenticateUserService } from '../services/AuthenticateUserService';

const port = 3333;

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

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
