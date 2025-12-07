import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetLastDetectionsDto {
  @Transform(({ value }) => +value)
  @IsNumber()
  skip: string;

  @Transform(({ value }) => +value)
  @IsNumber()
  limit: string;

  @IsOptional()
  @IsString()
  filter: string;
}
