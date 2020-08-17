import React from 'react';
import useGameState from './GameState';


const GridItems = 4;

function Game(){
  
  let {board}= useGameState(GridItems);

  console.log('render game')
  return(
    <div className="game-holder">
      <GridBackground />    
      <GameGrid board={board} />    
    </div>
  )
}

const GridBackground = ()=>(
  <div className="background-grid">
    {
      Array(GridItems).fill(0).map((val,i)=>{
        return(
          <div key={i} className="grid-row">
            {
              Array(GridItems).fill(0).map(
                (val,j)=>(
                  <div key={j} className="grid-cell"></div>
                )
              )
            }
          </div>
        )
      })
    }
   
  </div>
)

const GameGrid = ({board})=>{

  return(
    <div className="game-grid">
    {
      board.map((row,i)=>(
            row.map(
              (cell,j)=>(
                cell !== 0 ?
                    <div key={i+""+j} className="grid-cell" style={{gridColumnStart:j+1,gridRowStart:i+1}}>
                      <div className="number">
                        <span>{cell}</span>
                      </div>
                    </div>
                  :null
              )
            )            
      ))
    }
    </div>
  )
}
          // row.map((cell,j)=>{
          //   <div className="grid-cell" style={{gridColumnStart:j+1,gridRowStart:i+1}}></div>
          // })
export default Game;