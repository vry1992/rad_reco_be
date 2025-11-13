import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { NetworkTemplate } from './entities/network-template.entity';
import { Network } from './entities/network.entity';
import { NetworkService } from './network.service';

@Module({
  imports: [TypeOrmModule.forFeature([Network, NetworkTemplate, User])],
  providers: [NetworkService],
  exports: [NetworkService],
})
export class NetworkModule {}
