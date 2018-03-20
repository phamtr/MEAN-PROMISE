import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
userPosts;
  constructor(private authService: AuthService) { }
  getAllUsers(){
    this.authService.getAllUsers().subscribe(data => {
      this.userPosts = data.users;
    })
  }

  deleteUser(id){

  }

  ngOnInit() {
    this.getAllUsers();
  }

}
