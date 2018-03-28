import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService }  from './auth.service';


@Injectable()
export class AdminguardService {
admin: boolean=false;
    constructor(private authService: AuthService, private router: Router) { }
    canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      this.authService.getProfile().subscribe(profile =>{
        this.admin = profile.user.admin;
      });
      if(this.admin){
         return true;
     }else{
         
         return false;
     }
    }

}
