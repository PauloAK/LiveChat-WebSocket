import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  buildErrorMessage(response : any) : string {
    let messages = [];

    if (response.status === 400 && response.error) {
      response.error.forEach(element => {
        messages.push(element.message)
      });
    }

    return messages.join("\n");
  }
}