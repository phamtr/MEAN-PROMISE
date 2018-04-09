import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AuthHttp, AuthConfig, tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class ProductService {
 private isUserLogin;
  domain = "http://localhost:3000/";
  user;
  

  constructor(private http: Http) { 
    this.isUserLogin = false;
  }


userSignup(user){
  return this.http.post(this.domain + 'user/signup', user)
  .toPromise()
  .then(res => res.json())
  .then(resJson => resJson.user);
  }
  login(user){
    return this.http.post(this.domain + 'user/login', user)
    .toPromise()
  .then(res => res.json())
  .then(resJson => resJson.user);
  }
  LoginCompany(email: string, password: string) {
    const body = JSON.stringify({ email, password});
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post('http://localhost:3000/user/login', body, { headers })
    .toPromise()
    .then(res => {
      this.isUserLogin = true;
      res.text();
    });
}
  
getUserLogin(){
  return this.isUserLogin;
}
}
