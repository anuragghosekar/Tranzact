import { CommonModule } from '@angular/common';
import { Component,Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Import AuthService
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.css'
})
export class MenuItemComponent {

  constructor(public router: Router, public authService: AuthService, public appcomponent: AppComponent) { }
  
    @Input() item: any;
  @Input() level: number = 0;

  

  toggleItem(item: any): void {
    item.expanded = !item.expanded;
  }

  selectItem(label: string): void {
    this.router.navigate(['/' + label.toLowerCase()]);
    console.log('Selected:', label);
  }

  isLeaf(item: any): boolean {
    return !item.children || item.children.length === 0;
  }
}
