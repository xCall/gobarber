import { parseISO } from 'date-fns';
import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import { AppointmentsRepository } from '../repositories/AppointmentsRepository';
import { CreateAppointementService } from '../services/CreateAppointmentService';

const port = 3333;

const appointmentRouter = Router();

appointmentRouter.get('/', (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);

  const appointments = appointmentsRepository.find();

  console.log('\x1b[33m', `GET - (Appointments) ➡️  http://localhost:${port}/`);

  return response.json(appointments);
});

appointmentRouter.post('/', async (request, response) => {
  try {
    const { provider, date } = request.body;
    const parseDate = parseISO(date);
    const createAppointment = new CreateAppointementService();
    const appointment = await createAppointment.execute({
      provider,
      date: parseDate,
    });

    console.log('\x1b[34m', `POST - (Appointments) ➡️  http://localhost:${port}/`);

    return response.json(appointment);
  } catch (err) {
    console.log('\x1b[31m', `POST - (Appointments) ➡️  http://localhost:${port}/`);
    return response.status(400).json({ error: err.message });
  }
});

export { appointmentRouter };
