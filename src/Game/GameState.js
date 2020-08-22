import {useState, useEffect} from 'react';
import { generalInputHandler } from './InputHandlers';
import {initDefBoard} from './utlis'


let defboard = initDefBoard();

let cleaner ;

export const useGameState = (GridItems,gameEnded,setGameEnded)=>{

  let [board,updateBoard] = useState(defboard);
  let [clicked,setClicked] = useState(false);

  useEffect(()=>{
    cleaner = generalInputHandler(board,updateBoard,clicked,setClicked,setGameEnded);
    return ()=>{
      cleaner();
    }
  },[board,clicked])

  useEffect(()=>{
    if(gameEnded)
      cleaner();
  },[gameEnded])
  

  return {
    board,
    clicked
  }

}




export default useGameState