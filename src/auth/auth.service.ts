// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateToken(user: User) {
    return this.jwtService.sign({
      sub: user.id,
      name: user.name,
    });
  }
}
