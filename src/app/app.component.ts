import { Component } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd, Event } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { SessionLogService } from './session-log-services';
import { filter } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, SidebarComponent, CommonModule,MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-absa';
  isAuthenticated = false;
  isSidebarOpen = true;
  firstLogin: boolean = false;

  openWindows: { path: string; title: string }[] = [];
  activePath: string = '';

  maxVisibleTabs = 5;

  get visibleTabs() {
    return this.openWindows.slice(0, this.maxVisibleTabs);
  }

  get overflowTabs() {
    return this.openWindows.length > this.maxVisibleTabs
      ? this.openWindows.slice(this.maxVisibleTabs)
      : [];
  }

  constructor(
    private authService: AuthService,
    public router: Router,
    private sessionLogService: SessionLogService
  ) {
    this.authService.isAuthenticated$.subscribe(status => {
      this.isAuthenticated = status;
    });

     this.authService.logout$.subscribe(() => {
    this.openWindows = [];
    this.activePath = '';
  });

  

    this.router.events
      .pipe(filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(event => {
        const path = event.urlAfterRedirects;
        this.trackOpenedRoutes(path);
        this.activePath = path;
        this.sessionLogService.logRoute(path);
        
      });
  }

 ngOnInit() {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
       document.body.className = savedTheme;
    }
  }
  }

  


  isLoginPage(): boolean {
    return this.router.url === '/';
  }

  toggleSidebar() {
    console.log('Sidebar toggle clicked');
  }

  private trackOpenedRoutes(path: string) {
  if (!path || path === '/' || !this.shouldTrackRoute(path)) return;

  const exists = this.openWindows.find(win => win.path === path);
  if (!exists) {
    const title = this.getTitleFromRoute(path);
    this.openWindows.push({ path, title });
  }
}


  private shouldTrackRoute(path: string): boolean {
    return path !== '/dashboard';
  }

  private getTitleFromRoute(path: string): string {
    const cleanPath = decodeURIComponent(path.replace('/', ''));
    return cleanPath
      .replace(/[-_]/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  activateWindow(path: string) {
    this.router.navigateByUrl(path);
  }

  closeWindow(path: string) {
    this.openWindows = this.openWindows.filter(win => win.path !== path);

    if (this.activePath === path) {
      const fallback = this.openWindows.length > 0 ? this.openWindows[0].path : '/dashboard';
      this.activePath = fallback;
      this.router.navigateByUrl(fallback);
    }
  }

  shouldShowFooter(): boolean {
    const hiddenRoutes = ['/', '/dashboard', '/login'];
    return !hiddenRoutes.includes(this.router.url);
  }

  showInfoDialog = false;
showThemeDialog = false;

openInfoDialog() {
  this.showInfoDialog = true;
}

openThemeDialog() {
  this.showThemeDialog = true;
}

// applyTheme(theme: string) {
//   document.body.classList.remove('theme-aqua', 'theme-crimson', 'theme-midnight');

//   if (theme === 'light') {
//     document.body.classList.add('theme-aqua');
//   } else if (theme === 'dark') {
//     document.body.classList.add('theme-crimson');
//   } else if (theme === 'blue') {
//     document.body.classList.add('theme-midnight');
//   }

//   if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
//     localStorage.setItem('selectedTheme', theme);
//   }

//   this.showThemeDialog = false;
// }

applyTheme(theme: string) {
  document.body.className = theme;

    // Save preference
     if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
     localStorage.setItem('selectedTheme', theme);
  }
  this.showThemeDialog = false;
  }



}
