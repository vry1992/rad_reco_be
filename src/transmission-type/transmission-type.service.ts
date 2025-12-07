import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/ship/dto/pagination.dto';
import { Repository } from 'typeorm';
import { TransmissionType } from './entities/transmission-type.entity';

@Injectable()
export class TransmissionTypeService {
  constructor(
    @InjectRepository(TransmissionType)
    private readonly transmssionTypeRepo: Repository<TransmissionType>,
  ) {}

  getAll(dto: PaginationDto): Promise<[TransmissionType[], number]> {
    const params = dto ? { ...dto } : undefined;
    return this.transmssionTypeRepo.findAndCount(params);
  }

  create() {}
}
