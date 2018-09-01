import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  // Uses http.get() to load data from a single API endpoint
  getUsers(){
    return this.http.get('http://localhost:3000/api/users');
  }
}
