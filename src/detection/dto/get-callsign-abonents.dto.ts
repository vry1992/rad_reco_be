import { IsString } from 'class-validator';

export class GetCallsignAbonentsDto {
  @IsString()
  callsign: string;
}
