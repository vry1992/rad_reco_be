// src/user/user.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  // async onModuleInit() {
  //   await this.register({
  //     name: '4001',
  //     password: '111111',
  //   });
  // }

  async createUser(dto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = this.userRepository.create({
      ...dto,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByName(name: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { name } });
  }

  async register(dto: CreateUserDto) {
    const existingUser = await this.findByName(dto.name);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const user = await this.createUser(dto);
    const token = this.authService.generateToken(user);
    return { user: { id: user.id, name: user.name }, token };
  }

  async login(dto: CreateUserDto) {
    const user = await this.findByName(dto.name);
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

  async me(userId: string) {
    const user = await this.findById(userId);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    const token = this.authService.generateToken(user);
    return { user: { id: user.id, name: user.name }, token };
  }
}
