import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  message;
  messageClass;
  user;
  processing = false;
  currentUrl;
  loading = true;

  constructor(private location: Location
  , private activatedRoute: ActivatedRoute
, public authService: AuthService,
private router: Router) { }
updateUserSubmit(){
this.processing = true;
this.authService.editUser(this.user).subscribe(data =>{
  if(!data.success){
    this.messageClass = 'alert alert-danger';
    this.message = data.message;
    this.processing = false;
  }else{
    this.messageClass = 'alert alert-success';
    this.message = data.message;
    setTimeout(() =>{
      this.router.navigate(['/user']);
    }, 2000)
  }
})

}
  goBack(){
this.location.back();
  }
  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.authService.getSingleUser(this.currentUrl.id).subscribe(data =>{
      if(!data.success){
        this.messageClass ="alert alert-danger";
        this.message = 'User not found.';

      }else{
        this.user = data.user;
        this.loading = false;
      }
     
    });
  }

}
