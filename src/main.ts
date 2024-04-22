import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
    .setTitle('게시판')
    .setDescription('게시판 API')
    .setVersion('1.0')
    .addTag('board') // CONTROLLER와 매핑된다
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // 경로 = localhost:3000/api

  await app.listen(3000);
}
bootstrap();
