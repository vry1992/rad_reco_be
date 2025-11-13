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
  abonentFrom?: FieldEnum;

  @IsEnum(FieldEnum)
  @IsOptional()
  abonentTo?: FieldEnum;

  @IsEnum(FieldEnum)
  @IsOptional()
  abonentCircular?: FieldEnum;

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
