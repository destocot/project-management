import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Feature, FeatureStatus } from 'src/entities/feature.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FeaturesService {
  constructor(
    @InjectRepository(Feature)
    private readonly featuresRepository: Repository<Feature>,
  ) {}

  async findAll(userId: string, projectId: string): Promise<Feature[]> {
    const features = await this.featuresRepository.find({
      where: {
        project_id: projectId,
        project: { owner_id: userId },
      },
      select: { tasks: { is_completed: true } },
      relations: ['tasks'],
    });

    return features;
  }

  async create(description: string, projectId: string): Promise<Feature> {
    const feature = new Feature({ description });
    feature.project_id = projectId;

    return await this.featuresRepository.save(feature);
  }

  async update(
    projectId: string,
    featureId: string,
    status: FeatureStatus,
    projectOwnerId: string,
  ) {
    const feature = await this.featuresRepository.findOne({
      where: {
        id: featureId,
        project_id: projectId,
        project: { owner_id: projectOwnerId },
      },
    });

    if (!feature) throw new NotFoundException();

    Object.assign(feature, { status });
    return await this.featuresRepository.save(feature);
  }

  async remove(featureId: string, projectId: string, projectOwnerId: string) {
    const project = await this.featuresRepository.findOne({
      where: {
        id: featureId,
        project_id: projectId,
        project: { owner_id: projectOwnerId },
      },
    });

    if (!project) throw new NotFoundException();

    return await this.featuresRepository.delete(featureId);
  }
}
