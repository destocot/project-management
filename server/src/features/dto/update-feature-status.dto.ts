import { IsEnum } from 'class-validator';
import { FeatureStatus } from 'src/entities/feature.entity';

export class UpdateFeatureStatusDto {
  @IsEnum(FeatureStatus)
  public status: FeatureStatus;
}
