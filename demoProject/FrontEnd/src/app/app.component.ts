import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  isLoggedIn = false;
  title = 'FrontEnd';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  logout(): void {
    this.authService.logout().subscribe({
      next: (res) => {
        console.log(res);
        window.location.reload();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
