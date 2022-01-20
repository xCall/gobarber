import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateUserService } from '../services/CreateUserService';

const port = 3333;

const usersRouter = Router();
const upload = multer(uploadConfig.upload('./tmp'));

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const createUserService = new CreateUserService();
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
  } catch (err) {
    console.log(
      '\x1b[31m',
      `✗ POST - (Users) ➡️  http://localhost:${port}/users`,
    );
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const { avatar } = request.file;
    return response.json({ ok: true });
  },
);

export { usersRouter };
