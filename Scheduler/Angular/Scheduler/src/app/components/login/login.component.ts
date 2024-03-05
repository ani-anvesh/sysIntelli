import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public loginForm!: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit(): void {
    let email = this.loginForm.get('email')!.value;
    let password = this.loginForm.get('password')!.value;
    console.log(email, password);
    if (email && password) {
      this.authService.login(email, password).subscribe({
        next: (data) => {
          this.tokenService.saveUser(data);
          this.isLoginFailed = !data.Auth;
          this.isLoggedIn = data.Auth;
          if (this.isLoggedIn) {
            this.router.navigate(['/scheduler']);
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
