import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ship } from 'src/ship/entities/ship.entity';
import { In, Repository } from 'typeorm';
import { ChangeNestingDto } from './dto/change-units-nesting.dto';
import { Unit } from './entities/unit.entity';
import { buildUnitsNesting } from './utils';

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(Unit)
    private readonly unitRepository: Repository<Unit>,
    @InjectRepository(Ship)
    private readonly shipRepository: Repository<Ship>,
  ) {}

  async onModuleInit() {
    // for await (const item of ships) {
    //   const hasUnit = await this.unitRepository.findOne({
    //     where: { name: item.name },
    //   });
    //   if (hasUnit) continue;
    //   const unit = this.unitRepository.create(item);
    //   const ships = item.ships || [];
    //   unit.ships = ships.map((obj) => {
    //     return this.shipRepository.create(obj);
    //   });
    //   await this.unitRepository.save(unit);
    // }
  }

  async findAll(): Promise<Unit[]> {
    const units = await this.unitRepository.find({
      relations: [
        'parent',
        'ships',
        'ships.type',
        'children',
        'children.ships',
      ],
    });

    return buildUnitsNesting(units);
  }

  async changeNesting({ sourceId, targetId }: ChangeNestingDto) {
    await this.unitRepository.update(sourceId, {
      parent: { id: targetId },
    });

    return this.unitRepository.find({
      where: { id: In([sourceId, targetId]) },
      relations: ['children', 'parent'],
    });
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
