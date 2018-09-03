import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  // given a username, requests server for groups user belongs to
  getGroups(username) {
    return this.http.get('/getGroups/' + username);
  }

  // given a group, requests server to add the group
  addGroup(group) {
    const body = JSON.stringify(group);
    return this.http.post('/addGroup', body, httpOptions);
  }

  // given a groupname, requests server to delete the group
  deleteGroup(groupname) {
    return this.http.delete('/deleteGroup/' + groupname);
  }

}
