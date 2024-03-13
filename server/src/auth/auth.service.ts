import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SigninDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  private readonly usersService: UsersService;
  private readonly jwtService: JwtService;

  constructor(usersService: UsersService, jwtService: JwtService) {
    this.usersService = usersService;
    this.jwtService = jwtService;
  }

  public async signin(signinDto: SigninDto) {
    const { email, password } = signinDto;

    const user = await this.usersService.retrieveUserByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const accessToken = await this.generateAccessToken(user.id);

    delete user.password;
    return { accessToken, user };
  }

  public async signup(signupDto: SignupDto) {
    const user = await this.usersService.createUser(signupDto);

    const accessToken = await this.generateAccessToken(user.id);

    delete user.password;
    return { accessToken, user };
  }

  private async generateAccessToken(userId: string) {
    return await this.jwtService.signAsync({ sub: userId });
  }
}
