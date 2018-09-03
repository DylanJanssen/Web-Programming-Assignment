import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';

  constructor(private router: Router, private form: FormsModule) { }

  ngOnInit() {
  }

  loginUser(event) {
    event.preventDefault();
    sessionStorage.setItem("username", this.username);
    this.router.navigateByUrl('/dashboard');
  }
}
