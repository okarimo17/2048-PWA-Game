import {useState, useEffect} from 'react';
import { generalInputHandler } from '../utils/InputHandlers';
import {initDefBoard} from '../utils/utlis'


let defboard = initDefBoard();

let cleaner ;

export const useGameState = (GridItems,gameEnded,setGameEnded,score,gameRestart)=>{

  let [board,updateBoard] = useState(defboard);
  let [clicked,setClicked] = useState(false);

  useEffect(()=>{
    if(!gameEnded){
      cleaner = generalInputHandler(board,updateBoard,clicked,setClicked,setGameEnded,score);
      return ()=>{
        cleaner();
      }
    }
  },[board,clicked,gameEnded,setGameEnded,score])


  useEffect(()=>{
    if(gameEnded){
      cleaner();
      defboard = initDefBoard(true);
    }
  },[gameEnded,setGameEnded])
  
  useEffect(()=>{
    if(gameRestart){
      console.log('restarting')
      score.setScore(0);
      if(!gameEnded){
        cleaner()
        defboard = initDefBoard(true);
      }
      setGameEnded(false)
      updateBoard(defboard)
    }
  },[gameRestart,score,setGameEnded])

  return {
    board,
    clicked
  }

}




export default useGameState