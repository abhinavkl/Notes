import { KeyValuePair } from "./route-data.model";

export class UserSession{
    constructor(
        public isAuthenticated:boolean,
        public hasException:boolean,
        public message:string,
        public user:UserDetails,
        public expiresIn:number
    ){}
}

export class User{
    constructor(
        public firstName:string,
        public lastName:string,
        public userId:number
    ){}
}

export class UserDetails{
    constructor(
        public firstName:string='',
        public lastName:string='',
        public email:string='',
        public fullName:string='',
        public userId:string='',
        public claims:string[]=[],
        public roles:string[]=[]
    ){}
}


