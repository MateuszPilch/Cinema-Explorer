import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '../src/auth/auth.module';
import mongoose from 'mongoose';

describe('AuthController (e2e)', () => {
  let app;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot( {
        envFilePath: '.env',
        isGlobal: true,
      }),
      PassportModule.register({session: true}),
      MongooseModule.forRoot(process.env.MONGODB_TEST_URL), AuthModule]
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });
  
  describe('signup', () => {
    it('should return a 201', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          nickname: 'Test123',
          email:'Test@test.com',
          password:'Qwerty1234',
          confirmedPassword: 'Qwerty1234'
        })
        .expect(201)
        .expect(({ body }) => {
          expect(body).toHaveProperty('token');
        });
    });

    it('should throw 409 error because nickname already exists', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          nickname: 'Test123',
          email:'NewTest@test.com',
          password:'Qwerty1234',
          confirmedPassword: 'Qwerty1234'
        })
        .expect(409);
    });

    it('should throw 409 error because email already exists', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          nickname: 'NewTest',
          email:'Test@test.com',
          password:'Qwerty1234',
          confirmedPassword: 'Qwerty1234'
        })
        .expect(409);
    });

    it('should throw 400 error because password and confirmed password are not equal', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          nickname: 'NewTest',
          email:'NewTest@test.com',
          password:'Qwerty1234',
          confirmedPassword: '1qazXSW@'
        })
        .expect(400);
    });
  });

  describe('signup via google', () => {

  });

  describe('login', ()=> {
    it('should return a token on successful login', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email:'Test@test.com',
          password:'Qwerty1234',
        })
        .expect(201)
        .expect(({ body }) => {
          expect(body).toHaveProperty('token');
        });
    });

    it('should throw 400 error on bad login', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email:'Test@invalid.com',
          password:'Qwerty1234',
        })
        .expect(400);
    });

    it('should throw 400 error on bad password', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email:'Test@test.com',
          password:'1qazXSW@',
        })
        .expect(400);
    });

    it('should throw 400 error because nickname and password is empty', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send()
        .expect(400);
    });
  });

  afterAll(async () => {
    await mongoose.connection.dropCollection('auths');
    await mongoose.connection.dropCollection('users');
    await app.close();
  });
});