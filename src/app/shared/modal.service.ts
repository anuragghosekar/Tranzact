import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DynamicTableModalComponent } from '../shared/dynamic-table-modal/dynamic-table-modal.component';

@Injectable({ providedIn: 'root' })
export class ModalService {
  constructor(private dialog: MatDialog) {}

  showTable(data: any[]) {
    this.dialog.open(DynamicTableModalComponent, {
      data,
      width: '500px'
    });
  }
}
