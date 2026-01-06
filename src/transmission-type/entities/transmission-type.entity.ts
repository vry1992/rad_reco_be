import { Detection } from 'src/detection/entities/detection.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'transmission_type' })
export class TransmissionType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  transmissionType: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  protocol?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  centralFrequency?: string;

  @Column({ type: 'jsonb', nullable: true })
  usageNetworks?: string;

  @Column({ type: 'jsonb', nullable: true })
  abonents?: string;

  @Column({ type: 'varchar', nullable: true })
  additionalInformation?: string;

  @Column({ type: 'varchar', nullable: true })
  imageNames?: string;

  @OneToMany(() => Detection, (detection) => detection.transmissionType)
  detections: Detection[];

  @DeleteDateColumn()
  public deletedAt?: Date;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}
