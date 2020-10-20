import ExtendedCell from '../components/bowling/cell/ExtendedCell'
import RegularCell from '../components/bowling/cell/RegularCell'
import { REGULAR_CELL, EXTENDED_CELL, EMPTY_SIGN } from '../consts/CELL_TYPES'

export interface IBowlingCell {
  type: string,
  values: number[],
  index: number,
  total: number
}

export interface IBowlingTable {
  id: number,
  username: string,
  table: IBowlingCell[]
}