import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-logincompany',
  templateUrl: './logincompany.component.html',
  styleUrls: ['./logincompany.component.css'],
  providers: [ ProductService, AuthService]
})
export class LogincompanyComponent implements OnInit {
  company: String='';
  form;
  message;
  messageClass;
  processing = false;
  previousUrl;

  constructor(public authService: AuthService, private formBuilder: FormBuilder, public productService: ProductService
    , private router: Router) { this.createForm(); }
  createForm(){
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }
  disableForm(){
    this.form.controls['email'].disable();
    this.form.controls['password'].disable();
  }
  enableForm(){
    this.form.controls['email'].enable();
    this.form.controls['password'].enable();
  }

  onLoginSubmit(){
    
    this.disableForm();
    const user = {
      email: this.form.get('email').value,
      password: this.form.get('password').value
    }
    this.productService.LoginCompany(user.email, user.password)
    .then(data => { console.log(data),
      this.router.navigate(['/dashboard']);
    })
    .catch(error =>console.log(error))
    
  }
  ngOnInit() {
    this.authService.getProfile().subscribe(profile =>{
      this.company = profile.user.companyname;
    });
    }


}
