import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployePreferenceComponent } from './employe-preference.component';

describe('EmployePreferenceComponent', () => {
  let component: EmployePreferenceComponent;
  let fixture: ComponentFixture<EmployePreferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployePreferenceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployePreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
