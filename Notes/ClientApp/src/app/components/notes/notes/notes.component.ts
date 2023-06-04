import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../services/notes.service';
import { Note } from '../note.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit{

    notes:Note[]=[];
    constructor(private noteService:NoteService){}

    ngOnInit(): void {
      this.noteService.getNotes().subscribe((notes)=>{
        this.notes=notes;
        console.log(notes)
      })
    }

}