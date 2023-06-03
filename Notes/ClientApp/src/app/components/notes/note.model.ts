
export class Note{
    constructor(
        public noteId:number=0,
        public description:string='',
        public content:string='',
        public createdOn:string='',
        public updatedOn:string='',
        public createdBy:number=0
    ){}
}
