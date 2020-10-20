import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { REGULAR_CELL, EXTENDED_CELL, EMPTY_SIGN } from '../../consts/CELL_TYPES'
import Table from './Table'
import BowlingController from './BowlingController'
import { IBowlingCell, IBowlingTable } from '../../types/bowling.type'
import { IPlayer } from '../../types/player.type'

const Bowling = ({ players }: {players: IPlayer[]}) => {
  const [tablesData, setTablesData] = useState<IBowlingTable[]>([])
  const [activeTableIndex, setActiveTableIndex] = useState<number>(0)
  const [round, setRound] = useState<number>(0)
  const [isOver, setIsOver] = useState<boolean>(false)
  let counter: number = 0

  useEffect(() => {
    const tableInitialData: IBowlingCell[] = []
    for (let i = 0; i < 10; i++) {
      const cell:IBowlingCell = {
        type: (i === 9) ? EXTENDED_CELL : REGULAR_CELL,
        values: [],
        index: i + 1,
        total: 0
      }
      tableInitialData.push(cell)
    }

    const tables:IBowlingTable[] = players.map(p => ({
      id: counter++,
      username: p.username,
      table: JSON.parse(JSON.stringify(tableInitialData)) // Deep clone
    }))

    setTablesData(tables)
  }, [counter, players])

  const nextStep = (values) => {
    let newTablesData:IBowlingTable[] = JSON.parse(JSON.stringify(tablesData))
    newTablesData = newTablesData.map(t => {
      if (t.id === activeTableIndex) {
        t.table[round].values = values
      }
      return t
    })
    setTablesData(newTablesData)

    if (activeTableIndex === tablesData.length - 1) {
      if (round !== 9) {
        setActiveTableIndex(0)
        setRound(round + 1)
      } else {
        setIsOver(true)
      }
    } else {
      setActiveTableIndex(activeTableIndex + 1)
    }
    calculateTableCells(newTablesData)
  }

  const calculateTableCells = (tablesD) => {
    const newTables = JSON.parse(JSON.stringify(tablesD))
    const theTable = newTables.find(t => t.id === activeTableIndex).table

    for (let i = 0; i < theTable.length; i++) {
      const cell = theTable[i]
      const nextCell = i + 1 < theTable.length ? theTable[i + 1] : false
      const nextNextCell = i + 2 < theTable.length ? theTable[i + 2] : false
      let total = cell.values.reduce((a, b) => a + b, 0)

      // Spare
      if (total === 10 && cell.values[0] !== 10 && i !== 9) {
        if (nextCell && nextCell.values.length) {
          total += nextCell.values[0]
        } else {
          total = EMPTY_SIGN
        }
      }

      // Strike
      if (cell.values[0] === 10 && i !== 9) {
        if (nextCell.values.length) {
          if (nextCell.values[0] === 10) {
            if (i === 8) {
              total += 10 + nextCell.values[1]
            } else if (nextNextCell && nextNextCell.values.length) {
              total += 10 + nextNextCell.values[0]
            } else {
              total = EMPTY_SIGN
            }
          } else {
            total += nextCell.values.reduce((a, b) => a + b, 0)
          }
        } else {
          total = EMPTY_SIGN
        }
      }

      cell.total = total
    }

    setTablesData(newTables)
  }

  const tables = tablesData.map((t, index) => (
    <Table isOver={isOver} key={index} data={t} active={activeTableIndex === t.id} />
  ))

  return (
    <div>
      {isOver && (
        <div>
          <h1>The game is over!</h1>
          <Link className="bowling_link" to="/">Go to the home page</Link>
        </div>
      )}

      {tables}

      {!isOver && (
        <BowlingController type={round === 9 ? EXTENDED_CELL : REGULAR_CELL} nextStep={nextStep} />
      )}
    </div>
  )
}

export default Bowling