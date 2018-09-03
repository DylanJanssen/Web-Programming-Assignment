import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { GroupService } from '../group.service';
import { ChannelService } from '../channel.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  public groupname;
  public channelname;
  public channel;

  constructor(
    private _userService: UserService,
    private _groupService: GroupService,
    private _channelService: ChannelService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.groupname = params['group'];
      this.channelname = params['channel'];
      this.getChannel(this.groupname, this.channelname);
    })
  }

  getChannel(groupname, channelname) {
    this._channelService.getChannel(groupname, channelname).subscribe(
      data => {
        this.channel = data
        console.log(this.channel);
      },
      err => console.error(err),
      () => console.log('done loading channel users')
    )
  }

}
