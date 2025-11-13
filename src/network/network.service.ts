import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateNetworkDto } from './dto/create-network.dto';
import { NetworkTemplateDto } from './dto/network-template.dto';
import { NetworkTemplate } from './entities/network-template.entity';
import { Network } from './entities/network.entity';
import { FieldEnum } from './enums';

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

  // ------------------ NETWORK ------------------
  async createNetwork(userId: string, dto: CreateNetworkDto): Promise<Network> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const network = this.networkRepository.create({ name: dto.name, user });

    network.template = this.templateRepository.create({
      timeOfDetection: FieldEnum.REQUIRED,
      timeFrom: FieldEnum.OFF,
      timeTo: FieldEnum.OFF,
      abonentFrom: FieldEnum.ON,
      abonentTo: FieldEnum.ON,
      abonentCircular: FieldEnum.OFF,
      frequency: FieldEnum.REQUIRED,
      pelengsImg: FieldEnum.OFF,
      lat: FieldEnum.OFF,
      lng: FieldEnum.OFF,
      map: FieldEnum.OFF,
      additionalInformation: FieldEnum.ON,
      transmissionType: FieldEnum.ON,
    });

    return this.networkRepository.save(network);
  }

  findAll(): Promise<Network[]> {
    return this.networkRepository.find({ relations: ['template', 'user'] });
  }

  findOne(id: string): Promise<Network | null> {
    return this.networkRepository.findOne({
      where: { id },
      relations: ['template', 'user'],
    });
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
