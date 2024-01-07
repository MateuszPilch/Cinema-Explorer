import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  errorMessages: string[] = [];

  constructor() {}

  getErrorMessages(): string[] {
    return this.errorMessages;
  }

  setErrorMessages(errorMessages: string | string[]): void {
    this.clearErrorMessages();
    
    if(typeof(errorMessages) === 'string') {
      this.errorMessages.push(errorMessages);
    } else {
      this.errorMessages.push(...errorMessages);
    }

    setTimeout(() => {
      this.clearErrorMessages();
    }, 5000);
  }

  clearErrorMessages(): void {
    this.errorMessages = [];
  }
}
