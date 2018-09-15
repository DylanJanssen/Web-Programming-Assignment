import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  username: string;
  public user;
  public users;
  public groups;

  constructor(private _userService: UserService, private _groupService: GroupService, private router: Router) { }

  ngOnInit() {
    if (!sessionStorage.getItem('username')) {
      console.log('no user logged in');
      sessionStorage.clear();
      alert('Not a valid user!');
      this.router.navigateByUrl('login');
    }
    else {
      // grab the username out of session storage
      this.username = sessionStorage.getItem('username');
    }
  }

  // User services ----------
  getUser(username) {
    this._userService.getUser(username).subscribe(
      data => {
        this.user = data;
        this.getGroups(this.username);
        this.getUsers();
      },
      err => console.error(err),
      () => console.log('done loading user')
    )
  }

  getUsers() {
    this._userService.getUsers().subscribe(
      data => {
        this.users = data;
      },
      err => console.error(err),
      () => console.log('done loading users')
    );
  }

  promoteUser(user, rank) {
    user.rank = rank;
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

  updateUser(user) {
    this._userService.updateUser(user).subscribe(
      data => {
        this.getUser(this.user.username);
        return true;
      },
      error => {
        console.error('Error saving user');
      }
    );
  }

  deleteUser(username) {
    this._userService.deleteUser(username).subscribe(
      data => {
        this.getUsers();
        return true;
      },
      error => {
        console.error("Error deleting user");
      }
    );
  }

  // group services ----------
  getGroups(username) {
    this._groupService.getGroups(username).subscribe(
      data => {
        this.groups = data
      },
      err => console.error(err),
      () => console.log('done loading users groups')
    )
  }

  addGroup(name, desc, username) {
    const group = {
      name: name,
      desc: desc,
      users: [username]
    }
    this._groupService.addGroup(group).subscribe(
      data => {
        this.getGroups(this.username);
        return true;
      },
      error => {
        console.error(error);
      }
    );
  }

  //------ Handler for when a group is deleted
  groupDeletionHandler(event) {
    this.getGroups(this.username);
  }

  // logout the user and go back to the login component
  logout() {
    sessionStorage.clear();
    console.log('Session cleared');
    this.router.navigateByUrl('login');
  }

}
