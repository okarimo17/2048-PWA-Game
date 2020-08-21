import React from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import useGameState from './GameState';



const GridItems = 4;

function Game(){
  

  return(
    <div className="game-holder">
      <GridBackground />    
      <GameGrid />    
    </div>
  )
}

const GridBackground = ()=>{
  return (
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
}

let directions = {
  'left':{x:-1,y:0},
  'right':{x:1,y:0},
  'up':{x:0,y:-1},
  'down':{x:0,y:1},
}

const GameGrid = ()=>{
  let {board,clicked}= useGameState(GridItems);

  let dir = (!directions[clicked]) ? {x:0,y:0} : directions[clicked] ;

  return(
    <div className="game-grid">
    <AnimatePresence>
          {
            board.map((row,i)=>(
                  row.map(
                    (cell,j)=>(
                      cell !== 0 ?
                          <motion.div 
                            key={i+""+j+""}
                            initial={{x:-dir.x*150+'%',y:-dir.y*150+'%',zIndex:10}} 
                            animate={{x:0,y:0,zIndex:1}}  
                            transition={{duration:.13}}
                            className="grid-cell" 
                            style={{gridColumnStart:j+1,gridRowStart:i+1}}              
                            exit={{
                              x:dir.x*150+'%',
                              display:'none',
                              y:dir.y*150+'%',
                              transition:{
                                duration:.12
                              },
                            }}              
                          >
                            <div className="number" style={{background:''}}>
                              <span>{cell}</span>
                            </div>
                          </motion.div>
                        :null
                    )
                  )            
            ))
          }        
      </AnimatePresence>
    </div>
  )
}
          // row.map((cell,j)=>{
          //   <div className="grid-cell" style={{gridColumnStart:j+1,gridRowStart:i+1}}></div>
          // })
export default Game;