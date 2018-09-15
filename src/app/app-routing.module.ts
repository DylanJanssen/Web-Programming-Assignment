import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { DashboardComponent } from './dashboard/dashboard.component'
import { LoginComponent } from './login/login.component'
import { ChannelComponent } from './channel/channel.component'
import { NewDashboardComponent } from './new-dashboard/new-dashboard.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'new-dashboard', component: NewDashboardComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'channel/:group/:channel', component: ChannelComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
