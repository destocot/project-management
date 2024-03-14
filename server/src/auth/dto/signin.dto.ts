import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator';
import { SignupDto } from './signup.dto';

export class SigninDto extends SignupDto {
  @IsNotEmpty({ message: 'Invalid email or password.' })
  @IsString({ message: 'Invalid email or password.' })
  @IsEmail({}, { message: 'Invalid email or password.' })
  email: string;

  @IsNotEmpty({ message: 'Invalid email or password.' })
  @IsString({ message: 'Invalid email or password.' })
  @MinLength(6, { message: 'Invalid email or password.' })
  password: string;
}
