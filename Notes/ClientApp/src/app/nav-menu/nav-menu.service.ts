import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})
export class NavMenuService{
    timeLeft=0;
    timer?:ReturnType<typeof setInterval>=undefined;

    updateTimeLeft(time:number){
        this.timeLeft=time;
        this.timer=setInterval(()=>{
            if(this.timeLeft>0){
                this.timeLeft--;
            }
            else{
                clearInterval(this.timer)
            }
        },1000)
    }

    setTimeLeft(time:number){
        this.timeLeft=0;
    }

}
