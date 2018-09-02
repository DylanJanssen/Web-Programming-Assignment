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

  username:string;
  public user; 
  public groups;

  constructor(private _userService: UserService, private _groupService: GroupService, private router:Router) { }

  ngOnInit() {
    if (!sessionStorage.getItem('username')){
      console.log('no user logged in');
      sessionStorage.clear();
      alert('Not a valid user!');
      this.router.navigateByUrl('login');
    }
    else{      
      // grab the username out of session storage
      this.username = sessionStorage.getItem('username');
      // get the user data from the server
      this.getUser(this.username);
      // get the relevant group data from the server
      this.getGroups(this.username);      
    }
  }

  getUser(username){
    this._userService.getUser(username).subscribe(
      data => { 
          this.user = data;
      },
      err => console.error(err),
      () => console.log('done loading user')
    )
  }

  getGroups(username){
    this._groupService.getGroups(username).subscribe(
      data => {
        this.groups = data
      },
      err => console.error(err),
      () => console.log('done loading users groups')
    )
  }

  addGroup(name, desc){
    console.log('adding group');
    const group = {
      name: name,
      desc: desc,
      users: ["Super"]
    }
    console.log(group);
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

  deleteGroup(group){
    this._groupService.deleteGroup(group).subscribe(
      data => {
        this.getGroups(this.username);
        return true;
      },
      error => {
        console.error(error);
      }
    )
  }

  addUser(username, email, rank){
    const user = {
      username: username,
      email: email,
      rank: rank
    }

    this._userService.addUser(user).subscribe(
      data => {
        this.getUser(this.username);
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
        this.getUser(this.user.username);
        return true;
      },
      error => {
        console.error('Error saving user');
      }
    );
  }

  logout() {
    // logout the user and go back to the login component
    sessionStorage.clear();
    console.log('Session cleared');
    this.router.navigateByUrl('login');
  }


}
