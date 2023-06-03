import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./components/auth/login/login.component";
import { RegisterComponent } from "./components/auth/register/register.component";
import { CounterComponent } from "./counter/counter.component";
import { FetchDataComponent } from "./fetch-data/fetch-data.component";
import { AccessDeniedComponent } from "./shared/access-denied/access-denied.component";
import { AuthGuard } from "./components/services/auth-guard";
import { RouteData } from "./components/auth/route-data.model";

const routes:Routes=[
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path :'notes',
        loadChildren:()=>import('./components/notes/notes-routing.module').then(m=>m.NotesRoutingModule)
    },
    {
        path:'auth',
        loadChildren:()=> import('./components/auth/auth-routing.module').then(m=>m.AuthRoutingModule)
    },
    { path: 'counter', component: CounterComponent },
    { path: 'fetch-data', 
        component: FetchDataComponent,
        canActivate:[AuthGuard],
        data:new RouteData(['User','Admin'],[],[],[]) 
    },
    {path:'access-denied',component:AccessDeniedComponent}
]

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule{}