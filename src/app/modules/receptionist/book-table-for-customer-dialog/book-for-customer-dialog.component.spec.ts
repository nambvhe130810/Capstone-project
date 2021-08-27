import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookForCustomerDialogComponent } from './book-for-customer-dialog.component';

describe('BookForCustomerDialogComponent', () => {
  let component: BookForCustomerDialogComponent;
  let fixture: ComponentFixture<BookForCustomerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookForCustomerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookForCustomerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
