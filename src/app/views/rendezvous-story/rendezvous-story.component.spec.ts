import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendezvousStoryComponent } from './rendezvous-story.component';

describe('RendezvousStoryComponent', () => {
  let component: RendezvousStoryComponent;
  let fixture: ComponentFixture<RendezvousStoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RendezvousStoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RendezvousStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
