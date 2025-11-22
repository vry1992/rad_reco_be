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
import { AircraftTypes } from './aircraft-types.entity';

@Entity({ name: 'aircraft' })
export class Aircraft {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  bortNumber: string;

  @Column({
    type: 'enum',
    enum: ObjectType,
    default: ObjectType.AIRCRAFT,
    nullable: false,
  })
  @Transform(({ value }) => +value)
  objectType: ObjectType;

  @ManyToOne(() => Unit, (unit) => unit.ships, { onDelete: 'SET NULL' })
  unit: Unit;

  @ManyToOne(() => AircraftTypes, (aircraftType) => aircraftType.aircrafts, {
    onDelete: 'SET NULL',
  })
  type: AircraftTypes;

  @OneToMany(() => Abonent, (a) => a.ship)
  abonents: Abonent[];
}
