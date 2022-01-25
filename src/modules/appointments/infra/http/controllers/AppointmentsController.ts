import { CreateAppointementService } from '@modules/appointments/services/CreateAppointmentService';
import { parseISO } from 'date-fns';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;
    const port = 3333;
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
  }
}

export { AppointmentsController };
