import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from '../schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { SignupViaGoogleDto } from './dto/signup.via.google.dto';
import { LoginViaGoogleDto } from './dto/login.via.google.dto';
import { ChangeNicknameDto } from './dto/change.nickname.dto';
import { ValidateViaGoogleDto } from './dto/validate.via.google.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService) {}

  async signup(signupDto: SignupDto): Promise<{ token: string }> {

    const {nickname, email, password, confirmedPassword} = signupDto;
    const nicknameCheck = await this.userModel.findOne({ nickname});

    if (nicknameCheck) {
      throw new ConflictException('This nickname is already taken');
    } 

    const emailCheck = await this.userModel.findOne({ email });
  
    if (emailCheck) {
      throw new ConflictException('This email address is already registered');
    }

    if(password !== confirmedPassword) {
        throw new BadRequestException("Password and password confirmation does not match")
    } else {
      const hashedPassword = await this.hashPassword(password);
      const newUser = await this.userModel.create({
        nickname,
        email,
        password: hashedPassword,
      });
      const token = this.generateJwtToken(newUser);
      return { token };
    }
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {

    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid email or password');
    }

    const token = this.generateJwtToken(user);
    return { token };
  }

  async signupViaGoogle(signupViaGoogle: SignupViaGoogleDto): Promise<{ token: string }> {
    const { nickname, email } = signupViaGoogle;
    const nicknameCheck = await this.userModel.findOne({ nickname});

    if (nicknameCheck) {
      throw new ConflictException('This nickname is already taken');
    } 

    const emailCheck = await this.userModel.findOne({ email });
  
    if (emailCheck) {
      throw new ConflictException('This email address is already registered');
    }

    const newUser = await this.userModel.create({
      nickname,
      email
    });
    const token = this.generateJwtToken(newUser);
    return { token };
  }

  async loginViaGoogle(loginViaGoogle: LoginViaGoogleDto): Promise<{ token: string }> {

    const { email } = loginViaGoogle;
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new BadRequestException('This account does not exists');
    }
      const token = this.generateJwtToken(user);
      return { token };
    }

  async validateViaGoogle(validateViaGoogleDto: ValidateViaGoogleDto): Promise<ValidateViaGoogleDto> {
    return validateViaGoogleDto;
  }

  async changeNickname(changeNicknameDto: ChangeNicknameDto): Promise<string> {

    const {email, nickname} = changeNicknameDto;
    const nicknameCheck = await this.userModel.findOne({ nickname });

    if (nicknameCheck) {
      throw new ConflictException('This nickname is already taken');
    } else {
      await this.userModel.findOneAndUpdate({email},{nickname});

      const token = this.generateJwtToken(nicknameCheck);
      return token;
    }
  }

  private generateJwtToken(user: User): string {
    const payload = { 
      _id: user._id,
      nickname: user.nickname };
    return this.jwtService.sign(payload);
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 14)
  }
}