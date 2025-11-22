import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
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

  async getMyNetworks(
    userId: string,
    filter: string,
  ): Promise<NetworksListResponseDto> {
    const networks = await this.networkRepository.find({
      select: {
        id: true,
        name: true,
      },
      relations: ['detections', 'user'],
      where: [
        {
          name: ILike(`%${filter}%`),
        },
        {
          detections: {
            frequency: ILike(`%${filter}%`),
          },
        },
        {
          detections: {
            abonents: {
              ship: {
                name: ILike(`%${filter}%`),
              },
            },
          },
        },
        {
          detections: {
            abonents: {
              unit: {
                name: ILike(`%${filter}%`),
              },
            },
          },
        },
      ],
    });

    return new NetworksListResponseDto(networks, userId);
  }

  async findOne(id: string): Promise<Network | null> {
    const network = await this.networkRepository.findOne({
      where: { id },
      relations: ['template', 'detections', 'detections.transmissionType'],
    });

    return network;
  }

  // ------------------ NETWORK TEMPLATE ------------------
  async getTemplate(networkId: string): Promise<NetworkTemplate> {
    const network = await this.networkRepository.findOne({
      where: { id: networkId },
      relations: ['template'],
    });
    if (!network) throw new NotFoundException('Network not found');
    return network.template;
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
