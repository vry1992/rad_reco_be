import { IsString } from 'class-validator';

export class GetTransmissionTypeImageQueryDto {
  @IsString()
  name: string;
}
