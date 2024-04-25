import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Board } from '../board/entities/board.entity';
import { hash, compare } from 'bcrypt';
import { SigninUserDto } from './dto/signin-user.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signup(data: CreateUserDto) {
    const { password } = data;

    const encryptPassword = await hash(password, 10);

    return await this.userRepository.save({
      ...data,
      password: encryptPassword,
    });
  }

  async signin(data: SigninUserDto) {
    const { username, password } = data;

    const user = await this.getUser(username);

    if (!user) {
      return '존재하지 않는 유저입니다.';
    }

    const signin = await compare(password, user.password);

    // jwt 정보에 줄 것들
    const payload = {
      username,
      name: user.name,
    };

    const accessToken = jwt.sign(payload, process.env.JWT_KEY, {
      expiresIn: '10s',
    });

    if (signin) {
      return '로그인 성공';
    } else {
      return '로그인 실패';
    }
  }

  async getUser(username: string) {
    return await this.userRepository.findOneBy({ username });
  }

  async getUsers() {
    const qb = this.userRepository.createQueryBuilder();

    // sql 쿼리 문을 이용해서 데이터를 가져온다
    // entity에서 컬럼 설정 해줘야함
    qb.addSelect((subQuery) => {
      return subQuery
        .select('count(id)')
        .from(Board, 'Board')
        .where('Board.userId = User.id');
    }, 'User_boardCount');

    return qb.getMany();
  }
}
