import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { GroupService } from '../group.service';
import { ChannelService } from '../channel.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  username: string;
  @Input('group') group;
  @Input('user') user;
  @Output() groupDeletionEmitter = new EventEmitter();
  public channels;

  constructor(
    private _userService: UserService,
    private _groupService: GroupService,
    private _channelService: ChannelService,
    private router: Router,
  ) { }

  ngOnInit() {
    // get the channel data from the server
    this.getChannels(this.group.name, this.user.username);
  }

  getChannels(groupname, username) {
    this._channelService.getChannels(groupname, username).subscribe(
      data => {
        this.channels = data
      },
      err => console.error(err),
      () => console.log('done loading channels')
    )
  }

  deleteGroup(groupname) {
    this._groupService.deleteGroup(groupname).subscribe(
      data => {
        this.groupDeletionEmitter.emit();
        return true;
      },
      error => {
        console.error(error);
      }
    )
  }

}
