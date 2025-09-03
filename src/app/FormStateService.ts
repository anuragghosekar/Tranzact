// form-state.service.ts
import { Injectable } from '@angular/core';

interface FormState {
  data: any;
  screenMode: string;
}

@Injectable({
  providedIn: 'root',
})
export class FormStateService {
  private formStates: { [key: string]: FormState } = {};

  setFormState(formKey: string, formData: any, screenMode?: string) {
    if (!this.formStates[formKey]) {
      this.formStates[formKey] = { data: {}, screenMode: 'Inquiry' };
    }
    this.formStates[formKey].data = formData;
    if (screenMode !== undefined) {
      this.formStates[formKey].screenMode = screenMode;
    }
    console.log("inside setFormState",formKey,formData,screenMode);
  }

  getFormData(formKey: string): any {
    return this.formStates[formKey]?.data || null;
  }

  getScreenMode(formKey: string): string | null {
    return this.formStates[formKey]?.screenMode || null;
  }

  clearFormState(formKey: string) {
    delete this.formStates[formKey];
  }

  clearAll() {
    this.formStates = {};
  }
}
