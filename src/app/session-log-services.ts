// session-log.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SessionLogService {
  private username: string = '';
  private loginTime: Date | null = null;
  private logoutTime: Date | null = null;
  private visitedRoutes: string[] = [];

  startSession(username: string) {
    console.log("inside startsession function username is ",username);
    this.username = username;
    this.loginTime = new Date();
    this.visitedRoutes = [];
  }

  logRoute(route: string) {
    const decodedRoute = decodeURIComponent(route); // ✅ fix the %20
   this.visitedRoutes.push(`${new Date().toLocaleTimeString()} - ${decodedRoute}`);
  }

  endSession() {
    this.logoutTime = new Date();
  }

  generateLogFileContent(): string {
    let content = `User: ${this.username}\n`;
    content += `Login Time: ${this.loginTime?.toLocaleString()}\n`;
    content += `Logout Time: ${this.logoutTime?.toLocaleString()}\n\n`;
    content += `Visited Routes:\n`;
    content += this.visitedRoutes.join('\n');
    return content;
  }

  saveToLocalStorage() {
    localStorage.setItem(
      `userSessionLog_${this.username}`,
      this.generateLogFileContent()
    );
  }

  downloadLogFile() {
    const content = this.generateLogFileContent();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `session_log_${this.username}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
