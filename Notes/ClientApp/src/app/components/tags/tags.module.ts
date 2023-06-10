import { NgModule } from "@angular/core";
import { TagsComponent } from './tags/tags.component';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { DirectiveModule } from "src/app/directives/directive.module";
import { PipeModule } from "src/app/pipes/pipe.module";
import { TagDetailsComponent } from './tag-details/tag-details.component';
import { NotesModule } from "../notes/notes.module";
import { TagDeleteComponent } from './tag-delete/tag-delete.component';


@NgModule({
    declarations:[
    TagsComponent,
    TagDetailsComponent,
    TagDeleteComponent
  ],
    imports:[
      CommonModule,
      PipeModule,
      FormsModule,
      ReactiveFormsModule,
      FontAwesomeModule,
      DirectiveModule,
      NotesModule
    ],
    exports:[]
})
export class TagsModule{

}

