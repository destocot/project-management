import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feature } from 'src/entities/feature.entity';
import { FeaturesService } from './features.service';
import { FeaturesController } from './features.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Feature])],
  providers: [FeaturesService],
  controllers: [FeaturesController],
})
export class FeaturesModule {}
