import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';

@Injectable({
  providedIn: 'root',
})
export class AxiosService {
  private axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      timeout: 300000,
    });

    this.axios.interceptors.response.use(undefined, function (error: any) {
      return Promise.reject(error);
    });
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
