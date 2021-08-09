import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  phoneSignIn = false;
  constructor() { }

  public isAuthenticated(): Boolean {
    // const token = localStorage.getItem('token');
    // return !this.jwtHelper.isTokenExpired(token);
    const expireTime = localStorage.getItem('session');
    let user;
    if (localStorage.getItem("user")) {
      user = JSON.parse(localStorage.getItem("user"));
    }
    // return true
    if (expireTime) {
      return (parseInt(expireTime) > (new Date()).getTime())
    }
    return false;
  }
}
