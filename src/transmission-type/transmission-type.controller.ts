import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PaginationDto } from 'src/ship/dto/pagination.dto';
import { CreateTransmissionTypeDto } from './dto/create-transmission-type.dto';
import { TransmissionType } from './entities/transmission-type.entity';
import { TransmissionTypeService } from './transmission-type.service';

@Controller('transmission-types')
export class TransmissionTypeController {
  constructor(private readonly service: TransmissionTypeService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getPaginatedTransmissionTypes(
    @Query() dto: PaginationDto,
  ): Promise<[TransmissionType[], number]> {
    return this.service.getAll(dto);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('images'))
  async createDetection(
    @UploadedFiles() images: Array<Express.Multer.File>,
    @Body() dto: CreateTransmissionTypeDto,
  ) {
    console.log(images, dto);
    // let payload: CreateDetectionRawDto;
    // try {
    //   payload = JSON.parse(payloadString);
    // } catch {
    //   throw new BadRequestException('Invalid JSON in "payload"');
    // }
    // const dto = await validateDto(CreateDetectionRawDto, payload);
    // return this.service.create(dto, files);
  }
}
