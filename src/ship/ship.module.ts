import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unit } from 'src/unit/unit.entity';
import { ShipController } from './ship.controller';
import { Ship } from './ship.entity';
import { ShipService } from './ship.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ship, Unit])],
  providers: [ShipService],
  controllers: [ShipController],
  exports: [ShipService],
})
export class ShipModule {}
