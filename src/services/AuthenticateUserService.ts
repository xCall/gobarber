import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';

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

    const token = sign(
      {},
      'b56db73d20d2d4b374aae5e5c86b58f6',
      {
        subject: user.id,
        expiresIn: '1d',
      },
    );

    return {
      user,
      token,
    };
  }
}

export { AuthenticateUserService };
