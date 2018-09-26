import { Component, OnInit, Inject } from '@angular/core'
import { GroupService } from '../group.service'
import { UserService } from '../user.service'
import { Router } from '@angular/router'
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material'
import { AlertPromise } from 'selenium-webdriver';

export interface DialogData {
  newGroupName: string
}

export interface newUserDialogData {
  newUsername: string
  newUserEmail: string
  newUserPassword: string
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
  public newUser

  constructor(private _userService: UserService, private _groupService: GroupService, private router: Router, public dialog: MatDialog) { }

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

  createNewUserDialog() {
    const dialogRef = this.dialog.open(CreateNewUserDialog, {
      data: { }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result.username != null && result.password != null && result.email != null && result.rank != null) {
        console.log('dialog closed')
        //console.log(result)
        //this.newGroup = result
        this.createUser(result)
        this.getUserGroups(this.user._id)
      }
      else {
        alert('Invalid User')
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

  createUser(user) {
    this._userService.createUser(user).subscribe(
      data => {
        if (data['success']){
          alert("User Created")
        }
        else {
          alert("Invalid User")
        }
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

  usersUpdateHandler(event) {
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

@Component({
  selector: 'create-user-dialog',
  templateUrl: './create-new-user-dialog.html',
})
export class CreateNewUserDialog {
  constructor(
    public dialogRef: MatDialogRef<CreateNewUserDialog>,
    @Inject(MAT_DIALOG_DATA) public data: newUserDialogData) { }

  onNoClick() {
    this.dialogRef.close()
  }

}
