import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateNetworkDto } from './dto/create-network.dto';
import { GetNetworkDto } from './dto/get-network.dto';
import { NetworkTemplateDto } from './dto/network-template.dto';
import { NetworkService } from './network.service';

@Controller('network')
export class NetworkController {
  constructor(private readonly networkService: NetworkService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.networkService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.networkService.findOne(id);
  }

  @Get('/list/:id')
  @UseGuards(JwtAuthGuard)
  getMyNetworks(@Param('id') id: string, @Query() { filter }: GetNetworkDto) {
    return this.networkService.getMyNetworks(id, filter);
  }

  @Post(':userId')
  @UseGuards(JwtAuthGuard)
  create(@Param('userId') userId: string, @Body() body: CreateNetworkDto) {
    return this.networkService.createNetwork(userId, body);
  }

  @Get(':id/template')
  @UseGuards(JwtAuthGuard)
  getTemplate(@Param('id') networkId: string) {
    return this.networkService.getTemplate(networkId);
  }

  @Put(':id/template')
  @UseGuards(JwtAuthGuard)
  updateTemplate(
    @Param('id') networkId: string,
    @Body() dto: NetworkTemplateDto,
  ) {
    return this.networkService.updateTemplate(networkId, dto);
  }
}
