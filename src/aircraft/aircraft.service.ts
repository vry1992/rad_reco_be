import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AircraftTypes } from './entities/aircraft-types.entity';
import { Aircraft } from './entities/aircraft.entity';

@Injectable()
export class AircraftService {
  constructor(
    @InjectRepository(AircraftTypes)
    private readonly aircraftTypesRepo: Repository<AircraftTypes>,
    @InjectRepository(Aircraft)
    private readonly aircraftRepo: Repository<Aircraft>,
  ) {}

  // async onModuleInit() {
  //   for await (const family of Object.keys(mockAircrafts)) {
  //     console.log(family);
  //     for await (const name of mockAircrafts[family]) {
  //       const item = this.aircraftTypesRepo.create({
  //         name,
  //         family,
  //       });
  //       await this.aircraftTypesRepo.save(item);
  //     }
  //   }
  // }
}
