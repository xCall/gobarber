import uploadConfig from '@config/upload';
import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { CreateUserService } from '@modules/users/services/CreateUserService';
import { UpdateUserAvatarService } from '@modules/users/services/UpdateUserAvatarService';
import { Router } from 'express';
import multer from 'multer';
import { container } from 'tsyringe';

const port = 3333;

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
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
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);
    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;
    return response.json({ user });
  },
);

export { usersRouter };
