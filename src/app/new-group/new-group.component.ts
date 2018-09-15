import { Component, OnInit, Input } from '@angular/core';
import { ChannelService } from '../channel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css']
})
export class NewGroupComponent implements OnInit {

  public user
  public channels
  @Input('group') group

  constructor(private _channelService: ChannelService, private router: Router) { }

  ngOnInit() {
    if (!sessionStorage.getItem('username')) {
      console.log('no user logged in')
      sessionStorage.clear()
      alert('Not a valid user!')
      this.router.navigateByUrl('login')
    }
    else {
      // grab the username out of session storage
      this.user = JSON.parse(sessionStorage.getItem('user'))
      this.getUserGroupChannels(this.user._id, this.group._id)
    }
  }

  getUserGroupChannels(userId, groupId) {
    this._channelService.getUserGroupChannels(userId, groupId).subscribe(
      data => {
        this.channels = JSON.parse(data['channels'])
      },
      err => console.error(err),
      () => console.log('Done loading users group channels')
    )
  }

}
