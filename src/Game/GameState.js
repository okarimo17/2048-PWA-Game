import {useState, useEffect} from 'react';
import { generalInputHandler } from './InputHandlers';


function RandNumber (min=1,max=2){
  let numb = ( Math.random()*(max-min+1)) + min;
  return Math.floor(numb);
}

let defboard = [
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0]
];


const addRandomNumber = (board)=>{
  let newnumber = RandNumber();

  let zeroRows = board.reduce((all,col,key)=> {
    if(col.includes(0)) all += key;
    return all;
  },'')

  if(zeroRows===''){
    return;
  }

  let randRow = zeroRows[RandNumber(0,zeroRows.length-1)];

  let zeroIndexes = board[randRow].reduce((all,item,key)=> {
    if(item===0) all += key;
    return all;
  },'')

  if(zeroIndexes===''){
    return;
  }

  let index = zeroIndexes[RandNumber(0,zeroIndexes.length-1)];
  board[randRow][index]  = newnumber;
}

function initDefBoard(){
  addRandomNumber(defboard);
  addRandomNumber(defboard);
}
initDefBoard();

export const useGameState = (GridItems)=>{

  let [board,updateBoard] = useState(defboard);

  let [clicked,setClicked] = useState(false);

  useEffect(()=>{
    let cleaner = generalInputHandler(board,updateBoard,clicked,setClicked,addRandomNumber);
    return ()=>{
      cleaner();
    }
  },[board,clicked])

  

  return {
    board,
    clicked
  }

}




export default useGameState