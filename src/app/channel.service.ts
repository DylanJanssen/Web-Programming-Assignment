import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application.json' })
};

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor(private http: HttpClient) { }

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
