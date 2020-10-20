import React from 'react'
import '../Bowling.scss'
import { EMPTY_SIGN } from '../../../consts/CELL_TYPES'

const RegularCell: React.FC = ({ data }) => {
  let val1 = data.values[0] || EMPTY_SIGN
  let val2 = data.values[1] || EMPTY_SIGN
  const total = data.total || EMPTY_SIGN
  const index = data.index

  if(val1 === 10){
    val2 = "X"
    val1 = EMPTY_SIGN
  }
  if(val1 !== 10 && val1 + val2 === 10) val2 = "/"

  return (
    <div className="bowling_cell">
      <div className="bowling_cell_index">
        {index}
      </div>
      <div className="bowling_cell_inner_wrap">
        <div className="bowling_cell_points">
          <div className="bowling_cell_points_left">{val1}</div>
          <div className="bowling_cell_points_right">{val2}</div>
        </div>
        <div className="bowling_cell_score">
          {total}
        </div>
      </div>
    </div>
  )
}

export default RegularCell