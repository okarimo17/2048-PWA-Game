import React, { useState, useEffect } from 'react';
import {GameGrid,GridBackground,GameHeader} from './gameholder/index'


function Game(){
  let [gameEnded,setEnded] = useState(false);
  let [gameScore,setScore] = useState(0)
  let [gameRestart,setRes] = useState(false)

  function newGame(){
    setRes(true);
  }

  useEffect(()=>{
    if(gameRestart===true){
      setRes(false)
    }
  },[gameRestart])

  return(
    <>
      <GameHeader gameScore={gameScore} newGame={newGame} />
      <div className={"game-holder"+((gameEnded)?' game-ended':'')}>
        <GridBackground />    
        <GameGrid setGameEnded={setEnded} gameEnded={gameEnded} score={{gameScore,setScore}} gameRestart={gameRestart} />    
        {gameEnded && 
          <div className="game-end">
              <span>Game Over</span>
              <span>Your Score : {gameScore}</span>
              <button className="retry-btn" onClick={newGame}>Play Again</button>
          </div>
        }
      </div>
    </>
  )
}





export default Game;