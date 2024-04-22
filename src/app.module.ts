import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardController } from './board/board.controller';
import { BoardModule } from './board/board.module';
import { LoggingMiddleware } from './middlewares/logging.middleware';
import  ConfigModule  from './config/index';

@Module({
  imports: [
    ConfigModule(),
    BoardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*'); // 모든 경로에 미들웨어를 실행한다.
  }
}
