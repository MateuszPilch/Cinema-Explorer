import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { ChangeNicknameDto } from './dto/change.nickname.dto';
import { ValidateViaGoogleDto } from './dto/validate.via.google.dto';
import { SignupViaGoogleDto } from './dto/signup.via.google.dto';
import { LoginViaGoogleDto } from './dto/login.via.google.dto';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() signupDto: SignupDto): Promise<{ token: string }> {
    return this.authService.signup(signupDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async validateViaGoogle(): Promise<void> {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleRedirect(@Req() req, @Res() res: Response): Promise<ValidateViaGoogleDto> {
    const data = await this.authService.validateViaGoogle(req.user);
    res.send(`
      <script>
        window.opener.postMessage({ 
          email: '${data.email}', 
          accessToken: '${data.accessToken}' 
        }, 'http://localhost:4200');
        window.close();
      </script>`
    );
    return data;
  }

  @Post('google/signup')
  async signupViaGoogle(@Body() signupViaGoogle: SignupViaGoogleDto): Promise<{ token: string }> {
    return await this.authService.signupViaGoogle(signupViaGoogle);
  }
  
  @Post('google/login')
  async loginViaGoogle(@Body() logininViaGoogle: LoginViaGoogleDto): Promise<{ token: string }> {
    return await this.authService.loginViaGoogle(logininViaGoogle);
  }
}