import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-deleteuser',
  templateUrl: './deleteuser.component.html',
  styleUrls: ['./deleteuser.component.css']
})
export class DeleteuserComponent implements OnInit {

  message;
  messageClass;
  foundUser = false;
  processing = false;
  user;
  currentUrl;

  constructor(public authService: AuthService,
  private activatedRoute: ActivatedRoute, private router: Router) { }

  deleteUser(){
    this.processing = true;
    this.authService.deleteUser(this.currentUrl.id).subscribe(data =>{
      if(!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
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
    });

  }

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.authService.getSingleUser(this.currentUrl.id).subscribe(data =>{
      if(!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      }else{
        this.user = {
          username: data.user.username,
          email: data.user.email,
          createdAt: data.user.createdAt
        }
        this.foundUser = true;
      }
    });
  }


}
