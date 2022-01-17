import { Router } from 'express';

import { appointmentsRouter } from './appointments.route';
import { usersRouter } from './users.routes';

const router = Router();
router.use('/appointments', appointmentsRouter);
router.use('/users', usersRouter);

export { router };
