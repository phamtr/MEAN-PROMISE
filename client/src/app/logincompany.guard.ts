import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ProductService } from '../app/product.service';

@Injectable()
export class LogincompanyGuard implements CanActivate {
  redirectUrl;
  constructor(private productService: ProductService, private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if(this.productService.getUserLogin()){
      return true;
  }else{
      this.redirectUrl = state.url;
      this.router.navigate(['/dashboard']);
      return false;
  }
  }
}
