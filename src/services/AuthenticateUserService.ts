import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';

import authConfig from '../config/auth';
import { User } from '../models/User';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Incorrect email or password combination.');
    }

    const passwordMatchd = await compare(password, user.password);

    if (!passwordMatchd) {
      throw new Error('Incorrect email or password combination.');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign(
      {},
      secret,
      {
        subject: user.id,
        expiresIn,
      },
    );

    return {
      user,
      token,
    };
  }
}

export { AuthenticateUserService };
