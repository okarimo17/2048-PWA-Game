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

function getMove(i,j,val){
  if(i>=EndIndex){

    let cur_val = board[i][j];
    if(i  === EndIndex){  
      if(val === 0){
        board[i][j] = 0;
        return cur_val;
      }
      return cur_val;
    }

    if(cur_val === 0){
      let new_val = getMove(i-1,j,0);
      if(val===0)
        return new_val;
      board[i][j] = new_val;
      return 0;
    }else if (cur_val === val){
      let to_ret = cur_val;
      board[i][j] = getMove(i-1,j,0);
      return to_ret;
    }else if(cur_val === getMove(i-1,j,0)){
      board[i][j] = cur_val * 2;
      return 0;
    }else {
      return cur_val;
    }

  }

}


export default useGameState