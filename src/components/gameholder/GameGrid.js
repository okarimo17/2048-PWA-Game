import React from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import useGameState from '../states/GameState';
import {COLORS,GRIDITEMS} from './constants'


let directions = {
  'left':{x:-1,y:0},
  'right':{x:1,y:0},
  'up':{x:0,y:-1},
  'down':{x:0,y:1},
}


const GameGrid = ({gameEnded,setGameEnded})=>{

  let {board,clicked}= useGameState(GRIDITEMS,gameEnded,setGameEnded);

  let dir = (!directions[clicked]) ? {x:0,y:0} : directions[clicked] ;

  return(
    <div className="game-grid">
      <AnimatePresence>
            {
              board.map((row,i)=>(
                    row.map(
                      (cell,j)=>(
                        cell !== 0 ?
                          <AnimatedCell key={i+""+j+""} i={i} j={j} dir={dir} cell={cell} />
                          :null
                      )
                    )            
              ))
            }        
        </AnimatePresence>
    </div>
  )
}

const AnimatedCell = ({i,j,dir,cell,children})=>{
  let {x,y} = dir;

  return(
    <motion.div 
    className="grid-cell" 
    style={{gridColumnStart:j+1,gridRowStart:i+1}}  
    initial={{x:-x*150+'%',y:-y*150+'%',zIndex:10,scale:.8}} 
    animate={{x:0,y:0,zIndex:1,scale:1}}  
    transition={{duration:.1}}
    exit={{
      x:x*150+'%',
      y:y*150+'%',
      opacity:.2,
      scale:.8,
      transition:{
        duration:.1,
      },
    }}              
    >
      <div className={
          'number'+ (cell>2 ? ' white-numb':'') +(cell>9 ? ' big-numb':'')  
        } 
        style={{
          background:(COLORS[cell]?COLORS[cell]:COLORS[11]),                                                        
        }}>
        <span>{ Math.pow(2,cell) }</span>
      </div>
    </motion.div>
  )
}



export default GameGrid;