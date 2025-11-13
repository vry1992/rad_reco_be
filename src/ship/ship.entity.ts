import { Unit } from 'src/unit/unit.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'ship' })
export class Ship {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  bortNumber: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  project: string;

  @ManyToOne(() => Unit, (unit) => unit.ships, { onDelete: 'SET NULL' })
  unit: Unit;
}
