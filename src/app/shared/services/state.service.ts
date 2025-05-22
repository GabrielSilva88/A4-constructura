import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor() { }

  get token(): string {
    return sessionStorage.getItem('token') || '';
  }

  set token(value: string) {
    sessionStorage.setItem('token', value);
  }
}
