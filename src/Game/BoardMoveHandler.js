import  {
  deepCopy,
  transpose,
  reverseY
} from './ArrayMethod';

const keysEffect = {
  'up':{
    trans:0,
    yrev:1
  },
  'down':{
    trans:0,
    yrev:0
  },
  'right':{
    trans:1,
    yrev:0
  },
  'left':{
    trans:1,
    yrev:1
  }
}


export function InputEventHandler(direction,board,setBoard){

  if(Object.keys(keysEffect).includes(direction)){

    let result =  executeKeyInput(board,direction);
    setBoard(result);
    
  }


}






function executeKeyInput(board,inputKey){
  let result = deepCopy(board);
  result = keysMovementEffect(result,inputKey,false)
  result = BoardMoveAlgo(result);
  result = keysMovementEffect(result,inputKey,true)
  return result;
}


function keysMovementEffect(board,arrEffect,reverse){
  let {trans,yrev} = keysEffect[arrEffect];

  if(reverse){
    if(yrev)
      board = reverseY(board)
    if(trans)
      transpose(board) 
  }else {
    if(trans)
      transpose(board)  
    if(yrev)
      board = reverseY(board)    
  }

  return board;
}


function BoardMoveAlgo(boardCopy){

  for(let i = 0;i<4;i++){
    getMove(3,i,-1);
  }


  function getMove(i,j,val,haveToShift=false,uniq=[]){
  
    if(i<0){
      // index is out of bound state of the array
      return 0;
    }
  
    
  
    let cur_val = boardCopy[i][j];
  
  
  
    if(cur_val === 0){
  
      if(val > 0)
        uniq.push(val)
  
      let new_val = getMove(i-1,j,cur_val,true,uniq);
  
      if(new_val === val){
        let new_val_new = getMove(i-1,j,0,true,[]);
        boardCopy[i][j] = new_val_new;
        return new_val;
      } 
  
      if(haveToShift){
        let new_val_new = getMove(i-1,j,0,true,[]);
        boardCopy[i][j] = new_val_new;
        return new_val;
      }
        
      boardCopy[i][j] = new_val<0?-new_val:new_val;
  
      return 0;
    }
    
  
    
    let new_val;
  
  
  
    if (cur_val === val){
  
      let to_ret=cur_val;
  
      new_val = getMove(i-1,j,0,true,uniq);
  
      if(haveToShift){    
        boardCopy[i][j] = new_val;
        return to_ret;
      }
      boardCopy[i][j] = new_val < 0 ? -new_val : new_val ;
      return to_ret;
    }
  
    if(val===0){
  
      let last = uniq.shift();
      if(cur_val === last){
  
        let to_ret=cur_val;
        new_val = getMove(i-1,j,0,true,uniq);
        boardCopy[i][j] = new_val;
        return to_ret;
      }else {
        uniq.unshift(last);
      }
  
    }
  
  
  
  
    new_val = getMove(i-1,j,cur_val,haveToShift);
  
    let to_ret  = cur_val;
  

    if(cur_val === new_val){
      new_val = cur_val = cur_val + 1;
      to_ret = 0;
      if(haveToShift){
        to_ret = -new_val;
        new_val = getMove(i-1,j,0,true)
  
        boardCopy[i][j] = new_val<0?-new_val:new_val;
        return to_ret;
      }
    }  
  
  
    
    if(!haveToShift){
      new_val = cur_val;
    }
  
    boardCopy[i][j] = new_val<0?-new_val:new_val;
  
    return to_ret;
  }
  
  return boardCopy;
  
}


