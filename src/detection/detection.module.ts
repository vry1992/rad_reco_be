import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetectionController } from './detection.controller';
import { DetectionService } from './detection.service';
import { Abonent } from './entities/abonent.entity';
import { Detection } from './entities/detection.entity';
import { TransmissionType } from './entities/transmission-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Detection, Abonent, TransmissionType])],
  controllers: [DetectionController],
  providers: [DetectionService],
})
export class DetectionModule {}
