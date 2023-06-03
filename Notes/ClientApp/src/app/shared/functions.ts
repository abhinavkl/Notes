
export function commonCount<T>(arr1:T[],arr2:T[]){
    return arr1.some(function(ele){
        return arr2.indexOf(ele)>-1;
    })
}
