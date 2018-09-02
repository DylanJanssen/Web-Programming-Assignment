import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http:HttpClient) { }

  getGroups(username){
    return this.http.get('/getGroups/' + username);
  }

  addGroup(group){
    const body = JSON.stringify(group);
    return this.http.post('/addGroup', body, httpOptions);
  }

  deleteGroup(group){
    return this.http.delete('/deleteGroup/' + group.name);
  }
}
