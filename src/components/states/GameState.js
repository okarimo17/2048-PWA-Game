import {useState, useEffect} from 'react';
import { generalInputHandler } from '../utils/InputHandlers';
import {initDefBoard} from '../utils/utlis'


let defboard = initDefBoard();

let cleaner ;

export const useGameState = (GridItems,gameEnded,setGameEnded)=>{

  let [board,updateBoard] = useState(defboard);
  let [clicked,setClicked] = useState(false);

  useEffect(()=>{
    if(!gameEnded){
      cleaner = generalInputHandler(board,updateBoard,clicked,setClicked,setGameEnded);
      return ()=>{
        cleaner();
      }
    }
  },[board,clicked,gameEnded,setGameEnded])

  useEffect(()=>{
    if(gameEnded)
      cleaner();
  },[gameEnded,setGameEnded])
  

  return {
    board,
    clicked
  }

}




export default useGameState