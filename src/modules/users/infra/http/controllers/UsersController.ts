import { CreateUserService } from '@modules/users/services/CreateUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const port = 3333;

    const { name, email, password } = request.body;

    const createUserService = container.resolve(CreateUserService);
    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    delete user.password;

    console.log(
      '\x1b[34m',
      `✔ POST - (Users) ➡️  http://localhost:${port}/users`,
    );

    return response.json(user);
  }
}
export { UsersController };
