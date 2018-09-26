import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import * as io from 'socket.io-client';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})

export class SocketService {
  private url = "http://localhost:3000";
  private socket;
  constructor(private http: HttpClient) { }

  joinChannel(channelId, username) {
    this.socket.emit('enter-channel', {
      channelId, username
    })
  }

  disconnectChannel(channelId, username) {
    this.socket.emit('disconnect', {
      channelId, username
    })
  }

  sendMessage(message){
    this.socket.emit('add-message', message);
  }

  getMessages(){
    let obmessages = new Observable(
      // 'observer' is a javascript object that defines the handlers for the notifications that it will receive
      observer => {
        this.socket = io();
        // listen for 'new-message' event from the server
        this.socket.on('message', data => {
          observer.next(data);
        });
        // when the observer ends (unsubscribed) then disconnect the socket
        return () => {
          this.socket.disconnect();
        }
      }
    )
    return obmessages;
  }

  getChannelMessages(channelId) {
    return this.http.get('getChannelMessages/' + channelId)
  }
}