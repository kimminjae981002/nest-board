import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { Controller, Get, Post } from '@nestjs/common';
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userServcie: UserService) {}

  @Post()
  signup(data: CreateUserDto) {
    return this.userServcie.signup({ ...data });
  }

  @Get()
  getUsers() {
    return this.userServcie.getUsers();
  }
}
