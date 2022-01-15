import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column()
    provider: string;

  @CreateDateColumn('timestamp with time zone')
    date: Date;
}

export { Appointment };
