import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingRequestDialogComponent } from './booking-request-dialog.component';

describe('BookingRequestDialogComponent', () => {
  let component: BookingRequestDialogComponent;
  let fixture: ComponentFixture<BookingRequestDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingRequestDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingRequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
