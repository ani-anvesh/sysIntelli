import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { DOMAINS } from 'utils/domains';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class SqsService {
  public baseUrl = 'http://localhost:3000/api/' + 'sqs';

  constructor(private apiService: ApiService) {}

  sendMessageToQueue(messageBody: any): Observable<any> {
    return from(
      this.apiService.postAllData(`${this.baseUrl}/send-message`, messageBody)
    );
  }

  receiveMessageToQueue(
    doctorId: any,
    date: any,
    shiftId: any
  ): Observable<any> {
    return from(
      this.apiService.getAllData(
        `${this.baseUrl}/receive-message?doctorId=${doctorId}&date=${date}&shiftId=${shiftId}`
      )
    );
  }
}
