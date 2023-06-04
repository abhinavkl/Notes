
export class Note{
    constructor(
        public noteId:number=0,
        public description:string='',
        public content:string='',
        public createdOn:Date=new Date(),
        public updatedOn:Date=new Date(),
        public createdBy:number=0
    ){}
}
