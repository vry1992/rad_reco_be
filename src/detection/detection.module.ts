import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesService } from 'src/files/files.service';
import { DetectionController } from './detection.controller';
import { DetectionService } from './detection.service';
import { Abonent } from './entities/abonent.entity';
import { Detection } from './entities/detection.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Detection, Abonent])],
  controllers: [DetectionController],
  providers: [DetectionService, FilesService],
})
export class DetectionModule {}
