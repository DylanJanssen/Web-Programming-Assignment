import { Component, OnInit, Inject } from '@angular/core'
import { GroupService } from '../group.service'
import { Router } from '@angular/router'
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material'

export interface DialogData {
  newGroupName: string
}

@Component({
  selector: 'app-new-dashboard',
  templateUrl: './new-dashboard.component.html',
  styleUrls: ['./new-dashboard.component.css']
})
export class NewDashboardComponent implements OnInit {

  public user
  public groups
  public newGroup

  constructor(private _groupService: GroupService, private router: Router, public dialog: MatDialog) { }

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
      this.getUserGroups(this.user._id)
    }
  }

  addGroupDialog() {
    const dialogRef = this.dialog.open(AddGroupDialog, {
      width: '250px',
      data: { newGroup: this.newGroup }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('dialog closed')
        this.newGroup = result
        this.createGroup(this.newGroup)
      }
    })
  }

  getUserGroups(userId) {
    this._groupService.getUserGroups(userId).subscribe(
      data => {
        this.groups = JSON.parse(data['groups'])
      },
      err => console.error(err),
      () => console.log('Done loading users groups')
    )
  }

  createGroup(groupName) {
    const group = 
      {
          name: groupName,
          userIds: [this.user._id]
      }
  
    this._groupService.createGroup(group).subscribe(
      data => {
        this.getUserGroups(this.user._id)
        return true
      },
      error => {
        console.log(error)
      }
    )
  }

  groupDeletionHandler(event) {
    this.getUserGroups(this.user._id)
  }

  logout() {
    sessionStorage.clear();
    console.log('Session cleared');
    this.router.navigateByUrl('login');
  }
}

@Component({
  selector: 'add-group-dialog',
  templateUrl: './new-dashboard.component-dialog.html',
})
export class AddGroupDialog {
  constructor(
    public dialogRef: MatDialogRef<AddGroupDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick() {
    this.dialogRef.close()
  }

}
