import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { ServerModule } from "@angular/platform-server";
import { Register } from "./register/register.model";

@Injectable({providedIn:'root'})
export class AuthService{
    baseUrl='';
    constructor(private http:HttpClient,@Inject('BASE_URL') baseUrl: string)
    {
        this.baseUrl=baseUrl;
    }

    getUser(email:string){
        return this.http.get<boolean>(this.baseUrl+'register?email='+email)
    }

    registerUser(register:Register){
        return this.http.post(this.baseUrl+'register',register)
    }

}
