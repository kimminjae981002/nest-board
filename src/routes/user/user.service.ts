import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

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
    const users = await this.userRepository.find();

    return users;
  }
}
