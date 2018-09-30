import { BrowserModule } from '@angular/platform-browser'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { SocketService } from './services/socket.service'
import { NgModule } from '@angular/core'
import { CustomMaterialModule } from './core/material.module'
import { AppComponent } from './app.component'
import { AppRoutingModule } from './/app-routing.module'
import { HttpClientModule } from '@angular/common/http'
import { HttpModule } from '@angular/http'
import { FormsModule } from '@angular/forms'
import { UserService } from './services/user.service'
import { LoginComponent } from './login/login.component'
import { NewDashboardComponent, AddGroupDialog, CreateNewUserDialog, UpdateAvatarDialog } from './new-dashboard/new-dashboard.component'
import { NewGroupComponent, AddChannelDialog } from './new-group/new-group.component'
import { NewChannelComponent } from './new-channel/new-channel.component'
import { AdminComponent } from './admin/admin.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NewDashboardComponent,
    NewGroupComponent,
    NewChannelComponent, 
    AddGroupDialog,
    AddChannelDialog,
    CreateNewUserDialog,
    UpdateAvatarDialog,
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
  entryComponents: [NewDashboardComponent, AddGroupDialog, AddChannelDialog, UpdateAvatarDialog, CreateNewUserDialog],
  providers: [
    SocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
