import {InputEventHandler} from './BoardMoveHandler'


let arrowKeys = ['ArrowUp','ArrowDown','ArrowRight','ArrowLeft'];

export function generalInputHandler(board,updateBoard,clicked,setClicked){
  
  window.onkeydown = function(ev){
    arrowHandler(ev,board,updateBoard,clicked,setClicked)
  }

  let {swipeCleaner} = swipeListener(board,updateBoard,clicked,setClicked);

  return ()=>{

    window.onkeydown = function(){};
    swipeCleaner();
    
  }

}


function arrowHandler(ev,board,setBoard,clicked,setClicked){
  if(clicked)
    return;


  if(!arrowKeys.includes(ev.key)){
    return;
  }
  let keyDirection = ev.key.toLocaleLowerCase().replace('arrow','');
  
  setClicked(keyDirection);

  setTimeout(()=>{
    setClicked(false)
    console.log('setted false')
  },250)

  InputEventHandler(keyDirection,board,setBoard);
}




function swipeListener(board,updateBoard,clicked,setClicked){

  let x0 = 0;
  let y0 = 0;

  let xdiff = 0;
  let ydiff = 0;
  
  window.addEventListener('mousedown',swipeStart,false)
  window.addEventListener('mouseup',swipeEnd,false)

  window.addEventListener('touchstart',swipeStart,false)
  window.addEventListener('touchend',swipeEnd,false)


  function unifyInput(ev){
    return ev.changedTouches ? ev.changedTouches[0] : ev;
  }
  

  function swipeStart(ev){

    x0 = unifyInput(ev).screenX;
    y0 = unifyInput(ev).screenY;
  
  }


  function swipeEnd(ev){  


    ev.preventDefault();
    xdiff = unifyInput(ev).screenX - x0;
    ydiff = unifyInput(ev).screenY - y0;
    let keyDirection = getDirection(xdiff,ydiff);
    InputEventHandler(keyDirection,board,updateBoard);
  }

  function getDirection(xdiff,ydiff){
    
    let mag = Math.sqrt((xdiff*xdiff)+(ydiff*ydiff));
    let normX = xdiff/mag;
    let normY = ydiff/mag;


    if(!normX || !normY){
      return;
    }

    let absNormX = Math.abs(normX);
    let absNormY = Math.abs(normY);

    if(Math.abs(absNormX-absNormY)>.5){

      absNormX = Math.round(normX)
      absNormY = Math.round(normY)
      let direction ;
      if(absNormX === 0){
        direction = (absNormY>0)? 'down' : 'up' ;
      }else {
        direction = (absNormX>0)? 'right' : 'left' ;
      } 
      return direction;
    }
    return;
  }  

  return {
    swipeCleaner:()=>{
      window.removeEventListener('mousedown',swipeStart);
      window.removeEventListener('mouseup',swipeEnd);
      window.removeEventListener('touchstart',swipeStart);
      window.removeEventListener('touchend',swipeEnd);
    }
  }

}