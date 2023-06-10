import { Component, Input, OnInit } from '@angular/core';
import { Tag } from '../tag.model';
import { mode } from 'src/app/shared/page-mode.model';
import { TagService } from 'src/app/services/tags.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NoteService } from 'src/app/services/notes.service';
import { Note } from '../../notes/note.model';

@Component({
  selector: 'app-tag-delete',
  templateUrl: './tag-delete.component.html',
  styleUrls: ['./tag-delete.component.css']
})
export class TagDeleteComponent implements OnInit {
  @Input() tag:Tag=new Tag();
  mode=mode;

  constructor(
    public activeModal:NgbActiveModal,
    private tagService:TagService,
    private noteService:NoteService
  ){ }

  ngOnInit(): void {
    this.tagService.selectedTag.subscribe(tag=>{
      this.tag=tag!
    })
  }

  closeClick(){
    this.activeModal.close('Close click')
    this.tagService.tagMode=mode.none;
  }

  deleteTag(){
    this.activeModal.close('Submit')
    this.tagService.tagMode=mode.none;
    this.tagService.deleteTag(this.tag.tagId).subscribe(response=>{
      if(response.statusCode===1){
        this.tagService.removeTag(this.tag.tagId)
        this.tagService.selectedTag.next(null)
        this.tagService.tagMode=mode.none
        this.noteService.notes.next(response.data as Note[])
      }
      window.setTimeout(()=>{
      },1000)
    })
  }

}
