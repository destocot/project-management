import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { SignupDto } from 'src/auth/dto/signup.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

  public async retrieveUserById(id: string): Promise<User> {
    return await this.usersRepository.findOneBy({ id });
  }

  public async createUser(signupDto: SignupDto): Promise<User> {
    const { email, password } = signupDto;

    const isEmailTaken = await this.retrieveUserByEmail(email);
    if (isEmailTaken) {
      throw new ConflictException('Email already exists');
    }

    const user = new User({ email });
    user.password = await bcrypt.hash(password, 10);

    return await this.usersRepository.save(user);
  }

  public async updateUser(updateUserDto: UpdateUserDto, userId: string) {
    const user = await this.retrieveUserById(userId);
    const { email, password } = updateUserDto;

    const query = this.usersRepository
      .createQueryBuilder()
      .update()
      .where({ id: user.id });

    if (email) {
      query.set({ email });
    }

    if (password) {
      query.set({ password });
    }

    return query.execute();
  }
}
