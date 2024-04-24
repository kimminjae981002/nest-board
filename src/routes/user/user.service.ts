import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Board } from '../board/entities/board.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signup(data: CreateUserDto) {
    const newUser = this.userRepository.create({ ...data });

    await this.userRepository.save(newUser);

    return newUser;
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
