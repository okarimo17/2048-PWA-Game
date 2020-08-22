import React, { useState } from 'react';
import {GameGrid,GridBackground,GameHeader} from './gameholder/index'


function Game(){
  let [gameEnded,setEnded] = useState(false);

  return(
    <>
      <GameHeader />
      <div className="game-holder">
        <GridBackground />    
        <GameGrid setGameEnded={setEnded} gameEnded={gameEnded} />    
      </div>
    </>
  )
}





export default Game;