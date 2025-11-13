import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Ship } from './ship.entity';
import { ShipService } from './ship.service';

@Controller('ships')
export class ShipController {
  constructor(private readonly shipService: ShipService) {}

  @Get()
  findAll(): Promise<Ship[]> {
    return this.shipService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Ship | null> {
    return this.shipService.findOne(id);
  }

  @Post()
  create(@Body() body: Partial<Ship>): Promise<Ship> {
    return this.shipService.create(body);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: Partial<Ship>,
  ): Promise<Ship | null> {
    return this.shipService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.shipService.remove(id);
  }
}
