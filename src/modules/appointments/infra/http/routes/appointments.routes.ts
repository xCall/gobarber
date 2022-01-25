import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';

import { AppointmentsController } from '../controllers/AppointmentsController';

const appointmentsController = new AppointmentsController();

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);

/* appointmentsRouter.get('/', async (request, response) => {

  const appointmentsRepository = new AppointmentsRepository();

 const appointments = await appointmentsRepository.find();
 
   console.log(
     '\x1b[33m',
     `✔ GET - (Appointments) ➡️  http://localhost:${port}/appointments`,
   );
 
   return response.json(appointments);
}); */

appointmentsRouter.post('/', appointmentsController.create);

export { appointmentsRouter };
