import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public user
  public users
  @Output() usersUpdateEmitter = new EventEmitter()

  constructor(private _userService: UserService, private router: Router) { }

  ngOnInit() {
    if (!sessionStorage.getItem('user')) {
      console.log('no user logged in')
      sessionStorage.clear()
      alert('Not a valid user!')
      this.router.navigateByUrl('login')
    }
    else {
      // grab the username out of session storage
      this.user = JSON.parse(sessionStorage.getItem('user'))
      this.getUsers()
    }
  }

  getUsers() {
    this._userService.getUsers().subscribe(
      data => {
        this.users = JSON.parse(data['users'])
      },
      err => console.error(err),
      () => console.log('Done loading users')
    )
  }

  save(user) {
    this._userService.updateUser(user).subscribe(
      data => {
        this.usersUpdateEmitter.emit()
        return true
      },
      err => console.error(err),
      () => console.log('saved')
    )
  }

  removeUser(userId) {
    this._userService.removeUser(userId).subscribe(
      data => {
        this.usersUpdateEmitter.emit()
        this.getUsers()
        return true
      },
      err => console.error(err),
      () => console.log('saved')
    )
  }

}


