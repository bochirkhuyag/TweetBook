import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UserModule} from './user/user.module';
import {RouterModule} from '@angular/router';
import {CoreModule} from "./core/core.module";
import {SharedModule} from "./shared/shared.module";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthTokenInterceptor} from "./services/auth-token.interceptor";
import {CookieService} from "angular2-cookie/services/cookies.service";
import {MessageService} from "primeng/api";

@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    UserModule,
    CoreModule,
    SharedModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthTokenInterceptor,
    multi: true
  }, CookieService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
