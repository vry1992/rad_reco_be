import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { ChangeShipsNestingDto } from './dto/change-ships-nesting.dto';
import { ShipTypes } from './entities/ship-types.entity';
import { Ship } from './entities/ship.entity';

@Injectable()
export class ShipService {
  constructor(
    @InjectRepository(Ship)
    private readonly shipRepository: Repository<Ship>,
    @InjectRepository(ShipTypes)
    private readonly shipTypesRepository: Repository<ShipTypes>,
  ) {}

  async onModuleInit() {
    // for await (const { ships } of shipsData) {
    //   for await (const { project } of ships) {
    //     const source = await this.shipRepository.findOne({
    //       relations: ['type'],
    //       where: {
    //         name: Not('Н/В'),
    //         project,
    //       },
    //     });
    //     const ship = await this.shipRepository.update(
    //       {
    //         name: 'Н/В',
    //         project,
    //       },
    //       { type: { id: source.type.id } },
    //     );
    //   }
    // }
    // const data = await this.findAll();
    // const aaa = Object.values(
    //   data.reduce((acc, curr) => {
    //     return {
    //       ...acc,
    //       [curr.project]: {
    //         project: curr.project,
    //         abbreviatedType: curr.abbreviatedType,
    //       },
    //     };
    //   }, {}),
    // ).map(({ project, abbreviatedType }) => {
    //   return {
    //     name: 'Н/В',
    //     project,
    //     abbreviatedType,
    //   };
    // });
    // for await (const item of aaa) {
    //   const s = this.shipRepository.create(item);
    //   await this.shipRepository.save(s);
    // }
  }

  private groupShipsByProject(ships: Ship[]) {
    return ships.reduce<Record<string, Ship[]>>((acc, curr) => {
      const key = `${curr.type.abbreviatedType} пр. ${curr.project}:`;
      const prev = acc[key] || [];
      if (curr.name === 'Н/В') {
        acc[key].unshift(curr);
      } else {
        acc[key] = [...prev, curr];
      }
      return acc;
    }, {});
  }

  async selectTreeSelectOptions(): Promise<Record<string, Ship[]>> {
    const all = await this.findAll();
    return this.groupShipsByProject(all);
  }

  changeNesting(dto: ChangeShipsNestingDto): Promise<UpdateResult> {
    return this.shipRepository.update(
      { id: dto.sourceId },
      { unit: { id: dto.targetId } },
    );
  }

  findAll(): Promise<Ship[]> {
    return this.shipRepository.find({ relations: ['unit', 'type'] });
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
