import { TestBed } from '@angular/core/testing';

import { TableBillService } from './table-bill.service';

describe('BillService', () => {
  let service: TableBillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableBillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
