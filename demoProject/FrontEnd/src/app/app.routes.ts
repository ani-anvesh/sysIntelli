import { Routes } from '@angular/router';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'home',
    canActivate: [AuthService],
    component: UploadFileComponent,
  },
];
