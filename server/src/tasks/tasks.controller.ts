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

import { ReqUser } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/entities/user.entity';
import { TasksService } from './tasks.service';

@UseGuards(JwtAuthGuard)
@Controller('projects/:projectId/features/:featureId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(
    @Param('featureId', ParseUUIDPipe)
    featureId: string,
    @Body('content') content: string,
  ) {
    return this.tasksService.create(featureId, content);
  }

  @Get()
  findAll(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Param('featureId', ParseUUIDPipe)
    featureId: string,
    @ReqUser() user: User,
  ) {
    return this.tasksService.findAll(projectId, featureId, user.id);
  }

  @Patch(':taskId')
  update(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Param('featureId', ParseUUIDPipe)
    featureId: string,
    @Param('taskId', ParseUUIDPipe)
    taskId: string,
    @ReqUser() user: User,
  ) {
    return this.tasksService.update(projectId, featureId, taskId, user.id);
  }

  @Delete(':taskId')
  remove(
    @Param('featureId', ParseUUIDPipe) featureId: string,
    @Param('projectId', ParseUUIDPipe) projectId: string,

    @Param('taskId', ParseUUIDPipe)
    taskId: string,
    @ReqUser() user: User,
  ) {
    console.log(featureId, projectId, taskId, user);
    return this.tasksService.remove(projectId, featureId, taskId, user.id);
  }
}
