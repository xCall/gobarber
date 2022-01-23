import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateUserService } from '@modules/users/services/CreateUserService';
import { UpdateUserAvatarService } from '@modules/users/services/UpdateUserAvatarService';
import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import { UsersRepository } from '../../repositories/UsersRepository';

const port = 3333;

const usersRouter = Router();
const upload = multer(uploadConfig);
const usersRepository = new UsersRepository()
usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;
  const createUserService = new CreateUserService(usersRepository);
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
  /* 
     console.log(
       '\x1b[31m',
       `✗ POST - (Users) ➡️  http://localhost:${port}/users`,
     );
   */
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService(usersRepository);
    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;
    return response.json({ user });
  },
);

export { usersRouter };
