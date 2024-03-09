import { Model } from 'mongoose';
import { Auth } from '../schemas/auth.schema';
import { User } from '../schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { SignupViaGoogleDto } from './dto/signup.via.google.dto';
import { LoginViaGoogleDto } from './dto/login.via.google.dto';
import { ValidateViaGoogleDto } from './dto/validate.via.google.dto';
export declare class AuthService {
    private jwtService;
    private authModel;
    private userModel;
    constructor(jwtService: JwtService, authModel: Model<Auth>, userModel: Model<User>);
    signup(signupDto: SignupDto): Promise<{
        token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        token: string;
    }>;
    signupViaGoogle(signupViaGoogle: SignupViaGoogleDto): Promise<{
        token: string;
    }>;
    loginViaGoogle(loginViaGoogle: LoginViaGoogleDto): Promise<{
        token: string;
    }>;
    validateViaGoogle(validateViaGoogleDto: ValidateViaGoogleDto): Promise<ValidateViaGoogleDto>;
    private generateJwtToken;
    private hashPassword;
}
