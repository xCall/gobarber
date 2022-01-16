import { Router } from 'express';

import { appointmentRouter } from './appointments.route';

const router = Router();
router.use('appointments', appointmentRouter);

export { router };
