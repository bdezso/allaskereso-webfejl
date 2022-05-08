import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCreatingComponent } from './job-creating.component';

describe('JobCreatingComponent', () => {
  let component: JobCreatingComponent;
  let fixture: ComponentFixture<JobCreatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobCreatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobCreatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
