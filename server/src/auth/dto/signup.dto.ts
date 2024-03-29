import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignupDto {
  @IsNotEmpty({ message: 'Email is required.' })
  @IsString({ message: 'Email must be a valid format.' })
  @IsEmail({}, { message: 'Email must be a valid format.' })
  email: string;

  @IsNotEmpty({ message: 'Password is required.' })
  @IsString({ message: 'Password must be a string.' })
  @MinLength(6, { message: 'Password must be at least 6 characters.' })
  password: string;
}
