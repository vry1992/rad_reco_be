import { Ship } from 'src/ship/ship.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'unit' })
export class Unit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  callsign: string;

  @OneToMany(() => Ship, (ship) => ship.unit)
  ships: Ship[];
}
