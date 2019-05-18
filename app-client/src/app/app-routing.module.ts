import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResgisterComponent } from './user/resgister/resgister.component';
import { LoginComponent } from './user/login/login.component';

const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"register", component:ResgisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
