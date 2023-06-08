import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Tag } from "../components/tags/tags/tag.model";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn:'root'})
export class TagService{
    baseUrl=''
    tags=new BehaviorSubject<Tag[]>([])
    selectedTag=new BehaviorSubject<Tag | null>(null)

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

    clear(){
        this.tags.next([])
        this.selectedTag.next(null)
    }


}

