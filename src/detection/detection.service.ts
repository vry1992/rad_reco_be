import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import { join } from 'path';
import { ObjectType } from 'src/common/types';
import { FilesService } from 'src/files/files.service';
import { Repository } from 'typeorm';
import { CreateDetectionRawDto } from './dto/create-detection-raw.dto';
import { GetLastDetectionsDto } from './dto/get-last-detections.dto';
import { GetScreenDto } from './dto/get-screen.dto';
import { Abonent } from './entities/abonent.entity';
import { Detection } from './entities/detection.entity';
import { AbonentDirectionEnum } from './types';

@Injectable()
export class DetectionService {
  constructor(
    @InjectRepository(Detection)
    private readonly detectionRepo: Repository<Detection>,
    @InjectRepository(Abonent)
    private readonly abonentRepo: Repository<Abonent>,

    private readonly fileService: FilesService,
  ) {}

  findAll() {
    return this.detectionRepo.find({
      relations: ['network', 'abonents', 'transmissionType'],
    });
  }

  async getLastDetections(userId: string, query: GetLastDetectionsDto) {
    const dbQuery = this.detectionRepo
      .createQueryBuilder('d')
      .leftJoinAndSelect('d.network', 'net')
      .leftJoinAndSelect('d.abonents', 'a')
      .leftJoinAndSelect('a.ship', 'ship')
      .leftJoinAndSelect('ship.type', 'type')
      .leftJoinAndSelect('d.transmissionType', 'transmissionType')
      .leftJoinAndSelect('a.unit', 'unit')
      .leftJoinAndSelect('net.user', 'user')
      .where('user.id = :userId', { userId });

    if (query.filter) {
      dbQuery.andWhere(
        `
      (
        net.name ILIKE :filter OR
        d.frequency ILIKE :filter OR

        EXISTS (
          SELECT 1
          FROM abonent a2
          LEFT JOIN ship s2 ON s2.id = a2.ship_id
          WHERE a2.detection_id = d.id
            AND s2.name ILIKE :filter
        ) OR

        EXISTS (
          SELECT 1
          FROM abonent a3
          LEFT JOIN unit u3 ON u3.id = a3.unit_id
          WHERE a3.detection_id = d.id
            AND u3.name ILIKE :filter
        )
      )
    `,
        { filter: `%${query.filter}%` },
      );
    }

    dbQuery.offset(0).take(+query.limit).orderBy('d.timeOfDetection', 'DESC');

    return dbQuery.getMany();
  }

  async create(
    dto: CreateDetectionRawDto,
    files: {
      abonentFromPelengImage?: Express.Multer.File;
      abonentToPelengImage?: Express.Multer.File;
    },
  ) {
    const shipsFrom = dto.abonentsFrom.filter(
      ({ objectType }) => objectType === ObjectType.SHIP,
    );
    const shipsTo = dto.abonentsTo.filter(
      ({ objectType }) => objectType === ObjectType.SHIP,
    );

    const unitsFrom = dto.abonentsFrom.filter(
      ({ objectType }) => objectType === ObjectType.UNIT,
    );
    const unitsTo = dto.abonentsTo.filter(
      ({ objectType }) => objectType === ObjectType.UNIT,
    );

    const detection = this.detectionRepo.create({
      network: {
        id: dto.networkId,
      },
      transmissionType: {
        id: dto.transmissionType,
      },
      frequency: dto.frequency,
      timeOfDetection: dto.timeOfDetection,
      additionalInformation: dto.additionalInformation,
    });

    const abonentsShipsFrom = shipsFrom.map((ship) => {
      return this.abonentRepo.create({
        ship: {
          id: ship.id,
        },
        peleng: dto.pelengFrom,
        callsign: dto.callsignFrom,
        role: AbonentDirectionEnum.FROM,
      });
    });

    const abonentsShipsTo = shipsTo.map((ship) => {
      return this.abonentRepo.create({
        ship: {
          id: ship.id,
        },
        peleng: dto.pelengTo,
        callsign: dto.callsignTo,
        role: AbonentDirectionEnum.TO,
      });
    });

    const abonentsUnitsFrom = unitsFrom.map((unit) => {
      return this.abonentRepo.create({
        unit: {
          id: unit.id,
        },
        peleng: dto.pelengFrom,
        callsign: dto.callsignFrom,
        role: AbonentDirectionEnum.FROM,
      });
    });

    const abonentsUnitsTo = unitsTo.map((unit) => {
      return this.abonentRepo.create({
        unit: {
          id: unit.id,
        },
        peleng: dto.pelengTo,
        callsign: dto.callsignTo,
        role: AbonentDirectionEnum.TO,
      });
    });

    detection.abonents = [
      ...abonentsShipsFrom,
      ...abonentsShipsTo,
      ...abonentsUnitsFrom,
      ...abonentsUnitsTo,
    ];

    const saveResult = await this.detectionRepo.save(detection);

    const fromImage: Express.Multer.File = files.abonentFromPelengImage?.[0];
    const toImage: Express.Multer.File = files.abonentToPelengImage?.[0];
    if (fromImage && fromImage?.buffer) {
      const ext = fromImage.originalname.split('.').at(-1);
      const fromPath = this.fileService.getFilePath({
        fileName: `from.${ext}`,
        networkId: dto.networkId,
        detectionId: saveResult.id,
      });
      await this.fileService.save(fromImage, fromPath);
    }
    if (toImage && toImage?.buffer) {
      const ext = toImage.originalname.split('.').at(-1);
      const toPath = this.fileService.getFilePath({
        fileName: `to.${ext}`,
        networkId: dto.networkId,
        detectionId: saveResult.id,
      });
      await this.fileService.save(fromImage, toPath);
    }
  }

  getScreen(
    fileName: string,
    { networkId, detectionId }: GetScreenDto,
  ): string | null {
    const filePath = join(
      process.cwd(),
      'uploads',
      networkId,
      detectionId,
      fileName,
    );
    if (!fs.existsSync(filePath)) {
      return null;
    }
    return filePath;
  }

  update(id: string, dto) {
    return this.detectionRepo.update(id, dto);
  }

  remove(id: string) {
    return this.detectionRepo.delete(id);
  }

  async getOne(id: string): Promise<Detection> {
    const oneDetection = await this.detectionRepo.findOne({
      where: { id },
      relations: ['abonents'],
    });

    return oneDetection;
  }

  async getCallsignsInNetwork(networkId: string): Promise<Abonent[]> {
    const callsigns: Abonent[] = await this.abonentRepo
      .createQueryBuilder('abonent')
      .leftJoin('abonent.detection', 'detection')
      .where('detection.networkId = :networkId', { networkId })
      .select(['abonent.callsign'])
      .orderBy('detection.timeOfDetection', 'DESC')
      .orderBy({
        'abonent.callsign': 'DESC',
        'detection.timeOfDetection': 'DESC',
      })
      .distinctOn(['abonent.callsign'])
      .getMany();

    return callsigns;
  }

  getCallsignAbonents(networkId: string, callsign: string): Promise<Abonent[]> {
    return this.abonentRepo
      .createQueryBuilder('abonent')
      .leftJoin('abonent.detection', 'detection')
      .leftJoin('abonent.ship', 'ship')
      .leftJoin('ship.type', 'type')
      .leftJoin('abonent.unit', 'unit')
      .where('abonent.callsign = :callsign', { callsign })
      .select(['abonent', 'ship', 'unit', 'type'])
      .andWhere('detection.networkId = :networkId', {
        networkId,
      })
      .distinctOn(['ship', 'unit'])
      .getMany();
  }
}
