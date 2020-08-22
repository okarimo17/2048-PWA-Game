import React, { useState, useEffect } from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import useGameState from './GameState';

const colors = {
  0:  '#cdc1b4',
  1: '#eee4da',
  2: '#ede0c8',
  3: '#f2b179',
  4: '#f59563',
  5: '#f67c5f',
  6: '#f65e3b',
  7: '#edcf72',
  8: '#edcc61',
  9: '#edc850',
  10: '#edc53f',
  11: '#edc22e',
}


const GridItems = 4;

function Game(){

  let [gameEnded,setEnded] = useState(false);

  
  return(
    <div className="game-holder">
      <GridBackground />    
      <GameGrid setGameEnded={setEnded} gameEnded={gameEnded} />    

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

const GameGrid = ({gameEnded,setGameEnded})=>{
  
  let {board,clicked}= useGameState(GridItems,gameEnded,setGameEnded);

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
                            initial={{x:-dir.x*150+'%',y:-dir.y*150+'%',zIndex:10,scale:.8}} 
                            animate={{x:0,y:0,zIndex:1,scale:1}}  
                            transition={{duration:.1}}
                            className="grid-cell" 
                            style={{gridColumnStart:j+1,gridRowStart:i+1}}    

                            exit={{
                              x:dir.x*150+'%',
                              y:dir.y*150+'%',
                              opacity:.2,
                              scale:.8,
                              transition:{
                                duration:.1,
                              },
                            }}              

                          >
                            <div className={
                              cell>2 ? 'number white-numb':'number'
                              } style={{background:colors[cell]}}>
                              <span>{ Math.pow(2,cell) }</span>
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