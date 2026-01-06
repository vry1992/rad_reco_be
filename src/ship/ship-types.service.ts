import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from './dto/pagination.dto';
import { ShipTypes } from './entities/ship-types.entity';

@Injectable()
export class ShipTypesService {
  constructor(
    @InjectRepository(ShipTypes)
    private readonly shipTypesRepository: Repository<ShipTypes>,
  ) {}

  getShipTypes(dto: PaginationDto) {
    return this.shipTypesRepository.findAndCount({
      ...dto,
    });
  }

  getOne(id: string) {
    return this.shipTypesRepository.findOne({
      where: {
        id,
      },
    });
  }

  async deleteOne(id: string): Promise<void> {
    await this.shipTypesRepository.softDelete({ id });
    return;
  }
}
