import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';
import { DynamicTableModalComponent } from '../shared/dynamic-table-modal/dynamic-table-modal.component';

@Component({
  selector: 'app-professional-codes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule
  ],
  templateUrl: './professional-codes.component.html',
  styleUrl: './professional-codes.component.css'
})
export class ProfessionalCodesComponent {


  professionMaintainanceForm: FormGroup;
  modules = ['current', 'saving']
  options = ['25', '260', '12'];

  ModificationOptions = ['Inquiry', 'Add', 'Modify', 'Delete'];
  selectedOption = 'Inquiry';
  screenMode = '';

  ctrUpdateSrlNo!: number;

  constructor(private fb: FormBuilder, private http: HttpClient, private dialog: MatDialog,) {
    this.professionMaintainanceForm = this.fb.group({
      professionCode: ['', [
        Validators.required,
        Validators.pattern(/^\d+$/),
        Validators.maxLength(4)
      ]],
      professionName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]*$')
        , Validators.maxLength(40)]],
    });
  }
  ngOnInit(): void {
    // Apply initial state based on default selection
    this.onOptionChange(this.selectedOption);
  }

  handleOk() {
    
    if (this.professionMaintainanceForm.valid) {
      console.log('Form Submitted:', this.professionMaintainanceForm.value);
      

      if (this.screenMode == 'Inquiry') {
        this.getProfessionDetails();
      } else if (this.screenMode == 'Add') {
        this.addprofessionDetails();
      }else if(this.screenMode == 'Modify'){
        this.modifyProfessionDetails();
      }else if(this.screenMode == 'Delete'){
        this.deleteProfessionDetails();
      }

    } else {
      this.professionMaintainanceForm.markAllAsTouched(); // Show all validation errors
      return;
    }
  }

  handleCancel() {
    this.professionMaintainanceForm.reset();
  }
  field: string = '';
  fieldoptions: string[] = [...this.options];
  filterOptions() {
    const input = this.field.toLowerCase();
    this.fieldoptions = this.options.filter(option =>
      option.toLowerCase().includes(input)
    );
  }

  onOptionChange(value: string): void {
    this.screenMode = value;
    console.log("inside onOptionChnage", value);
    if (value === 'Inquiry') {
      console.log("Inside onOptionChange if block", value);
      Object.keys(this.professionMaintainanceForm.controls).forEach(controlName => {
        if (controlName !== 'professionCode') {
          this.professionMaintainanceForm.get(controlName)?.disable();
        }
      });
      this.professionMaintainanceForm.reset();


    } else if (value === 'Delete') {
      console.log("Inside onOptionChange if block", value);
      Object.keys(this.professionMaintainanceForm.controls).forEach(controlName => {
        if (controlName !== 'professionCode') {
          this.professionMaintainanceForm.get(controlName)?.disable();
        }
      });
      this.professionMaintainanceForm.reset();


    }
     else {

      Object.keys(this.professionMaintainanceForm.controls).forEach(controlName => {
        if (controlName !== 'professionCode') {
          this.professionMaintainanceForm.get(controlName)?.enable();
        }
      });
      this.professionMaintainanceForm.reset();


    }
  }

  getProfessionDetails(): void {

    if(this.screenMode == 'Add'){
      return;
    }
    console.log("getProfessionDetails get called");
    const id = this.professionMaintainanceForm.get('professionCode')?.value;
    this.http.get<any>(`/api-local/getDetails/${id}`).subscribe({
      next: (response) => {

        if (!response || Object.keys(response).length === 0) {
          // Handle 204 No Content or empty response
          this.showMessage('Record not found', 'error'); // Or your message display method
          return;
        }
       
         this.ctrUpdateSrlNo = response.ctrUpdatSrlno;
        const tableData = [{
          professionName:response.txtProfession,
          professoinCode:response.txtProfessCat
        }];
        
        
        const dialogRef = this.dialog.open(DynamicTableModalComponent, {
                  data: {
                    tableData: tableData,
                    title: 'Professional Details'
                  },
                  width: '600px'
                });
        
                dialogRef.afterClosed().subscribe(result => {
        
                  if (result) {
                    console.log("The result  is ====", result);
                    // this.callCustomerDetailsAPI(result);
                     this.professionMaintainanceForm.patchValue({
                         professionCode: result.professoinCode,
                        professionName: result.professionName
                      });
                  }
                });

      },

      
      error: (error) => {
        console.error('Error fetching profession details:', error);
      }
    });
  }

  showMessage(message: string, type: 'success' | 'error' = 'error'): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { message, type }
    });
  }

  addprofessionDetails(): void {

    const payload = {
      txtProfessCat: this.professionMaintainanceForm.get('professionCode')?.value,
      txtProfession: this.professionMaintainanceForm.get('professionName')?.value
    };

    this.http.post<any>('/api-local/addDetails', payload,{responseType: 'text' as 'json'}).subscribe({
      next: (response: any) => {
        const parsed = JSON.parse(response);
        if (parsed.message) {
          this.showMessage('Record added successfully', 'success');
          this.professionMaintainanceForm.reset(); // Success: Record added
        } else {
          this.showMessage('Record processed successfully.', 'success');
        }
      },
      error: (error) => {
        // Handle 400 with a text response like "Record Already Exists"
        if (error.status === 400 && typeof error.error === 'string') {
          console.log('inside first block:', error.error);
          if (error.message === "Unexpected token 'R', \"Record Alr\"... is not valid JSON") {
            this.showMessage('Record is already added', 'error');
          } else {
            this.showMessage(error.error, 'error');
          } // e.g. "Record Already Exists"
          this.showMessage(error.error, 'error');
          this.professionMaintainanceForm.reset();
        } else {
          console.log('inside fallback block');
          this.showMessage('An unexpected error occurred.', 'error');
        }
        console.error('API error:', error);
      }
    });
  }


  modifyProfessionDetails(): void {
    const payload = {
      txtProfessCat: this.professionMaintainanceForm.get('professionCode')?.value,
      txtProfession: this.professionMaintainanceForm.get('professionName')?.value,
      ctrUpdatSrlno: this.ctrUpdateSrlNo,
      message: 'Record found' // or omit if backend doesn't need it
    };
  
    this.http.put<any>('/api-local/modifyDetails', payload).subscribe({
      next: (response) => {
        if (response?.message === 'Record updated') {
          this.showMessage('Record updated successfully','success');
          this.professionMaintainanceForm.reset();
        } else {
          this.showMessage(response.message || 'Unexpected response','error');
        }
      },
      error: (err) => {
        console.error('PUT error:', err);
        this.showMessage('Error occurred while updating record','error');
      }
    });
  }

  deleteProfessionDetails(): void {

    const cat = this.professionMaintainanceForm.get('professionCode')?.value;
   const srlno = this.ctrUpdateSrlNo;
    const url = `/api-local/deleteDetails?cat=${cat}&srlno=${srlno}`;
  
    this.http.delete(url, { responseType: 'text' }).subscribe({
      next: (response: string) => {
        console.log('Delete response:', response);
        this.showMessage(response,'success'); 
        this.professionMaintainanceForm.reset();// Show the plain text message
      },
      error: (err) => {
        console.error('Delete error:', err);
        this.showMessage('Error deleting record.','error');
      }
    });
  }
  
  
}
