import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransmissionType } from './entities/transmission-type.entity';
import { TransmissionTypeController } from './transmission-type.controller';
import { TransmissionTypeService } from './transmission-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([TransmissionType])],
  controllers: [TransmissionTypeController],
  providers: [TransmissionTypeService],
  // exports: [TransmissionTypeService],
})
export class TransmissionTypeModule {}
