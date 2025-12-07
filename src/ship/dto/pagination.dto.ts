import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginationDto {
  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  skip: number;

  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  take: number;
}
