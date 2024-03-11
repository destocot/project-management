import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { SignupDto } from 'src/auth/dto/signup.dto';

@Injectable()
export class UsersService {
  private readonly usersRepository: Repository<User>;

  constructor(
    @InjectRepository(User)
    usersRepository: Repository<User>,
  ) {
    this.usersRepository = usersRepository;
  }

  public async retrieveUserByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOneBy({ email });
  }

  public async retrieveUserByUsername(username: string): Promise<User> {
    return await this.usersRepository.findOneBy({ username });
  }

  public async retrieveUserById(id: string): Promise<User> {
    return await this.usersRepository.findOneBy({ id });
  }

  public async createUser(signupDto: SignupDto): Promise<User> {
    const { email, username, password } = signupDto;

    const isEmailTaken = await this.retrieveUserByEmail(email);
    const isUsernameTaken = await this.retrieveUserByUsername(username);
    if (isEmailTaken || isUsernameTaken) {
      throw new ConflictException('Email or username already exists');
    }

    const user = new User();
    user.email = email;
    user.username = username;
    user.password = await bcrypt.hash(password, 10);

    return await this.usersRepository.save(user);
  }
}
