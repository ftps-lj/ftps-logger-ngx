import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FtpsLoggerNgxComponent } from './ftps-logger-ngx.component';

describe('FtpsLoggerNgxComponent', () => {
  let component: FtpsLoggerNgxComponent;
  let fixture: ComponentFixture<FtpsLoggerNgxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FtpsLoggerNgxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FtpsLoggerNgxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
