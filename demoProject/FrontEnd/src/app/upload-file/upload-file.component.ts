import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MessageService, MenuItem } from 'primeng/api';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class UploadFileComponent implements OnInit {
  uploadedFiles: any[] = [];
  items: MenuItem[];
  documents: any[] = [];
  // docUrl: string =
  //   'https://docs.google.com/document/d/1tdzZ4Fz1OtA46J8yNC_ZaBUPw_WnoDuH/edit?usp=sharing&ouid=102857697093579477882&rtpof=true&sd=true';
  // pdfUrl = 'https://pdfobject.com/pdf/sample.pdf';
  pdfUrl = 'https://pdfobject.com/pdf/sample.pdf';
  // pdfUrl: string = '';
  constructor(
    private messageService: MessageService,
    private apiService: ApiService
  ) {
    this.items = [
      {
        label: 'name',
      },
    ];
  }

  fetchReceiptNames() {
    this.apiService
      .getAllData('http://localhost:3000/api/receiptFetch/fetch')
      .then((res) => {
        if (res) {
          this.documents = res;
        }
      })
      .catch((error) => {
        console.error('Error fetching receipt names:', error);
      });
  }

  fetchReceipts(data: any) {
    this.apiService
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
          this.pdfUrl = res;
        }
      })
      .catch((error) => {
        console.error('Error fetching receipt names:', error);
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

  ngOnInit() {
    this.fetchReceiptNames();
    // this.fetchReceipts('12220380', '1222038091', '1222038081');
  }
}
