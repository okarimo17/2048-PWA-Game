import React from 'react'

function GameHeader(){
  return (
    <div className="game-header">
      <div className="game-name">2048K</div>
      <div className="game-scores">
        <div className="game-score">
          <span className="label">
            Score
          </span>
          <span className="score">
            152
          </span>
        </div>
        <div className="best-score">
          <span className="label">
            Best Score
          </span>
          <span className="score">
            1520
          </span>
        </div>
      </div>
      
    </div>
  )
}




export default GameHeader;