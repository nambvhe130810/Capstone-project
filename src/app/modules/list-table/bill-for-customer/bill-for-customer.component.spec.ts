import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillForCustomerComponent } from './bill-for-customer.component';

describe('BillForCustomerComponent', () => {
  let component: BillForCustomerComponent;
  let fixture: ComponentFixture<BillForCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillForCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillForCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
