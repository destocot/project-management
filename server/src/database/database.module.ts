import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.getOrThrow('DATABASE_URL'),
        // host: configService.getOrThrow('DB_HOST'),
        // port: configService.getOrThrow('DB_PORT'),
        // username: configService.getOrThrow('DB_USERNAME'),
        // password: configService.getOrThrow('DB_PASSWORD'),
        // database: configService.getOrThrow('DB_NAME'),
        autoLoadEntities: true,
        synchronize: configService.get('DB_SYNCHRONIZE') ?? false,
      }),
    }),
  ],
})
export class DatabaseModule {}
