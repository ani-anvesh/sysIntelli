import { Injectable } from '@angular/core';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AxiosService {
  private axios: AxiosInstance;

  constructor(private router: Router) {
    this.axios = axios.create({
      timeout: 300000,
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.axios.interceptors.request.use(function (config) {
      // config.withCredentials = true;
      return config;
    });

    this.axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error: AxiosError) => {
        // if (error.response?.status === 401 || error.response?.status === 403) {
        //   window.sessionStorage.clear();
        //   this.router.navigate(['/']);
        // }
        return Promise.reject(error);
      }
    );
  }

  public async all<T>(options: any): Promise<any> {
    try {
      var axiosResponse = await this.axios.request<T>(options);
      return axiosResponse;
    } catch (error) {
      Promise.reject(error);
    }
  }
}
