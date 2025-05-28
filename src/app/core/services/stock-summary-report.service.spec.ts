import { TestBed } from '@angular/core/testing';

import { StockSummaryReportService } from './stock-summary-report.service';

describe('StockSummaryReportService', () => {
  let service: StockSummaryReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockSummaryReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
