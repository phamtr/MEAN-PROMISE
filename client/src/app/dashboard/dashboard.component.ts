import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ AuthService]
})
export class DashboardComponent implements OnInit {
  company: String='';
  constructor(public authService: AuthService, public productService: ProductService) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile =>{
      this.company = profile.user.companyname;
    });
   
  }

  staffLogin(): Boolean{
    if(this.company.length === 0){
      return false;
  }else{
      
      return true;
  }
  }

}
