import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class GetLastDetectionsDto {
  @Transform(({ value }) => +value)
  @IsNumber()
  skip: string;

  @Transform(({ value }) => +value)
  @IsNumber()
  limit: string;
}
