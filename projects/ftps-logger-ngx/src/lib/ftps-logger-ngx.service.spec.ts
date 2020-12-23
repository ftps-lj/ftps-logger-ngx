import { TestBed } from '@angular/core/testing';

import { FtpsLoggerService } from './ftps-logger-ngx.service';

describe('FtpsLoggerNgxService', () => {
  let service: FtpsLoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FtpsLoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
