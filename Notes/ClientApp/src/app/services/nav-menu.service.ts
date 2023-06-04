import { Injectable } from "@angular/core";
import { AuthService } from './auth.service';
import { NoteService } from "./notes.service";

@Injectable({providedIn:'root'})
export class NavMenuService{
    timeLeft=0;
    timer?:ReturnType<typeof setInterval>=undefined;

    constructor(
        public authService:AuthService,
        private noteService:NoteService
    ){}

    updateTimeLeft(time:number){
        this.timeLeft=time;
        this.timer=setInterval(()=>{
            if(this.timeLeft>0){
                this.timeLeft--;
            }
            else{
                this.authService.clear()
                this.noteService.clear()
                clearInterval(this.timer)
            }
        },1000)
    }

    clear(){
        this.timeLeft=0;
    }

    get getTimeLeft(){
        return this.format(this.timeLeft)
    }

    padTime(time:number){
        return String(time).length === 1 ? `0${time}` : `${time}`;
    };
    
    format(time:number){
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${this.padTime(seconds)}`;
    }

}
