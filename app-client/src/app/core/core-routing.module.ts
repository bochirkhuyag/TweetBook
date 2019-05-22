import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {WallComponent} from "./wall/wall.component";
import {AppGuardService} from "../services/app-guard.service";
import {ProfileComponent} from "./profile/profile.component";
import {SearchComponent} from "./search/search.component";

const routes: Routes = [
  //wall
  {path: '', component: HomeComponent, children: [
      {path: '', component: WallComponent, canActivate: [AppGuardService]},
      {path: 'profile', component: ProfileComponent, canActivate: [AppGuardService]},
      {path: 'search/:query', component: SearchComponent, canActivate: [AppGuardService]}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
