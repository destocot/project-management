import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from '../projects.controller';
import { ProjectsService } from '../projects.service';
import { User } from '../../entities/user.entity';
import { Project } from '../../entities/project.entity';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { getRepositoryToken } from '@nestjs/typeorm';

// Mocks
class MockProjectRepository {}

const mockUserID: User['id'] = '20d0678c-e8a0-4c9a-a863-b866cb7128e4';
const mockUser = {
  id: mockUserID,
  email: 'mock@email.com',
  created_at: new Date(),
} as User;

const mockProjectID = '681d179b-cc8b-45ff-8294-3e44730037c9';
const mockProjectTitle = 'Lorem ipsum dolor sit amet';
const mockProjects = [
  {
    id: mockProjectID,
    title: mockProjectTitle,
    deleted_at: null,
    owner_id: mockUserID,
  },
] as Array<Project>;
const mockProject = mockProjects[0];

const mockCreateProjectDto: CreateProjectDto = {
  title: mockProjectTitle,
};
const mockUpdateProjectDto: UpdateProjectDto = {
  title: mockProjectTitle,
};

describe('ProjectsController', () => {
  let projectsController: ProjectsController;
  let projectsService: ProjectsService;

  const PROJECTS_REPOSITORY_TOKEN = getRepositoryToken(Project);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [
        ProjectsService,
        {
          provide: PROJECTS_REPOSITORY_TOKEN,
          useClass: MockProjectRepository,
        },
      ],
    }).compile();

    projectsController = module.get<ProjectsController>(ProjectsController);
    projectsService = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(projectsController).toBeDefined();
  });

  it('should call findAll method of projects service with user id', async () => {
    const { id: userId } = mockUser;

    const findAllSpy = jest
      .spyOn(projectsService, 'findAll')
      .mockResolvedValue(mockProjects);

    await projectsController.findAll(mockUser);
    expect(findAllSpy).toHaveBeenCalledWith(userId);
  });

  it('should call findAllArchived method of projects service with user id', async () => {
    const { id: userId } = mockUser;

    const findAllArchivedSpy = jest
      .spyOn(projectsService, 'findAllArchived')
      .mockResolvedValue([]);

    await projectsController.findAllArchived(mockUser);
    expect(findAllArchivedSpy).toHaveBeenCalledWith(userId);
  });

  it('should call findOne method of projects service with project id and user id', async () => {
    const { id: userId } = mockUser;
    const { id } = mockProjects[0];

    const findOneSpy = jest
      .spyOn(projectsService, 'findOne')
      .mockResolvedValue(mockProject);

    await projectsController.findOne(id, mockUser);
    expect(findOneSpy).toHaveBeenCalledWith(id, userId);
  });

  it('should call create method of projects service with createProjectDto and user id', async () => {
    const { id: userId } = mockUser;

    const createSpy = jest
      .spyOn(projectsService, 'create')
      .mockResolvedValue(mockProject);

    await projectsController.create(mockCreateProjectDto, mockUser);
    expect(createSpy).toHaveBeenCalledWith(mockCreateProjectDto, userId);
  });

  it('should call update method of projects service with updateProjectDto and user id', async () => {
    const { id: userId } = mockUser;
    const { id } = mockProjects[0];

    const updateSpy = jest
      .spyOn(projectsService, 'update')
      .mockResolvedValue(mockProject);

    await projectsController.update(id, mockUpdateProjectDto, mockUser);
    expect(updateSpy).toHaveBeenCalledWith(id, mockUpdateProjectDto, userId);
  });

  it('should call softDelete method of projects service with project id and user id', async () => {
    const { id: userId } = mockUser;
    const { id } = mockProjects[0];

    const softDeleteSpy = jest
      .spyOn(projectsService, 'softDelete')
      .mockResolvedValue({ generatedMaps: [], raw: [], affected: 1 });

    await projectsController.softDelete(id, mockUser);
    expect(softDeleteSpy).toHaveBeenCalledWith(id, userId);
  });

  it('should call remove method of projects service with project id and user id', async () => {
    const { id: userId } = mockUser;
    const { id } = mockProjects[0];

    const removeSpy = jest
      .spyOn(projectsService, 'remove')
      .mockResolvedValue({ raw: [], affected: 1 });

    await projectsController.remove(id, mockUser);
    expect(removeSpy).toHaveBeenCalledWith(id, userId);
  });
});
