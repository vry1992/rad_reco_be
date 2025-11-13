import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateNetworkDto } from './dto/create-network.dto';
import { NetworkTemplateDto } from './dto/network-template.dto';
import { NetworkService } from './network.service';

@Controller('network')
export class NetworkController {
  constructor(private readonly networkService: NetworkService) {}

  @Get()
  findAll() {
    return this.networkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.networkService.findOne(id);
  }

  @Post(':userId')
  create(@Param('userId') userId: string, @Body() body: CreateNetworkDto) {
    return this.networkService.createNetwork(userId, body);
  }

  @Get(':id/template')
  getTemplate(@Param('id') networkId: string) {
    return this.networkService.getTemplate(networkId);
  }

  @Put(':id/template')
  updateTemplate(
    @Param('id') networkId: string,
    @Body() dto: NetworkTemplateDto,
  ) {
    return this.networkService.updateTemplate(networkId, dto);
  }
}
