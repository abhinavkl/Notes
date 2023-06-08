import { Component, OnInit } from '@angular/core';
import { TagService } from 'src/app/services/tags.service';
import { Tag } from './tag.model';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  tags: Tag[] = []
  editIcon = faEdit
  deleteIcon = faTrashAlt

  constructor(
    public tagService: TagService
  ) { }

  ngOnInit(): void {
    this.tagService.getTags().subscribe(data => {
      this.tags = data
    })
  }

}
