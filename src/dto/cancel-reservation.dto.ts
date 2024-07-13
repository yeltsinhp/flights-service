import { IsInt, IsNotEmpty } from 'class-validator';

export class CancelReservationDto {
  @IsInt()
  @IsNotEmpty()
  flightId: number;

  @IsInt()
  @IsNotEmpty()
  seatNumber: number;
}
