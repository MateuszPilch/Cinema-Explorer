import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  nickname!: string;
  email!:string;
  password!: string;
  confirmedPassword!: string;

  authForm: string = "login";
  
  constructor(public authService: AuthService) {}

  signup(): void {
    this.authService.signup(this.nickname, this.email,this.password,this.confirmedPassword);
  }

  login(): void {
    this.authService.login(this.email,this.password);
  }

  signupViaGoogle(): void {
    this.authService.signupViaGoogle(this.nickname);
  }

  loginViaGoogle(): void {
    this.authService.loginViaGoogle();
  }

  changeCurrentForm(newForm: string): void {
    this.authForm = newForm;
  }
}