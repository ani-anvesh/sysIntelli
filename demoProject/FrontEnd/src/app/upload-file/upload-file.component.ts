import { Component, ViewEncapsulation } from '@angular/core';
import { MessageService, MenuItem } from 'primeng/api';
import { UploadEvent } from 'primeng/fileupload';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class UploadFileComponent {
  uploadedFiles: any[] = [];
  items: MenuItem[];
  documents: any[] = [];
  // docUrl: string =
  //   'https://docs.google.com/document/d/1tdzZ4Fz1OtA46J8yNC_ZaBUPw_WnoDuH/edit?usp=sharing&ouid=102857697093579477882&rtpof=true&sd=true';
  // pdfUrl = 'https://pdfobject.com/pdf/sample.pdf';
  pdfUrl = 'https://pdfobject.com/pdf/sample.pdf';
  constructor(
    private messageService: MessageService,
    private ApiService: ApiService
  ) {
    this.items = [
      {
        label: 'Update',
        icon: 'pi pi-refresh',
      },
      {
        label: 'Delete',
        icon: 'pi pi-times',
      },
      { label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io' },
      { separator: true },
      {
        label: 'Installation',
        icon: 'pi pi-cog',
        routerLink: ['/installation'],
      },
    ];
    this.documents = [
      {
        name: 'Receipt 1',
      },
      {
        name: 'Receipt 2',
      },
    ];
  }

  onUpload(event: any) {
    // for (let file of event.files) {
    //   this.uploadedFiles.push(file);
    // }
    console.log(event.files);

    this.ApiService.uploadFile(
      'http://localhost:3000/api/receipt/upload',
      event.files[0]
    ).then((res: any) => {
      console.log(res);
    });

    this.messageService.add({
      severity: 'info',
      summary: 'File Uploaded',
      detail: '',
    });
  }
}
