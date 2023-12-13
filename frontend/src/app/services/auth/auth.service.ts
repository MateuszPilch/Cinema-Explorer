import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ErrorService } from '../error/error.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authToken!: string;
  private nickname!: string;
  private helper = new JwtHelperService();
  
  constructor(private http: HttpClient, private router: Router, private errorService: ErrorService) {
    this.authToken = localStorage.getItem('token') || '';
    this.nickname = localStorage.getItem('nickname') || '';
  }

  public signup(nickname: string, email: string, password: string, confirmedPassword: string): void {
    firstValueFrom(this.http.post<{token: string}>('http://localhost:3000/api/auth/signup',{
      nickname,  
      email,
      password,
      confirmedPassword
    })).then((data) => {
      this.setAuthenticationData(data);
      this.router.navigate(['/']);
    }).catch((error) => {
      this.errorService.setErrorMessages(error.error.message);
    });
  }

  public login(email: string, password: string): void {
    firstValueFrom(this.http.post<{token: string}>('http://localhost:3000/api/auth/login',{
      email,
      password
    })).then((data) => {
      this.setAuthenticationData(data);
      this.router.navigate(['/']);
    }).catch((error) => {
      this.errorService.setErrorMessages(error.error.message);
    });
  }

  public signupViaGoogle(nickname: string ): void {
    window.open('http://localhost:3000/api/auth/google', '_blank','width=600,height=400');
    window.addEventListener('message', (event) => {
      if (event.origin === 'http://localhost:3000') {
        firstValueFrom(this.http.post<{token: string}>('http://localhost:3000/api/auth/google/signup',{
          nickname,
          email: event.data.email,
          accessToken: event.data.accessToken
        })).then((data) => {
          this.setAuthenticationData(data);
          this.router.navigate(['/']);
        }).catch((error) => {
          this.errorService.setErrorMessages(error.error.message);
        });
      }
    }, {once: true});
  }

  public loginViaGoogle(): void {
    window.open('http://localhost:3000/api/auth/google', '_blank','width=600,height=400');
    window.addEventListener('message', (event) => {
      if (event.origin === 'http://localhost:3000') {
        firstValueFrom(this.http.post<{token: string}>('http://localhost:3000/api/auth/google/login',{
          email: event.data.email,
          accessToken: event.data.accessToken
        })).then((data) => {
          this.setAuthenticationData(data);
          this.router.navigate(['/']);
        }).catch((error) => {
          this.errorService.setErrorMessages(error.error.message);
        });
      }
    }, {once: true});
  }
  
  public logout(): void {
    this.authToken = '';
    this.nickname = '';

    localStorage.removeItem('token');
    localStorage.removeItem('nickname');

    this.router.navigate(['/']);
  }

  public getAuthToken(): string {
    return this.authToken;
  }

  public getNickname(): string {
    return this.nickname;
  }

  public isAuthenticated(): boolean {
    return this.authToken?.length !== 0 && this.authToken !== undefined;
  }

  private setAuthenticationData(data: {token: string}): void {
    this.authToken = data.token;
    this.nickname = this.helper.decodeToken(this.authToken).nickname;

    localStorage.setItem('token', this.authToken);
    localStorage.setItem('nickname', this.nickname);
  }
}
