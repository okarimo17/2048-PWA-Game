import {InputEventHandler} from './BoardMoveHandler'


let arrowKeys = ['ArrowUp','ArrowDown','ArrowRight','ArrowLeft'];

export function generalInputHandler(board,updateBoard){
  
  window.onkeyup = function(ev){
    arrowHandler(ev,board,updateBoard)
  }

  let {swipeCleaner} = swipeListener(board,updateBoard);

  return ()=>{
    window.onkeyup = function(){};
    swipeCleaner();
  }

}


function arrowHandler(ev,board,setBoard){
  if(!arrowKeys.includes(ev.key)){
    return;
  }
  let keyDirection = ev.key.toLocaleLowerCase().replace('arrow','');
  InputEventHandler(keyDirection,board,setBoard);
}


function swipeListener(board,updateBoard){

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
    xdiff = unifyInput(ev).screenX - x0;
    ydiff = unifyInput(ev).screenY - y0;
    let keyDirection = getDirection(xdiff,ydiff);
    InputEventHandler(keyDirection,board,updateBoard);
  }
// ya3tik sa7a akhouya 
// hhh oui mliha chia mbsh mazal hadi apga ta3 inputs tsma arrows w swipe hna
// oui mes lsl 7alit algorithme ya3tik sa7a akhouya w rabi ywaf9ak khouya la3ziz dok kach man7awl ghodwa walla ghir ghodwa ntaftaf f algorithme ta3ha 
// au moin ila 7ssalt walla mafhmtch 7ajja ak tfahamni 
// oui mathabya , algo ta3ha kima gtlk kayn simple w kayn li tjik mada dasema khsata ith hab tt3l bzaf fi recursion 
// oui akhouya ana nchof nkhdemha sa3a willa yassama ila nja7t nchof nriglha mn b3d yassama n7awal na9asslha f la complexity 
// oui hadik hya astna n3tlk fichier li bdit fiha howa rasmi hadi ki drtha react tsma ttkhlt bazaf

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