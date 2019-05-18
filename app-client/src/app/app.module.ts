import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { RouterModule } from '@angular/router';
import {CoreModule} from "./core/core.module";

@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    UserModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
