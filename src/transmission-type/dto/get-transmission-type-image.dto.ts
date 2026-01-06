import { IsUUID } from 'class-validator';

export class GetTransmissionTypeImageDto {
  @IsUUID()
  id: string;
}
