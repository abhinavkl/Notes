import { Component, Input, OnInit } from '@angular/core';
import { Note } from '../note.model';
import { NoteService } from 'src/app/services/notes.service';
import { mode } from 'src/app/shared/page-mode.model';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NoteDeleteComponent } from '../note-delete/note-delete.component';
import { ResponseMessage } from 'src/app/shared/response-message.model';

@Component({
  selector: 'app-short-note',
  templateUrl: './short-note.component.html',
  styleUrls: ['./short-note.component.css']
})
export class ShortNoteComponent implements OnInit {
  @Input() note: Note = new Note();
  @Input() maxbodylength:number=75;
  isSelected: boolean = false;
  mode=mode;
  editIcon=faEdit
  viewIcon=faEye
  deleteIcon=faTrash

  constructor(
    public noteService: NoteService,
    private modalServie:NgbModal
  ) { }

  ngOnInit(): void {
    this.noteService.selectedNote.subscribe((note) => {
      this.isSelected = !!note && (note!.noteId === this.note.noteId)
    })
  }

  changeMode(actualMode:mode){
    if(this.noteService.noteMode===actualMode){
      this.noteService.noteMode=mode.none;
    }
    else{
      this.noteService.noteMode=actualMode;
      if(actualMode===mode.delete){
        this.openDeletePopup()
      }
    }
  }

  openDeletePopup(){
    const modelRef=this.modalServie.open(NoteDeleteComponent,{
      backdrop:'static',
      keyboard:false
    })
  }

  noteSelectEvent() {
    if (this.noteService.selectedNote.value?.noteId === this.note.noteId) {
      this.noteService.selectedNote.next(null)
    }
    else {
      this.noteService.selectedNote.next(this.note!)
    }
    this.noteService.noteMode=mode.none;
  }
}
