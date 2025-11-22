import { Transform } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FieldEnum } from '../enums';
import { Network } from './network.entity';

@Entity({ name: 'network_template' })
export class NetworkTemplate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Network, (network) => network.template)
  @JoinColumn({ name: 'network_id' })
  network: Network;

  @Column({ type: 'enum', enum: FieldEnum })
  @Transform(({ value }) => +value)
  timeOfDetection: FieldEnum;

  @Column({ type: 'enum', enum: FieldEnum })
  @Transform(({ value }) => +value)
  timeFrom: FieldEnum;

  @Column({ type: 'enum', enum: FieldEnum })
  @Transform(({ value }) => +value)
  timeTo: FieldEnum;

  @Column({ type: 'enum', enum: FieldEnum })
  @Transform(({ value }) => +value)
  abonentsFrom: FieldEnum;

  @Column({ type: 'enum', enum: FieldEnum })
  @Transform(({ value }) => +value)
  abonentsTo: FieldEnum;

  @Column({ type: 'enum', enum: FieldEnum })
  @Transform(({ value }) => +value)
  abonentsCircular: FieldEnum;

  @Column({ type: 'enum', enum: FieldEnum })
  @Transform(({ value }) => +value)
  frequency: FieldEnum;

  @Column({ type: 'enum', enum: FieldEnum })
  @Transform(({ value }) => +value)
  pelengsImg: FieldEnum;

  @Column({ type: 'enum', enum: FieldEnum })
  @Transform(({ value }) => +value)
  lat: FieldEnum;

  @Column({ type: 'enum', enum: FieldEnum })
  @Transform(({ value }) => +value)
  lng: FieldEnum;

  @Column({ type: 'enum', enum: FieldEnum })
  @Transform(({ value }) => +value)
  map: FieldEnum;

  @Column({ type: 'enum', enum: FieldEnum })
  @Transform(({ value }) => +value)
  additionalInformation: FieldEnum;

  @Column({ type: 'enum', enum: FieldEnum })
  @Transform(({ value }) => +value)
  transmissionType: FieldEnum;
}
