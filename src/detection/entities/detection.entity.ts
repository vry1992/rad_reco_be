import { TransmissionType } from 'src/transmission-type/entities/transmission-type.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Network } from '../../network/entities/network.entity';
import { Abonent } from './abonent.entity';

@Entity({ name: 'detection' })
export class Detection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Network, (n) => n.detections, { onDelete: 'CASCADE' })
  network: Network;

  @Column({ type: 'timestamp' })
  timeOfDetection: Date;

  @Column({ type: 'timestamp', nullable: true })
  timeFrom: Date;

  @Column({ type: 'timestamp', nullable: true })
  timeTo: Date;

  @Column({ type: 'varchar', nullable: true })
  frequency: string;

  @Column({ type: 'decimal', nullable: true })
  pelengsImg: number;

  @Column({ type: 'decimal', nullable: true })
  lat: number;

  @Column({ type: 'decimal', nullable: true })
  lng: number;

  @Column({ type: 'varchar', nullable: true })
  additionalInformation: string;

  @OneToMany(() => Abonent, (a) => a.detection, { cascade: true })
  abonents: Abonent[];

  @ManyToOne(() => TransmissionType, (type) => type.detections, {
    nullable: false,
  })
  transmissionType: TransmissionType;
}
