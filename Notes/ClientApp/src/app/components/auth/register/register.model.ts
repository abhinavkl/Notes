
export class Register
{
    constructor(
        public firstName:string,
        public lastName:string,
        public email:string,
        public password:string,
        public confirmpassword:string){}

    static get default(){
        return new Register('','','','','')
    }
}
