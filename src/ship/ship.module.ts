import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unit } from 'src/unit/entities/unit.entity';
import { ShipTypes } from './entities/ship-types.entity';
import { Ship } from './entities/ship.entity';
import { ShipTypesController } from './ship-types.controller';
import { ShipTypesService } from './ship-types.service';
import { ShipController } from './ship.controller';
import { ShipService } from './ship.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ship, Unit, ShipTypes])],
  providers: [ShipService, ShipTypesService],
  controllers: [ShipController, ShipTypesController],
  exports: [ShipService],
})
export class ShipModule {}
