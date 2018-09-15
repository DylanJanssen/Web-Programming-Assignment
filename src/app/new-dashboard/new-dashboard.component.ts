import { Component, OnInit } from '@angular/core'
import { GroupService } from '../group.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-dashboard',
  templateUrl: './new-dashboard.component.html',
  styleUrls: ['./new-dashboard.component.css']
})
export class NewDashboardComponent implements OnInit {

  public user
  public groups

  constructor(private _groupService: GroupService, private router: Router) { }

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
      console.log(this.user)
      this.getUserGroups(this.user._id)
    }
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

}
