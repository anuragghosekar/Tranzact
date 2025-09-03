import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dynamic-table-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
  ],
  template: `
    <div class="modal-header">
      <h2 mat-dialog-title>{{ title }}</h2>
      <button (click)="closeDialog()" class="small-icon-button" aria-label="Close dialog">
        <mat-icon>close</mat-icon>
      </button>
    </div>

    <div mat-dialog-content>
      <!-- For string or number array tables fallback -->
      <table *ngIf="isNumberArray()" mat-table [dataSource]="tableData" class="custom-table">
        <ng-container matColumnDef="value">
          <td mat-cell *matCellDef="let element">{{ element }}</td>
        </ng-container>
        <tr mat-row *matRowDef="let row; columns: ['value']" class="clickable-row" (click)="onRowClick(row)"></tr>
      </table>

      <table *ngIf="isStringArray()" mat-table [dataSource]="tableData" class="custom-table">
        <ng-container matColumnDef="value">
          <td mat-cell *matCellDef="let element">{{ element }}</td>
        </ng-container>
        <tr mat-row *matRowDef="let row; columns: ['value']" class="clickable-row" (click)="onRowClick(row)"></tr>
      </table>

      <!-- Object array table with 2 header rows -->
      <table *ngIf="!isStringArray() && !isNumberArray()" mat-table [dataSource]="dataSource" class="custom-table">

        <!-- Normal columns -->
        <ng-container *ngFor="let col of displayedColumns" [matColumnDef]="col">
          <th mat-header-cell *matHeaderCellDef>{{ formatHeader(col) }}</th>
          <td mat-cell *matCellDef="let row">{{ row[col] }}</td>
        </ng-container>

        <!-- Filter input columns -->
        <ng-container *ngFor="let col of displayedColumns" [matColumnDef]="col + '-filter'">
          <th mat-header-cell *matHeaderCellDef>
            <input
              matInput
              placeholder="Search"
              [(ngModel)]="filterValues[col]"
              (ngModelChange)="applyColumnFilter()"
              class="filter-input"
            />
          </th>
        </ng-container>

        <!-- Header row -->
        <tr mat-header-row *matHeaderRowDef="headerRowDef"></tr>
        <!-- Filter inputs row -->
        <tr mat-header-row *matHeaderRowDef="filterRowDef" class="filter-row"></tr>
        <!-- Data rows -->
        <tr mat-row *matRowDef="let row; columns: displayedColumns" class="clickable-row" (click)="onRowClick(row)"></tr>
      </table>
    </div>
  `,
  styles: [`
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 4px 8px;
      margin: 0;
      line-height: 1.2;
    }
    ::ng-deep h2[mat-dialog-title] {
      font-size: 16px;
      margin: 0;
      line-height: 1.2;
      font-weight: 500;
    }
    .small-icon-button {
      border: none;
      background: none;
      cursor: pointer;
      padding: 4px;
    }
    .custom-table {
      width: 100%;
      table-layout: fixed;
      border-collapse: collapse;
    }
    .mat-header-cell {
      font-weight: bold;
      padding: 8px 12px;
      border-bottom: 2px solid #3f51b5;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .mat-cell {
      padding: 8px 12px;
      overflow-wrap: anywhere;
    }
    .clickable-row {
      cursor: pointer;
      transition: background-color 0.2s;
    }
    .clickable-row:hover {
      background-color: #f1f1f1;
    }
    .filter-row .mat-header-cell {
      padding: 4px 8px;
      border-bottom: 1px solid #ccc;
    }
    .filter-input {
      width: 100%;
      height: 28px;
      font-size: 12px;
      padding: 2px 6px;
      box-sizing: border-box;
    }
  `]
})
export class DynamicTableModalComponent {
  tableData: any[] = [];
  displayedColumns: string[] = [];
  title: string = '';

  headerRowDef: string[] = [];
  filterRowDef: string[] = [];

  dataSource: any[] = [];
  filterValues: { [key: string]: string } = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { tableData: any; title: string },
    private dialogRef: MatDialogRef<DynamicTableModalComponent>
  ) {
    this.tableData = data.tableData || [];
    this.title = data.title || '';
    this.displayedColumns = this.tableData.length > 0 && typeof this.tableData[0] === 'object' ? Object.keys(this.tableData[0]) : [];

    this.headerRowDef = [...this.displayedColumns];
    this.filterRowDef = this.displayedColumns.map(col => col + '-filter');

    this.dataSource = [...this.tableData];

    this.displayedColumns.forEach(col => this.filterValues[col] = '');
  }

  onRowClick(row: any): void {
    this.dialogRef.close(row); // Return clicked row to caller
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  formatHeader(header: string): string {
    return header
      .replace(/([A-Z])/g, ' $1')         // insert space before capitals
      .replace(/^./, str => str.toUpperCase()); // capitalize first letter
  }

  isStringArray(): boolean {
    return this.tableData.length > 0 && typeof this.tableData[0] === 'string';
  }

  isNumberArray(): boolean {
    return this.tableData.length > 0 && typeof this.tableData[0] === 'number';
  }

  applyColumnFilter(): void {
    this.dataSource = this.tableData.filter(row =>
      this.displayedColumns.every(col => {
        const cellValue = (row[col] ?? '').toString().toLowerCase();
        const filterText = (this.filterValues[col] ?? '').toLowerCase();
        return cellValue.includes(filterText);
      })
    );
  }
}
