import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { DividerModule } from 'primeng/divider';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuModule } from 'primeng/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { ApiService } from './services/api.service';
import { AxiosService } from './services/axios.service';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, UploadFileComponent],
  imports: [
    CommonModule,
    FileUploadModule,
    ToastModule,
    DividerModule,
    SplitButtonModule,
    MenuModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    BrowserModule,
    ButtonModule,
    NgxDocViewerModule,
  ],
  providers: [MessageService, ApiService, AxiosService],
  bootstrap: [AppComponent],
})
export class AppModule {}
