import {
  ConflictException,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from 'src/auth/dto/signup.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async retrieveUserByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOneBy({ email });
  }

  async retrieveUserById(id: string): Promise<User> {
    return await this.usersRepository.findOneBy({ id });
  }

  async createUser(signupDto: SignupDto): Promise<User> {
    const { email, password } = signupDto;

    const isEmailTaken = await this.retrieveUserByEmail(email);
    if (isEmailTaken) throw new ConflictException('Email already exists');

    const user = new User({ email });
    user.password = await bcrypt.hash(password, 10);

    return await this.usersRepository.save(user);
  }

  async updateUser(updateUserDto: UpdateUserDto, id: string) {
    const { email, currentPassword, password } = updateUserDto;

    if (email) {
      return await this.usersRepository.update({ id }, { email });
    }

    if (password) {
      const user = await this.retrieveUserById(id);
      const valid = await bcrypt.compare(currentPassword, user.password);
      if (!valid) throw new BadRequestException('Invalid password');

      const hashed = await bcrypt.hash(password, 10);
      return await this.usersRepository.update({ id }, { password: hashed });
    }
  }

  async deleteUser(id: string) {
    return this.usersRepository.delete({ id });
  }
}
