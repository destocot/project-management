import {
  Body,
  Controller,
  Get,
  Patch,
  Req,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';
import { ReqUser } from 'src/decorators/user.decorator';
import { User } from 'src/entities/user.entity';

@UseGuards(JwtAuthGuard)
@Controller('users/account')
export class UsersController {
  private readonly usersService: UsersService;

  constructor(usersService: UsersService) {
    this.usersService = usersService;
  }

  @Patch('/edit')
  public updateAccount(
    @Body() updateUserDto: UpdateUserDto,
    @ReqUser() user: User,
  ) {
    return this.usersService.updateUser(updateUserDto, user.id);
  }

  @Get('/')
  public retrieveAccount(@Req() req: Request) {
    return req.user;
  }

  @Delete('/delete')
  public deleteAccount(@ReqUser() user: User) {
    return this.usersService.deleteUser(user.id);
  }
}
