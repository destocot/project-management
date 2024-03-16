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

import { ReqUser } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/entities/user.entity';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './create-task.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tasks')
@UseGuards(JwtAuthGuard)
@Controller()
export class TasksController {
  private readonly logger: Logger;

  constructor(private readonly tasksService: TasksService) {
    this.logger = new Logger('TasksController', {
      timestamp: true,
    });
  }

  @Get()
  findAll(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Param('featureId', ParseUUIDPipe) featureId: string,
    @ReqUser() user: User,
  ) {
    this.logger.log(
      `GET /api/projects/${projectId}/features/${featureId}/tasks`,
    );

    return this.tasksService.findAll(projectId, featureId, user.id);
  }

  @Post()
  create(
    @Param('featureId', ParseUUIDPipe) featureId: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    this.logger.log(
      `POST /api/projects/:projectId/features/${featureId}/tasks`,
    );
    return this.tasksService.create(featureId, createTaskDto);
  }

  @Patch(':id')
  update(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Param('featureId', ParseUUIDPipe) featureId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @ReqUser() user: User,
  ) {
    this.logger.log(
      `PATCH /api/projects/${projectId}/features/${featureId}/tasks/${id}`,
    );
    return this.tasksService.update(projectId, featureId, id, user.id);
  }

  @Delete(':id')
  remove(
    @Param('featureId', ParseUUIDPipe) featureId: string,
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @ReqUser() user: User,
  ) {
    this.logger.log(
      `DELETE /api/projects/${projectId}/features/${featureId}/tasks/${id}`,
    );
    return this.tasksService.remove(projectId, featureId, id, user.id);
  }
}
