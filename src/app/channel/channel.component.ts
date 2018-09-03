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

  username: string;
  public user;
  public groupname;
  public channelname;
  public channel;
  public messages = ["Just some mock messages", "That's all this is", "Isn't that great"];
  public message;

  constructor(
    private _userService: UserService,
    private _groupService: GroupService,
    private _channelService: ChannelService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (!sessionStorage.getItem('username')) {
      console.log('no user logged in');
      sessionStorage.clear();
      alert('Not a valid user!');
      this.router.navigateByUrl('login');
    }
    else {
      // grab the username out of session storage
      this.username = sessionStorage.getItem('username');
      // get the user data from the server
      this.getUser(this.username);
      this.route.params.subscribe(params => {
        this.groupname = params['group'];
        this.channelname = params['channel'];
        this.getChannel(this.groupname, this.channelname);
      });
    }
  }

  // User services ----------
  getUser(username) {
    this._userService.getUser(username).subscribe(
      data => {
        this.user = data;
      },
      err => console.error(err),
      () => console.log('done loading user')
    )
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

  kickUser(user) {
    this._channelService.kickUser(user, this.groupname, this.channelname).subscribe(
      data => {
        this.getChannel(this.groupname, this.channelname);
      },
      err => console.error(err),
      () => console.log(user + "kicked from " + this.channelname)
    )
  }

  addUser(user) {
    this._channelService.addUser(user, this.groupname, this.channelname).subscribe(
      data => {
        this.getChannel(this.groupname, this.channelname);
      },
      err => console.error(err),
      () => console.log(user + "kicked from " + this.channelname)
    )
  }


  sendMessage() {
    this.messages.push(this.message);
    this.message = '';
  }

  return() {
    this.router.navigateByUrl('/dashboard');
  }

}
