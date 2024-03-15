import {
  Param,
  Controller,
  Get,
  Post,
  UseGuards,
  Body,
  Patch,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FeaturesService } from './features.service';
import { ReqUser } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/entities/user.entity';
import { FeatureStatus } from '../entities/feature.entity';

@UseGuards(JwtAuthGuard)
@Controller('projects/:projectId/features')
export class FeaturesController {
  constructor(private readonly featuresService: FeaturesService) {}

  @Post()
  create(
    @Body('description') description: string,
    @Param('projectId', ParseUUIDPipe)
    projectId: string,
  ) {
    return this.featuresService.create(description, projectId);
  }

  @Get()
  findAll(
    @ReqUser() user: User,
    @Param('projectId', ParseUUIDPipe)
    projectId: string,
  ) {
    return this.featuresService.findAll(user.id, projectId);
  }

  @Patch(':featureId')
  update(
    @Param('featureId', ParseUUIDPipe) featureId: string,
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Body('status') newStatus: FeatureStatus,
    @ReqUser() user: User,
  ) {
    return this.featuresService.update(
      projectId,
      featureId,
      newStatus,
      user.id,
    );
  }

  @Delete(':featureId')
  remove(
    @Param('featureId', ParseUUIDPipe) featureId: string,
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @ReqUser() user: User,
  ) {
    return this.featuresService.remove(featureId, projectId, user.id);
  }
}
