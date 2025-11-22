import { IsNotEmpty, IsString } from 'class-validator';
import { NetworkTemplate } from '../entities/network-template.entity';

export class CreateNetworkDto extends NetworkTemplate {
  @IsNotEmpty()
  @IsString()
  name: string;
}
