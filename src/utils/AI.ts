import { GRID_SIZE } from "./constants"

/**
 * Simple AI logics that picks the next free cell
*/
export const getAIMove = (grid: (Player | null)[][]): [ number, number ] => {
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (!grid[ row ][ col ]) {
        return [ row, col ]
      }
    }
  }
  return [ 0, 0 ]
}
