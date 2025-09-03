import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalCodesComponent } from './professional-codes.component';

describe('ProfessionalCodesComponent', () => {
  let component: ProfessionalCodesComponent;
  let fixture: ComponentFixture<ProfessionalCodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionalCodesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfessionalCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
