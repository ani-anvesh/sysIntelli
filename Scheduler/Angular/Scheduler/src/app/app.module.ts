import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FullCalendarComponent } from './components/full-calendar/full-calendar.component';
import { ApiService } from './services/api.service';
import { AxiosService } from './services/axios.service';
import { PasswordModule } from 'primeng/password';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SqsService } from './services/sqs.service';

@NgModule({
  declarations: [AppComponent, FullCalendarComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PasswordModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    BrowserAnimationsModule,
  ],
  providers: [ApiService, AxiosService, ConfirmationService, SqsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
