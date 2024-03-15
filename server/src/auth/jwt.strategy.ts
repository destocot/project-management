import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly usersService: UsersService;

  constructor(usersService: UsersService, configService: ConfigService) {
    super({
      secretOrKey: configService.getOrThrow('JWT_SECRET'),
      jwtFromRequest: JwtStrategy.extractJwtFromCookie,
      passReqToCallback: true,
    });
    this.usersService = usersService;
  }

  public async validate(
    req: Request,
    payload: { sub: string; iat: number; exp: number },
  ) {
    const { sub: id } = payload;
    const user = await this.usersService.retrieveUserById(id);

    if (!user) {
      req.res.clearCookie('access_token');
      throw new UnauthorizedException();
    }
    delete user.password;
    return user;
  }

  private static extractJwtFromCookie(req: Request) {
    if (req.cookies?.access_token) {
      return req.cookies.access_token;
    }
    return null;
  }
}
