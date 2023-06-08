import { Component, Input, OnInit } from '@angular/core';
import { Note } from '../note.model';
import { NoteService } from 'src/app/services/notes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseMessage } from 'src/app/shared/response-message.model';
import {mode } from '../../../shared/page-mode.model';
import { environment } from 'src/environments/environment';
import { TagService } from 'src/app/services/tags.service';
import { Tag } from '../../tags/tags/tag.model';

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
  availableTags:Tag[]=[];
  selectedTags:number[]=[];
  textareaMaxlength=environment.textareaMaxlength
  remainingBodylength=this.textareaMaxlength

  nameValidator: RegExp = /^[a-zA-Z0-9][a-zA-Z0-9\/\- ]+$/;

  showDescriptionErrors=false;
  showBodyErrors=false;

  constructor(
    private fb:FormBuilder,
    public noteService:NoteService,
    private tagService:TagService
  ){
    noteService.selectedNote.subscribe((note)=>{
      this.note=note;
      this.remainingBodylength= this.textareaMaxlength - (note?note!.body.length:0)
      this.initForm()
    })
  }

  ngOnInit(): void {
  }

  updateTagSelection(tag:Tag){
    if(this.selectedTags.includes(tag.tagId)){
      this.selectedTags=this.selectedTags.filter(i=>i!==tag.tagId)
    }
    else{
      this.selectedTags.push(tag.tagId)
    }
  }

  initForm(){
    this.availableTags=this.tagService.getTags().value
    if(this.note){
      this.selectedTags=this.note.noteTagIds
    }
    this.noteForm=this.fb.group({
      "description":[this.note?.description,{
        validators:[Validators.required,Validators.pattern(this.nameValidator),Validators.minLength(3),Validators.maxLength(20)],
        updateOn:'blur'
      }],
      "body":[this.note?.body,{
        validators:[Validators.minLength(10),Validators.required,Validators.maxLength(this.textareaMaxlength)],
        updateOn:'blur'
      }]
    })
  }

  bodyChangeEvent(event:any){
    this.remainingBodylength= this.textareaMaxlength - event.target.value.length
  }

  onSubmit(){
    if(this.noteForm.valid){
        this.note!.body=this.noteForm.get('body')!.value
        this.note!.description=this.noteForm.get('description')!.value
        this.note!.noteTagIds=this.selectedTags
        this.noteService.postNote(this.note!).subscribe(response=>{
          if(response.statusCode===1){
            this.noteService.updateNote(response.data as Note)
            this.noteService.selectedNote.next(null)
          }
        })
    }
  }

}
