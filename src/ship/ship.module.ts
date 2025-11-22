import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unit } from 'src/unit/entities/unit.entity';
import { ShipTypes } from './entities/ship-types.entity';
import { Ship } from './entities/ship.entity';
import { ShipController } from './ship.controller';
import { ShipService } from './ship.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ship, Unit, ShipTypes])],
  providers: [ShipService],
  controllers: [ShipController],
  exports: [ShipService],
})
export class ShipModule {}
