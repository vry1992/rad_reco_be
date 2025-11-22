import { IsOptional, IsUUID } from 'class-validator';

export class ChangeNestingDto {
  @IsUUID()
  @IsOptional()
  targetId: string;

  @IsUUID()
  sourceId: string;
}
