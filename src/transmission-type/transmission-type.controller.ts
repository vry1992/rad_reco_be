import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PaginationDto } from 'src/ship/dto/pagination.dto';
import { CreateTransmissionTypeDto } from './dto/create-transmission-type.dto';
import { DeleteOneTransmissionType } from './dto/delete-one-transmission-type.dto';
import { GetOneTransmissionType } from './dto/get-one-transmission-type.dto';
import { GetTransmissionTypeImageQueryDto } from './dto/get-transmission-type-image-query.dto';
import { GetTransmissionTypeImageDto } from './dto/get-transmission-type-image.dto';
import { TransmissionType } from './entities/transmission-type.entity';
import { TransmissionTypeService } from './transmission-type.service';

@Controller('transmission-types')
export class TransmissionTypeController {
  constructor(private readonly service: TransmissionTypeService) {}

  @Get('all')
  @UseGuards(JwtAuthGuard)
  getPaginatedTransmissionTypes(
    @Query() dto: PaginationDto,
  ): Promise<[TransmissionType[], number]> {
    return this.service.getAll(dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteOne(@Param() dto: DeleteOneTransmissionType): Promise<void> {
    this.service.deleteOne(dto);

    return;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/image')
  async getFile(
    @Param() params: GetTransmissionTypeImageDto,
    @Query() query: GetTransmissionTypeImageQueryDto,
    @Res() res: Response,
  ) {
    const path = this.service.getImage(params.id, query.name);
    if (path) {
      res.sendFile(path);
    } else {
      res.end();
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getOneById(@Param() dto: GetOneTransmissionType): Promise<TransmissionType> {
    return this.service.getOne(dto);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('images'))
  async create(
    @UploadedFiles() images: Array<Express.Multer.File>,
    @Body() dto: CreateTransmissionTypeDto,
  ) {
    return this.service.create(dto, images);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('images'))
  async edit(
    @UploadedFiles() images: Array<Express.Multer.File>,
    @Body() dto: CreateTransmissionTypeDto,
    @Param() params: GetOneTransmissionType,
  ) {
    return this.service.edit(dto, images, params.id);
  }
}
