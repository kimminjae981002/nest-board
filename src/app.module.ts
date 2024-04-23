import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardController } from './board/board.controller';
import { BoardModule } from './board/board.module';
import { LoggingMiddleware } from './middlewares/logging.middleware';
import  ConfigModule  from './config/index';
import { TypeOrmModule } from '@nestjs/typeorm';

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
      entities: [__dirname + '/**/*.entity.{.ts,.js}'], // entity 파일 경로
      synchronize: false, // entity 파일 값이 변경되었을 때 db에 반영하겠나?
      logging: true
    }),
    BoardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*'); // 모든 경로에 미들웨어를 실행한다.
  }
}
