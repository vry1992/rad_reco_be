import { Detection } from 'src/detection/entities/detection.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { NetworkTemplate } from './network-template.entity';

@Entity({ name: 'network' })
export class Network {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ManyToOne(() => User, (user) => user.networks, { onDelete: 'CASCADE' })
  user: User;

  @OneToOne(() => NetworkTemplate, (template) => template.network, {
    cascade: true,
  })
  template: NetworkTemplate;

  @OneToMany(() => Detection, (detection) => detection.network)
  detections: Detection[];
}
