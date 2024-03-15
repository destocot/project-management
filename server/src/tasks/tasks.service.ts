import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
  ) {}

  async findAll(
    projectId: string,
    featureId: string,
    projectOwnerId: string,
  ): Promise<Task[]> {
    const tasks = await this.tasksRepository.find({
      where: {
        feature_id: featureId,
        feature: {
          project_id: projectId,
          project: { owner_id: projectOwnerId },
        },
      },
      order: { is_completed: 'ASC' },
    });

    return tasks;
  }

  async create(featureId: string, content: string): Promise<Task> {
    const task = new Task({ content });
    task.feature_id = featureId;
    return await this.tasksRepository.save(task);
  }

  async update(
    projectId: string,
    featureId: string,
    taskId: string,
    projectOwnerId: string,
  ) {
    const task = await this.tasksRepository.findOne({
      where: {
        id: taskId,
        feature_id: featureId,
        feature: {
          project_id: projectId,
          project: {
            owner_id: projectOwnerId,
          },
        },
      },
    });

    if (!task) throw new NotFoundException();

    Object.assign(task, { is_completed: !task.is_completed });
    return await this.tasksRepository.save(task);
  }

  async remove(
    projectId: string,
    featureId: string,
    taskId: string,
    projectOwnerId: string,
  ) {
    const task = await this.tasksRepository.findOne({
      where: {
        id: taskId,
        feature_id: featureId,
        feature: {
          project_id: projectId,
          project: { owner_id: projectOwnerId },
        },
      },
    });

    if (!task) throw new NotFoundException();

    return await this.tasksRepository.delete(task.id);
  }
}
