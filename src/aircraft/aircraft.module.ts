import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AircraftController } from './aircraft.controller';
import { AircraftService } from './aircraft.service';
import { AircraftTypes } from './entities/aircraft-types.entity';
import { Aircraft } from './entities/aircraft.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Aircraft, AircraftTypes])],
  controllers: [AircraftController],
  providers: [AircraftService],
})
export class AircraftModule {}
