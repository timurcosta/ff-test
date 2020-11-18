import { ErrorHandler, Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private message: NzMessageService) {}

  handleError(error: Error): void {
    this.message.create('error', error.message || 'Undefined client error');
  }
}
