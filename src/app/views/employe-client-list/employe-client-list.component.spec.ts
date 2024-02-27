import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeClientListComponent } from './employe-client-list.component';

describe('EmployeClientListComponent', () => {
  let component: EmployeClientListComponent;
  let fixture: ComponentFixture<EmployeClientListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeClientListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeClientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
