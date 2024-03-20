import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from '../projects.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Project } from '../../entities/project.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { mockProject, mockProjects, mockUser } from './mockData';

describe('ProjectsService', () => {
  let projectsService: ProjectsService;
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

    projectsService = module.get<ProjectsService>(ProjectsService);
    projectsRepository = module.get<Repository<Project>>(
      PROJECTS_REPOSITORY_TOKEN,
    );
  });

  it(' service should be defined', () => {
    expect(projectsService).toBeDefined();
  });

  it('repository should be defined', () => {
    expect(projectsRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('should call find method of projects repository with user id', async () => {
      const { id: userId } = mockUser;

      const findSpy = jest
        .spyOn(projectsRepository, 'find')
        .mockResolvedValue(mockProjects);

      const result = await projectsService.findAll(userId);

      expect(findSpy).toHaveBeenCalledWith({ where: { owner_id: userId } });
      expect(result).toEqual(mockProjects);
    });
  });

  describe('findAllArchived', () => {
    it('should call find method of projects repository with user id and deleted_at not null', async () => {
      const { id: userId } = mockUser;

      const findSpy = jest
        .spyOn(projectsRepository, 'find')
        .mockResolvedValue([]);

      const result = await projectsService.findAllArchived(userId);

      expect(findSpy).toHaveBeenCalledWith({
        where: { owner_id: userId, deleted_at: Not(IsNull()) },
        withDeleted: true,
      });
      expect(result).not.toEqual(mockProjects);
    });
  });

  describe('findOne', () => {
    it('should call findOne method of projects repository with project id and user id', async () => {
      const { id: userId } = mockUser;
      const { id } = mockProject;

      const findOneSpy = jest
        .spyOn(projectsRepository, 'findOne')
        .mockResolvedValue(mockProject);

      const result = await projectsService.findOne(id, userId);

      expect(findOneSpy).toHaveBeenCalledWith({
        where: { id, owner_id: userId },
      });
      expect(result).toEqual(mockProject);
    });

    it('should throw NotFoundException if project not found', async () => {
      const { id: userId } = mockUser;
      const { id } = mockProject;

      jest.spyOn(projectsRepository, 'findOne').mockResolvedValue(undefined);

      await expect(projectsService.findOne(id, userId)).rejects.toThrow();
    });
  });

  describe('create', () => {
    it('should call save method of projects repository with createProjectDto and user id', async () => {
      const { id: userId } = mockUser;

      const saveSpy = jest
        .spyOn(projectsRepository, 'save')
        .mockResolvedValue(mockProject);

      const result = await projectsService.create(mockProject, userId);

      expect(saveSpy).toHaveBeenCalledWith(mockProject);
      expect(result).toEqual(mockProject);
    });
  });

  describe('update', () => {
    it('should call findOne and save method of projects repository with project id and user id', async () => {
      const { id: userId } = mockUser;
      const { id } = mockProject;

      jest.spyOn(projectsRepository, 'findOne').mockResolvedValue(mockProject);
      jest.spyOn(projectsRepository, 'save').mockResolvedValue(mockProject);

      const result = await projectsService.update(id, mockProject, userId);

      expect(result).toEqual(mockProject);
    });

    it('should throw NotFoundException if project not found', async () => {
      const { id: userId } = mockUser;
      const { id } = mockProject;

      jest.spyOn(projectsRepository, 'findOne').mockResolvedValue(undefined);

      await expect(
        projectsService.update(id, mockProject, userId),
      ).rejects.toThrow();
    });
  });

  describe('softDelete', () => {
    it('should call findOne and softDelete method of projects repository with project id and user id', async () => {
      const { id: userId } = mockUser;
      const { id } = mockProject;

      jest.spyOn(projectsRepository, 'findOne').mockResolvedValue(mockProject);
      jest.spyOn(projectsRepository, 'softDelete').mockResolvedValue({
        raw: [],
        generatedMaps: [],
        affected: 1,
      });

      const result = await projectsService.softDelete(id, userId);
      expect(projectsRepository.softDelete).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ raw: [], generatedMaps: [], affected: 1 });
    });

    it('should call findOne and restore method of projects repository with project id and user id', async () => {
      const { id: userId } = mockUser;
      const { id } = mockProject;

      jest
        .spyOn(projectsRepository, 'findOne')
        .mockResolvedValue({ ...mockProject, deleted_at: new Date() });
      jest
        .spyOn(projectsRepository, 'restore')
        .mockResolvedValue({ raw: [], generatedMaps: [], affected: 1 });

      const result = await projectsService.softDelete(id, userId);

      expect(projectsRepository.restore).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ raw: [], generatedMaps: [], affected: 1 });
    });

    it('should throw NotFoundException if project not found', async () => {
      const { id: userId } = mockUser;
      const { id } = mockProject;

      jest.spyOn(projectsRepository, 'findOne').mockResolvedValue(undefined);

      await expect(
        projectsService.update(id, mockProject, userId),
      ).rejects.toThrow();
    });
  });

  describe('remove', () => {
    it('should call findOne and delete method of projects repository with project id and user id', async () => {
      const { id: userId } = mockUser;
      const { id } = mockProject;

      jest.spyOn(projectsRepository, 'findOne').mockResolvedValue(mockProject);
      jest.spyOn(projectsRepository, 'delete').mockResolvedValue({
        raw: [],
        affected: 1,
      });

      const result = await projectsService.remove(id, userId);

      expect(projectsRepository.delete).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ raw: [], affected: 1 });
    });

    it('should throw NotFoundException if project not found', async () => {
      const { id: userId } = mockUser;
      const { id } = mockProject;

      jest.spyOn(projectsRepository, 'findOne').mockResolvedValue(undefined);

      await expect(
        projectsService.update(id, mockProject, userId),
      ).rejects.toThrow();
    });
  });
});
