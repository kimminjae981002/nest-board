import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/routes/user/entities/user.entity';
import { UserService } from 'src/routes/user/user.service';
import { LocalStrategy } from './auth.strategy';
import { UserModule } from 'src/routes/user/user.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserModule, PassportModule],
  providers: [AuthService, UserService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
