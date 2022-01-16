import { startOfHour } from 'date-fns/esm';
import { getCustomRepository } from 'typeorm';

import { Appointment } from '../models/Appointment';
import { AppointmentsRepository } from '../repositories/AppointmentsRepository';

interface IRequest {
  provider: string;
  date: Date;
}

class CreateAppointementService {
  public async execute({ provider, date }: IRequest): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw new Error('This appointment is already booked');
    }

    const appointment = appointmentsRepository.create({
      provider,
      date,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export { CreateAppointementService };
