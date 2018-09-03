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

}
