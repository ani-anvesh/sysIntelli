import { Component } from '@angular/core';
import { MessageService, MenuItem } from 'primeng/api';
import { UploadEvent } from 'primeng/fileupload';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.css',
})
export class UploadFileComponent {
  uploadedFiles: any[] = [];
  items: MenuItem[];

  constructor(private messageService: MessageService) {
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
  }

  onUpload(event: UploadEvent) {
    // for (let file of event.files) {
    //   this.uploadedFiles.push(file);
    // }
    console.log(event);

    this.messageService.add({
      severity: 'info',
      summary: 'File Uploaded',
      detail: '',
    });
  }
}
