import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Seat } from './seat.entity';
import { Reservation } from './reservation.entity';

@Entity('flights')
export class Flight {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  origin: string;

  @Column()
  destination: string;

  @Column()
  date: string;

  @Column()
  time: string;

  @Column()
  capacity: number;

  @Column()
  availableSeats: number;

  @OneToMany(() => Seat, (seat) => seat.flight)
  seats: Seat[];

  @OneToMany(() => Reservation, (reservation) => reservation.flight)
  reservations: Reservation[];
}
