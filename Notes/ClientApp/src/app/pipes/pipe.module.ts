import { NgModule } from '@angular/core';
import { GetUpdatedOn } from './updatedon.pipe';
import { TextShorter } from './text-shorter.pipe';

@NgModule({
    declarations:[GetUpdatedOn,TextShorter],
    exports:[GetUpdatedOn,TextShorter]
})
export class PipeModule{}
