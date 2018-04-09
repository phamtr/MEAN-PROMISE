import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username;
  email;
  admin: boolean = false;
  companyname: String;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile =>{
      this.username = profile.user.username;
      this.email = profile.user.email;
      this.admin = profile.user.admin;
      this.companyname = profile.user.companyname;

    });
  }

}
