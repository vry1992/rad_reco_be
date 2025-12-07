import { Detection } from 'src/detection/entities/detection.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'transmission_type' })
export class TransmissionType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => Detection, (detection) => detection.transmissionType)
  detections: Detection[];
}
