import {useState} from 'react';


export const useGameState = (GridItems)=>{
  let [board,updateBoard] = useState([[0,0,0,0],[0,0,1,0],[0,1,0,0],[0,1,1,1]]);

  window.addEventListener("keyup", function(ev){
    console.log('clicked')
  })


  return {
    board,
  }
}


export default useGameState