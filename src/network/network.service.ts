import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Detection } from 'src/detection/entities/detection.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateNetworkDto } from './dto/create-network.dto';
import { NetworkTemplateDto } from './dto/network-template.dto';
import { NetworksListResponseDto } from './dto/networks-list-response.dto';
import { NetworkTemplate } from './entities/network-template.entity';
import { Network } from './entities/network.entity';

@Injectable()
export class NetworkService {
  constructor(
    @InjectRepository(Network)
    private readonly networkRepository: Repository<Network>,
    @InjectRepository(NetworkTemplate)
    private readonly templateRepository: Repository<NetworkTemplate>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createNetwork(userId: string, dto: CreateNetworkDto): Promise<Network> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const { name, ...template } = dto;

    const network = this.networkRepository.create({ name, user });

    network.template = this.templateRepository.create({
      timeOfDetection: template.timeOfDetection,
      timeFrom: template.timeFrom,
      timeTo: template.timeTo,
      abonentsFrom: template.abonentsFrom,
      abonentsTo: template.abonentsTo,
      abonentsCircular: template.abonentsCircular,
      frequency: template.frequency,
      pelengsImg: template.pelengsImg,
      lat: template.lat,
      lng: template.lng,
      map: template.map,
      additionalInformation: template.additionalInformation,
      transmissionType: template.transmissionType,
    });

    return this.networkRepository.save(network);
  }

  findAll(): Promise<Network[]> {
    return this.networkRepository.find({
      relations: ['template', 'detections'],
    });
  }

  async getMyNetworks(userId: string, filter: string): Promise<any> {
    const networks = await this.networkRepository
      .createQueryBuilder('n')
      .leftJoinAndSelect('n.detections', 'd')
      .leftJoinAndSelect('d.abonents', 'a')
      .leftJoinAndSelect('a.ship', 'ship')
      .leftJoinAndSelect('a.unit', 'unit')
      .leftJoinAndSelect('n.user', 'user')
      .where('n.name ILIKE :filter', { filter: `%${filter}%` })
      .orWhere('d.frequency ILIKE :filter', { filter: `%${filter}%` })
      .orWhere('ship.name ILIKE :filter', { filter: `%${filter}%` })
      .orWhere('unit.name ILIKE :filter', { filter: `%${filter}%` })
      .getMany();

    return new NetworksListResponseDto(networks, userId);
  }

  async findOne(id: string): Promise<Network | null> {
    const network = await this.networkRepository.findOne({
      where: { id },
      relations: ['template', 'detections', 'detections.transmissionType'],
    });

    return network;
  }

  // [({
  //   callsign: 'Кого',
  //   ship: null,
  //   unit: '92f28aef-8dd6-4dfd-b724-5e7b61225f37',
  //   aircraft: null,
  // },
  // {
  //   callsign: 'Кого',
  //   ship: null,
  //   unit: 'ec78db7a-30a5-47bc-9aff-33090c5be9ea',
  //   aircraft: null,
  // },
  // {
  //   callsign: 'Хто',
  //   ship: '87b200df-8748-4239-aa52-b43fe87d289e',
  //   unit: null,
  //   aircraft: null,
  // },
  // {
  //   callsign: 'Хто',
  //   ship: null,
  //   unit: '8cc4ab9b-cbbb-4247-b912-0c1a2f28bad9',
  //   aircraft: null,
  // },
  // {
  //   callsign: 'Хто',
  //   ship: null,
  //   unit: '92f28aef-8dd6-4dfd-b724-5e7b61225f37',
  //   aircraft: null,
  // },
  // {
  //   callsign: null,
  //   ship: null,
  //   unit: null,
  //   aircraft: null,
  // })];

  getFrequencies(networkId: string): Promise<Pick<Detection, 'frequency'>[]> {
    return this.networkRepository
      .createQueryBuilder('net')
      .leftJoinAndSelect('net.detections', 'd')
      .where('net.id = :networkId', { networkId })
      .select('d.frequency', 'frequency')
      .distinct(true)
      .getRawMany();
  }

  getTemplate(networkId: string): Promise<Network> {
    return this.networkRepository.findOne({
      where: { id: networkId },
      relations: ['template'],
    });
  }

  async updateTemplate(
    networkId: string,
    dto: NetworkTemplateDto,
  ): Promise<NetworkTemplate> {
    const network = await this.networkRepository.findOne({
      where: { id: networkId },
      relations: ['template'],
    });
    if (!network) throw new NotFoundException('Network not found');

    Object.assign(network.template, dto);
    return this.templateRepository.save(network.template);
  }
}
