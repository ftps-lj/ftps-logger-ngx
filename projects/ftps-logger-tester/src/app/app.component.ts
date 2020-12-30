import { Component, OnInit } from '@angular/core';
import { FtpsLoggerService } from '../../../ftps-logger-ngx/src/lib/ftps-logger-ngx.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private logger: FtpsLoggerService) {}

  ngOnInit(): void {
    this.logger.saveConfig({ module: 'GLOBAL', level: '11111' });
    this.logger.logDebug('Test', 'Test Debug Message');
    this.logger.logSuccess('Test', 'Test Success Message');
    this.logger.logWarning('Test', 'Test Warning Message');
    this.logger.logError('Test', 'Test Error Message');
    this.logger.logInfo('Test', 'Test Info Message');
  }
}
