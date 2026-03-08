import { GRID_SIZE } from "./constants"

/**
 * This is more performant than iterating over the grid,
 * but it is not the most elegant solution
 */
export function isThereAWinner(grid: (Player | null)[][]): boolean {
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
}

export function isThereADraw(grid: (Player | null)[][]): boolean {
  return grid.flat().every(cell => cell !== null)
}

export function generateBlankGrid(): null[][] {
  return new Array(GRID_SIZE).fill(null).map(() => new Array(GRID_SIZE).fill(null))
}