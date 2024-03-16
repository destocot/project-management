import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Feature } from 'src/entities/feature.entity';
import { Repository } from 'typeorm';
import { UpdateFeatureStatusDto } from './dto/update-feature-status.dto';
import { CreateFeatureDto } from './dto/create-feature.dto';

@Injectable()
export class FeaturesService {
  constructor(
    @InjectRepository(Feature)
    private readonly featuresRepository: Repository<Feature>,
  ) {}

  async findAll(projectId: string, projectOwnerId: string): Promise<Feature[]> {
    const features = await this.featuresRepository.find({
      where: {
        project: { id: projectId, owner_id: projectOwnerId },
      },
      select: { tasks: { is_completed: true } },
      relations: ['tasks'],
    });

    return features;
  }

  async create(
    projectId: string,
    createFeatureDto: CreateFeatureDto,
  ): Promise<Feature> {
    const { description } = createFeatureDto;

    const feature = new Feature({ description });
    feature.project_id = projectId;

    return await this.featuresRepository.save(feature);
  }

  async update(
    projectId: string,
    id: string,
    updateFeatureStatusDto: UpdateFeatureStatusDto,
    projectOwnerId: string,
  ) {
    const { status } = updateFeatureStatusDto;

    return await this.featuresRepository.update(
      {
        id,
        project: {
          id: projectId,
          owner_id: projectOwnerId,
        },
      },
      { status },
    );
  }

  async remove(projectId: string, id: string, projectOwnerId: string) {
    return await this.featuresRepository.delete({
      id,
      project: {
        id: projectId,
        owner_id: projectOwnerId,
      },
    });
  }
}
