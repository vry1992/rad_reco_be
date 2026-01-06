import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
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

  @DeleteDateColumn()
  public deletedAt?: Date;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}
