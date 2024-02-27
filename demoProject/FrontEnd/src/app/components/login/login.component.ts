import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  password: string = '';
  form: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    const { email, password } = this.form.value;
    console.log(email, password);
    if (email && password) {
      this.authService.login(email, password).subscribe({
        next: (data) => {
          this.tokenService.saveUser(data);
          this.isLoginFailed = !data.Auth;
          this.isLoggedIn = data.Auth;
          if (this.isLoggedIn) {
            this.router.navigate(['/home']);
          }
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        },
      });
    }
  }

  reloadPage(): void {
    window.location.reload();
  }
}
