import { Component, EventEmitter, Output, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule, formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Output() toggleSidebarEvent = new EventEmitter<void>();
  @Output() openInfo = new EventEmitter<void>();
  @Output() openTheme = new EventEmitter<void>();

  username: string | null = '';
  todayFormatted: string;
  user: any = {};
  currentTime: Date = new Date();

  isProfileMenuOpen = false;
  showPrevDetails = false;
  showDetails = true;
  showDropdown = false;
  showAboutDropdown = false;
  activeModal: 'info' | 'theme' | null = null;

  showNotifications = false;
  notifications: { message: string; time: Date }[] = [
    { message: 'New login from Lagos branch', time: new Date() },
    { message: 'Password will expire in 3 days', time: new Date(Date.now() - 2 * 60 * 60 * 1000) }
  ];

  // searchQuery: string = '';
  // showSearchDropdown = false;

  // allPages = [
  //   { label: 'Dashboard', path: '/dashboard' },
  //   { label: 'Transactions', path: '/transaction screening' },
  //   { label: 'Reports', path: '/reports' },
  //   { label: 'User Management', path: '/users' },
  //   { label: 'Settings', path: '/settings' },
  //   { label: 'Audit Trail', path: '/audit' },
  //   { label: 'Branch Lookup', path: '/branches' }
  // ];

  // filteredPages: { label: string; path: string }[] = [];

  constructor(
    public router: Router,
    public authService: AuthService,
    private http: HttpClient
  ) {
    const today = new Date();
    this.todayFormatted = formatDate(today, 'dd/MM/yyyy', 'en-US');
  }

  ngOnInit(): void {
    this.authService.getUsernameObservable().subscribe((uname) => {
      this.username = uname;
      console.log('Username received in Dashboard:', this.username);
    });

    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }

  toggleSidebar() {
    this.toggleSidebarEvent.emit();
  }

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  handleLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  togglePreviousDetails() {
    this.showPrevDetails = !this.showPrevDetails;
    this.showDetails = !this.showDetails;
  }

  getUserDetails(userId: string | null): void {
    const url = `/api-local/users/${userId}`;

    this.http.get<any[]>(url).subscribe(
      (response) => {
        if (response && response.length > 0) {
          this.user = response[0];
        }
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  openModal(type: 'info' | 'theme') {
    this.activeModal = type;
    this.showDropdown = false;
  }

  closeModal() {
    this.activeModal = null;
  }

  applyTheme(theme: string) {
    console.log(`Applied ${theme} theme`);
    this.closeModal();
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  // filterPages() {
  //   const query = this.searchQuery.toLowerCase();
  //   this.filteredPages = this.allPages.filter(page =>
  //     page.label.toLowerCase().includes(query)
  //   );
  // }

  // navigateToPage(page: { label: string; path: string }) {
  //   this.router.navigate([page.path]);
  //   this.searchQuery = '';
  //   this.filteredPages = [];
  //   this.showSearchDropdown = false;
  // }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (!target.closest('.actions')) {
      this.showDropdown = false;
    }

    if (!target.closest('.notification-wrapper')) {
      this.showNotifications = false;
    }

    // if (!target.closest('.search-box')) {
    //   this.showSearchDropdown = false;
    // }
  }
}
