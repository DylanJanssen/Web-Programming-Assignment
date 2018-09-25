import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor(private http: HttpClient) { }

  getUserGroupChannels(userId, groupId) {
    return this.http.get('/getUserGroupChannels/' + groupId + '/' + userId)
  }

  createChannel(channel) {
    const body = JSON.stringify(channel)
    return this.http.post('/createChannel', body, httpOptions)
  }

  removeChannel(channelId) {
    return this.http.delete('/removeChannel/' + channelId)
  }

  updateChannel(channel) {
    const body = JSON.stringify(channel)
    return this.http.post('/updateChannel', body, httpOptions)
  }

  getChannels(groupname, username) {
    console.log(groupname);
    console.log(username);
    return this.http.get('/getChannels/' + groupname + '/' + username);
  }

  getChannel(groupname, channelname) {
    console.log(groupname);
    console.log(channelname);
    return this.http.get('/getChannel/' + groupname + '/' + channelname);
  }

  addChannel(groupname, channelname, username) {
    return this.http.post('/addChannel/' + groupname + '/' + channelname + '/' + username, httpOptions);
  }

  deleteChannel(groupname, channelname) {
    return this.http.delete('/deleteChannel/' + groupname + '/' + channelname);
  }

  kickUser(user, groupname, channelname) {
    return this.http.delete('/deleteChannelUser/' + groupname + '/' + channelname + '/' + user);
  }

  addUser(user, groupname, channelname) {
    return this.http.post('/addChannelUser/' + groupname + '/' + channelname + '/' + user, httpOptions);
  }

}
