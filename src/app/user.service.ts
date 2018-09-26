import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  loginUser(userCredentials) {
    const body = JSON.stringify(userCredentials)
    return this.http.post('/login', body, httpOptions)
  }

  createUser(user) {
    const body = JSON.stringify(user)
    return this.http.post('/createUser', body, httpOptions)
  }

  removeUser(userId) {
    return this.http.delete('/removeUser/' + userId)
  }

  // given a username, requests server for user object
  getUser(username) {
    return this.http.get('/getUser/' + username);
  }

  getUsers() {
    return this.http.get('/getUsers');
  }

  // given a user object, sends to server to update corresponding user
  updateUser(user) {
    let body = JSON.stringify(user);
    return this.http.post('/updateUser', body, httpOptions);
  }

  // given a username, sends to server to remove the corresponding user
  deleteUser(username) {
    return this.http.delete('/deleteUser/' + username);
  }

}
