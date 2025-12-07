import { IsString } from 'class-validator';

export class CreateTransmissionTypeDto {
  @IsString()
  name: string;
}
