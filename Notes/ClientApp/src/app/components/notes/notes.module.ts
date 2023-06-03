import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './notes/notes.component';
import { ShortNoteComponent } from './short-note/short-note.component';

@NgModule({
  declarations: [
    NotesComponent,
    ShortNoteComponent
  ],
  imports: [
    CommonModule
  ]
})
export class NotesModule { }
