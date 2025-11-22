import { IsOptional, IsString } from 'class-validator';

export class GetNetworkDto {
  @IsOptional()
  @IsString()
  filter: string;
}
