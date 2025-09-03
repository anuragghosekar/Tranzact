import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from '../app.routes';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) {
    // Navigate to login page after animation (3 seconds)
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 3000);
  }
}
