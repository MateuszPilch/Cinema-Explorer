import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ErrorService } from '../error/error.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authToken!: string;
  private authId!: string;
  private nickname!: string;
  private helper = new JwtHelperService();
  
  constructor(private http: HttpClient, private router: Router, private errorService: ErrorService) {
    this.authToken = localStorage.getItem('token') || '';
    this.authId = localStorage.getItem('auth_id') || '';
    this.nickname = localStorage.getItem('auth_nickname') || '';
  }

  public signup(nickname: string, email: string, password: string, confirmedPassword: string): void {
    firstValueFrom(this.http.post<{token: string}>(`${environment.backendUrl}/auth/signup`,{
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
    firstValueFrom(this.http.post<{token: string}>(`${environment.backendUrl}/auth/login`,{
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
    window.open(`${environment.backendUrl}/auth/google`, '_blank');
    window.addEventListener('message', (event) => {
      firstValueFrom(this.http.post<{token: string}>(`${environment.backendUrl}/auth/google/signup`,{
        nickname,
        email: event.data.email,
        accessToken: event.data.accessToken
      })).then((data) => {
        this.setAuthenticationData(data);
        this.router.navigate(['/']);
      }).catch((error) => {
        this.errorService.setErrorMessages(error.error.message);
      });
    }, {once: true});
  }

  public loginViaGoogle(): void {
    window.open(`${environment.backendUrl}/auth/google`, '_blank');
    window.addEventListener('message', (event) => {
      firstValueFrom(this.http.post<{token: string}>(`${environment.backendUrl}/auth/google/login`,{
        email: event.data.email,
        accessToken: event.data.accessToken
      })).then((data) => {
        this.setAuthenticationData(data);
        this.router.navigate(['/']);
      }).catch((error) => {
        this.errorService.setErrorMessages(error.error.message);
      });
    }, {once: true});
  }
  
  public logout(): void {
    this.authToken = '';
    this.authId = '';
    this.nickname = '';

    localStorage.removeItem('token');
    localStorage.removeItem('auth_id')
    localStorage.removeItem('auth_nickname');

    this.router.navigate(['/']);
  }

  public getAuthToken(): string {
    return this.authToken;
  }

  public getAuthId(): string {
    return this.authId;
  }

  public getNickname(): string {
    return this.nickname;
  }

  public isAuthenticated(): boolean {
    return this.authToken?.length !== 0 && this.authToken !== undefined;
  }

  private setAuthenticationData(data: {token: string}): void {
    this.authToken = data.token;
    this.authId = this.helper.decodeToken(this.authToken)._id;
    this.nickname = this.helper.decodeToken(this.authToken).nickname;
    
    localStorage.setItem('token', this.authToken);
    localStorage.setItem('auth_id', this.authId);
    localStorage.setItem('auth_nickname', this.nickname);
  }
}
