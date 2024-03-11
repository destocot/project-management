import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  private readonly authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  @Post('signin')
  public async signin(@Body() signinDto: SigninDto, @Res() res: Response) {
    const { access_token, user } = await this.authService.signin(signinDto);
    res.cookie('access_token', access_token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
    return res.json({ data: user });
  }

  @Post('signup')
  public signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }
}
