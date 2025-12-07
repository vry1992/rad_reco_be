// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AircraftModule } from './aircraft/aircraft.module';
import { AircraftTypes } from './aircraft/entities/aircraft-types.entity';
import { Aircraft } from './aircraft/entities/aircraft.entity';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import { DetectionModule } from './detection/detection.module';
import { Abonent } from './detection/entities/abonent.entity';
import { Detection } from './detection/entities/detection.entity';
import { FilesModule } from './files/files.module';
import { NetworkTemplate } from './network/entities/network-template.entity';
import { Network } from './network/entities/network.entity';
import { NetworkModule } from './network/network.module';
import { ShipTypes } from './ship/entities/ship-types.entity';
import { Ship } from './ship/entities/ship.entity';
import { ShipModule } from './ship/ship.module';
import { TransmissionType } from './transmission-type/entities/transmission-type.entity';
import { TransmissionTypeModule } from './transmission-type/transmission-type.module';
import { Unit } from './unit/entities/unit.entity';
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
          entities: [
            User,
            Unit,
            Ship,
            ShipTypes,
            Network,
            NetworkTemplate,
            Detection,
            Abonent,
            TransmissionType,
            Aircraft,
            AircraftTypes,
          ],
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: +configService.get<number>('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          autoLoadEntities: true,
          synchronize: true, // Важливо для продакшн! Міграції потрібні
          migrations: ['dist/migrations/*.js'],
          // migrationsRun: true, // Автоматичне виконання міграцій при старті
        };
      },
    }),
    UserModule,
    AuthModule,
    UnitModule,
    ShipModule,
    NetworkModule,
    DetectionModule,
    AircraftModule,
    FilesModule,
    TransmissionTypeModule,
  ],
  controllers: [AuthController],
})
export class AppModule {}
