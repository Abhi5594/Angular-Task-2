import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusTableComponent } from './status-table.component';

describe('StatusTableComponent', () => {
  let component: StatusTableComponent;
  let fixture: ComponentFixture<StatusTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
