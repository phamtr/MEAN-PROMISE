import { Component, OnInit } from '@angular/core';
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
  euser;
  processing = false;
  currentUrl;
  loading = true;

  constructor(private location: Location
  , private activatedRoute: ActivatedRoute
, public authService: AuthService,
private router: Router) { }
updateUserSubmit(){
this.processing = true;
this.authService.editUser((this.euser)).subscribe(data =>{
  console.log((this.euser));
  if(!data.success){
    this.messageClass = 'alert alert-danger';
    this.message = data.message;
    this.processing = false;
  }else{
    this.messageClass = 'alert alert-success';
    this.message = data.message;
    var promise = new Promise((resolve, reject) => {
      setTimeout(() => {
       this.router.navigate(['/user']);
      resolve();
      }, 1000);
      });      
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
          this.euser = data.user;
          this.loading = false;
        }
       
      });
    }
  

}
