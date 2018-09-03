import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AppComponent } from './app.component'
import { AppRoutingModule } from './/app-routing.module'
import { HttpClientModule } from '@angular/common/http'
import { HttpModule } from '@angular/http'
import { FormsModule } from '@angular/forms'
import { UserService } from './user.service'
import { LoginComponent } from './login/login.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { GroupComponent } from './group/group.component'
import { ChannelComponent } from './channel/channel.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    GroupComponent,
    ChannelComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
