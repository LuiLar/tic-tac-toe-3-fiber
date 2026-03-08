import { createContext, startTransition, useCallback, useEffect, useState } from "react"
import { BoardPiece, PlayerType } from "../enums"
import { getAIMove } from "../utils/AI"
import { isThereADraw, isThereAWinner, generateBlankGrid } from "../utils/helperFunctions"
import { AI_MOVE_INTERVAL } from "../utils/constants"
import type { GameControllerContextType } from "./GameControllerProviderType"
import { initialState, players } from "./GameControllerProviderInitialState"

let turnSwitcher: boolean = false

const GameControllerContext = createContext<GameControllerContextType>(initialState)

const GameControllerProvider = ({ children }: { children: React.ReactNode }) => {
  ////////////////////////////////////////////////////////////
  // STATE HANDLERS
  const [ winner, setWinner ] = useState<Player | null>(initialState.winner)
  const [ draw, setDraw ] = useState<boolean>(initialState.draw)
  const [ currentPlayer, setCurrentPlayer ] = useState<Player>(initialState.currentPlayer)
  const [ grid, setGrid ] = useState<Grid>(initialState.grid)
  const [ showSymbolSelectionModal, setShowSymbolSelectionModal ] = useState<boolean>(initialState.showSymbolSelectionModal)
  // CALLBACKS
  const verifyWinner = useCallback(() => isThereAWinner(grid), [ grid ])
  const verifyDraw = useCallback(() => isThereADraw(grid), [ grid ])
  ////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////
  // ACTIONS
  const nextMatch = () => {
    startTransition(() => {
      turnSwitcher = false
      setGrid(generateBlankGrid())
      setCurrentPlayer(players[ +turnSwitcher ])
      setDraw(false)
      setWinner(null)
    })
  }

  const resetGame = () => {
    startTransition(() => {
      nextMatch()
      setShowSymbolSelectionModal(true)
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

  const onSymbolSelectionModalClose = (symbolSelected: BoardPiece) => {
    startTransition(() => {
      setShowSymbolSelectionModal(false)
      players[ 0 ].symbol = symbolSelected
      players[ 1 ].symbol = symbolSelected === BoardPiece.X ? BoardPiece.O : BoardPiece.X
      setCurrentPlayer(players[ +turnSwitcher ])
    })
  }
  ////////////////////////////////////////////////////////////

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
    showSymbolSelectionModal,
    nextMatch,
    resetGame,
    verifyWinner,
    onCellCliked,
    onSymbolSelectionModalClose,
  }

  return (
    <GameControllerContext.Provider value={value}>
      {children}
    </GameControllerContext.Provider>
  )
}

export default GameControllerProvider
export { GameControllerContext }
