import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { ProfessionalCodesComponent } from './professional-codes/professional-codes.component';
import { AppInfoComponent } from './app-info/app-info.component';
import { AppThemeComponent } from './app-theme/app-theme.component';
import { TransactionScreeningComponent } from './transaction-screening/transaction-screening.component';
import { TransactionScreeningReportComponent } from './transaction-screening-report/transaction-screening-report.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'transaction screening', component: TransactionScreeningComponent, canActivate: [AuthGuard] },
  { path: 'transaction screening report', component: TransactionScreeningReportComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' } // Redirect any unknown route to login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
