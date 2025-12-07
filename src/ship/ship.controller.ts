import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ChangeShipsNestingDto } from './dto/change-ships-nesting.dto';
import { PaginationDto } from './dto/pagination.dto';
import { Ship } from './entities/ship.entity';
import { ShipTypesService } from './ship-types.service';
import { ShipService } from './ship.service';

@Controller('ships')
export class ShipController {
  constructor(
    private readonly shipService: ShipService,
    private readonly shipTypesService: ShipTypesService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(): Promise<Ship[]> {
    return this.shipService.findAll();
  }

  @Get('tree-select-options')
  @UseGuards(JwtAuthGuard)
  treeSelectOptions(): Promise<Record<string, Ship[]>> {
    return this.shipService.selectTreeSelectOptions();
  }

  @Get('types')
  @UseGuards(JwtAuthGuard)
  shipTypes(@Query() dto: PaginationDto): Promise<any> {
    return this.shipTypesService.getShipTypes(dto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string): Promise<Ship | null> {
    return this.shipService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() body: Partial<Ship>): Promise<Ship> {
    return this.shipService.create(body);
  }

  @Put('nesting')
  @UseGuards(JwtAuthGuard)
  changeNesting(@Body() dto: ChangeShipsNestingDto): any {
    return this.shipService.changeNesting(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() body: Partial<Ship>,
  ): Promise<Ship | null> {
    return this.shipService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string): Promise<void> {
    return this.shipService.remove(id);
  }
}
