import { Component, Input, OnInit } from '@angular/core';
import { Note } from '../note.model';
import { NoteService } from 'src/app/services/notes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseMessage } from 'src/app/shared/response-message.model';
import {mode } from '../../../shared/page-mode.model';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.css']
})
export class NoteDetailsComponent implements OnInit {
  mode=mode;
  note:(Note | null)=null
  noteForm:FormGroup=new FormGroup({})
  responseMessage:ResponseMessage=new ResponseMessage()

  nameValidator: RegExp = /^[a-zA-Z0-9][a-zA-Z0-9 ]+$/;

  showDescriptionErrors=false;
  showContentErrors=false;

  constructor(
    private fb:FormBuilder,
    public noteService:NoteService
  ){
    noteService.selectedNote.subscribe((note)=>{
      this.note=note;
      this.initForm()
    })
  }

  ngOnInit(): void {
  }

  initForm(){
    this.noteForm=this.fb.group({
      "description":[this.note?.description,{
        validators:[Validators.required,Validators.pattern(this.nameValidator),Validators.minLength(3),Validators.maxLength(20)],
        updateOn:'blur'
      }],
      "content":[this.note?.content,{
        validators:[Validators.minLength(10),Validators.required,Validators.maxLength(1000)],
        updateOn:'blur'
      }]
    })
  }

  onSubmit(){
    if(this.noteForm.valid){
        this.note!.content=this.noteForm.get('content')!.value
        this.note!.description=this.noteForm.get('description')!.value
        this.noteService.postNote(this.note!).subscribe(response=>{
          if(response.statusCode===1){
            this.noteService.updateNote(response.data as Note)
            this.noteService.selectedNote.next(null)
          }
        })
    }
  }

}
