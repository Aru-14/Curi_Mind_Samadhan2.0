

findMax = (arr) => {
    let max = arr[0];
    for(let i=1; i < arr.length; i++){
        console.log(arr[i], "max =>", max, "max value =>", max)
        if(arr[i]>max){
            max = arr[i];
        }
    }
    return max;
}

console.log(findMax([3,4,7,8,4]));
