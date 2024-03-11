import { IsNotEmpty } from 'class-validator';

export class SigninDto {
  @IsNotEmpty()
  public readonly email: string;

  @IsNotEmpty()
  public readonly password: string;
}
