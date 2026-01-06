import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PaginationDto } from 'src/ship/dto/pagination.dto';
import { AircraftService } from './aircraft.service';

@Controller('aircraft')
export class AircraftController {
  constructor(private readonly aircraftService: AircraftService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  shipTypes(@Query() dto: PaginationDto): Promise<any> {
    return this.aircraftService.findAll(dto);
  }
}
