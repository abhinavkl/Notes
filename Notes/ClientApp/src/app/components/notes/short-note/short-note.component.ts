import { Component, Input } from '@angular/core';
import { Note } from '../note.model';

@Component({
  selector: 'app-short-note',
  templateUrl: './short-note.component.html',
  styleUrls: ['./short-note.component.css']
})
export class ShortNoteComponent {
  @Input() note:Note=new Note();
}
