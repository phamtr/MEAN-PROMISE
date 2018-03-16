import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthHttp, AuthConfig, tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class ProductService {

  domain = "http://localhost:3000/";
  authToken;
  user;
  options;

  constructor(private http: Http) { }
createAuthenticationHeaders(){
this.loadToken();
this.options = new RequestOptions({
  headers: new Headers({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': this.authToken
  })
});
}
loadToken(){
  const token = localStorage.getItem('token');
  this.authToken = token;
}

userSignup(user){
  return this.http.post(this.domain + 'user/signup', user).map(res => res.json());
  }
  login(user){
    return this.http.post(this.domain + 'user/login', user).map(res =>res.json());
  }
  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
  storeUserData(token, user){
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
      }   
}
