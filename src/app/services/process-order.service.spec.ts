import { TestBed } from '@angular/core/testing';

import { ProcessOrderService } from './process-order.service';

describe('ProcessOrderService', () => {
  let service: ProcessOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
