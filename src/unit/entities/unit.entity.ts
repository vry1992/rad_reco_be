import { Transform } from 'class-transformer';
import { ObjectType } from 'src/common/types';
import { Abonent } from 'src/detection/entities/abonent.entity';
import { Ship } from 'src/ship/entities/ship.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'unit' })
export class Unit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  callsign: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  abbreviatedName: string;

  @Column({
    type: 'enum',
    enum: ObjectType,
    default: ObjectType.UNIT,
    nullable: false,
  })
  @Transform(({ value }) => +value)
  objectType: ObjectType;

  @ManyToOne(() => Unit, (unit) => unit.children, { nullable: true })
  parent: Unit;

  @OneToMany(() => Unit, (unit) => unit.parent)
  children: Unit[];

  @OneToMany(() => Ship, (ship) => ship.unit, { cascade: true })
  ships: Ship[];

  // @OneToMany(() => Aircraft, (aircraft) => aircraft.unit, { cascade: true })
  // aircrafts: Aircraft[];

  @OneToMany(() => Abonent, (a) => a.ship)
  abonents: Abonent[];
}
