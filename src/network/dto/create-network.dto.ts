import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNetworkDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
