import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Board } from 'src/board/entities/board.entity';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Board, User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
