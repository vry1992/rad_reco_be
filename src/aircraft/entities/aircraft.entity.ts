import { Abonent } from 'src/detection/entities/abonent.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'aircraft' })
export class Aircraft {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  family: string;

  @OneToMany(() => Abonent, (abonent) => abonent.aircraft, { cascade: true })
  abonents: Abonent[];
}
