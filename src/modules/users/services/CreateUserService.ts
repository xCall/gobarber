import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';

import { AppError } from '@shared/errors/AppError';
import { User } from '../infra/typeorm/entities/User';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const usersRepository = getRepository(User);
    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashdPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashdPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export { CreateUserService };
