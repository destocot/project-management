import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from './projects.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Project } from '../entities/project.entity';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

const mockUser: User = {
  id: '20d0678c-e8a0-4c9a-a863-b866cb7128e4',
  email: 'mock@email.com',
  created_at: new Date(),
  password: 'mockword',
  projects: [],
};

describe('ProjectsService', () => {
  let service: ProjectsService;
  let projectsRepository: Repository<Project>;

  const PROJECTS_REPOSITORY_TOKEN = getRepositoryToken(Project);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        {
          provide: PROJECTS_REPOSITORY_TOKEN,
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            restore: jest.fn(),
            softDelete: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
    projectsRepository = module.get<Repository<Project>>(
      PROJECTS_REPOSITORY_TOKEN,
    );
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('projectsRepository should be defined', () => {
    expect(projectsRepository).toBeDefined();
  });

  it('should call service.findAll() and return the result', async () => {
    const mockProjects = [
      {
        id: '1',
        title: 'Project 1',
        owner_id: mockUser.id,
        deleted_at: new Date(),
        owner: mockUser,
        features: [],
      },
    ];

    jest.spyOn(projectsRepository, 'find').mockResolvedValue(mockProjects);

    const result = await service.findAll(mockUser.id);
    expect(result).toEqual(mockProjects);
  });
});
