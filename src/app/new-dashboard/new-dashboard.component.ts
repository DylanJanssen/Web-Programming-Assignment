import { Component, OnInit, Inject } from '@angular/core'
import { GroupService } from '../services/group.service'
import { UserService } from '../services/user.service'
import { Router } from '@angular/router'
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material'
import { ImgUploadService } from '../services/img-upload.service';

export interface DialogData {
  newGroupName: string
}

export interface newUserDialogData {
  newUsername: string
  newUserEmail: string
  newUserPassword: string
}

export interface updateAvatarDialogData {
  selectedFile: string
  imagePath: string
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

  constructor(
    private _userService: UserService,
    private _groupService: GroupService,
    private router: Router,
    private _imgUploadService: ImgUploadService,
    public dialog: MatDialog) { }

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
      data: {}
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result.username != null && result.password != null && result.email != null && result.rank != null) {
        console.log('dialog closed')
        this.createUser(result)
        this.getUserGroups(this.user._id)
      }
      else {
        alert('Invalid User')
      }
    })
  }

  updateAvatarDialog() {
    const dialogRef = this.dialog.open(UpdateAvatarDialog, {
      width: '500px',
      data: {}
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result.selectedFile != null) {
        console.log('dialog closed')
        this.updateAvatar(result.selectedFile)
      }
    })
  }



  getUserGroups(userId) {
    if (this.user.rank === 'Group' || this.user.rank === 'Super') {
      this._groupService.getGroups().subscribe(
        data => {
          this.groups = JSON.parse(data['groups'])
        },
        err => console.error(err),
        () => console.log('Done loading users groups')
      )
    }
    else {
      this._groupService.getUserGroups(userId).subscribe(
        data => {
          this.groups = JSON.parse(data['groups'])
        },
        err => console.error(err),
        () => console.log('Done loading users groups')
      )
    }
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
        if (data['success']) {
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

  updateAvatar(selectedFile) {
    // upload the image
    const fd = new FormData()
    fd.append('image', selectedFile, selectedFile.name)
    this._imgUploadService.imgUpload(fd).subscribe(res => {
      if (res['image']) {
        this.user.image = res['image']
        console.log(this.user)
        this._userService.updateUser(this.user).subscribe(
          data => {
            if (data['success']) {
              alert("Avatar updated")
              this.ngOnInit()
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
    })
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

@Component({
  selector: 'update-avatar-dialog',
  templateUrl: './update-avatar-dialog.html',
})
export class UpdateAvatarDialog {
  constructor(
    public dialogRef: MatDialogRef<UpdateAvatarDialog>,
    @Inject(MAT_DIALOG_DATA) public data: updateAvatarDialogData) { }

  onNoClick() {
    this.dialogRef.close()
  }

  onFileSelected(event) {
    this.data.selectedFile = event.target.files[0]
  }
}
