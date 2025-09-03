import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-screening',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './transaction-screening.component.html',
  styleUrls: ['./transaction-screening.component.css']
})
export class TransactionScreeningComponent {
  transactionScreeningForm: FormGroup;
  activeTab: string = 'summary';
  selectedFile: File | null = null;

  mockFiles = [
    {
      id: 'F1324324211',
      name: 'Txn_Jan.CSV',
      branch: '999',
      transactions: 30000,
      uploadedBy: 'User 1',
      uploadDateTime: '23-Jan-2024',
      screeningStatus: 'Passed',
      alertsFound: 42
    },
    {
      id: 'F1324324212',
      name: 'Txn_Jan.CSV',
      branch: '999',
      transactions: 40000,
      uploadedBy: 'User 1',
      uploadDateTime: '23-Jan-2024',
      screeningStatus: 'Failed',
      alertsFound: 500
    },
    {
      id: 'F1324324213',
      name: 'Txn_Jan.CSV',
      branch: '999',
      transactions: 30000,
      uploadedBy: 'User 1',
      uploadDateTime: '23-Jan-2024',
      screeningStatus: 'Pending Screen',
      alertsFound: 42
    },
    {
      id: 'F1324324214',
      name: 'Txn_Jan.CSV',
      branch: '999',
      transactions: 30000,
      uploadedBy: 'User 1',
      uploadDateTime: '23-Jan-2024',
      screeningStatus: 'Passed',
      alertsFound: 42
    }
  ];

  totalFiles: number = this.mockFiles.length;
  lastUpload: string = this.mockFiles[0].uploadDateTime;

  constructor(private fb: FormBuilder) {
    this.transactionScreeningForm = this.fb.group({
      file: ['', Validators.required],
      uploadedBy: ['', Validators.required],
      uploadStatus: [''],
      uploadDate: [''],

      fileId: [''],
      fileName: [''],
      branchCode: [''],
      status: [''],
      dateFrom: [''],
      dateTo: [''],
      userId: ['']
    });
  }

  // Event Handlers
  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      const allowedTypes = ['text/csv', 'application/vnd.ms-excel'];
      const maxSize = 5 * 1024 * 1024; // 5 MB

      if (!allowedTypes.includes(file.type)) {
        alert('Only CSV files are allowed.');
        this.transactionScreeningForm.patchValue({ file: '' });
        return;
      }

      if (file.size > maxSize) {
        alert('File size should not exceed 5MB.');
        this.transactionScreeningForm.patchValue({ file: '' });
        return;
      }

      this.selectedFile = file;
      this.transactionScreeningForm.patchValue({ file: file.name });
    }
  }

  onSelectFile() {
    console.log('Select File:', this.transactionScreeningForm.value);
  }

  onUpload() {
    if (this.transactionScreeningForm.invalid) return;

    this.transactionScreeningForm.patchValue({
      uploadStatus: 'Uploaded',
      uploadDate: new Date().toISOString().split('T')[0]
    });

    console.log('Upload File:', this.transactionScreeningForm.value);
  }

  onRunScan() {
    this.transactionScreeningForm.patchValue({
      file: '',
      uploadStatus: '',
      uploadedBy: '',
      uploadDate: ''
    });
    this.transactionScreeningForm.markAsPristine();
    console.log('Scan Run initiated');
  }

  onViewScanReport() {
    console.log('View Scanned File');
  }

  onSearch() {
    console.log('Search:', this.transactionScreeningForm.value);
  }

  onResetSearch() {
    this.transactionScreeningForm.patchValue({
      fileId: '',
      fileName: '',
      branchCode: '',
      status: '',
      dateFrom: '',
      dateTo: '',
      userId: ''
    });
  }

  onViewDetails(file: any) {
    console.log('Viewing:', file);
  }

  onSubmit() {
    console.log('Submit:', this.transactionScreeningForm.value);
  }

  onCancel() {
    console.log('Cancel clicked');
  }
}
