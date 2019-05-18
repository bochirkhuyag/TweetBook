import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResgisterComponent } from './user/resgister/resgister.component';
import { LoginComponent } from './user/login/login.component';
import {AppGuardService} from "./services/app-guard.service";
import {HomeComponent} from "./home/home.component";
import {WallComponent} from "./wall/wall.component";
import {ProfileComponent} from "./profile/profile.component";

const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"register", component:ResgisterComponent},
  //wall
  {path: '', component: HomeComponent, children: [
      {path: '', component: WallComponent, canActivate: [AppGuardService]},
      {path: 'profile', component: ProfileComponent, canActivate: [AppGuardService]}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
