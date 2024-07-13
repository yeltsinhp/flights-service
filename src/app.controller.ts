import { Controller, Body, Get, Param } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { CancelReservationDto } from './dto/cancel-reservation.dto';

@Controller()
export class AppController {
  constructor(private readonly flightsService: AppService) {}

  @MessagePattern({ cmd: 'createReservation' })
  async createReservation(@Body() createReservationDto: CreateReservationDto) {
    return await this.flightsService.createReservation(
      createReservationDto.clientId,
      createReservationDto.flightId,
      createReservationDto.seatNumber,
    );
  }

  @MessagePattern({ cmd: 'cancelReservation' })
  async cancelReservation(@Body() cancelReservationDto: CancelReservationDto) {
    return await this.flightsService.cancelReservation(
      cancelReservationDto.flightId,
      cancelReservationDto.seatNumber,
    );
  }

  @MessagePattern({ cmd: 'getAllFlights' })
  async getAllFlights() {
    return await this.flightsService.getAllFlights();
  }
}
