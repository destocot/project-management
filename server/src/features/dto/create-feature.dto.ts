import { IsString, MinLength } from 'class-validator';

export class CreateFeatureDto {
  @IsString()
  @MinLength(6)
  public description: string;
}
