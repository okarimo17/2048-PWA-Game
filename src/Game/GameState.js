import {useState,useEffect} from 'react';
const keys = ['ArrowUp','ArrowDown','ArrowRight','ArrowLeft']
let board;
export const useGameState = (GridItems)=>{
  let [boards,updateBoard] = useState([[3,0,0,1],[2,0,1,1],[1,1,0,0],[0,1,1,2]]);

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
    console.table(board);
  }
  if(ev.key === "ArrowDown"){
    for(let i =0;i<4;i++){
      console.log('------',i,'-------');
      getMove(3,i,-1);
  
    }
  }
}

let EndIndex = 0;

function getMove(i,j,val,haveToShift=false,uniq=[]){

  if(i<EndIndex){
    // index is out of bound state of the array
    // console.log('-1 index returning 0');

    return 0;
  }

  

  let cur_val = board[i][j];



  if(cur_val === 0){

    if(val > 0)
      uniq.push(val)

    let new_val = getMove(i-1,j,cur_val,true,uniq);


    if(new_val === val){
      let new_val_new = getMove(i-1,j,0,true,[]);
      board[i][j] = new_val_new;
      return new_val;
    } 

    // console.log(`${i}:: 11111 ${haveToShift}`);


    if(haveToShift){
      let new_val_new = getMove(i-1,j,0,true,[]);
      board[i][j] = new_val_new;
      return new_val;
    }


    // console.log(`${i}:: 2222 ${haveToShift}`);
    

    if(new_val<0)
      new_val = -new_val;

    board[i][j] = new_val;

    return 0;
  }
  

  
  let new_val;



  if (cur_val === val){

    let to_ret=cur_val;

    new_val = getMove(i-1,j,0,true,uniq);
    console.log(`${i}::: ${cur_val}::${new_val},${haveToShift}`)

    if(haveToShift){    

      board[i][j] = new_val;

      return to_ret;
    }


    board[i][j] = new_val < 0 ? -new_val : new_val ;
    return to_ret;

  }

  if(val===0){

    let last = uniq.shift();
    if(cur_val === last){

      let to_ret=cur_val;

      new_val = getMove(i-1,j,0,true,uniq);
  
      board[i][j] = new_val;

      return to_ret;
    }else {
      uniq.unshift(last);
    }

  }




  new_val = getMove(i-1,j,cur_val,haveToShift);

  let to_ret  = cur_val;

  let equals  = false;


  if(cur_val === new_val){
    // console.log(`${i}:: curval:${cur_val}==newval:${new_val},shift${haveToShift}`);
    new_val = cur_val = cur_val + 1;
    to_ret = 0;
    equals = true;
    if(haveToShift){
      to_ret = -new_val;
      new_val = getMove(i-1,j,0,true)
      board[i][j] = new_val;
      return to_ret;
    }
  }  


  
  if(!haveToShift){
    new_val = cur_val;
  }

  board[i][j] = new_val;

  return to_ret;
}




export default useGameState