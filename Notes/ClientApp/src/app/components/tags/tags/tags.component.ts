import { Component, OnInit } from '@angular/core';
import { TagService } from 'src/app/services/tags.service';
import { Tag } from '../tag.model';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faEye, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { mode } from 'src/app/shared/page-mode.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TagDeleteComponent } from '../tag-delete/tag-delete.component';
import { NoteService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  tags: Tag[] = []
  viewIcon=faEye
  editIcon = faEdit
  deleteIcon = faTrashAlt
  mode=mode

  constructor(
    public tagService: TagService,
    private modalService:NgbModal,
    private noteService:NoteService
  ) { }

  ngOnInit(): void {
    this.tagService.getTags().subscribe(data => {
      this.tags = data
    })
    this.noteService.selectedNote.next(null)
    this.noteService.noteMode=mode.none
  }

  updateMode(mode:mode){
    if(this.tagService.tagMode===mode){
      this.tagService.tagMode=this.mode.none
    }
    else{
      this.tagService.tagMode=mode;
      if(mode===this.mode.delete){
        this.deletePopup();
      }
    }
  }

  deletePopup(){
    const modelRef=this.modalService.open(TagDeleteComponent,{
      backdrop:'static',
      keyboard:false
    })
  }

  addTag(){
    this.tagService.selectedTag.next(null)
    this.tagService.tagMode=mode.edit
  }

  tagSelectEvent(tag:Tag){
    if(this.tagService.selectedTag.value?.tagId===tag.tagId){
      this.tagService.selectedTag.next(null)     
    }
    else{
      this.tagService.selectedTag.next(tag)
    }
    this.tagService.tagMode=mode.none
  }
}
