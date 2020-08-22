import  {
  deepCopy,
  addRandomNumber
} from './utlis';

const BoardSize = 4;

const keyIndexMap = {
  'up':{
    x     : 0,
    xinc  : 1,
    xend  : BoardSize,

    y     : 0,
    yinc  : 0,
    yend  : -1,
  },
  'down':{
    x     : BoardSize-1,
    xinc  : -1,
    xend  : -1,

    y     : 0,    
    yinc  : 0,
    yend  : -1
  },
  'right':{
    x     : 0,
    xinc  : 0,
    xend  : -1,

    y     : BoardSize-1,
    yinc  : -1,
    yend  : -1,
  },

  'left':{
    x     : 0,
    xinc  : 0,
    xend  : -1,

    y     : 0,
    yinc  : 1,
    yend  : BoardSize,
  }
}


export function InputEventHandler(direction,board,setBoard,setGameEnded){
  if(Object.keys(keyIndexMap).includes(direction)){
    let result =  executeKeyInput(board,direction);

    if(board.toString() !== result.toString())
      addRandomNumber(result)

    setBoard(result);
    
    if(isGameEnded(result)){
      setGameEnded(true);
      return;
    }

  }
}

function isGameEnded(board){
  for(let key in (keyIndexMap)){
    if(executeKeyInput(board,key).toString() !== board.toString()){
      return false;
    }
  }
  return true;
}


function executeKeyInput(board,inputKey){
  let result = deepCopy(board);
  result = BoardMoveAlgo(result,inputKey);
  return result;
}




function BoardMoveAlgo(boardCopy,inputKey){
  let {x, y, xend, yend, xinc,yinc} = keyIndexMap[inputKey];

  if(['up','down'].includes(inputKey)){
    for(let i = 0;i<4;i++){
      getMove(x,i,-1);
    }
  }else {
    for(let i = 0;i<4;i++){
      getMove(i,y,-1);
    }
  }




  function getMove(i,j,val,haveToShift=false,uniq=[]){
  
    if(i===xend || j===yend){
      // index is out of bound state of the array
      return 0;
    }
  
    
  
    let cur_val = boardCopy[i][j];
  
  
  
    if(cur_val === 0){
  
      if(val > 0)
        uniq.push(val)
  
      let new_val = getMove(i+xinc,j+yinc,cur_val,true,uniq);
  
      if(new_val === val){
        let new_val_new = getMove(i+xinc,j+yinc,0,true,[]);
        boardCopy[i][j] = new_val_new;
        return new_val;
      } 
  
      if(haveToShift){
        let new_val_new = getMove(i+xinc,j+yinc,0,true,[]);
        boardCopy[i][j] = new_val_new;
        return new_val;
      }
        
      boardCopy[i][j] = new_val<0?-new_val:new_val;
  
      return 0;
    }
    
  
    
    let new_val;
  
  
  
    if (cur_val === val){
  
      let to_ret=cur_val;
  
      new_val = getMove(i+xinc,j+yinc,0,true,uniq);
  
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
        new_val = getMove(i+xinc,j+yinc,0,true,uniq);
        boardCopy[i][j] = new_val;
        return to_ret;
      }else {
        uniq.unshift(last);
      }
  
    }
  
  
  
  
    new_val = getMove(i+xinc,j+yinc,cur_val,haveToShift);
  
    let to_ret  = cur_val;
  

    if(cur_val === new_val){
      new_val = cur_val = cur_val + 1;
      to_ret = 0;
      if(haveToShift){
        to_ret = -new_val;
        new_val = getMove(i+xinc,j+yinc,0,true)
  
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

