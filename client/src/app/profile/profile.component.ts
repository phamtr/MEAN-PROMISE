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

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(Profile =>{
      this.username = Profile.user.username;
      this.email = Profile.user.email;
    });
  }

}
