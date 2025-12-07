// dto/create-detection-raw.dto.ts
import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Ship } from 'src/ship/entities/ship.entity';
import { Unit } from 'src/unit/entities/unit.entity';

class ShipDto {
  @IsUUID() id: string;
  @IsString() name: string;
  @IsOptional() @IsString() bortNumber: string | null;
  @IsString() abbreviatedType: string;
  @IsString() project: string;
  @IsNumber() objectType: number;
}

class UnitDto {
  @IsUUID() id: string;
  @IsString() name: string;
  @IsOptional() @IsString() callsign: string | null;
  @IsString() abbreviatedName: string;
  @IsNumber() objectType: number;
}

class AbonentsDto {
  @ValidateNested({ each: true })
  @Type(() => ShipDto)
  ship: ShipDto[];

  @ValidateNested({ each: true })
  @Type(() => UnitDto)
  unit: UnitDto[];
}

class AbonentDto {
  @IsOptional()
  @IsString()
  callsign?: string;

  @IsOptional()
  @IsString()
  peleng?: string;

  @Type(() => AbonentsDto)
  @ValidateNested()
  abonents: AbonentsDto;
}

export class CreateDetectionRawDto {
  @IsUUID()
  networkId: string;

  @IsString()
  timeOfDetection: string;

  @IsOptional()
  abonentsFrom?: Array<Ship | Unit>;

  @IsOptional()
  @IsString()
  callsignFrom?: string;

  @IsOptional()
  @IsString()
  pelengFrom?: string;

  @IsOptional()
  abonentsTo?: Array<Ship | Unit>;

  @IsOptional()
  @IsString()
  callsignTo?: string;

  @IsOptional()
  @IsString()
  pelengTo?: string;

  @ValidateNested()
  @Type(() => AbonentDto)
  @IsOptional()
  abonentsCircular?: AbonentDto;

  @IsString()
  frequency: string;

  @IsUUID()
  transmissionType: string;

  @IsOptional()
  @IsString()
  additionalInformation: string;
}
