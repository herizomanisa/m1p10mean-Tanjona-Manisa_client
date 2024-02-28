import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultLayoutEmployeComponent } from './default-layout-employe.component';

describe('DefaultLayoutEmployeComponent', () => {
  let component: DefaultLayoutEmployeComponent;
  let fixture: ComponentFixture<DefaultLayoutEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultLayoutEmployeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DefaultLayoutEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
