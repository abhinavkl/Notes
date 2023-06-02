import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { ServerModule } from "@angular/platform-server";
import { Register } from "./register/register.model";
import { Login } from "./login/login.model";
import { ResponseMessage } from "src/app/shared/response-message.model";
import { UserDetails, UserSession } from '../auth/user.model';
import { environment } from "src/environments/environment";

@Injectable({providedIn:'root'})
export class AuthService{
    baseUrl='';
    private isAuthenticated=false;
    public userDetails=UserDetails.default;
    private timer=0;

    constructor(private http:HttpClient,@Inject('BASE_URL') baseUrl: string)
    {
        this.baseUrl=baseUrl;
    }

    getUser(email:string){
        return this.http.get<boolean>(this.baseUrl+'register?email='+email)
    }

    registerUser(register:Register){
        return this.http.post<ResponseMessage>(this.baseUrl+'register',register)
    }

    loginUser(login:Login){
        return this.http.post<ResponseMessage>(this.baseUrl+'login',login)
    }

    logout(){
        return this.http.post(this.baseUrl+'logout',{})
    }

    getUserSession(){
        return this.http.get<UserSession>(this.baseUrl+'login')
    }

    setIsAuthenticate(value:boolean){
        this.isAuthenticated=value;
        if(value){
            this.timer=window.setTimeout(()=>{
                this.logout()
                this.setIsAuthenticate(false)
                this.clearSessionTimer()
            },environment.SessionTimeMS)    
        }
    }

    setSessionTimer(timeleft:number){
        this.timer=window.setTimeout(()=>{
            this.logout()
            this.setIsAuthenticate(false)
            this.clearSessionTimer()
        },timeleft*1000)
    }

    clearSessionTimer(){
        window.clearTimeout(this.timer)
    }

    clearSessionTimers(){
        let id=window.setTimeout(()=>{},0)
        while(id--){
            window.clearTimeout(id)
        }
    }

    get authenticated(){
        return this.isAuthenticated;
    }
}
