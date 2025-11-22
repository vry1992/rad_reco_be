import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Ship } from './ship.entity';

@Entity({ name: 'ship_types' })
export class ShipTypes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  abbreviatedType: string;

  @OneToMany(() => Ship, (ship) => ship.type, { cascade: true })
  ships: Ship[];
}
