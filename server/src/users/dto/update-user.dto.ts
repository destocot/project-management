import { IsString, IsEmail, IsOptional, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'Email must be a valid format.' })
  @IsEmail({}, { message: 'Email must be a valid format.' })
  email: string;

  @IsOptional()
  @IsString({ message: 'Password must be a string.' })
  @MinLength(6, { message: 'Password must be at least 6 characters.' })
  password: string;
}
