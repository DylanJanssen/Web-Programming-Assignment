import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  getGroups() {
    return this.http.get('getGroups')
  }

  getUserGroups(userId) {
    return this.http.get('getUserGroups/' + userId)
  }

  createGroup(group) {
    const body = JSON.stringify(group)
    return this.http.post('/createGroup', body, httpOptions)
  }

  removeGroup(groupId) {
    return this.http.delete('/removeGroup/' + groupId)
  }

  updateGroup(group) {
    const body = JSON.stringify(group)
    return this.http.post('/updateGroup', body, httpOptions)
  }

}
