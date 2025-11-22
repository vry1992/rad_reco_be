// src/network/dto/network-template.dto.ts
import { IsEnum, IsOptional } from 'class-validator';
import { FieldEnum } from '../enums';

export class NetworkTemplateDto {
  @IsEnum(FieldEnum)
  @IsOptional()
  timeOfDetection?: FieldEnum;

  @IsEnum(FieldEnum)
  @IsOptional()
  timeFrom?: FieldEnum;

  @IsEnum(FieldEnum)
  @IsOptional()
  timeTo?: FieldEnum;

  @IsEnum(FieldEnum)
  @IsOptional()
  abonentsFrom?: FieldEnum;

  @IsEnum(FieldEnum)
  @IsOptional()
  abonentsTo?: FieldEnum;

  @IsEnum(FieldEnum)
  @IsOptional()
  abonentsCircular?: FieldEnum;

  @IsEnum(FieldEnum)
  @IsOptional()
  frequency?: FieldEnum;

  @IsEnum(FieldEnum)
  @IsOptional()
  pelengsImg?: FieldEnum;

  @IsEnum(FieldEnum)
  @IsOptional()
  lat?: FieldEnum;

  @IsEnum(FieldEnum)
  @IsOptional()
  lng?: FieldEnum;

  @IsEnum(FieldEnum)
  @IsOptional()
  map?: FieldEnum;

  @IsEnum(FieldEnum)
  @IsOptional()
  additionalInformation?: FieldEnum;

  @IsEnum(FieldEnum)
  @IsOptional()
  transmissionType?: FieldEnum;
}
