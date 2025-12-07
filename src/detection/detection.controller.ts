import {
  BadRequestException,
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
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { validateDto } from 'src/utils';
import { DetectionService } from './detection.service';
import { CreateDetectionRawDto } from './dto/create-detection-raw.dto';
import { GetCallsignAbonentsDto } from './dto/get-callsign-abonents.dto';
import { GetLastDetectionsDto } from './dto/get-last-detections.dto';
import { GetScreenDto } from './dto/get-screen.dto';

@Controller('detection')
export class DetectionController {
  constructor(private readonly service: DetectionService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('last/:userId')
  @UseGuards(JwtAuthGuard)
  getLastDetections(
    @Param('userId') userId: string,
    @Query() query: GetLastDetectionsDto,
  ) {
    return this.service.getLastDetections(userId, query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('screenshot/:fileName')
  async getFile(
    @Param('fileName') fileName: string,
    @Query() query: GetScreenDto,
    @Res() res: Response,
  ) {
    const path = this.service.getScreen(fileName, query);
    if (path) {
      res.sendFile(path);
    } else {
      res.end();
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'abonentFromPelengImage', maxCount: 1 },
      { name: 'abonentToPelengImage', maxCount: 1 },
    ]),
  )
  async createDetection(
    @UploadedFiles()
    files: {
      abonentFromPelengImage?: Express.Multer.File;
      abonentToPelengImage?: Express.Multer.File;
    },
    @Body('payload') payloadString: string,
  ) {
    let payload: CreateDetectionRawDto;

    try {
      payload = JSON.parse(payloadString);
    } catch {
      throw new BadRequestException('Invalid JSON in "payload"');
    }

    const dto = await validateDto(CreateDetectionRawDto, payload);

    return this.service.create(dto, files);
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

  @Get(':networkId/callsigns')
  @UseGuards(JwtAuthGuard)
  getCallsigns(@Param('networkId') networkId: string) {
    return this.service.getCallsignsInNetwork(networkId);
  }

  @Get(':networkId/callsign-abonents')
  @UseGuards(JwtAuthGuard)
  getCallsignAbonents(
    @Param('networkId') networkId: string,
    @Query() query: GetCallsignAbonentsDto,
  ) {
    return this.service.getCallsignAbonents(networkId, query.callsign);
  }
}
function Q(): (
  target: DetectionController,
  propertyKey: 'findAllTransmissionTypes',
  parameterIndex: 0,
) => void {
  throw new Error('Function not implemented.');
}
