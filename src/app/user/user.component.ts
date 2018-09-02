import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public users;

  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this._userService.getUsers().subscribe(
      data => { this.users = data },
      err => console.error(err),
      () => console.log('done loading users')
    );
  }

  addUser(username, email, rank){
    const user = {
      username: username,
      email: email,
      rank: rank
    }

    this._userService.addUser(user).subscribe(
      data => {
        this.getUsers();
        return true;
      },
      error => {
        console.error(error);
      }
    );
  }

  updateUser(user){
    this._userService.updateUser(user).subscribe(
      data => {
        this.getUsers();
        return true;
      },
      error => {
        console.error('Error saving user');
      }
    );
  }
}
