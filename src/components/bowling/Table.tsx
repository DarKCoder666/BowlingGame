import React from 'react'
import RegularCell from './cell/RegularCell'
import ExtendedCell from './cell/ExtendedCell'
import { EXTENDED_CELL } from '../../consts/CELL_TYPES'
import classNames from 'classnames'
import { IBowlingCell, IBowlingTable } from '../../types/bowling.type'

import './Bowling.scss'

const Table: React.FC = ({ data, active, isOver }: { data: IBowlingTable, active: boolean, isOver: boolean }) => {
  let totalScore: number = 0
  const { table, username } = data
  const cells = table.map((cell: IBowlingCell, index: number) => {
    totalScore += cell.total
    if (cell.type === EXTENDED_CELL) {
      return <ExtendedCell key={index} data={cell} />
    }

    return <RegularCell key={index} data={cell} />
  })

  const table_classnames = classNames({
    'bowling_table_wrap': true,
    'active': active
  })

  return (
    <div className={table_classnames}>
      <h1>{username}{isOver ? `: ${totalScore}` : ''}</h1>
      <div className="bowling_table">
        {cells}
      </div>
    </div>
  )
}

export default Table