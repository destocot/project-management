import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';
import { ReqUser } from 'src/decorators/user.decorator';
import { User } from 'src/entities/user.entity';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  private readonly usersService: UsersService;

  constructor(usersService: UsersService) {
    this.usersService = usersService;
  }

  @Patch('account/edit')
  public updateAccount(
    @Body() updateUserDto: UpdateUserDto,
    @ReqUser() user: User,
  ) {
    return this.usersService.updateUser(updateUserDto, user.id);
  }

  @Get('account')
  public retrieveAccount(@Req() req: Request) {
    return req.user;
  }
}
