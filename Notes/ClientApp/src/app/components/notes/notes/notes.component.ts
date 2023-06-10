import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../../services/notes.service';
import { Note } from '../note.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { TagService } from 'src/app/services/tags.service';
import { mode } from 'src/app/shared/page-mode.model';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit{
    notes:Note[]=[];  

    constructor(
      public noteService:NoteService,
      private tagService:TagService
    ){}

    ngOnInit(): void {
      this.noteService.getNotes().subscribe((notes)=>{
        this.notes=notes;
      })
      this.tagService.selectedTag.next(null)
      this.tagService.tagMode=mode.none
    }

    newNote(){
      this.noteService.selectedNote.next(new Note())
    }

}
