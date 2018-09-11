import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material'
import { UserService } from '../user.service';

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
          sessionStorage.setItem('username', data['username'])
          sessionStorage.setItem('email', data['email'])
          this.router.navigateByUrl('/dashboard');
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
