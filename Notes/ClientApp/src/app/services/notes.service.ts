import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Note } from "../components/notes/note.model";
import { HttpClient } from "@angular/common/http";
import { ResponseMessage } from "../shared/response-message.model";
import { mode } from "../shared/page-mode.model";

@Injectable({providedIn:'root'})
export class NoteService{
    private baseUrl;
    notes=new BehaviorSubject<Note[]>([])
    selectedNote=new BehaviorSubject<Note | null>(null)
    noteMode=mode.none;

    constructor(private http:HttpClient,@Inject('BASE_URL') baseUrl: string){
        this.baseUrl=baseUrl;
    }

    getNotes(){
        if(!this.notes.value.length){
            this.http.get<Note[]>(this.baseUrl+'api/notes').subscribe(notes=>{
                this.notes.next(notes)
            })
        }
        return this.notes;
    }

    postNote(note:Note){
        return this.http.post<ResponseMessage>(this.baseUrl+'api/notes',note)
    }

    updateNote(note:Note){
        let notes=this.notes.value
        let index=notes.map(i=>i.noteId).indexOf(note.noteId)
        if(index!==-1){
            notes[index]=note;
        }
        else{
            notes.push(note)
        }
        console.log(notes)
        this.notes.next(notes)
    }


    clear(){
        this.notes.next([])
    }
}
