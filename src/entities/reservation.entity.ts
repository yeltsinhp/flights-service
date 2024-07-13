import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Flight } from './flight.entity';

@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clientId: number;

  @Column()
  seatNumber: number;

  @Column()
  status: string;

  @ManyToOne(() => Flight, flight => flight.reservations)
  flight: Flight;
}
