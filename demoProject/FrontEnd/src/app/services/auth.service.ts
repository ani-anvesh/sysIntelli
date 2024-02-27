import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { TokenService } from './token.service';

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
    private router: Router,
    private tokenService: TokenService
  ) {}

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

  logout(): Observable<any> {
    return from(
      this.apiService.postAllData(AUTH_API + 'logout', {}, httpOptions)
    );
  }

  canActivate(): boolean {
    const isAuthenticated = this.tokenService.getUser().Auth;

    if (!isAuthenticated) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
