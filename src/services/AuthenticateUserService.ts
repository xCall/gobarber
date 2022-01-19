import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';

import { User } from '../models/User';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
}

class AuthenticateUserService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Incorrect email or password combination.');
    }

    const passwordMatchd = compare(password, user.password);

    if (!passwordMatchd) {
      throw new Error('Incorrect email or password combination.');
    }

    return {
      user,
    };
  }
}

export { AuthenticateUserService };
