import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name:'updatedon'
})
export class GetUpdatedOn implements PipeTransform {
    transform(value:Date){
        if(typeof value ==="string"){
            value=new Date(value)
        }
        let now=new Date()
        let timeDiff=(now.getTime()-value.getTime())/1000
        timeDiff=Math.ceil(timeDiff)

        if(timeDiff<60){
            return timeDiff+'s ago';
        }
        else if(timeDiff<3600){
            let minutes=Math.ceil(timeDiff/60);
            let seconds=timeDiff%60;
            return minutes+'m '+seconds+'s ago';
        }
        else if(timeDiff<86400){
            let hours=Math.ceil(timeDiff/3600);
            let minutes=Math.ceil((timeDiff%3600)/60);
            return hours+'h '+minutes+'m ago';
        }
        else{
            let days=Math.ceil(timeDiff/86400);
            return days+'d ago';
        }
    }
}

