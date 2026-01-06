import { Transform } from 'class-transformer';
import { Aircraft } from 'src/aircraft/entities/aircraft.entity';
import { Unit } from 'src/unit/entities/unit.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Detection } from '../../detection/entities/detection.entity';
import { Ship } from '../../ship/entities/ship.entity';
import { AbonentDirectionEnum, ConjunctionTypeEnum } from '../types';

@Entity({ name: 'abonent' })
export class Abonent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Detection, (d) => d.abonents, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'detection_id' })
  detection: Detection;

  @Column({ type: 'varchar', length: 255, nullable: true })
  peleng: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  callsign: string;

  @Column({
    type: 'enum',
    enum: ConjunctionTypeEnum,
    default: ConjunctionTypeEnum.MAIN,
  })
  @Transform(({ value }) => +value)
  conjunctionType: ConjunctionTypeEnum;

  @ManyToOne(() => Ship, { nullable: true })
  @JoinColumn({ name: 'ship_id' })
  ship: Ship;

  @ManyToOne(() => Unit, { nullable: true })
  @JoinColumn({ name: 'unit_id' })
  unit: Unit;

  @ManyToOne(() => Aircraft, { nullable: true })
  @JoinColumn({ name: 'aircraft_id' })
  aircraft: Aircraft;

  @Column({ type: 'enum', enum: AbonentDirectionEnum })
  @Transform(({ value }) => +value)
  role: AbonentDirectionEnum;
}
