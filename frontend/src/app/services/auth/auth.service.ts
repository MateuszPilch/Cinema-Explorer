import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authToken!: string;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.authToken = sessionStorage.getItem('token') || '';
  }

  public signup(nickname: string, email: string, password: string, confirmedPassword: string): void {
    firstValueFrom(this.http.post<{token: string}>('http://localhost:3000/api/auth/signup',{
      nickname,  
      email,
      password,
      confirmedPassword
    })).then((res) => {
      this.authToken = res.token;
      sessionStorage.setItem('token', this.authToken);
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
      sessionStorage.setItem('token', this.authToken);
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
          sessionStorage.setItem('token', this.authToken);
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
          sessionStorage.setItem('token', this.authToken);
          this.router.navigate(['/']);
        }).catch((error) => {
          console.log(error);
        });
      }
    }, {once: true});
  }
  
  public logout(): void {
    this.authToken = '';
    sessionStorage.removeItem('token');
  }

  public isAuthenticated(): boolean {
    return this.authToken?.length !== 0 && this.authToken !== undefined;
  }
}
