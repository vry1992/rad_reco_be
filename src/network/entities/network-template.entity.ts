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

  @Column({ type: 'enum', enum: FieldEnum, default: FieldEnum.REQUIRED })
  timeOfDetection: FieldEnum;

  @Column({ type: 'enum', enum: FieldEnum, default: FieldEnum.ON })
  timeFrom: FieldEnum;

  @Column({ type: 'enum', enum: FieldEnum, default: FieldEnum.ON })
  timeTo: FieldEnum;

  @Column({ type: 'enum', enum: FieldEnum, default: FieldEnum.ON })
  abonentFrom: FieldEnum;

  @Column({ type: 'enum', enum: FieldEnum, default: FieldEnum.ON })
  abonentTo: FieldEnum;

  @Column({ type: 'enum', enum: FieldEnum, default: FieldEnum.OFF })
  abonentCircular: FieldEnum;

  @Column({ type: 'enum', enum: FieldEnum, default: FieldEnum.ON })
  frequency: FieldEnum;

  @Column({ type: 'enum', enum: FieldEnum, default: FieldEnum.ON })
  pelengsImg: FieldEnum;

  @Column({ type: 'enum', enum: FieldEnum, default: FieldEnum.ON })
  lat: FieldEnum;

  @Column({ type: 'enum', enum: FieldEnum, default: FieldEnum.ON })
  lng: FieldEnum;

  @Column({ type: 'enum', enum: FieldEnum, default: FieldEnum.ON })
  map: FieldEnum;

  @Column({ type: 'enum', enum: FieldEnum, default: FieldEnum.OFF })
  additionalInformation: FieldEnum;

  @Column({ type: 'enum', enum: FieldEnum, default: FieldEnum.ON })
  transmissionType: FieldEnum;
}
