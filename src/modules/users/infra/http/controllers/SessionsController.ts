import { AuthenticateUserService } from '@modules/users/services/AuthenticateUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authenticateUser = container.resolve(AuthenticateUserService);
    const port = 3333;

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
  }
}
export { SessionsController };
