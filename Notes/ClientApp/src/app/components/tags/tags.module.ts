import { NgModule } from "@angular/core";
import { TagsComponent } from './tags/tags.component';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { DirectiveModule } from "src/app/directives/directive.module";
import { PipeModule } from "src/app/pipes/pipe.module";


@NgModule({
    declarations:[
    TagsComponent
  ],
    imports:[
      CommonModule,
      PipeModule,
      FormsModule,
      ReactiveFormsModule,
      FontAwesomeModule,
      DirectiveModule  
    ],
    exports:[]
})
export class TagsModule{

}

