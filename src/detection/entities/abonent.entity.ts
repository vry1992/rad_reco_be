import { Transform } from 'class-transformer';
import { Aircraft } from 'src/aircraft/entities/aircraft.entity';
import { Unit } from 'src/unit/entities/unit.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Detection } from '../../detection/entities/detection.entity';
import { Ship } from '../../ship/entities/ship.entity';
import { AbonentDirectionEnum } from '../types';

@Entity({ name: 'abonent' })
export class Abonent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Detection, (d) => d.abonents, { onDelete: 'CASCADE' })
  detection: Detection;

  @Column({ type: 'varchar', length: 255, nullable: true })
  peleng: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  callsign: string;

  @ManyToOne(() => Ship, { nullable: true })
  ship: Ship;

  @ManyToOne(() => Unit, { nullable: true })
  unit: Unit;

  @ManyToOne(() => Aircraft, { nullable: true })
  aircraft: Aircraft;

  @Column({ type: 'enum', enum: AbonentDirectionEnum })
  @Transform(({ value }) => +value)
  role: AbonentDirectionEnum;
}
