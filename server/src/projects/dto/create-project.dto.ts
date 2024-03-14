import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Project title must be at least 6 characters' })
  public readonly title: string;
}
