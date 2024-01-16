import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { Auth } from 'src/schemas/auth.schema';
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
    private jwtService: JwtService,
    @InjectModel(Auth.name)
    private authModel: Model<Auth>,
    @InjectModel(User.name)
    private userModel: Model<User>
  ){}

  async signup(signupDto: SignupDto): Promise<{ token: string }> {
    const {nickname, email, password, confirmedPassword} = signupDto;
    const nicknameCheck = await this.authModel.findOne({ nickname });

    if (nicknameCheck) {
      throw new ConflictException('Ta nazwa użytkownika już istnieje');
    } 

    const emailCheck = await this.authModel.findOne({ email });
  
    if (emailCheck) {
      throw new ConflictException('Ten adres email jest już zarejestrowany');
    }

    if(password !== confirmedPassword) {
        throw new BadRequestException("Hasło i potwierdzenie hasła nie zgadzają się")
    } else {
      const hashedPassword = await this.hashPassword(password);
      const _id = new Types.ObjectId();

      const newAuth = await this.authModel.create({
        _id,
        nickname,
        email,
        password : hashedPassword,
      });

      const newUser = await this.userModel.create({
        _id,
        nickname,
      });

      const token = this.generateJwtToken(newAuth);
      return { token };
    }
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;
    const auth = await this.authModel.findOne({ email });

    if (!auth) {
      throw new BadRequestException('Nieprawidłowy email lub hasło');
    }

    const isPasswordValid = await bcrypt.compare(password, auth.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Nieprawidłowy email lub hasło');
    }

    const token = this.generateJwtToken(auth);
    return { token };
  }

  async signupViaGoogle(signupViaGoogle: SignupViaGoogleDto): Promise<{ token: string }> {
    const { nickname, email } = signupViaGoogle;
    const nicknameCheck = await this.authModel.findOne({ nickname });

    if (nicknameCheck) {
      throw new ConflictException('Ta nazwa użytkownika już istnieje');
    } 

    const emailCheck = await this.authModel.findOne({ email });
  
    if (emailCheck) {
      throw new ConflictException('Ten adres email jest już zarejestrowany');
    }

    const _id = new Types.ObjectId();
    const newAuth = await this.authModel.create({
      _id,
      nickname,
      email,
    });

    const newUser = await this.userModel.create({
      _id,
      nickname,
      email,
    });

    const token = this.generateJwtToken(newAuth);
    return { token };
  }

  async loginViaGoogle(loginViaGoogle: LoginViaGoogleDto): Promise<{ token: string }> {
    const { email } = loginViaGoogle;
    const auth = await this.authModel.findOne({ email });

    if (!auth) {
      throw new BadRequestException('Nie istnieje takie konto');
    }
      const token = this.generateJwtToken(auth);
      return { token };
    }

  async validateViaGoogle(validateViaGoogleDto: ValidateViaGoogleDto): Promise<ValidateViaGoogleDto> {
    return validateViaGoogleDto;
  }

  private generateJwtToken(auth: Auth): string {
    const payload = { 
      _id: auth._id,
      nickname: auth.nickname };
    return this.jwtService.sign(payload);
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 14)
  }
}