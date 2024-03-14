import {
  ConflictException,
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from 'src/auth/dto/signup.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

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

    const { email, currentPassword, password } = updateUserDto;

    if (!email && !password) return null;

    const query = this.usersRepository
      .createQueryBuilder()
      .update()
      .where({ id: user.id });

    if (email) {
      query.set({ email });
    }

    if (password) {
      const valid = await bcrypt.compare(currentPassword, user.password);
      if (!valid) {
        throw new BadRequestException('Invalid password');
      }
      const hashed = await bcrypt.hash(password, 10);
      query.set({ password: hashed });
    }

    return query.execute();
  }

  public async deleteUser(userId: string) {
    const user = await this.retrieveUserById(userId);

    if (!user) {
      throw new NotFoundException();
    }

    return this.usersRepository.delete({ id: user.id });
  }
}
