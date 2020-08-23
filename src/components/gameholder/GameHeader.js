import React from 'react'

function GameHeader({gameScore,newGame}){
  let HighScore = (localStorage.getItem('HScore')) || 0;
  return (
    <div className="game-header_outer">
      <div className="game-header">
        <div className="game-name">2048K</div>
        <div className="game-scores">
          <div className="game-score">
            <span className="label">
              Score
            </span>
            <span className="score">
              {gameScore}
            </span>
          </div>
          <div className="best-score">
            <span className="label">
              Best Score
            </span>
            <span className="score">
              {(HighScore>gameScore)?HighScore:gameScore}
            </span>
          </div>
        </div>
      </div>
      <div className="game-header_btn">
        <span>GET THE 2048 TILE</span>
        <button className="retry-btn" onClick={newGame}>Play Again</button>
      </div>
    </div>
  )
}




export default GameHeader;