import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name:'textshorter'
})
export class TextShorter implements PipeTransform{
    transform(text:string,maxlength:number=100){
        if(text.length<maxlength){
            return text;
        }
        else{
            return text.substring(0,maxlength-3)+'...'
        }
    }
}