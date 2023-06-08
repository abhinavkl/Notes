import { Tag } from "../tags/tags/tag.model";

export class Note{
    constructor(
        public noteId:number=0,
        public description:string='',
        public body:string='',
        public createdOn:Date=new Date(),
        public updatedOn:Date=new Date(),
        public userId:number=0,
        public noteTagIds:number[]=[],
        public noteTags:NoteTag[]=[]
    ){}
}

export class NoteTag{
    constructor(
        public noteTagId:number=0,
        public tagId:number=0,
        public noteId:number=0,
        public note:Note=new Note(),
        public tag:Tag=new Tag()
    ){}
}
