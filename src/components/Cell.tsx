import { useMemo } from "react"
import { GRID_SIZE } from "../utils/constants"
import type { BoardPiece } from "../enums"
import './Cell.css'

type CellProps = {
  cellPosition: number
  symbol: BoardPiece | null
  onClickCB: (row: number, col: number) => void
}

const Cell = ({ cellPosition, symbol, onClickCB }: CellProps) => useMemo(() => {
  const rowPosition = Math.floor(cellPosition / GRID_SIZE)
  const colPosition = cellPosition % GRID_SIZE

  return (
    <button id="cell" disabled={!!symbol} onClick={() => onClickCB(rowPosition, colPosition)}>
      {symbol}
    </button>
  )
}, [ cellPosition, symbol, onClickCB ])

export default Cell
