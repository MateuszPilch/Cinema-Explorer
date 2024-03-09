import { AuthService } from './auth.service';
import { Response } from 'express';
import { ValidateViaGoogleDto } from './dto/validate.via.google.dto';
import { SignupViaGoogleDto } from './dto/signup.via.google.dto';
import { LoginViaGoogleDto } from './dto/login.via.google.dto';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(signupDto: SignupDto): Promise<{
        token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        token: string;
    }>;
    validateViaGoogle(): Promise<void>;
    googleRedirect(req: any, res: Response): Promise<ValidateViaGoogleDto>;
    signupViaGoogle(signupViaGoogle: SignupViaGoogleDto): Promise<{
        token: string;
    }>;
    loginViaGoogle(logininViaGoogle: LoginViaGoogleDto): Promise<{
        token: string;
    }>;
}
