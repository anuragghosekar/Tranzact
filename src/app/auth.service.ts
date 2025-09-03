import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable, Subject, fromEvent, merge, Subscription, timer } from 'rxjs';
import { SessionLogService } from '../app/session-log-services';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
  private usernameSubject = new BehaviorSubject<string | null>(null);
  private logoutSubject = new Subject<void>();
  logout$ = this.logoutSubject.asObservable();

  private inactivityTimerSubscription: Subscription | null = null;
  private userActivityEventsSubscription: Subscription | null = null;
  private readonly INACTIVITY_TIMEOUT = 5 * 60 * 1000; // 5 minutes

  constructor(
    private sessionLogService: SessionLogService,
    private ngZone: NgZone ,private router: Router// prevents Angular change detection overload
  ) {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const storedAuth = sessionStorage.getItem('isAuthenticated');
      if (storedAuth === 'true') {
        this.isAuthenticatedSubject.next(true);
        this.initInactivityWatcher(); // start timer on refresh if already logged in
      }

      const storedUsername = sessionStorage.getItem('username');
      if (storedUsername) {
        this.usernameSubject.next(storedUsername);
      }
    }
  }

  login(): void {
    this.isAuthenticatedSubject.next(true);
    sessionStorage.setItem('isAuthenticated', 'true');
    this.initInactivityWatcher(); // Start inactivity watcher on login
  }

  logout(): void {
    this.isAuthenticatedSubject.next(false);
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('username');
    this.sessionLogService.endSession();
    this.sessionLogService.downloadLogFile();
    this.sessionLogService.saveToLocalStorage();
    localStorage.clear();
    this.logoutSubject.next();
    this.stopInactivityWatcher(); // Stop watcher on logout
  }

  setUsername(username: string): void {
    sessionStorage.setItem('username', username);
    this.usernameSubject.next(username);
  }

  getUsernameObservable(): Observable<string | null> {
    return this.usernameSubject.asObservable();
  }

  /** Inactivity timer methods **/

  private initInactivityWatcher(): void {
    this.ngZone.runOutsideAngular(() => {
      const activityEvents = merge(
        fromEvent(document, 'mousemove'),
        fromEvent(document, 'keydown'),
        fromEvent(document, 'click'),
        fromEvent(document, 'touchstart')
      );

      this.userActivityEventsSubscription = activityEvents.subscribe(() => this.resetInactivityTimer());
      this.resetInactivityTimer(); // Start initial timer
    });
  }

  private resetInactivityTimer(): void {
    this.inactivityTimerSubscription?.unsubscribe();
  
    const now = new Date();
    console.log(`[Inactivity Watcher] Timer reset at: ${now.toLocaleTimeString()}`);
  
    this.inactivityTimerSubscription = timer(this.INACTIVITY_TIMEOUT).subscribe(() => {
      this.ngZone.run(() => {
        const logoutTime = new Date();
        console.warn(`[Inactivity Watcher] No activity detected since ${now.toLocaleTimeString()}. Logging out at: ${logoutTime.toLocaleTimeString()}`);
        this.logout();
        this.router.navigate(['/']);
      });
    });
  }
  

  private stopInactivityWatcher(): void {
    this.inactivityTimerSubscription?.unsubscribe();
    this.userActivityEventsSubscription?.unsubscribe();
    this.inactivityTimerSubscription = null;
    this.userActivityEventsSubscription = null;
  }
}
