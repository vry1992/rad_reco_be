import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Unit } from './unit/unit.entity';
import { UnitService } from './unit/unit.service';

@Controller('units')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Get()
  findAll(): Promise<Unit[]> {
    return this.unitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Unit | null> {
    return this.unitService.findOne(id);
  }

  @Post()
  create(@Body() body: Partial<Unit>): Promise<Unit> {
    return this.unitService.create(body);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: Partial<Unit>,
  ): Promise<Unit | null> {
    return this.unitService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.unitService.remove(id);
  }
}
