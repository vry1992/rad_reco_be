import { IsString } from 'class-validator';

export class CheckTransmissionTypeDto {
  @IsString()
  name: string;
}
