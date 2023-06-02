
export class Login{
    constructor(
        public email:string,
        public password:string,
        public rememberMe:boolean
    ){}

    static get default(){
        return new Login('','',false)
    }
}

