import { useContext } from "react";
import { GameControllerContext } from "../providers/GameControllerProvider";
import "./ScoreBoard.css"

const ScoreBoard = () => {
  const { matchesHistory } = useContext(GameControllerContext)

  if (matchesHistory.length === 0) return null

  return (
    <section id="scoreboard">
      <h2>Matches History</h2>
      {matchesHistory.map((match, index) => (
        <p key={`match-${index}`}>
          {`${index + 1}: ${match ? match.type : 'DRAW'}`}
        </p>
      ))}
    </section>
  )
}

export default ScoreBoard;
