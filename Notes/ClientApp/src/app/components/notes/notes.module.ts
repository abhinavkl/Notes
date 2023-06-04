import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './notes/notes.component';
import { ShortNoteComponent } from './short-note/short-note.component';
import { PipeModule } from 'src/app/pipes/pipe.module';

@NgModule({
  declarations: [
    NotesComponent,
    ShortNoteComponent
  ],
  imports: [
    CommonModule,
    PipeModule
  ]
})
export class NotesModule { }
