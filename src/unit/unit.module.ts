import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ship } from 'src/ship/entities/ship.entity';
import { Unit } from './entities/unit.entity';
import { UnitController } from './unit.controller';
import { UnitService } from './unit.service';

@Module({
  imports: [TypeOrmModule.forFeature([Unit, Ship])],
  controllers: [UnitController],
  providers: [UnitService],
  exports: [UnitService],
})
export class UnitModule {}
