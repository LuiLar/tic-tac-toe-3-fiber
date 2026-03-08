const PlayerType = {
  HUMAN: "HUMAN",
  AI: "AI",
}

const BoardPiece = {
  X: "X",
  O: "O",
}

type PlayerType = typeof PlayerType[ keyof typeof PlayerType ]
type BoardPiece = typeof BoardPiece[ keyof typeof BoardPiece ]

export { PlayerType, BoardPiece }
