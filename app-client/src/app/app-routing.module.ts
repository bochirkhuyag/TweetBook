import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResgisterComponent } from './user/resgister/resgister.component';
import { LoginComponent } from './user/login/login.component';

const routes: Routes = [
  {path:"", component:ResgisterComponent},
  {path:"login", component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
