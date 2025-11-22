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
import { DetectionService } from './detection.service';
import { CreateDetectionRawDto } from './dto/create-detection-raw.dto';
import { GetLastDetectionsDto } from './dto/get-last-detections.dto';

@Controller('detection')
export class DetectionController {
  constructor(private readonly service: DetectionService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('all/transmission-types')
  findAllTransmissionTypes() {
    return this.service.findAllTransmissionTypes();
  }

  @Get('last/:userId')
  @UseGuards(JwtAuthGuard)
  getLastDetections(
    @Param('userId') userId: string,
    @Query() query: GetLastDetectionsDto,
  ) {
    return this.service.getLastDetections(userId, query);
  }

  @Post()
  create(@Body() dto: CreateDetectionRawDto) {
    return this.service.create(dto);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.service.getOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
