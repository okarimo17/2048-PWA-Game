import {useState,useEffect} from 'react';
const keys = ['ArrowUp','ArrowDown','ArrowRight','ArrowLeft']
let board;
export const useGameState = (GridItems)=>{
  let [boards,updateBoard] = useState([[3,0,0,0],[2,0,1,0],[1,1,0,0],[0,1,1,1]]);

  useEffect(()=>{
    window.addEventListener("keyup",(ev)=>{
      if(keys.includes(ev.key))
        inputHandeler(ev,updateBoard)
    });
    board = boards;
  },[])

  return {
    board:boards,
    updateBoard
  }
}

function inputHandeler(ev,updateBoard){
  if(ev.key === "ArrowUp"){
    console.log(board);
  }
}

let EndIndex = 0;

function getMove(i,j,val,haveToShift=false){

  if(i<EndIndex){
    // index is out of bound state of the array
    return 0;
  }

  let cur_val = board[i][j];



  if(cur_val === 0){
    let new_val = getMove(i-1,j,cur_val,true);
    console.log('zeros ',0);   
    if(val === 0 || haveToShift)
      return new_val;

    if(new_val === val)
      return new_val;

    board[i][j] = new_val;
    return 0;
  }
  
  let new_val;

  if (cur_val === val){
    new_val = getMove(i-1,j,0,true);
    board[i][j] = new_val;
    console.log('eqauls ',cur_val,'have to shify ',haveToShift);   
    return cur_val;
  }

  new_val = getMove(i-1,j,cur_val,haveToShift);

  if(cur_val === new_val){
    new_val = cur_val + 1;
  }else {
    console.log('else')
    if(val===0){
      board[i][j] = 0;
    }
    return cur_val;
  }
  board[i][j] = new_val;
  return 0;
}




export default useGameState