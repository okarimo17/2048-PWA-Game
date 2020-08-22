function deepCopy(array){
  return array.map((arr)=>{
    return arr.slice();
  })
}


function RandNumber (min=1,max=2){
  let numb = ( Math.random()*(max-min+1)) + min;
  return Math.floor(numb);
}

let defboard = [
  [9,8,4,8],
  [3,5,6,7],
  [10,8,7,9],
  [0,5,4,8]
];


const addRandomNumber = (board)=>{
  let newnumber = RandNumber();

  let zeroRows = board.reduce((all,col,key)=> {
    if(col.includes(0)) all += key;
    return all;
  },'')

  if(zeroRows===''){
    return false;
  }

  let randRow = zeroRows[RandNumber(0,zeroRows.length-1)];

  let zeroIndexes = board[randRow].reduce((all,item,key)=> {
    if(item===0) all += key;
    return all;
  },'')

  if(zeroIndexes===''){
    return false;
  }

  let index = zeroIndexes[RandNumber(0,zeroIndexes.length-1)];
  board[randRow][index]  = newnumber;
  return true;
}

function initDefBoard(){
  // addRandomNumber(defboard);
  // addRandomNumber(defboard);
  return defboard;
}


export {
  deepCopy,
  initDefBoard,
  addRandomNumber
}