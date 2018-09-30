import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor(private http: HttpClient) { }

  getChannels() {
    return this.http.get('/getChannels')
  }

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

}
