import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material'
import { UserService } from '../services/user.service';
import {MatCardModule} from '@angular/material/card'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private router: Router, private _userService: UserService) { }

  username: string;
  password: string;

  ngOnInit() {
  }

  login(): void {
    const userCredentials = { username: this.username, password: this.password }
    this._userService.loginUser(userCredentials).subscribe(
      data => {
        if (data['success']) {
          sessionStorage.setItem('user', data['user'])
          this.router.navigateByUrl('/new-dashboard')
        }
        else {
          alert("Invalid credentials");
        }
      },
      error => {
        console.error(error);
      }
    )
    
  }
}
