import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userIsAuthenticated = false;
  private UserId = 'abc';

  get UserIsAuthenticated() {
    return this.userIsAuthenticated;
  }
  get userId() {
    return this.UserId;
  }
  constructor() { }
  login() {
    this.userIsAuthenticated = true;
  }
  logout() {
    this.userIsAuthenticated = false;
  }
}
