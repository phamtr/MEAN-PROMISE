import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService }  from './auth.service';
import { isNull } from 'util';

@Injectable()
export class StaffcompanyGuard implements CanActivate {
  redirectUrl;
  staff: Boolean = false;
 companyname: String ='';
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      this.authService.getProfile().subscribe(profile =>{
        this.companyname = profile.user.companyname;
      });
      if(this.companyname != ''){
         return true;
     }else{
     
         return false;
     }
  }
}
