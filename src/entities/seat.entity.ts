import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Flight } from './flight.entity';

@Entity('seats')
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  seatNumber: number;

  @Column()
  status: string;

  @ManyToOne(() => Flight, flight => flight.seats)
  flight: Flight;
}
