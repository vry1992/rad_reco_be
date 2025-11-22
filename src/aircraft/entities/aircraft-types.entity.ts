import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Aircraft } from './aircraft.entity';

@Entity({ name: 'aircraft-types' })
export class AircraftTypes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  family: string;

  @OneToMany(() => Aircraft, (aircraft) => aircraft.type, { cascade: true })
  aircrafts: Aircraft[];
}
