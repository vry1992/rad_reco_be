import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { CreateTransmissionTypeDto } from './create-transmission-type.dto';

export class EditTransmissionTypeDto extends PartialType(
  CreateTransmissionTypeDto,
) {
  @IsString()
  transmissionType: string;

  @IsString()
  @IsOptional()
  protocol: string;

  @IsString()
  @IsOptional()
  centralFrequency: string;

  @IsString()
  @IsOptional()
  usageNetworks: string;

  @IsString()
  @IsOptional()
  abonents: string;

  @IsString()
  @IsOptional()
  additionalInformation: string;
}
