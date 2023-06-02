
export class ResponseMessage{
    constructor(
        public message:string,
        public status:string,
        public statusCode:number,
        public type:string,
        public data:object,
        public hasData:boolean
    ){}

    static get default(){
        return new ResponseMessage('','',0,'',{},false);
    }

}
