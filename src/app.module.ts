import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Flight } from './entities/flight.entity';
import { Seat } from './entities/seat.entity';
import { Reservation } from './entities/reservation.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '73198416',
      database: 'flights_db',
      entities: [Flight, Seat, Reservation],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Flight, Seat, Reservation]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
