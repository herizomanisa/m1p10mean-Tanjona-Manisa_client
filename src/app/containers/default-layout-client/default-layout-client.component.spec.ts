import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultLayoutClientComponent } from './default-layout-client.component';

describe('DefaultLayoutClientComponent', () => {
  let component: DefaultLayoutClientComponent;
  let fixture: ComponentFixture<DefaultLayoutClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultLayoutClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DefaultLayoutClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
