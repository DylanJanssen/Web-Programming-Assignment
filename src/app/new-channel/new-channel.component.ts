import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { ChannelService } from '../services/channel.service'
import { Router } from '@angular/router'
import { UserService } from '../services/user.service';
import { GroupService } from '../services/group.service';
import { SocketService } from '../services/socket.service';
import { ImgUploadService } from '../services/img-upload.service'

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
  selectedFile = null
  imagepath = ''
  messageUser

  chatting = false

  @Input('group') group
  @Input('channel') channel
  @Output() channelDeletionEmitter = new EventEmitter()

  constructor(
    private _userService: UserService,
    private _groupService: GroupService,
    private _channelService: ChannelService,
    private router: Router,
    private _socketService: SocketService,
    private _imgUploadService: ImgUploadService
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

      // this grabs messages from the database
      this._socketService.getChannelMessages(this.channel._id).subscribe(message => {
        console.log(message)
        this.messages = message['messages']
      })
    }
  }

  toggleChat() {
    if (this.chatting) {
      this.chatting = false
      this.endChat()
    }
    else {
      this.chatting = true
      this.startChat()
    }
  }

  startChat() {
    //setup the socket
    this.connection = this._socketService.getMessages().subscribe(message => {
      this.messages.push(message)
      console.log(this.messages)
    })

    this._socketService.joinChannel(this.channel._id, this.user.username)

    // send a connected message to the server
    const message =
    {
      message: this.user.username + ' has connected',
      channelId: this.channel._id,
      userId: '0',
      type: 'text',
      timestamp: Date.now(),
      image: null
    }

    this._socketService.sendMessage(message)
    this.message = ''
  }

  endChat() {
    // send a connected message to the server
    const message =
    {
      message: this.user.username + ' has disconnected',
      channelId: this.channel._id,
      userId: '0',
      type: 'text',
      timestamp: Date.now(),
      image: null
    }

    this._socketService.sendMessage(message)
    this.message = ''
    this.connection.unsubscribe();
  }

  onFileSelected(event) {
    console.log(event)
    this.selectedFile = event.target.files[0]
    console.log(this.selectedFile)
  }

  onUpload() {
    const fd = new FormData()
    fd.append('image', this.selectedFile, this.selectedFile.name)
    this._imgUploadService.imgUpload(fd).subscribe(res => {
      if (res['image']) {
        this.imagepath = res['image']

        const message =
        {
          message: null,
          channelId: this.channel._id,
          userId: this.user._id,
          type: 'image',
          timestamp: Date.now(),
          image: this.imagepath
        }
        this._socketService.sendMessage(message)
      }
      this.selectedFile = null
    })
  }

  sendMessage() {
    if (!this.chatting) {
      return
    }
    // send a message to the server
    const message =
    {
      message: this.message,
      channelId: this.channel._id,
      userId: this.user._id,
      type: 'text',
      timestamp: Date.now(),
      image: null
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

  getUser(message) {
    if (message.userId === '0') {
      return {
        username: "[SERVER]",
        password: null,
        email: null,
        rank: null,
        image: 'server.svg'
      }
    }
    this.messageUser = this.usersInChannel.find(obj => obj._id === message.userId)
    return this.messageUser
  }

}
