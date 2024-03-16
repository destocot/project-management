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
  Logger,
} from '@nestjs/common';
import { FeaturesService } from './features.service';
import { ReqUser } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/entities/user.entity';
import { UpdateFeatureStatusDto } from './dto/update-feature-status.dto';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('features')
@UseGuards(JwtAuthGuard)
@Controller()
export class FeaturesController {
  private readonly logger: Logger;

  constructor(private readonly featuresService: FeaturesService) {
    this.logger = new Logger('FeaturesController', {
      timestamp: true,
    });
  }

  @Get()
  findAll(
    @Param('projectId', ParseUUIDPipe)
    projectId: string,
    @ReqUser() user: User,
  ) {
    this.logger.log(`GET /api/projects/${projectId}/features`);
    return this.featuresService.findAll(projectId, user.id);
  }

  @Post()
  create(
    @Param('projectId', ParseUUIDPipe)
    projectId: string,
    @Body() createFeatureDto: CreateFeatureDto,
  ) {
    this.logger.log(`POST /api/projects/${projectId}/features`);
    return this.featuresService.create(projectId, createFeatureDto);
  }

  @Patch(':id')
  update(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateFeatureStatusDto: UpdateFeatureStatusDto,
    @ReqUser() user: User,
  ) {
    this.logger.log(`PATCH /api/projects/${projectId}/features/${id}`);
    return this.featuresService.update(
      projectId,
      id,
      updateFeatureStatusDto,
      user.id,
    );
  }

  @Delete(':id')
  remove(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @ReqUser() user: User,
  ) {
    this.logger.log(`DELETE /api/projects/${projectId}/features/${id}`);
    return this.featuresService.remove(projectId, id, user.id);
  }
}
