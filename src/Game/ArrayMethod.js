function deepCopy(array){
  return array.map((arr)=>{
    return arr.slice();
  })
}

function transpose(arr){
  for(let i=0;i<arr.length;i++){
    for(let j=0;j<i;j++){
      let tmp   = arr[i][j];
      arr[i][j] = arr[j][i];
      arr[j][i] = tmp; 
    }
  }
}

function reverseY(arr){
  let res = arr.reduce((array,row)=>{
    return [row,...array]
  },[]) 
  return res;  
}


export {
  deepCopy,
  transpose,
  reverseY
}