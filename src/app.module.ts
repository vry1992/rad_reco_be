// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import { NetworkTemplate } from './network/entities/network-template.entity';
import { Network } from './network/entities/network.entity';
import { NetworkModule } from './network/network.module';
import { Ship } from './ship/ship.entity';
import { ShipModule } from './ship/ship.module';
import { Unit } from './unit/unit.entity';
import { UnitModule } from './unit/unit.module';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: `.env`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          entities: [User, Unit, Ship, Network, NetworkTemplate],
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: +configService.get<number>('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          autoLoadEntities: true,
          synchronize: false, // Важливо для продакшн! Міграції потрібні
          migrations: ['dist/migrations/*.js'],
          migrationsRun: true, // Автоматичне виконання міграцій при старті
        };
      },
    }),
    UserModule,
    AuthModule,
    UnitModule,
    ShipModule,
    NetworkModule,
  ],
  controllers: [AuthController],
})
export class AppModule {}
