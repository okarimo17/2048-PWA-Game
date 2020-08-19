import React, { useEffect } from 'react';
import './App.css';
import Game from './Game/Game';

function App() {
  useEffect(()=>{
    swipeListener();
  })
  return (
    <div className="app">
      <Game />
    </div>
  );
}

export default App;


function swipeListener(){

  let x0 = 0;
  let y0 = 0;

  let xdiff = 0;
  let ydiff = 0;
  
  // window.addEventListener('mousedown',lock)
  // window.addEventListener('mouseup',unlock)

  window.addEventListener('touchstart',tlock)
  window.addEventListener('touchend',tunlock)

function tlock(ev){
  console.log(ev)
}
function tunlock(ev){
  console.log(ev)
}

  function lock(ev){
    console.clear();
    x0 = ev.screenX;
    y0 = ev.screenY;
  }

  function unlock(ev){
    xdiff = ev.screenX - x0;
    ydiff = ev.screenY - y0;
    let mag = Math.sqrt((xdiff*xdiff)+(ydiff*ydiff));
    let xnor = xdiff/mag;
    let ynor = ydiff/mag;
    
    if(xnor && ynor){


      let absNormX = Math.abs(xnor);
      let absNormY = Math.abs(ynor);


      if(Math.abs(absNormX-absNormY)>.5){
        console.log(`X Normalized ::${xnor}  , Y Normalized ::${ynor} `)
        
      }

    }    
  }
}