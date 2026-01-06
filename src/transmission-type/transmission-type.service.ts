import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import { join } from 'path';
import { FilesService } from 'src/files/files.service';
import { PaginationDto } from 'src/ship/dto/pagination.dto';
import { ILike, Not, Repository } from 'typeorm';
import { CreateTransmissionTypeDto } from './dto/create-transmission-type.dto';
import { DeleteOneTransmissionType } from './dto/delete-one-transmission-type.dto';
import { GetOneTransmissionType } from './dto/get-one-transmission-type.dto';
import { TransmissionType } from './entities/transmission-type.entity';

@Injectable()
export class TransmissionTypeService {
  constructor(
    @InjectRepository(TransmissionType)
    private readonly transmssionTypeRepo: Repository<TransmissionType>,
    private readonly fileService: FilesService,
  ) {}

  async getAll(dto: PaginationDto): Promise<[TransmissionType[], number]> {
    const params = dto ? { ...dto } : undefined;
    const transmissionTypes = await this.transmssionTypeRepo.findAndCount(
      params,
    );

    return transmissionTypes;
  }

  async getOne(dto: GetOneTransmissionType): Promise<TransmissionType> {
    const tType = await this.transmssionTypeRepo.findOne({
      where: { id: dto.id },
    });

    if (!tType) {
      throw new NotFoundException('Вид передачі не знайдено');
    }

    if (tType.imageNames) {
      tType.imageNames = JSON.parse(tType.imageNames);
    }
    if (tType.abonents) {
      tType.abonents = JSON.parse(tType.abonents);
    }
    if (tType.usageNetworks) {
      tType.usageNetworks = JSON.parse(tType.usageNetworks);
    }

    return tType;
  }

  private deleteImages(folder: string) {
    const filePath = join(
      process.cwd(),
      'uploads',
      'transmissionTypes',
      folder,
    );

    this.fileService.deleteFile(filePath);
  }

  async deleteOne(dto: DeleteOneTransmissionType): Promise<void> {
    await this.transmssionTypeRepo.softDelete({ id: dto.id });
    const filePath = join(
      process.cwd(),
      'uploads',
      'transmissionTypes',
      dto.id,
    );

    this.fileService.deleteFile(filePath);
    this.deleteImages(dto.id);
    return;
  }

  getImage(id: string, name: string): string | null {
    const filePath = join(
      process.cwd(),
      'uploads',
      'transmissionTypes',
      id,
      name,
    );
    if (!fs.existsSync(filePath)) {
      return null;
    }
    return filePath;
  }

  async create(
    dto: CreateTransmissionTypeDto,
    images: Array<Express.Multer.File>,
  ) {
    const existed = await this.transmssionTypeRepo.findOne({
      where: {
        name: ILike(`%${dto.name}%`),
      },
    });

    if (existed) {
      throw new BadRequestException('Вид передачі з такою назвою вже існує!');
    }
    const newTransmissionType = this.transmssionTypeRepo.create({
      name: dto.name,
      transmissionType: dto.transmissionType,
      protocol: dto.protocol,
      centralFrequency: dto.centralFrequency,
      usageNetworks: dto.usageNetworks,
      abonents: dto.abonents,
      additionalInformation: dto.additionalInformation,
    });

    const { id } = await this.transmssionTypeRepo.save(newTransmissionType);

    if (images?.length) {
      const imageNames = [];
      for await (const image of images) {
        const toPath = this.fileService.getFilePath(image.originalname, [
          'transmissionTypes',
          id,
        ]);
        await this.fileService.save(image, toPath);
        imageNames.push(image.originalname);
      }

      await this.transmssionTypeRepo.update(
        { id },
        { imageNames: JSON.stringify(imageNames) },
      );
    }
  }

  async edit(
    dto: CreateTransmissionTypeDto,
    images: Array<Express.Multer.File>,
    id: string,
  ) {
    if (dto.name) {
      const existed = await this.transmssionTypeRepo.findOne({
        where: {
          name: ILike(`%${dto.name}%`),
          id: Not(id),
        },
      });

      if (existed) {
        throw new BadRequestException('Вид передачі з такою назвою вже існує!');
      }
    }

    await this.transmssionTypeRepo.update(
      { id },
      {
        name: dto.name,
        transmissionType: dto.transmissionType,
        protocol: dto.protocol,
        centralFrequency: dto.centralFrequency,
        usageNetworks: dto.usageNetworks,
        abonents: dto.abonents,
        additionalInformation: dto.additionalInformation,
      },
    );

    if (images?.length) {
      this.deleteImages(id);
      const imageNames = [];
      for await (const image of images) {
        const toPath = this.fileService.getFilePath(image.originalname, [
          'transmissionTypes',
          id,
        ]);
        await this.fileService.save(image, toPath);
        imageNames.push(image.originalname);
      }

      await this.transmssionTypeRepo.update(
        { id },
        { imageNames: JSON.stringify(imageNames) },
      );
    }
  }
}
