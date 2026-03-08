import { BoardPiece, PlayerType } from "../enums";
import { generateBlankGrid } from "../utils/helperFunctions";
import type { GameControllerContextType } from "./GameControllerProviderType";

export const players: Player[] = [
  { type: PlayerType.HUMAN, symbol: BoardPiece.X },
  { type: PlayerType.AI, symbol: BoardPiece.O },
]

export const initialState: GameControllerContextType = {
  grid: generateBlankGrid(),
  winner: null,
  draw: false,
  currentPlayer: { type: PlayerType.HUMAN, symbol: BoardPiece.X },
  showSymbolSelectionModal: true,
  nextMatch: () => { },
  resetGame: () => { },
  verifyWinner: () => { },
  onCellCliked: () => { },
  onSymbolSelectionModalClose: () => { },
}
