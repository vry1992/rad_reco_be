import { IsOptional, IsUUID } from 'class-validator';

export class ChangeShipsNestingDto {
  @IsUUID()
  @IsOptional()
  targetId: string;

  @IsUUID()
  sourceId: string;
}
