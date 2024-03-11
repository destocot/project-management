import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
import { JWT_SECRET } from './auth.module';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly usersService: UsersService;

  constructor(usersService: UsersService) {
    super({
      secretOrKey: JWT_SECRET,
      jwtFromRequest: JwtStrategy.extractJwtFromCookie,
    });
    this.usersService = usersService;
  }

  public async validate(payload: { sub: string; iat: number; exp: number }) {
    const { sub: id } = payload;
    const user = await this.usersService.retrieveUserById(id);

    if (!user) throw new UnauthorizedException();

    return user;
  }

  private static extractJwtFromCookie(req: Request) {
    if (req.cookies?.access_token) {
      return req.cookies.access_token;
    }
    return null;
  }
}
