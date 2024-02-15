import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Auth } from '../schemas/auth.schema';
import { User } from '../schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { BadRequestException, ConflictException, UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtSerivce: JwtService;

  let authModel: Model<Auth>
  let userModel: Model<User>

  const mockAuthService = {
    create: jest.fn(),
    findOne: jest.fn(),
  };

  const mockUser = {
    _id: new mongoose.Types.ObjectId('65c0dc4774b31805d219ea20'),
    nickname: 'testuser',
    email: 'test@example.com',
    password: 'hashedPassword'
  } as any;

  const mockSignupDto = {
    nickname: 'testuser',
    email: 'test@example.com',
    password: 'password',
    confirmedPassword: 'password',
  };

  const mockInvalidSignupDto = {
    nickname: '',
    email: 'test',
    password: 'password',
    confirmedPassword: '12345678',
  };

  const mockSignupViaGoogleDto = {
    nickname: 'testuser',
    email: 'test@example.com',
    accessToken: 'oauthToken'
  };

  const mockInvalidSignupViaGoogleDto = {
    nickname: '',
    email: 'test',
    accessToken: null,
  };

  const mockLoginDto = {
    email: 'test@example.com',
    password: 'password',
  };

  const mockInvalidLoginDto = {
    email: '',
    password: '',
  };

  const mockLoginViaGoogleDto = {
    email: 'test@example.com',
    accessToken: 'oauthToken'
  };

  const mockInvalidLoginViaGoogleDto = {
    email: '',
    accessToken: null
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: getModelToken(Auth.name),
          useValue: mockAuthService,
        },
        {
          provide: getModelToken(User.name),
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtSerivce = module.get<JwtService>(JwtService);

    authModel = module.get<Model<Auth>>(getModelToken(Auth.name));
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('Signup', () => {
    it('should return a jwt token', async () => {

      jest.spyOn(authModel,'findOne').mockResolvedValueOnce(null);
      jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce('hashedPassword');
      jest.spyOn(authModel,'create').mockImplementation(() => Promise.resolve(mockUser));
      jest.spyOn(userModel,'create').mockImplementationOnce(() => Promise.resolve(mockUser));
      jest.spyOn(jwtSerivce, 'sign').mockReturnValue('jwtToken');

      const result = await authService.signup(mockSignupDto);
      expect(bcrypt.hash).toHaveBeenCalled();
      expect(jwtSerivce.sign).toHaveBeenCalled();
      expect(result).toEqual({token: 'jwtToken'});
    });

    it('should throw 409 error because nickname or email already exists', async () => {

      jest.spyOn(authModel,'findOne').mockResolvedValueOnce(mockUser);

      try {
        await authService.signup(mockInvalidSignupDto);
        fail('Expected ConflictException but got success');
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
      }
    });

    it('should throw 400 error because password doesnt match confirmed password', async () => {

      jest.spyOn(authModel,'findOne').mockResolvedValueOnce(null);

      try {
        await authService.signup(mockInvalidSignupDto);
        fail('Expected BadRequestException but got success');
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('Singup Via Google', () => {
    it('should return a jwt token', async () => {

      jest.spyOn(authModel,'findOne').mockResolvedValueOnce(null);
      jest.spyOn(authModel,'create').mockImplementation(() => Promise.resolve(mockUser));
      jest.spyOn(userModel,'create').mockImplementationOnce(() => Promise.resolve(mockUser));
      jest.spyOn(jwtSerivce, 'sign').mockReturnValue('jwtToken');

      const result = await authService.signupViaGoogle(mockSignupViaGoogleDto);
      expect(bcrypt.hash).toHaveBeenCalled();
      expect(jwtSerivce.sign).toHaveBeenCalled();
      expect(result).toEqual({token: 'jwtToken'});
    });

    it('should throw 409 error because nickname or email already exists', async () => {

      jest.spyOn(authModel,'findOne').mockResolvedValueOnce(mockUser);

      try {
        await authService.signupViaGoogle(mockInvalidSignupViaGoogleDto);
        fail('Expected ConflictException but got success');
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
      }
    });
  });

  describe('Login', () => {
    it('should return a jwt token', async () => {

      jest.spyOn(authModel,'findOne').mockResolvedValueOnce(mockUser);
      jest.spyOn(jwtSerivce, 'sign').mockReturnValue('jwtToken');
      jest.spyOn(bcrypt, 'compare').mockReturnValue(mockLoginDto.password);
      
      const result = await authService.login(mockLoginDto);
      expect(jwtSerivce.sign).toHaveBeenCalled();
      expect(result).toEqual({token: 'jwtToken'});
    });

    it('should throw 400 error because incorrect email or password', async () => {

      jest.spyOn(authModel,'findOne').mockResolvedValueOnce(null);

      try {
        await authService.login(mockInvalidLoginDto);
        fail('Expected BadRequestException but got success');
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('Login via Google', () => {
    it('should return a jwt token', async () => {

      jest.spyOn(authModel,'findOne').mockResolvedValueOnce(mockUser);
      jest.spyOn(jwtSerivce, 'sign').mockReturnValue('jwtToken');

      const result = await authService.loginViaGoogle(mockLoginViaGoogleDto);
      expect(jwtSerivce.sign).toHaveBeenCalled();
      expect(result).toEqual({token: 'jwtToken'});
    });

    it('should throw 400 error because account doesnt exists', async () => {

      jest.spyOn(authModel,'findOne').mockResolvedValueOnce(null);

      try {
        await authService.loginViaGoogle(mockInvalidLoginViaGoogleDto);
        fail('Expected BadRequestException but got success');
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
