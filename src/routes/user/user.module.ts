import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from '../board/entities/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board, User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
