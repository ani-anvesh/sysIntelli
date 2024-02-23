import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { ApiService } from './api.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';

const AUTH_API = 'http://localhost:3000/api/sign/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private apiService: ApiService,
    private jwtHelper: JwtHelperService,
    private cookieService: CookieService
  ) {
    this.jwtHelper = new JwtHelperService();
  }

  login(email: string, password: string): Observable<any> {
    return from(
      this.apiService.postAllData(
        AUTH_API + 'login',
        {
          email,
          password,
        },
        httpOptions
      )
    );
  }
  clean(): void {
    window.sessionStorage.clear();
  }
  logout(): Observable<any> {
    return from(
      this.apiService.postAllData(AUTH_API + 'logout', {}, httpOptions)
    );
  }
  isLoggedIn(): boolean {
    const accessToken = this.getAccessTokenFromCookie();
    if (accessToken && !this.jwtHelper.isTokenExpired(accessToken)) {
      return true;
    } else {
      return false;
    }
  }

  getAccessTokenFromCookie(): string | null {
    return this.cookieService.get('access_token');
  }
}
