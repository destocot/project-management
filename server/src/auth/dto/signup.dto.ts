import { IsNotEmpty } from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  public readonly email: string;

  @IsNotEmpty()
  public readonly username: string;

  @IsNotEmpty()
  public readonly password: string;
}
