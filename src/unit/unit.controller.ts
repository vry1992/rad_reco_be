import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ChangeNestingDto } from './dto/change-units-nesting.dto';
import { UnitService } from './unit.service';

@Controller('units')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.unitService.findAll();
  }

  @Put('nesting')
  @UseGuards(JwtAuthGuard)
  changeNesting(@Body() dto: ChangeNestingDto) {
    return this.unitService.changeNesting(dto);
  }
}
