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
import { Project } from 'src/entities/project.entity';

@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(
    @Body() createProjectDto: CreateProjectDto,
    @ReqUser() user: User,
  ): Promise<Project> {
    return this.projectsService.create(createProjectDto, user.id);
  }

  @Get()
  findAll(@ReqUser() user: User): Promise<Project[]> {
    return this.projectsService.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @ReqUser() user: User): Promise<Project> {
    return this.projectsService.findOne(id, user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @ReqUser() user: User,
  ) {
    return this.projectsService.update(id, updateProjectDto, user.id);
  }

  @Patch(':id/soft-delete')
  softDelete(@Param('id') id: string, @ReqUser() user: User) {
    return this.projectsService.softDelete(id, user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @ReqUser() user: User) {
    return this.projectsService.remove(id, user.id);
  }
}
