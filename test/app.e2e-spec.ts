import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // 앱 컨트롤러
  describe('AppController', () => {
    it('/ (GET)', () => {
      return request(app.getHttpServer())
        .get('/get')
        .expect(200)
        .expect('Hello World!');
    });

    it('이름 가져오기 (GET)', () => {
      return request(app.getHttpServer())
        .get('/get/queryName') // 변경된 경로에 맞게 수정
        .query({ name: '동길홍' }) // 쿼리 스트링 형태로 전달
        .expect(200)
        .expect('동길홍 hello');
    });

    it('[로그인]', () => {
      return request(app.getHttpServer())
        .post('/get/login') // 경로 수정
        .send({
          username: 'wwww',
          password: '123123',
        })
        .expect(201);
    });
  });

  // 게시글 컨트롤러
  describe('BoardController', () => {
    it('게시글 가져오기', () => {
      return request(app.getHttpServer()).get('/board').expect(200);
    });
  });

  // 유저 컨트롤러
  describe('UserController', () => {
    it('유저 가져오기', () => {
      return request(app.getHttpServer()).get('/user').expect(200);
    });
  });
});
