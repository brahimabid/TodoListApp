import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthentificationComponent } from './authentification/authentification.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { AuthGuardService } from './service/auth-guard.service';


const routes: Routes = [
  {path:"",redirectTo:"login",pathMatch:"full"},
  {path:"login",component:AuthentificationComponent},
  {path:"todo",component:TodoListComponent,canActivate:[AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
