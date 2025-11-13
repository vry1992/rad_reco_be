import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Unit } from './unit.entity';

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(Unit)
    private readonly unitRepository: Repository<Unit>,
  ) {}

  findAll(): Promise<Unit[]> {
    return this.unitRepository.find();
  }

  findOne(id: string): Promise<Unit | null> {
    return this.unitRepository.findOne({ where: { id } });
  }

  create(data: Partial<Unit>): Promise<Unit> {
    const unit = this.unitRepository.create(data);
    return this.unitRepository.save(unit);
  }

  async update(id: string, data: Partial<Unit>): Promise<Unit | null> {
    await this.unitRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.unitRepository.delete(id);
  }
}
