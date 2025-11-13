import {
  Column,
  Entity,
  ManyToOne,
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
}
