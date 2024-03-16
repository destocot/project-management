import {
  Body,
  Controller,
  Get,
  Patch,
  Req,
  UseGuards,
  Delete,
  Logger,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';
import { ReqUser } from 'src/decorators/user.decorator';
import { User } from 'src/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@UseGuards(JwtAuthGuard)
@Controller()
export class UsersController {
  private readonly logger: Logger;

  constructor(private readonly usersService: UsersService) {
    this.logger = new Logger('UsersController', { timestamp: true });
  }

  @Get()
  retrieveAccount(@Req() req: Request) {
    this.logger.log('GET /api/users');
    return req.user;
  }

  @Patch()
  updateAccount(@Body() updateUserDto: UpdateUserDto, @ReqUser() user: User) {
    this.logger.log('PATCH /api/users');
    return this.usersService.updateUser(updateUserDto, user.id);
  }

  @Delete()
  deleteAccount(@ReqUser() user: User) {
    this.logger.log(`DELETE /api/users`);
    return this.usersService.deleteUser(user.id);
  }
}
