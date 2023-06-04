import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Register } from "../components/auth/register/register.model";
import { Login } from "../components/auth/login/login.model";
import { ResponseMessage } from "src/app/shared/response-message.model";
import { UserDetails, UserSession } from '../components/auth/user.model';
import { environment } from "src/environments/environment";
import { BehaviorSubject } from "rxjs";
import { NavMenuService } from "./nav-menu.service";
import { NoteService } from "./notes.service";

@Injectable({providedIn:'root'})
export class AuthService{
    private baseUrl='';
    isAuthenticated=false;
    userDetails=new BehaviorSubject<UserDetails>(new UserDetails())

    constructor(
        private http:HttpClient,
        @Inject('BASE_URL') baseUrl: string)
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

    clear(){
        sessionStorage.clear()

        this.isAuthenticated=false;
        this.userDetails.next(new UserDetails());
    }
}