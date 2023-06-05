import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './notes/notes.component';
import { ShortNoteComponent } from './short-note/short-note.component';
import { PipeModule } from 'src/app/pipes/pipe.module';
import { NoteDetailsComponent } from './note-details/note-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NotesComponent,
    ShortNoteComponent,
    NoteDetailsComponent
  ],
  imports: [
    CommonModule,
    PipeModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class NotesModule { }
