import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Import AuthService
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';
import { SessionLogService } from '../session-log-services'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule, MatDialogModule,
    ErrorDialogComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;
  showWelcome : boolean = true;

  // validUsername: string = 'admin';
  // validPassword: string = 'admin123';

  validUsername: string = 'CHIBEU41';
  validPassword: string = 'Foundation123';

  constructor(private router: Router, private authService: AuthService,private http: HttpClient,private dialog: MatDialog,private sessionLogService: SessionLogService) {}

  ngOnInit() {
    // Show animation for 3 seconds before displaying the form
    setTimeout(() => {
      this.showWelcome  = false;
    }, 3000);
  }

  showMessage(message: string, type: 'success' | 'error' = 'error'): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { message, type }
    });
  }
  
  onSubmit() {
    if (this.username === this.validUsername && this.password === this.validPassword) {
      this.authService.login(); 
      this.authService.setUsername(this.username);
      this.sessionLogService.startSession(this.username);// Set authentication status
      this.router.navigate(['/dashboard']); // Redirect to dashboard
    } else {
      alert('Please enter a valid username and password.');
    }



    
    // this.http.post('/api-login/Login/validate', {
    //   username: this.username,
    //   password: this.password
    // }).subscribe({
    //   next: (res) => console.log('Login successful:', res),
    //   error: (err) => console.error('Login failed:', err)
    // });

    // this.http.post<{ message: string }>('/api-login/Login/validate', {
    //   username: this.username,
    //   password: this.password
    // }).subscribe({
    //   next: (res) => {
    //     if (res.message === 'Login successful') {
    //       this.authService.setUsername(this.username);
    //       this.authService.login();
    //       this.sessionLogService.startSession(this.username);
    //       this.router.navigate(['/dashboard']);
    //     } else {
    //       this.showMessage('Login failed. Please try again.', 'error');
    //     }
    //   },
    //   error: (err) => {
    //     console.error('Login failed:', err);
    //     let msg = 'Login failed. Please try again.';
    //     if (err.status === 401) {
    //       msg = 'Unauthorized: Incorrect username or password.';
    //     }
    //     //this.showMessage(msg, 'error');
    //     // console.log("the username in login.ts",this.username)
    //     // this.authService.login();
    //     // this.authService.setUsername(this.username);
        

          
       
    //       // this.router.navigate(['/dashboard']);
    
    //   }
    // });
    

   
    
  }
}
