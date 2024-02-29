import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendezvousMyListComponent } from './rendezvous-my-list.component';

describe('RendezvousMyListComponent', () => {
  let component: RendezvousMyListComponent;
  let fixture: ComponentFixture<RendezvousMyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RendezvousMyListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RendezvousMyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
