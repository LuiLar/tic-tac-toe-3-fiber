import { useContext } from 'react'
import { GameControllerContext } from '../providers/GameControllerProvider'
import Cell from './Cell'
import './Board.css'

const Board = () => {
  const { grid, onCellCliked } = useContext(GameControllerContext)

  return (
    <div id='board'>
      {grid.flat().map((cell, index) => (
        <Cell
          key={`cell-${index}`}
          cellPosition={index}
          symbol={cell}
          onClickCB={onCellCliked}
        />
      ))}
    </div>
  )
}

export default Board
