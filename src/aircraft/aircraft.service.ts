import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/ship/dto/pagination.dto';
import { Repository } from 'typeorm';
import { Aircraft } from './entities/aircraft.entity';

@Injectable()
export class AircraftService {
  constructor(
    @InjectRepository(Aircraft)
    private readonly aircraftRepo: Repository<Aircraft>,
  ) {}

  findAll(dto: PaginationDto): Promise<[Aircraft[], number]> {
    return this.aircraftRepo.findAndCount({
      ...dto,
    });
  }
}
