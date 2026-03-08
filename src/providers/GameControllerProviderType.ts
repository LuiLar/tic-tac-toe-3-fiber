import type { BoardPiece } from "../enums"

export type GameControllerContextType = {
  grid: Grid
  winner: Player | null
  draw: boolean
  currentPlayer: Player
  showSymbolSelectionModal: boolean
  nextMatch: () => void
  resetGame: () => void
  verifyWinner: () => void
  onCellCliked: (row: number, col: number) => void
  onSymbolSelectionModalClose: (symbolSelected: BoardPiece) => void
}
