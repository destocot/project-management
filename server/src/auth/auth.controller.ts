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
    const { accessToken, user } = await this.authService.signin(signinDto);
    this.setAccessToken(res, accessToken);
    return res.json({ data: user });
  }

  @Post('signup')
  public async signup(@Body() signupDto: SignupDto, @Res() res: Response) {
    const { accessToken, user } = await this.authService.signup(signupDto);
    this.setAccessToken(res, accessToken);
    return res.json({ data: user });
  }

  @Post('signout')
  public signout(@Res() res: Response) {
    res.status(200).clearCookie('access_token').end();
  }

  private setAccessToken(res: Response, access_token: string) {
    res.cookie('access_token', access_token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
  }
}
