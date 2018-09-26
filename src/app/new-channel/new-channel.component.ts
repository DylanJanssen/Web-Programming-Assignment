import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { ChannelService } from '../channel.service'
import { Router } from '@angular/router'
import { UserService } from '../user.service';
import { GroupService } from '../group.service';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-new-channel',
  templateUrl: './new-channel.component.html',
  styleUrls: ['./new-channel.component.css']
})
export class NewChannelComponent implements OnInit {

  user
  usersInChannel
  usersNotInChannel
  messages
  message
  connection

  chatting = false

  @Input('group') group
  @Input('channel') channel
  @Output() channelDeletionEmitter = new EventEmitter()

  constructor(
    private _userService: UserService,
    private _groupService: GroupService,
    private _channelService: ChannelService,
    private router: Router,
    private _socketService: SocketService
  ) { }

  ngOnInit() {
    if (!sessionStorage.getItem('user')) {
      console.log('no user logged in')
      sessionStorage.clear()
      alert('Not a valid user!')
      this.router.navigateByUrl('login')
    }
    else {
      // grab the username out of session storage
      this.user = JSON.parse(sessionStorage.getItem('user'))
      this.message = ''
      this.messages = []
      this.getUsers()
    }
  }

  toggleChat() {
    if (this.chatting){
      this.chatting = false
      this.endChat()
    }
    else {
      this.chatting = true
      this.startChat()
    }
  }

  startChat() {
    // this grabs messages from the database
    this._socketService.getChannelMessages(this.channel._id).subscribe( message => {
      console.log(message)
      this.messages = message['messages']
    })

    //setup the socket
    this.connection = this._socketService.getMessages().subscribe(message => {
      this.messages.push(message)
      console.log(this.messages)
    })

    this._socketService.joinChannel(this.channel._id, this.user.username)
  }

  endChat() {
    this.connection.unsubscribe();
  }

  sendMessage() {
    // send a message to the server
    const message = 
      {
        message: this.user.username + ': ' + this.message,
        channelId: this.channel._id,
        userId: this.user._id,
        type: 'text',
        timestamp: Date.now(),
        photoId: null
      }
    
    this._socketService.sendMessage(message)
    this.message = ''
  }


  ngOnDestroy() {
    // when leaving this component, close the subscription
    if (this.connection) {
      this.connection.unsubscribe();
    }
  }


  getUsers() {
    this._userService.getUsers().subscribe(
      data => {
        const users = JSON.parse(data['users'])
        this.usersInChannel = users.filter(user => this.channel.userIds.includes(user._id))
        this.usersNotInChannel = users.filter(user => !this.channel.userIds.includes(user._id))
      },
      err => console.error(err),
      () => console.log('Done loading users')
    )
  }

  removeChannel() {
    this._channelService.removeChannel(this.channel._id).subscribe(
      data => {
        this.channelDeletionEmitter.emit()
        return true
      },
      error => {
        console.error(error)
      }
    )
  }

  addUserToChannel(userId) {
    // Add user to the group if they aren't already 
    if (!this.group.userIds.includes(userId)) {
      this.group.userIds.push(userId)
      this._groupService.updateGroup(this.group).subscribe(
        data => {
          return true
        },
        error => {
          console.error(error)
        }
      )
    }
    // Add the user ID to the channel
    this.channel.userIds.push(userId)
    this._channelService.updateChannel(this.channel).subscribe(
      data => {
        this.getUsers()
        return true
      },
      error => {
        console.error(error)
      }
    )
  }

  removeUserFromChannel(userId) {
    this.channel.userIds = this.channel.userIds.filter(id => id != userId)
    this._channelService.updateChannel(this.channel).subscribe(
      data => {
        this.getUsers()
        return true
      },
      error => {
        console.error(error)
      }
    )
  }

}
