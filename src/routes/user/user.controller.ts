import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { SigninUserDto } from './dto/signin-user.dto';
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  signup(@Body(new ValidationPipe()) data: CreateUserDto) {
    return this.userService.signup(data);
  }

  @Post('signin')
  async signin(@Body(new ValidationPipe()) data: SigninUserDto) {
    return this.userService.signin(data);
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }
}
