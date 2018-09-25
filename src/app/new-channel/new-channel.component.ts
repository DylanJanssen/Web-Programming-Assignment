import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { ChannelService } from '../channel.service'
import { Router } from '@angular/router'
import { UserService } from '../user.service';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-new-channel',
  templateUrl: './new-channel.component.html',
  styleUrls: ['./new-channel.component.css']
})
export class NewChannelComponent implements OnInit {

  public user
  public usersInChannel
  public usersNotInChannel

  @Input('group') group
  @Input('channel') channel
  @Output() channelDeletionEmitter = new EventEmitter()

  constructor(private _userService: UserService, private _groupService: GroupService, private _channelService: ChannelService, private router: Router) { }

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
      this.getUsers()
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
    if (!this.group.userIds.includes(userId)){
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
