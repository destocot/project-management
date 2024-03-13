import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from 'src/entities/project.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProjectsService {
  private readonly projectsRepository: Repository<Project>;

  constructor(
    @InjectRepository(Project)
    projectsRepository: Repository<Project>,
  ) {
    this.projectsRepository = projectsRepository;
  }

  public async createProject(
    createProjectDto: CreateProjectDto,
    userId: string,
  ) {
    const project = new Project(createProjectDto);
    project.owner_id = userId;
    return await this.projectsRepository.save(project);
  }

  public async retrieveAllProjects(userId: string) {
    const projects = await this.projectsRepository.find({
      where: { owner: { id: userId } },
    });
    return projects;
  }

  public async retrieveOneProject(
    projectId: string,
    userId: string,
  ): Promise<Project> {
    const project = await this.projectsRepository.findOne({
      where: {
        id: projectId,
        owner_id: userId,
      },
      withDeleted: true,
    });
    if (!project) {
      throw new NotFoundException(`Project with id ${projectId} not found`);
    }
    return project;
  }

  public async updateOneProject(
    projectId: string,
    updateProjectDto: UpdateProjectDto,
    userId: string,
  ) {
    const project = await this.retrieveOneProject(projectId, userId);
    const updatedProject = await this.projectsRepository.update(
      project.id,
      updateProjectDto,
    );
    return updatedProject;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }

  public async softDeleteProject(projectId: string, userId: string) {
    await this.projectsRepository
      .createQueryBuilder()
      .softDelete()
      .where('id = :projectId AND owner_id = :userId', { projectId, userId })
      .execute();
  }
}
