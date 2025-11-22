// transmission-type.entity.ts
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Detection } from './detection.entity';

@Entity({ name: 'transmission_type' })
export class TransmissionType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  // В одного типу трансмісії може бути багато детекшинів
  @OneToMany(() => Detection, (detection) => detection.transmissionType)
  detections: Detection[];
}
