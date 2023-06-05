import { Component, Input, OnInit } from '@angular/core';
import { Note } from '../note.model';
import { NoteService } from 'src/app/services/notes.service';
import { mode } from 'src/app/shared/page-mode.model';

@Component({
  selector: 'app-short-note',
  templateUrl: './short-note.component.html',
  styleUrls: ['./short-note.component.css']
})
export class ShortNoteComponent implements OnInit {
  @Input() note: Note = new Note();
  isSelected: boolean = false;
  mode=mode;

  constructor(
    public noteService: NoteService
  ) { }

  ngOnInit(): void {
    this.noteService.selectedNote.subscribe((note) => {
      this.isSelected = !!note && (note!.noteId === this.note.noteId)
    })
  }

  noteSelectEvent() {
    console.log(this.note)
    if (this.noteService.selectedNote.value?.noteId === this.note.noteId) {
      this.noteService.selectedNote.next(null)
    }
    else {
      this.noteService.selectedNote.next(this.note!)
    }
    this.noteService.noteMode=mode.none;
  }

}
