import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { LoggingMiddleware } from './middlewares/logging.middleware';
import ConfigModule from './config/index';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './routes/user/entities/user.entity';
import { Board } from './routes/board/entities/board.entity';
import { BoardModule } from './routes/board/board.module';
import { UserModule } from './routes/user/user.module';

@Module({
  imports: [
    ConfigModule(),
    TypeOrmModule.forRoot({
      type: 'postgres', // database
      host: process.env.DB_HOST, // db host
      port: +process.env.DB_PORT, // db port
      username: process.env.DB_USERNAME, // db username
      password: process.env.DB_PW, // db user pw
      database: 'postgres', // db 이름
      entities: [User, Board], // entity 파일 경로
      synchronize: false, // entity 파일 값이 변경되었을 때 db에 반영하겠나?
      logging: true,
    }),
    BoardModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*'); // 모든 경로에 미들웨어를 실행한다.
  }
}
