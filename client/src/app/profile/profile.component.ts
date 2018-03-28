import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Profile } from 'selenium-webdriver/firefox';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username;
  email;
  admin: boolean = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile =>{
      this.username = profile.user.username;
      this.email = profile.user.email;
      this.admin = profile.user.admin;
    });
  }

}
