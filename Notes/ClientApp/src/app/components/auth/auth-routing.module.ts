import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from '../../services/auth-guard';
import { RouteData } from './route-data.model';

const routes:Routes=[
  {
    path:'',canActivateChild:[AuthGuard],children:[
      {path:'login',component:LoginComponent },
      {path:'register',component:RegisterComponent}    
    ],
    data:new RouteData()
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class AuthRoutingModule { }