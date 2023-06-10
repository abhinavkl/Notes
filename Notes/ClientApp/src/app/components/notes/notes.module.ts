import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './notes/notes.component';
import { ShortNoteComponent } from './short-note/short-note.component';
import { PipeModule } from 'src/app/pipes/pipe.module';
import { NoteDetailsComponent } from './note-details/note-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DirectiveModule } from 'src/app/directives/directive.module';
import { NoteDeleteComponent } from './note-delete/note-delete.component';
import { CustomModule } from '../custom/custom.module';

@NgModule({
  declarations: [
    NotesComponent,
    ShortNoteComponent,
    NoteDetailsComponent,
    NoteDeleteComponent
  ],
  imports: [
    CommonModule,
    PipeModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    DirectiveModule,
    CustomModule
  ],
  exports:[ShortNoteComponent]
})
export class NotesModule { }
