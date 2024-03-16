import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SigninDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signin(signinDto: SigninDto, res: Response) {
    const { email, password } = signinDto;

    const user = await this.usersService.retrieveUserByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await this.validatePassword(password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    await this.setAccessToken(res, user.id);

    delete user.password;
    return res.json(user);
  }

  async signup(signupDto: SignupDto, res: Response) {
    const user = await this.usersService.createUser(signupDto);

    await this.setAccessToken(res, user.id);

    delete user.password;
    return res.json(user);
  }

  private async validatePassword(password: string, hashed: string) {
    return await bcrypt.compare(password, hashed);
  }

  private async setAccessToken(res: Response, userId: string) {
    const accessToken = await this.jwtService.signAsync({ sub: userId });

    res.cookie('access_token', accessToken, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
  }
}
