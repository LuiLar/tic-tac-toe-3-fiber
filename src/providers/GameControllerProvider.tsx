import { createContext, startTransition, useCallback, useEffect, useState } from "react"
import { BoardPiece, PlayerType } from "../enums"
import { getAIMove } from "../AI"

const AI_MOVE_INTERVAL = 500
export const GRID_SIZE = 3
let turnSwitcher: boolean = false

const generateBlankGrid = (): null[][] => {
  return new Array(GRID_SIZE).fill(null).map(() => new Array(GRID_SIZE).fill(null))
}

type GameControllerContextType = {
  grid: Grid
  winner: Player | null
  draw: boolean
  currentPlayer: Player
  resetGame: () => void
  verifyWinner: () => void
  onCellCliked: (row: number, col: number) => void
}

const initialState: GameControllerContextType = {
  grid: generateBlankGrid(),
  winner: null,
  draw: false,
  currentPlayer: { type: PlayerType.HUMAN, symbol: BoardPiece.X },
  resetGame: () => { },
  verifyWinner: () => { },
  onCellCliked: () => { },
}

const GameControllerContext = createContext<GameControllerContextType>(initialState)

const GameControllerProvider = ({ children }: { children: React.ReactNode }) => {
  const players: Player[] = [
    { type: PlayerType.HUMAN, symbol: BoardPiece.X },
    { type: PlayerType.AI, symbol: BoardPiece.O },
  ]

  const [ winner, setWinner ] = useState<Player | null>(null)
  const [ draw, setDraw ] = useState<boolean>(false)
  const [ currentPlayer, setCurrentPlayer ] = useState<Player>(players[ +turnSwitcher ])
  const [ grid, setGrid ] = useState<Grid>(generateBlankGrid())

  const resetGame = () => {
    turnSwitcher = false

    startTransition(() => {
      setGrid(generateBlankGrid())
      setCurrentPlayer(players[ +turnSwitcher ])
      setDraw(false)
      setWinner(null)
    })
  }

  /**
   * This is more performant than iterating over the grid,
   * but it is not the most elegant solution
   */
  const verifyWinner = useCallback((): boolean => {
    // Verify horizontally
    if (
      (grid[ 0 ][ 0 ] && grid[ 0 ][ 0 ] === grid[ 0 ][ 1 ] && grid[ 0 ][ 0 ] === grid[ 0 ][ 2 ]) ||
      (grid[ 1 ][ 0 ] && grid[ 1 ][ 0 ] === grid[ 1 ][ 1 ] && grid[ 1 ][ 0 ] === grid[ 1 ][ 2 ]) ||
      (grid[ 2 ][ 0 ] && grid[ 2 ][ 0 ] === grid[ 2 ][ 1 ] && grid[ 2 ][ 0 ] === grid[ 2 ][ 2 ])
    ) {
      return true
    }

    // Verify vertically
    if (
      (grid[ 0 ][ 0 ] && grid[ 0 ][ 0 ] === grid[ 1 ][ 0 ] && grid[ 0 ][ 0 ] === grid[ 2 ][ 0 ]) ||
      (grid[ 0 ][ 1 ] && grid[ 0 ][ 1 ] === grid[ 1 ][ 1 ] && grid[ 0 ][ 1 ] === grid[ 2 ][ 1 ]) ||
      (grid[ 0 ][ 2 ] && grid[ 0 ][ 2 ] === grid[ 1 ][ 2 ] && grid[ 0 ][ 2 ] === grid[ 2 ][ 2 ])
    ) {
      return true
    }

    // Verify diagonally
    if (
      (grid[ 0 ][ 0 ] && grid[ 0 ][ 0 ] === grid[ 1 ][ 1 ] && grid[ 0 ][ 0 ] === grid[ 2 ][ 2 ]) ||
      (grid[ 0 ][ 2 ] && grid[ 0 ][ 2 ] === grid[ 1 ][ 1 ] && grid[ 0 ][ 2 ] === grid[ 2 ][ 0 ])
    ) {
      return true
    }

    return false
  }, [ grid ])

  const verifyDraw = useCallback((): boolean => {
    return grid.flat().every(cell => cell !== null)
  }, [ grid ])

  const onCellCliked = (row: number, col: number) => {
    if (winner) return

    const newGrid: Grid = [ ...grid ]
    newGrid[ row ][ col ] = currentPlayer.symbol
    turnSwitcher = !turnSwitcher

    startTransition(() => {
      setGrid(newGrid)
      if (verifyWinner()) setWinner(currentPlayer)
      else if (verifyDraw()) setDraw(true)
      else setCurrentPlayer(players[ +turnSwitcher ])
    })
  }

  useEffect(() => {
    if (!winner && !draw) {
      if (currentPlayer.type === PlayerType.AI) {
        const aiInterval = setInterval(() => {
          const [ row, col ] = getAIMove(grid)
          onCellCliked(row, col)
          if (aiInterval) clearInterval(aiInterval)
        }, AI_MOVE_INTERVAL)
      }
    }
  }, [ currentPlayer, grid ])

  const value: GameControllerContextType = {
    grid,
    winner,
    draw,
    currentPlayer,
    resetGame,
    verifyWinner,
    onCellCliked,
  }

  return (
    <GameControllerContext.Provider value={value}>
      {children}
    </GameControllerContext.Provider>
  )
}

export default GameControllerProvider
export { GameControllerContext }
