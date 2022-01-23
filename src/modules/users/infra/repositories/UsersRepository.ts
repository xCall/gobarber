import { getRepository, Repository } from 'typeorm';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { User } from '../typeorm/entities/User';
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>
  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const users = this.ormRepository.create({ name, email, password });

    await this.ormRepository.save(users);
    return users;
  }

  public async save(user: User): Promise<User> {
    return await this.ormRepository.save(user);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const users = await this.ormRepository.findOne({
      where: { email },
    });

    return users || null;
  }

  public async findById(id: string): Promise<User | undefined> {
    const users = await this.ormRepository.findOne({
      where: { id },
    });

    return users || null;
  }

}

export { UsersRepository };
