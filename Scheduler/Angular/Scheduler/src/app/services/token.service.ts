import { Injectable, QueryList, ViewChildren } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, firstValueFrom, from, map } from 'rxjs';
import { ApiService } from './api.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { DOMAINS } from 'utils/domains';

const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly thresholdTime: number = 30000;
  private jwtHelper: JwtHelperService;
  tokenExpiryTimer: any;
  baseURL = DOMAINS.HOME;

  constructor(
    private apiService: ApiService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {
    this.jwtHelper = new JwtHelperService();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  fetchToken(email: string): Observable<any> {
    return from(
      this.apiService.getAllData(this.baseURL + 'sign/token?email=' + email)
    );
  }

  refreshToken(email: string): Observable<any> {
    return from(
      this.apiService.getAllData(
        this.baseURL + 'sign/refreshToken?email=' + email
      )
    );
  }

  clearToken(email: string): Observable<any> {
    return from(
      this.apiService.getAllData(
        this.baseURL + 'sign/clearToken?email=' + email
      )
    );
  }

  isTokenExpired(token: any) {
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return false;
    } else {
      return true;
    }
  }

  getAccessTokenFromDB(): Promise<string | null | undefined> {
    return new Promise((resolve, reject) => {
      this.fetchToken(this.getUser().email).subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (error) => {
          console.error('Error fetching token:', error);
          resolve(null); // Resolving with null in case of error
        },
      });
    });
  }

  async startTokenExpiryMonitoring() {
    const token = await this.getAccessTokenFromDB();
    if (this.tokenExpiryTimer) {
      clearInterval(this.tokenExpiryTimer);
    }
    this.tokenExpiryTimer = setInterval(() => {
      const isExpired = this.isTokenExpired(token);
      if (token && !isExpired) {
        const expirationTime = this.jwtHelper
          .getTokenExpirationDate(token)
          ?.getTime();
        const currentTime = Date.now();
        if (expirationTime && currentTime) {
          const remainingTime = expirationTime - currentTime;
          if (remainingTime <= this.thresholdTime) {
            this.displayTokenRefreshPopup();
          } else {
          }
        }
      }
    }, 30000);
  }

  displayTokenRefreshPopup() {
    console.log('hello popopo');
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed Uploading?',
      header: 'Session End',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      acceptLabel: 'Refresh',
      rejectLabel: 'Logout',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        console.log('exit popup');
        this.refreshToken(this.getUser().email).subscribe({
          next: () => {
            clearInterval(this.tokenExpiryTimer);
            this.tokenExpiryTimer = null;
            this.startTokenExpiryMonitoring();
          },
        });
      },
      reject: () => {
        console.log('exit');
        this.clearToken(this.getUser().email).subscribe({});
        window.sessionStorage.clear();
        this.router.navigate(['/']);
      },
      key: 'positionDialog',
    });
  }
}
