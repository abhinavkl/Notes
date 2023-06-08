import { NgModule } from '@angular/core';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations:[AccessDeniedComponent],
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule],
    exports:[]
})
export class CustomModule{

}
