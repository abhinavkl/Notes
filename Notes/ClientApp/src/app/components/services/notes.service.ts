import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Note } from "../notes/note.model";
import { HttpClient } from "@angular/common/http";

@Injectable({providedIn:'root'})
export class NoteService{
    private baseUrl;
    notes=new BehaviorSubject<Note[]>([])

    constructor(private http:HttpClient,@Inject('BASE_URL') baseUrl: string){
        this.baseUrl=baseUrl;
    }

    private getNotesFromDb(){
        return this.http.get<Note[]>(this.baseUrl+'notes')    
    }

    getNotes(){
        if(!this.notes.value.length){
            this.http.get<Note[]>(this.baseUrl+'api/notes').subscribe(notes=>{
                this.notes.next(notes)
            })
        }
        return this.notes;
    }
}
