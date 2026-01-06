import { IsUUID } from 'class-validator';

export class GetOneTransmissionType {
  @IsUUID()
  id: string;
}
