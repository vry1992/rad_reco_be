import { IsUUID } from 'class-validator';

export class GetScreenDto {
  @IsUUID()
  networkId: string;

  @IsUUID()
  detectionId: string;
}
