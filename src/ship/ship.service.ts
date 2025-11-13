import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ship } from './ship.entity';

@Injectable()
export class ShipService {
  constructor(
    @InjectRepository(Ship)
    private readonly shipRepository: Repository<Ship>,
  ) {}

  findAll(): Promise<Ship[]> {
    return this.shipRepository.find({ relations: ['unit'] });
  }

  findOne(id: string): Promise<Ship | null> {
    return this.shipRepository.findOne({ where: { id }, relations: ['unit'] });
  }

  create(data: Partial<Ship>): Promise<Ship> {
    const ship = this.shipRepository.create(data);
    return this.shipRepository.save(ship);
  }

  async update(id: string, data: Partial<Ship>): Promise<Ship | null> {
    await this.shipRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.shipRepository.delete(id);
  }
}
