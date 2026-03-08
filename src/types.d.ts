type Player = {
  type: PlayerType
  symbol: BoardPiece
}
type Grid = (BoardPiece | null)[][]