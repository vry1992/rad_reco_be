// src/user/user.controller.ts
import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  // Реєстрація користувача
  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    const existingUser = await this.userService.findByName(dto.name);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const user = await this.userService.createUser(dto);
    const token = this.authService.generateToken(user);
    return { user: { id: user.id, name: user.name }, token };
  }

  // Логін користувача
  @Post('login')
  async login(@Body() dto: CreateUserDto) {
    const user = await this.userService.findByName(dto.name);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    const token = this.authService.generateToken(user);
    return { user: { id: user.id, name: user.name }, token };
  }
}
