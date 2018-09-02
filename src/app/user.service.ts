import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getUsers(){
    return this.http.get('/getUsers');
  }

  getUser(username){
    return this.http.get('/getUser/' + username);
  }

  addUser(user){
    let body = JSON.stringify(user);
    return this.http.post('/addUser', body, httpOptions);
  }

  updateUser(user){
    let body = JSON.stringify(user);
    return this.http.post('/updateUser/' + user.id, body, httpOptions);
  }

}
