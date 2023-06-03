
export class ResponseMessage{
    constructor(
        public message:string='',
        public status:string='',
        public statusCode:number=0,
        public type:string='',
        public data:object={},
        public hasData:boolean=false
    ){}
}
