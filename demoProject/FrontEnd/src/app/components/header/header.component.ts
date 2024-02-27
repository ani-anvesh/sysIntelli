import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  items: MenuItem[];

  constructor() {
    this.items = [
      {
        label: 'name',
      },
    ];
  }
}
