import { Injectable } from '@nestjs/common';
import { UserService } from 'src/routes/user/user.service';
import * as jwt from 'jsonwebtoken';
import { hash, compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  // user를 확인한다.
  // user를 startegy를 이용해 req.user에 전달해준다.
  async validateUser(username: string, password: string) {
    const user = await this.userService.getUser(username);

    if (!user) {
      return '존재하지 않는 유저입니다.';
    }

    const signin = await compare(password, user.password);

    if (signin) {
      return user;
    } else {
      // passport 동작 규칙으로 맞추기 위해서 null을 반환한다.
      return null;
    }
  }
}