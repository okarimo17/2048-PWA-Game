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
  let dir = {x:0,y:0}
  if(clicked){
    dir = directions[clicked]
  }
  console.log(dir)

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
                            initial={{scale:.94}} 
                            animate={{scale:1}}  
                            transition={{duration:.15}}
                            className="grid-cell" 
                            style={{gridColumnStart:j+1,gridRowStart:i+1}}              
                            exit={{
                              opacity:.9,
                              x:dir.x*100+'%',
                              y:dir.y*100+'%',
                              transition:{
                                duration:.2
                              },
                              transitionEnd:{
                                display:'none'
                              }
                            }}              
                          >
                            <div className="number">
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