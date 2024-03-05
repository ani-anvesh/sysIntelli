import { Injectable } from '@angular/core';
import { AxiosService } from './axios.service';
import { Args } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  API_URL: string;
  AXIOS_TIMEOUT: number = 120000;

  constructor(private axiosService: AxiosService) {
    this.API_URL = '';
  }

  async getAllData(path: string, args?: Args) {
    var results;
    var url = this.API_URL + path;
    var headers: any;
    var params: any;
    var responseType: any;

    if (args) {
      if (args.timeout) this.AXIOS_TIMEOUT = Number(args.timeout);
      if (args.headers) headers = args.headers;
      if (args.params) params = args.params;
      if (args.responseType) responseType = args.responseType;
    }

    await this.axiosService
      .all({
        method: 'get',
        url: url,
        params: params,
        headers: headers,
        responseType: responseType,
        timeout: this.AXIOS_TIMEOUT,
      })
      .then(async (response) => {
        results = response && response.data;
      })
      .catch((error) => {
        console.log(error);
        results = error;
      });
    return results;
  }

  async postAllData(path: string, data: any, args?: Args) {
    var results;
    var url = this.API_URL + path;
    var headers: any;
    var params: any;

    if (args) {
      if (args.timeout) this.AXIOS_TIMEOUT = Number(args.timeout);
      if (args.headers) headers = args.headers;
      if (args.params) params = args.params;
    }

    await this.axiosService
      .all({
        method: 'post',
        url: url,
        data: data,
        params: params,
        headers: headers,
        timeout: this.AXIOS_TIMEOUT,
      })
      .then(async (response) => {
        results = response && response.data;
      })
      .catch((error) => {
        console.log(error);
        results = error;
      });
    return results;
  }

  async uploadFile(path: string, fileToupload: File, args?: Args) {
    var results = {};
    var url = this.API_URL + path;
    const formData: FormData = new FormData();
    formData.append('file', fileToupload, fileToupload.name);
    var headers: any;
    var params: any;

    if (args) {
      if (args.timeout) this.AXIOS_TIMEOUT = Number(args.timeout);
      if (args.headers) headers = args.headers;
      if (args.params) params = args.params;
    }

    await this.axiosService
      .all({
        method: 'post',
        url: url,
        data: formData,
        params: params,
        headers: headers,
        timeout: this.AXIOS_TIMEOUT,
      })
      .then(async (response) => {
        results = response && response.data;
      })
      .catch((error) => {
        // var errorResponce = {
        //   error: true,
        //   type: 'Error in common api service',
        //   message: error.message || 'N/A',
        //   status: error.status || 'N/A',
        //   data: error.response.data || 'N/A',
        //   url: url,
        // };
        console.log(error);
        results = error;
      });
    return results;
  }

  async downloadFile(path: string, args?: Args) {
    var results = {};
    var url = this.API_URL + path;
    var headers: any;
    var params: any;
    var responseType: any;

    if (args) {
      if (args.timeout) this.AXIOS_TIMEOUT = Number(args.timeout);
      if (args.headers) headers = args.headers;
      if (args.params) params = args.params;
      if (args.responseType) responseType = args.responseType;
    }

    await this.axiosService
      .all({
        method: 'post',
        url: url,
        responseType: responseType,
        params: params,
        headers: headers,
        timeout: this.AXIOS_TIMEOUT,
      })
      .then(async (response) => {
        results = response;
      })
      .catch((error) => {
        console.log(error);
        results = error;
      });
    return results;
  }
}
