import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Tag } from "../components/tags/tag.model";
import { BehaviorSubject } from "rxjs";
import { mode } from "../shared/page-mode.model";
import { Note, NoteTag } from "../components/notes/note.model";
import { ResponseMessage } from "../shared/response-message.model";

@Injectable({providedIn:'root'})
export class TagService{
    baseUrl=''
    tags=new BehaviorSubject<Tag[]>([])
    selectedTag=new BehaviorSubject<Tag | null>(null)
    tagMode=mode.none

    constructor(private http:HttpClient,@Inject('BASE_URL') baseUrl: string){
        this.baseUrl=baseUrl;
    }

    getTags(){
        if(!this.tags.value.length){
            this.http.get<Tag[]>(this.baseUrl+'api/tags').subscribe(tags=>{
                this.tags.next(tags)
            })
        }
        return this.tags;
    }

    getTagNames(){
        return this.tags.value.map(i=>i.tagName);
    }

    postTag(tag:Tag){
        return this.http.post<ResponseMessage>(this.baseUrl+'api/tags',tag)
    }

    updateTag(tag:Tag){
        let tags=this.tags.value
        let index=tags.map(i=>i.tagId).indexOf(tag.tagId)
        if(index!==-1){
            tags[index]=tag;
        }
        else{
            tags=[ tag,...tags ]
        }

        this.tags.next(tags)
    }


    clear(){
        this.tags.next([])
        this.selectedTag.next(null)
        this.tagMode=mode.none
    }


}

