import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthHttp, AuthConfig, tokenNotExpired } from 'angular2-jwt';


@Injectable()
export class AuthService {

  domain = "http://localhost:8080/";
  authToken;
  user;
  options;
  euser;

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

registerUser(user){
return this.http.post(this.domain + 'authentication/register', user).map(res => res.json());
}

checkUsername(username){
  return this.http.get(this.domain + 'authentication/checkUsername/' + username).map(res => res.json());
  }
  
  checkEmail(email){
    return this.http.get(this.domain + 'authentication/checkEmail/' + email).map(res => res.json());
    }

    login(user){
      return this.http.post(this.domain + 'authentication/login', user).map(res =>res.json());
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

  getProfile(){
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'authentication/profile', this.options).map(res => res.json());
  }

getPublicProfile(username){
  this.createAuthenticationHeaders();
  return this.http.get(this.domain + 'authentication/publicProfile/' + username, this.options).map(res =>res.json());
}
getAllUsers(){
  this.createAuthenticationHeaders();
  return this.http.get(this.domain + 'authentication/allUsers', this.options).map(res => res.json());
}
  loggedIn(){
    return tokenNotExpired();
  }
  editUser(euser) {
    this.createAuthenticationHeaders();
    return this.http.put(this.domain + 'authentication/updateUser/' + euser._id, euser, this.options).map(res => res.json());
  }
  deleteUser(id){
    this.createAuthenticationHeaders();
    return this.http.delete(this.domain + 'blogs/deleteUser/' + id, this.options).map(res =>res.json());
  }
  getSingleUser(id){
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'authentication/singleUser/' + id, this.options).map(res =>res.json());
  }
  
}
