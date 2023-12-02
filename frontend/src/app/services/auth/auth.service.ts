import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authToken!: string;

  constructor(private http: HttpClient, private router: Router) {
    this.authToken = localStorage.getItem('token') || '';
  }

  public signup(nickname: string, email: string, password: string, confirmedPassword: string): void {
    firstValueFrom(this.http.post<{token: string}>('http://localhost:3000/api/auth/signup',{
      nickname,  
      email,
      password,
      confirmedPassword
    })).then((res) => {
      this.authToken = res.token;
      localStorage.setItem('token', this.authToken);
      this.router.navigate(['/']);
    }).catch((error) => {
      console.log(error);
    });
  }

  public login(email: string, password: string): void {
    firstValueFrom(this.http.post<{token: string}>('http://localhost:3000/api/auth/login',{
      email,
      password
    })).then((res) => {
      this.authToken = res.token;
      localStorage.setItem('token', this.authToken);
      this.router.navigate(['/']);
    }).catch((error) => {
      console.log(error);
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
        })).then((res) => {
          this.authToken = res.token;
          localStorage.setItem('token', this.authToken);
          this.router.navigate(['/']);
        }).catch((error) => {
          console.log(error);
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
        })).then((res) => {
          this.authToken = res.token;
          localStorage.setItem('token', this.authToken);
          this.router.navigate(['/']);
        }).catch((error) => {
          console.log(error);
        });
      }
    }, {once: true});
  }
  
  public logout(): void {
    this.authToken = '';
    localStorage.removeItem('token');
  }

  public getAuthToken(): string {
    return this.authToken;
  }

  public isAuthenticated(): boolean {
    return this.authToken?.length !== 0 && this.authToken !== undefined;
  }
}
