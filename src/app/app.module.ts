import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {UserListComponent} from './user-list/user-list.component';
import {ChatComponent} from './chat/chat.component';


const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signUp', component: SignUpComponent},
  {path: 'userList', component: UserListComponent},
  {path: 'chat', component: ChatComponent},
  {path: '**', component: LoginComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    UserListComponent,
    ChatComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
