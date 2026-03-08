import { createContext, startTransition, useCallback, useEffect, useState } from "react"
import { BoardPiece, PlayerType } from "../enums"
import { getAIMove } from "../utils/AI"
import { isThereADraw, isThereAWinner, generateBlankGrid } from "../utils/helperFunctions"
import { AI_MOVE_INTERVAL } from "../utils/constants"

// Local vars outside of component to prevent
// re-declaration on re-renders
let turnSwitcher: boolean = false
const players: Player[] = [
  { type: PlayerType.HUMAN, symbol: BoardPiece.X },
  { type: PlayerType.AI, symbol: BoardPiece.O },
]

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
  // STATE HANDLERS
  const [ winner, setWinner ] = useState<Player | null>(null)
  const [ draw, setDraw ] = useState<boolean>(false)
  const [ currentPlayer, setCurrentPlayer ] = useState<Player>(players[ +turnSwitcher ])
  const [ grid, setGrid ] = useState<Grid>(generateBlankGrid())
  // CALLBACKS
  const verifyWinner = useCallback(() => isThereAWinner(grid), [ grid ])
  const verifyDraw = useCallback(() => isThereADraw(grid), [ grid ])

  const resetGame = () => {
    turnSwitcher = false

    startTransition(() => {
      setGrid(generateBlankGrid())
      setCurrentPlayer(players[ +turnSwitcher ])
      setDraw(false)
      setWinner(null)
    })
  }

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
