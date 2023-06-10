import { Component, OnInit } from '@angular/core';
import { TagService } from 'src/app/services/tags.service';
import { mode } from 'src/app/shared/page-mode.model';
import { Tag } from '../tag.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoteService } from 'src/app/services/notes.service';
import { Note } from '../../notes/note.model';
import { CustomValidators } from 'src/app/directives/custom-validator.directive';

@Component({
  selector: 'app-tag-details',
  templateUrl: './tag-details.component.html',
  styleUrls: ['./tag-details.component.css']
})
export class TagDetailsComponent implements OnInit {
  mode=mode
  tag:(Tag|null)=null
  tagForm:FormGroup=new FormGroup({})
  nameValidator: RegExp = /^[a-zA-Z0-9][a-zA-Z0-9\/\- ]+$/;
  notes:Note[]=[]
  selectedNotes:number[]=[]
  showTagErrors=false

  constructor(
    private fb:FormBuilder,
    public tagService:TagService,
    public noteService:NoteService,
    private customValidators:CustomValidators
  ){}

  updateTagNote(note:Note){
    if(this.selectedNotes.includes(note.noteId)){
      this.selectedNotes=this.selectedNotes.filter(i=>i!==note.noteId)
    }
    else{
      this.selectedNotes=[note.noteId,...this.selectedNotes]
    }
  }

  ngOnInit(): void {
    this.tagService.selectedTag.subscribe(tag=>{
      this.tag=tag
      this.selectedNotes=!tag?[]: tag?.noteTags.map(i=>i.noteId)
      this.initForm()
    })
    this.noteService.getNotes().subscribe(notes=>{
      this.notes=notes
    })
  }
  
  initForm(){
    this.tagForm=this.fb.group({
      'tagName':[this.tag?.tagName,{
        validators:[Validators.required,Validators.pattern(this.nameValidator),Validators.maxLength(20)],
        asyncValidators:[this.customValidators.uniqueTagValidator(this.tag?this.tag!.tagId:0)],
        updateOn:'blur'
      }]
    })
  }

  onSubmit(){
    console.log(this.tagForm)
    if(this.tagForm.valid){
      if(!this.tag){
        this.tag=new Tag()
      }
      this.tag!.tagName=this.tagForm.get('tagName')!.value
      this.tag!.noteTagIds=this.selectedNotes
      this.tagService.postTag(this.tag!).subscribe(response=>{
        if(response.statusCode===1){
          let data=response.data as any
          this.tagService.updateTag(data.tag as Tag)
          this.tagService.selectedTag.next(null)
          this.noteService.notes.next(data.notes as Note[])
          this.tagService.tagMode=mode.none
        }
      })
    }
  }

}
