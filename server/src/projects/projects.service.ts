import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from 'src/entities/project.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
  ) {}

  async findAll(userId: string): Promise<Project[]> {
    const projects = await this.projectsRepository.find({
      where: { owner_id: userId },
    });
    return projects;
  }

  async findOne(projectId: string, userId: string): Promise<Project> {
    const project = await this.projectsRepository.findOne({
      where: { id: projectId, owner_id: userId },
      withDeleted: true,
    });
    return project;
  }

  async create(
    createProjectDto: CreateProjectDto,
    userId: string,
  ): Promise<Project> {
    const project = new Project(createProjectDto);
    project.owner_id = userId;
    return await this.projectsRepository.save(project);
  }

  async update(id: string, updateProjectDto: UpdateProjectDto, userId: string) {
    const project = await this.projectsRepository.findOne({
      where: { id, owner_id: userId },
    });

    if (!project) throw new NotFoundException();

    Object.assign(project, updateProjectDto);
    return this.projectsRepository.save(project);
  }

  async softDelete(id: string, userId: string) {
    const project = await this.projectsRepository.findOne({
      where: { id, owner_id: userId },
      withDeleted: true,
    });

    if (!project) throw new NotFoundException();

    if (project.deleted_at) {
      return await this.projectsRepository.restore(id);
    }

    return await this.projectsRepository.softDelete(id);
  }

  async remove(id: string, userId: string) {
    const project = await this.projectsRepository.findOne({
      where: { id, owner_id: userId },
    });

    if (!project) throw new NotFoundException();

    return await this.projectsRepository.delete(id);
  }
}
