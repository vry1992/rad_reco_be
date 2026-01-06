import {
  Controller,
  Delete,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DeleteOneDto } from './dto/delete-one.dto';
import { GetOneDto } from './dto/get-one.dto';
import { PaginationDto } from './dto/pagination.dto';
import { ShipTypes } from './entities/ship-types.entity';
import { ShipTypesService } from './ship-types.service';

@Controller('ship-types')
export class ShipTypesController {
  constructor(private readonly shipTypesService: ShipTypesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  shipTypes(@Query() dto: PaginationDto): Promise<any> {
    return this.shipTypesService.getShipTypes(dto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param() params: GetOneDto): Promise<ShipTypes> {
    return this.shipTypesService.getOne(params.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param() params: DeleteOneDto): Promise<void> {
    return this.shipTypesService.deleteOne(params.id);
  }

  // @Post()
  // @UseGuards(JwtAuthGuard)
  // create(@Body() body: Partial<Ship>): Promise<Ship> {
  //   return this.shipService.create(body);
  // }

  // @Put('nesting')
  // @UseGuards(JwtAuthGuard)
  // changeNesting(@Body() dto: ChangeShipsNestingDto): any {
  //   return this.shipService.changeNesting(dto);
  // }

  // @Put(':id')
  // @UseGuards(JwtAuthGuard)
  // update(
  //   @Param('id') id: string,
  //   @Body() body: Partial<Ship>,
  // ): Promise<Ship | null> {
  //   return this.shipService.update(id, body);
  // }
}
