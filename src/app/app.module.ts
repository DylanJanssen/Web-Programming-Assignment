import { BrowserModule } from '@angular/platform-browser'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { SocketService } from './socket.service'
import { NgModule } from '@angular/core'
import { CustomMaterialModule } from './core/material.module'
import {MatCardModule} from '@angular/material/card'
import { AppComponent } from './app.component'
import { AppRoutingModule } from './/app-routing.module'
import { HttpClientModule } from '@angular/common/http'
import { HttpModule } from '@angular/http'
import { FormsModule } from '@angular/forms'
import { UserService } from './user.service'
import { LoginComponent } from './login/login.component'
import { DashboardComponent } from './dashboard/dashboard.component'

import { GroupComponent } from './group/group.component'
import { ChannelComponent } from './channel/channel.component';
import { NewDashboardComponent, AddGroupDialog, CreateNewUserDialog } from './new-dashboard/new-dashboard.component';
import { NewGroupComponent, AddChannelDialog } from './new-group/new-group.component';
import { NewChannelComponent } from './new-channel/new-channel.component';
import { AdminComponent } from './admin/admin.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    GroupComponent,
    ChannelComponent,
    NewDashboardComponent,
    NewGroupComponent,
    NewChannelComponent, 
    AddGroupDialog,
    AddChannelDialog,
    CreateNewUserDialog,
    AdminComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    CustomMaterialModule
  ],
  entryComponents: [NewDashboardComponent, AddGroupDialog, AddChannelDialog, CreateNewUserDialog],
  providers: [
    SocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
