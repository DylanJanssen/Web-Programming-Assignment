import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { ChannelService } from '../channel.service';
import { Router } from '@angular/router';
import { GroupService } from '../group.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material'

export interface DialogData {
  newChannelName: string
}

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css']
})
export class NewGroupComponent implements OnInit {

  public user
  public channels
  public newChannel

  @Input('group') group
  @Output() groupDeletionEmitter = new EventEmitter()

  constructor(
    private _groupService: GroupService, 
    private _channelService: ChannelService, 
    private router: Router,
    public dialog: MatDialog
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
      this.getUserGroupChannels(this.user._id, this.group._id)
    }
  }

  addChannelDialog() {
    const dialogRef = this.dialog.open(AddChannelDialog, {
      width: '250px',
      data: { newChannel: this.newChannel }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('dialog closed')
        this.newChannel = result
        this.createChannel(this.newChannel)
      }
    })
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

  createChannel(channelName) {
    const channel = 
      {
          name: channelName,
          groupId: this.group._id,
          userIds: [this.user._id]
      }

    this._channelService.createChannel(channel).subscribe(
      data => {
        this.getUserGroupChannels(this.user._id, this.group._id)
        return true
      },
      error => {
        console.log(error)
      }
    )
  }

  channelDeletionHandler(event) {
    this.getUserGroupChannels(this.user._id, this.group._id)
  }

  removeGroup() {
    this._groupService.removeGroup(this.group._id).subscribe(
      data => {
        this.groupDeletionEmitter.emit()
        return true
      },
      error => {
        console.error(error)
      }
    )
  }

}

@Component({
  selector: 'add-channel-dialog',
  templateUrl: './new-group.component-dialog.html',
})
export class AddChannelDialog {
  constructor(
    public dialogRef: MatDialogRef<AddChannelDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick() {
    this.dialogRef.close()
  }

}
