import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private router: Router) {}

  platforms = [
    {
      name: 'FLEXCUBE Retail',
      logo: '../../assets/logo/Oracle Flexcube - Retail.png',
      description: 'Retail',
      url: 'https://ptc.com'
    },
    {
      name: 'FLEXCUBE Corporate',
      logo: '../../assets/logo/Oracle Flexcube - Retail.png',
      description: 'Corporate',
      url: 'https://www.oracle.com/industries/financial-services/flexcube/'
    },
    {
      name: 'B2PE',
      logo: '../../assets/logo/B2PE.png',
      description: 'Bulk Payment Processing Engine',
      url: 'https://accrevent.com'
    }
  ];

  openLink(url: string) {
    window.open(url, '_blank'); // Opens in a new tab
  }

  openAdminPanel() {
    this.router.navigate(['/admin']); // Navigate to Admin component
  }
}
