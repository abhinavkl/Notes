import { Component, Input, OnInit, Output } from '@angular/core';
import { Note } from '../note.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NoteService } from 'src/app/services/notes.service';
import { mode } from 'src/app/shared/page-mode.model';
import { ResponseMessage } from 'src/app/shared/response-message.model';
import { TagService } from 'src/app/services/tags.service';
import { Tag } from '../../tags/tag.model';

@Component({
  selector: 'app-note-delete',
  templateUrl: './note-delete.component.html',
  styleUrls: ['./note-delete.component.css']
})
export class NoteDeleteComponent implements OnInit {
  @Input() note:Note=new Note();
  mode=mode;

  constructor(
    public activeModal:NgbActiveModal,
    private noteService:NoteService,
    private tagService:TagService
  ){}

  ngOnInit(): void {
    this.noteService.selectedNote.subscribe(note=>{
      this.note=note!
    })
  }

  closeClick(){
    this.activeModal.close('Close click')
    this.noteService.noteMode=mode.none;
  }

  deleteNote(){
    this.activeModal.close('Submit')
    this.noteService.noteMode=mode.none;
    this.noteService.deleteNote().subscribe(response=>{
      this.noteService.status=response;
      if(response.statusCode===1){
        this.noteService.removeNote(this.note.noteId)
        this.noteService.selectedNote.next(null)
        this.noteService.noteMode=mode.none
        this.tagService.tags.next(response.data as Tag[])
      }
      window.setTimeout(()=>{
        this.noteService.status=new ResponseMessage()
      },1000)
    })
  }

}
