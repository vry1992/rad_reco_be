// src/user/dto/create-user.dto.ts
import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  @MinLength(6)
  password: string;
}
