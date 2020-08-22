import React from 'react';
import {GRIDITEMS} from './constants'


const GridBackground = ()=>{
  return (
  <div className="background-grid">
    {
      Array(GRIDITEMS).fill(0).map((val,i)=>{
        return(
          <div key={i} className="grid-row">
            {
              Array(GRIDITEMS).fill(0).map(
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


export default GridBackground;