import { NoteTag } from "../../notes/note.model";

export class Tag{
    constructor(
        public tagId:number=0,
        public tagName:string='',
        public userId:number=0,
        public noteTags:NoteTag[]=[]
    ){}
}
