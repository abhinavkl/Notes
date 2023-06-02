
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
        public firstName:string,
        public lastName:string,
        public email:string,
        public fullName:string,
        public userId:string,
        public isAdmin:boolean,
        public expiresAt:string
    ){}

    //202 to 301
    static get default(){
        return new UserDetails('','','','','',false,'')
    }

}


