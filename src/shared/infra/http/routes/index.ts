import { Router } from 'express';

import { appointmentsRouter } from '@modules/appointments/infra/http/routes/appointments.routes';
import { sessionsRouter } from '@modules/users/infra/http/routes/sessions.routes';
import { usersRouter } from '@modules/users/infra/http/routes/users.routes';

const router = Router();
router.use('/appointments', appointmentsRouter);
router.use('/users', usersRouter);
router.use('/sessions', sessionsRouter);

export { router };
