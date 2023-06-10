import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Directive, Injectable } from "@angular/core";
import { Observable, map } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { TagService } from '../services/tags.service';

@Injectable({providedIn:'root'})
export class CustomValidators{
    
    constructor(
        private authService:AuthService,
        private tagService:TagService
    ){}

    uniqueEmailValidator():AsyncValidatorFn{
        return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null>=>{
            return this.authService.getUser(control.value).pipe(map(unique=>{
                return unique?{ "uniqueEmail":true }:null;
            }))
        }
    }


    uniqueTagValidator(tagId:number):AsyncValidatorFn{
        return (control:AbstractControl):Promise<ValidationErrors | null> | Observable<ValidationErrors | null>=>{
            return this.tagService.getTag(tagId,control.value).pipe(map(exists=>{
            return exists?{ 'uniqueTagName':true }:null;
            }))
        }
    }

}
