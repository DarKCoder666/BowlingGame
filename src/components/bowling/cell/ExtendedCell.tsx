import React from 'react'
import '../Bowling.scss'
import { EMPTY_SIGN } from '../../../consts/CELL_TYPES'
import { IBowlingCell } from '../../../types/bowling.type'

const ExtendedCell = ({ data}: {data: IBowlingCell}) => {
  let val1 = data.values[0] || EMPTY_SIGN
  let val2 = data.values[1] || EMPTY_SIGN
  let val3 = data.values[2] || EMPTY_SIGN
  const total = data.total || EMPTY_SIGN
  const index = data.index

  if(data.values[0] === 10) val1 = "X" 
  if(data.values[0] === 10) val2 = "X" 
  if(data.values[0] === 10) val3 = "X" 

  if(data.values[0] !== 10 && data.values[0] + data.values[1] === 10) val2 = "/"

  return (
    <div className="bowling_cell">
      <div className="bowling_cell_index">
        {index}
      </div>
      <div className="bowling_cell_inner_wrap">
        <div className="bowling_cell_points">
          <div className="bowling_cell_point">{val1}</div>
          <div className="bowling_cell_point">{val2}</div>
          <div className="bowling_cell_point">{val3}</div>
        </div>
        <div className="bowling_cell_score">
          {total}
        </div>
      </div>
    </div>
  )
}

export default ExtendedCell