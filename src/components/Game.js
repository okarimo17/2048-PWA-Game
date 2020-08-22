import React, { useState } from 'react';


import GridBackground from './gameholder/GridBackground';
import GameGrid from './gameholder/GameGrid'


function Game(){
  let [gameEnded,setEnded] = useState(false);

  return(
    <div className="game-holder">
      <GridBackground />    
      <GameGrid setGameEnded={setEnded} gameEnded={gameEnded} />    
    </div>
  )
}





export default Game;