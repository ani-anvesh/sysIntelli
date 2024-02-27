import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
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
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    UploadFileComponent,
  ],
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
    InputGroupModule,
    InputGroupAddonModule,
    PasswordModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ConfirmDialogModule,
  ],
  providers: [
    MessageService,
    ApiService,
    AxiosService,
    AuthService,
    ConfirmationService,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
