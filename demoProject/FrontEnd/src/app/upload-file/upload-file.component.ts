import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MessageService, MenuItem } from 'primeng/api';
import { ApiService } from '../services/api.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class UploadFileComponent implements OnInit {
  uploadedFiles: any[] = [];
  documents: any = [];
  isCollapsed: { [key: string]: boolean } = {};

  // pdfUrl: string =
  //   'https://docs.google.com/document/d/1tdzZ4Fz1OtA46J8yNC_ZaBUPw_WnoDuH/edit?usp=sharing&ouid=102857697093579477882&rtpof=true&sd=true';
  // pdfUrl = 'https://pdfobject.com/pdf/sample.pdf';
  pdfUrl = 'https://pdfobject.com/pdf/sample.pdf';
  // pdfUrl: string = '';
  constructor(
    private messageService: MessageService,
    private apiService: ApiService
  ) {}

  toggleCollapse(docName: string) {
    this.isCollapsed[docName] = !this.isCollapsed[docName];
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  updateDateStructure(res: any) {
    let transformedData = _.groupBy(res, 'person_name');
    Object.keys(transformedData).forEach((key) => {
      this.isCollapsed[key] = true;
    });
    return transformedData;
  }

  fetchReceiptNames() {
    this.apiService
      .getAllData('http://localhost:3000/api/receiptFetch/fetch')
      .then((res) => {
        if (res) {
          this.documents = this.updateDateStructure(res);
        }
      })
      .catch((error) => {
        console.error('Error fetching receipt names:', error);
      });
  }

  async fetchReceipts(data: any) {
    await this.apiService
      .getAllData(
        'http://localhost:3000/api/receiptCreate/createS3?person_id=' +
          data.person_id +
          '&vist_id=' +
          data.vist_id +
          '&receipt_id=' +
          data.receipt_id
      )
      .then((res) => {
        if (res) {
          // this.documents = res;
          return (this.pdfUrl = res);
        }
      })
      .catch((error) => {
        return console.error('Error fetching receipt names:', error);
      });
    // this.pdfUrl =
    //   'http://localhost:3000/api/receiptCreate/create?person_id=' +
    //   data.person_id +
    //   '&vist_id=' +
    //   data.vist_id +
    //   '&receipt_id=' +
    //   data.receipt_id;
  }

  onUpload(event: any) {
    if (event && event.files && event.files[0]) {
      this.messageService.add({
        severity: 'info',
        summary: 'File Uploaded',
        detail: '',
      });
      this.fetchReceiptNames();
    } else {
      console.error('No file selected for upload.');
    }
  }

  async downloadPdfFromS3URL(data: any) {
    await this.fetchReceipts(data);
    // window.open(this.pdfUrl, '_blank');

    this.apiService
      .getAllData(this.pdfUrl, { responseType: 'arraybuffer' })
      .then(function (response: any) {
        console.log(response);
        if (response) {
          var blob = new Blob([response], { type: 'application/pdf' });
          // var url = window.URL.createObjectURL(blob);
          // window.open(url);
          var anchor = document.createElement('a');
          anchor.href = window.URL.createObjectURL(blob);
          anchor.download = 'file.pdf';
          document.body.appendChild(anchor);
          anchor.click();
          document.body.removeChild(anchor);
        }
      });
  }

  ngOnInit() {
    this.fetchReceiptNames();
    // this.fetchReceipts('12220380', '1222038091', '1222038081');
  }
}
