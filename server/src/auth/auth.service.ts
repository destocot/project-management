import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SigninDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { User } from 'src/entities/user.entity';

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

    const payload = { sub: user.id };
    const access_token = await this.jwtService.signAsync(payload);

    delete user.password;
    return { access_token, user };
  }

  public async signup(signupDto: SignupDto): Promise<Omit<User, 'password'>> {
    const user = await this.usersService.createUser(signupDto);
    delete user.password;
    return user;
  }
}
