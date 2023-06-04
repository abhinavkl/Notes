import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../services/auth-guard';
import { RouteData } from '../auth/route-data.model';
import { CounterComponent } from 'src/app/counter/counter.component';
import { NotesComponent } from './notes/notes.component';

const routes:Routes=[
  {
    path:'',canActivateChild:[AuthGuard],children:[
      {path:'',component: NotesComponent},
    ],
    data: new RouteData(['Authenticated'])
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class NotesRoutingModule { }
