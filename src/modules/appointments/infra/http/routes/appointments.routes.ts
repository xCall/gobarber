import { CreateAppointementService } from '@modules/appointments/services/CreateAppointmentService';
import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { parseISO } from 'date-fns';
import { Router } from 'express';
import { container } from 'tsyringe';

const port = 3333;

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

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;
  const parseDate = parseISO(date);

  const createAppointment = container.resolve(CreateAppointementService);

  const appointment = await createAppointment.execute({
    provider_id,
    date: parseDate,
  });

  console.log(
    '\x1b[34m',
    `✔ POST - (Appointments) ➡️  http://localhost:${port}/appointments`,
  );

  return response.json(appointment);

  /*  console.log(
     '\x1b[31m',
     `✗ POST - (Appointments) ➡️  http://localhost:${port}/appointments`,
   ); */
});

export { appointmentsRouter };
