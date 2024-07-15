import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flight } from './entities/flight.entity';
import { Seat } from './entities/seat.entity';
import { Reservation } from './entities/reservation.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Flight)
    private readonly flightRepository: Repository<Flight>,
    @InjectRepository(Seat)
    private readonly seatRepository: Repository<Seat>,
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}

  async createReservation(
    clientId: number,
    flightId: number,
    seatNumber: number,
  ) {
    const flight = await this.flightRepository.findOne({
      where: { id: flightId },
    });
    if (!flight) {
      throw new Error('Flight not found');
    }

    const seat = await this.seatRepository.findOne({
      where: { flight: { id: flightId }, seatNumber },
    });
    // console.log(seat)
    if (!seat || seat.status !== 'available') {
      throw new Error('Seat not available');
    }

    const existingReservation = await this.reservationRepository.findOne({
      where: { flight: { id: flightId }, seatNumber, status: 'reserved' },
    });
    if (existingReservation) {
      throw new Error('There is already a reservation for this seat');
    }

    if (flight.availableSeats <= 0) {
      throw new Error('No available seats');
    }

    seat.status = 'reserved';
    await this.seatRepository.save(seat);

    flight.availableSeats -= 1;
    await this.flightRepository.save(flight);

    const reservation = this.reservationRepository.create({
      clientId,
      flight,
      seatNumber,
      status: 'reserved',
    });
    return await this.reservationRepository.save(reservation);
  }

  async cancelReservation(flightId: number, seatNumber: number) {
    const reservation = await this.reservationRepository.findOne({
      where: { flight: { id: flightId }, seatNumber, status: 'reserved' },
    });
    if (!reservation) {
      throw new Error('Reservation not found');
    }

    reservation.status = 'cancelled';
    await this.reservationRepository.save(reservation);

    const seat = await this.seatRepository.findOne({
      where: { flight: { id: flightId }, seatNumber },
    });
    seat.status = 'available';
    await this.seatRepository.save(seat);

    const flight = await this.flightRepository.findOne({
      where: { id: flightId },
    });
    flight.availableSeats += 1;
    await this.flightRepository.save(flight);

    return reservation;
  }

  async getAllFlights() {
    return await this.flightRepository.find();
  }

  async getAllSeats(flightId: number) {
    return await this.seatRepository.find({ where: { flightId } });
  }
}
