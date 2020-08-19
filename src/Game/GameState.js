import {useState, useEffect} from 'react';
import { generalInputHandler } from './InputHandlers';


let defboard = [[3,0,0,1],[2,0,1,1],[1,1,0,0],[0,1,1,2]];



export const useGameState = (GridItems)=>{

  let [board,updateBoard] = useState(defboard);

  useEffect(()=>{
    let cleaner = generalInputHandler(board,updateBoard);
    return ()=>{
      cleaner();
    }
  },[board])

  


  return {
    board
  }

}





export default useGameState