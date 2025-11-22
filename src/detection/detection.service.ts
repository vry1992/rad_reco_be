import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectType } from 'src/common/types';
import { transmissionTypes_MOCK } from 'src/mocks';
import { Repository } from 'typeorm';
import { CreateDetectionRawDto } from './dto/create-detection-raw.dto';
import { GetLastDetectionsDto } from './dto/get-last-detections.dto';
import { Abonent } from './entities/abonent.entity';
import { Detection } from './entities/detection.entity';
import { TransmissionType } from './entities/transmission-type.entity';
import { AbonentDirectionEnum } from './types';

@Injectable()
export class DetectionService {
  constructor(
    @InjectRepository(Detection)
    private readonly detectionRepo: Repository<Detection>,
    @InjectRepository(Abonent)
    private readonly abonentRepo: Repository<Abonent>,
    @InjectRepository(TransmissionType)
    private readonly transmssionTypeRepo: Repository<TransmissionType>,
  ) {}

  async onModuleInit() {
    transmissionTypes_MOCK.forEach((tt) => {
      this.transmssionTypeRepo.save(tt);
    });
  }

  findAll() {
    return this.detectionRepo.find({
      relations: ['network', 'abonents', 'transmissionType'],
    });
  }

  findAllTransmissionTypes() {
    return this.transmssionTypeRepo.find();
  }

  async getLastDetections(userId: string, query: GetLastDetectionsDto) {
    return this.detectionRepo.find({
      relations: [
        'network',
        'abonents',
        'transmissionType',
        'abonents.ship',
        'abonents.unit',
      ],
      skip: +query.skip,
      take: +query.limit,
      order: {
        timeOfDetection: 'DESC',
      },
      where: {
        network: {
          user: {
            id: userId,
          },
        },
      },
    });
  }

  async create(dto: CreateDetectionRawDto) {
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

    await this.detectionRepo.save(detection);
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
}
