import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-screening-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-screening-report.component.html',
  styleUrls: ['./transaction-screening-report.component.css']
})
export class TransactionScreeningReportComponent {
  reportInfo = {
    fileId: 'F12345',
    fileName: 'Txn_Jan.csv',
    branchCode: 'BR001',
    uploadedBy: 'User1',
    uploadDate: '23-Aug-25',
    status: 'Passed'
  };

  get totalFlaggedTransactions(): number {
    return this.flaggedTransactions.length;
  }

  flaggedTransactions = [
    {
      id: 'F1324324214',
      date: '25-May-2025',
      branch: '999',
      customer: 'Nitesh Kumar',
      account: 'XX234234234XX',
      amount: 100000,
      riskScore: 70,
      flag: 'Loan Repayment in cash'
    },
    {
      id: 'F1324324215',
      date: '25-May-2025',
      branch: '999',
      customer: 'Nitesh Kumar',
      account: 'XX234234234XX',
      amount: 100000,
      riskScore: 70,
      flag: 'Integrated Cash Transaction below Threshold'
    },
    {
      id: 'F1324324216',
      date: '25-May-2025',
      branch: '999',
      customer: 'Nitesh Kumar',
      account: 'XX234234234XX',
      amount: 100000,
      riskScore: 70,
      flag: 'Large Bank Transaction in cash'
    },
    {
      id: 'F1324324217',
      date: '25-May-2025',
      branch: '999',
      customer: 'Nitesh Kumar',
      account: 'XX234234234XX',
      amount: 100000,
      riskScore: 70,
      flag: 'Loan Repayment in cash'
    },
    {
      id: 'F1324324218',
      date: '25-May-2025',
      branch: '999',
      customer: 'Nitesh Kumar',
      account: 'XX234234234XX',
      amount: 100000,
      riskScore: 70,
      flag: 'Loan Repayment in cash'
    },
    {
      id: 'F1324324219',
      date: '25-May-2025',
      branch: '999',
      customer: 'Nitesh Kumar',
      account: 'XX234234234XX',
      amount: 100000,
      riskScore: 70,
      flag: 'Loan Repayment in cash'
    }
  ];
}
