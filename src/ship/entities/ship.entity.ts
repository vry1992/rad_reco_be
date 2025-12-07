import { Transform } from 'class-transformer';
import { ObjectType } from 'src/common/types';
import { Abonent } from 'src/detection/entities/abonent.entity';
import { Unit } from 'src/unit/entities/unit.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ShipTypes } from './ship-types.entity';

@Entity({ name: 'ship' })
export class Ship {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    collation: 'uk_UA.UTF-8',
    nullable: false,
  })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  bortNumber: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  project: string;

  @Column({
    type: 'enum',
    enum: ObjectType,
    default: ObjectType.SHIP,
    nullable: false,
  })
  @Transform(({ value }) => +value)
  objectType: ObjectType;

  @ManyToOne(() => Unit, (unit) => unit.ships, { onDelete: 'SET NULL' })
  unit: Unit;

  @OneToMany(() => Abonent, (a) => a.ship)
  abonents: Abonent[];

  @ManyToOne(() => ShipTypes, (shipType) => shipType.ships, {
    onDelete: 'SET NULL',
  })
  type: ShipTypes;
}
