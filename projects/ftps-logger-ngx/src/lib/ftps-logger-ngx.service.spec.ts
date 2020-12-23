import { TestBed } from '@angular/core/testing';

import { FtpsLoggerNgxService } from './ftps-logger-ngx.service';

describe('FtpsLoggerNgxService', () => {
  let service: FtpsLoggerNgxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FtpsLoggerNgxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
