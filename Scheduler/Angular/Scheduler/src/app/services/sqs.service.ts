import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { DOMAINS } from 'utils/domains';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class SqsService {
  public baseUrl = DOMAINS.HOME + 'sqs';

  constructor(private apiService: ApiService) {}

  sendMessageToQueue(messageBody: any): Observable<any> {
    return from(
      this.apiService.postAllData(`${this.baseUrl}/send-message`, messageBody)
    );
  }
}
