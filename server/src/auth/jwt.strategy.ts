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
    });
    this.usersService = usersService;
  }

  public async validate(payload: { sub: string; iat: number; exp: number }) {
    const { sub: id } = payload;
    const user = await this.usersService.retrieveUserById(id);
    if (!user) throw new UnauthorizedException();

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
