import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ReqUser } from 'src/decorators/user.decorator';
import { User } from 'src/entities/user.entity';
import { Project } from 'src/entities/project.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('projects')
@UseGuards(JwtAuthGuard)
@Controller()
export class ProjectsController {
  private readonly logger: Logger;

  constructor(private readonly projectsService: ProjectsService) {
    this.logger = new Logger('ProjectsController', {
      timestamp: true,
    });
  }

  @Get()
  findAll(@ReqUser() user: User): Promise<Project[]> {
    this.logger.log('GET /api/projects');
    return this.projectsService.findAll(user.id);
  }

  @Get('archived')
  findAllArchived(@ReqUser() user: User): Promise<Project[]> {
    this.logger.log('GET /api/projects/archived');
    return this.projectsService.findAllArchived(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @ReqUser() user: User): Promise<Project> {
    this.logger.log(`GET /api/projects/${id}`);
    return this.projectsService.findOne(id, user.id);
  }

  @Post()
  create(
    @Body() createProjectDto: CreateProjectDto,
    @ReqUser() user: User,
  ): Promise<Project> {
    this.logger.log('POST /api/projects');
    return this.projectsService.create(createProjectDto, user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @ReqUser() user: User,
  ) {
    this.logger.log(`PATCH /api/projects/${id}`);
    return this.projectsService.update(id, updateProjectDto, user.id);
  }

  @Patch(':id/soft-delete')
  softDelete(@Param('id') id: string, @ReqUser() user: User) {
    this.logger.log(`PATCH /api/projects/${id}/soft-delete`);
    return this.projectsService.softDelete(id, user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @ReqUser() user: User) {
    this.logger.log(`DELETE /api/projects/${id}`);
    return this.projectsService.remove(id, user.id);
  }
}
