import { Component, Input, Output } from '@angular/core';
import { Note } from '../note.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NoteService } from 'src/app/services/notes.service';
import { mode } from 'src/app/shared/page-mode.model';
import { ResponseMessage } from 'src/app/shared/response-message.model';

@Component({
  selector: 'app-note-delete',
  templateUrl: './note-delete.component.html',
  styleUrls: ['./note-delete.component.css']
})
export class NoteDeleteComponent {
  @Input() note:Note=new Note();
  mode=mode;

  constructor(
    public activeModal:NgbActiveModal,
    private noteService:NoteService
  ){}

  closeClick(){
    this.activeModal.close('Close click')
    this.noteService.noteMode=mode.none;
  }

  deleteNote(){
    this.activeModal.close('Submit')
    this.noteService.noteMode=mode.none;
    this.noteService.deleteNode().subscribe(response=>{
      this.noteService.status=response;
      if(response.statusCode===1){
        this.noteService.removeNote(this.noteService.selectedNote.value!.noteId)
      }
      window.setTimeout(()=>{
        this.noteService.status=new ResponseMessage()
      },1000)
    })
  }

}
