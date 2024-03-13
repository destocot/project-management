import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ReqUser } from 'src/decorators/user.decorator';
import { User } from 'src/entities/user.entity';

@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectsController {
  private readonly projectsService: ProjectsService;

  constructor(projectsService: ProjectsService) {
    this.projectsService = projectsService;
  }

  @Post()
  public createProject(
    @Body() createProjectDto: CreateProjectDto,
    @ReqUser() user: User,
  ) {
    return this.projectsService.createProject(createProjectDto, user.id);
  }

  @Get()
  public retrieveAllProjects(@ReqUser() user: User) {
    return this.projectsService.retrieveAllProjects(user.id);
  }

  @Get(':id')
  public retrieveOneProject(@Param('id') id: string, @ReqUser() user: User) {
    return this.projectsService.retrieveOneProject(id, user.id);
  }

  @Patch(':id')
  public updateOneProject(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @ReqUser() user: User,
  ) {
    return this.projectsService.updateOneProject(id, updateProjectDto, user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @ReqUser() user: User) {
    return this.projectsService.softDeleteProject(id, user.id);
  }
}
