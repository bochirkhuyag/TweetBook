import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { HomeComponent } from './home/home.component';
import { WallComponent } from './wall/wall.component';
import { ProfileComponent } from './profile/profile.component';
import { MenuComponent } from './menu/menu.component';
import {SharedModule} from "../shared/shared.module";
import { RightSideComponent } from './menu/rightside.component';

@NgModule({
  declarations: [HomeComponent, WallComponent, ProfileComponent, MenuComponent, RightSideComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule
  ]
})
export class CoreModule { }
