import { Project } from '../../entities/project.entity';
import { User } from '../../entities/user.entity';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';

export const mockUserID: User['id'] = '20d0678c-e8a0-4c9a-a863-b866cb7128e4';
export const mockUser = {
  id: mockUserID,
  email: 'mock@email.com',
  created_at: new Date(),
} as User;

export const mockProjectID = '681d179b-cc8b-45ff-8294-3e44730037c9';

export const mockProjectTitle = 'Lorem ipsum dolor sit amet';

export const mockProjects = [
  {
    id: mockProjectID,
    title: mockProjectTitle,
    deleted_at: null,
    owner_id: mockUserID,
  },
] as Array<Project>;

export const mockProject = mockProjects[0];

export const mockCreateProjectDto: CreateProjectDto = {
  title: mockProjectTitle,
};
export const mockUpdateProjectDto: UpdateProjectDto = {
  title: mockProjectTitle,
};
