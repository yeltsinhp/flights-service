import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateReservationDto {
  @IsInt()
  @IsNotEmpty()
  clientId: number;

  @IsInt()
  @IsNotEmpty()
  flightId: number;

  @IsInt()
  @IsNotEmpty()
  seatNumber: number;
}
