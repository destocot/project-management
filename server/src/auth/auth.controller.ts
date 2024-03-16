import { Body, Controller, HttpCode, Logger, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller()
export class AuthController {
  private readonly logger: Logger;

  constructor(private readonly authService: AuthService) {
    this.logger = new Logger('AuthController', { timestamp: true });
  }

  @Post('signin')
  @HttpCode(200)
  signin(@Body() signinDto: SigninDto, @Res() res: Response) {
    this.logger.log('POST /api/auth/signin');
    return this.authService.signin(signinDto, res);
  }

  @Post('signup')
  signup(@Body() signupDto: SignupDto, @Res() res: Response) {
    this.logger.log('POST /api/auth/signup');
    return this.authService.signup(signupDto, res);
  }

  @Post('signout')
  @HttpCode(200)
  signout(@Res() res: Response) {
    this.logger.log('POST /api/auth/signout');
    res.clearCookie('access_token').end();
  }
}
