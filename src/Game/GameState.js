import {useState,useEffect} from 'react';
import {InputEventHandler} from './BoardMoveHandler';



export const useGameState = (GridItems)=>{

  let [board,updateBoard] = useState([[3,0,0,1],[2,0,1,1],[1,1,0,0],[0,1,1,2]]);

  useEffect(()=>{
    window.onkeydown = function(ev){
      InputEventHandler(ev,board,updateBoard)
    }
  },)

  return {
    board,
    updateBoard
  }

}





export default useGameState