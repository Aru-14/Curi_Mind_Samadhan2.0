//Task2: Find highest marks from an array
/* let assume that there are 5 subject and we have to find highest marks are obtained in it
eg. [3,4,7,8,4]=>8
*/

findMax = (arr) => {
    let max = arr[0];//3
    for(let i=1; i < arr.length; i++){
        console.log(arr[i], "max =>", max, "max value =>", max)
        if(arr[i]>max){
            max = arr[i];
        }
    }
    return max;
}

console.log(findMax([3,4,7,8,4]));
