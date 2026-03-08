import { useContext, useEffect } from 'react'
import Board from './components/Board'
import { GameControllerContext } from './providers/GameControllerProvider'
import './App.css'
import SymbolSelectionModal from './components/SymbolSelectionModal'
import ScoreBoard from './components/ScoreBoard'

const App = () => {
  const {
    winner,
    draw,
    grid,
    currentPlayer,
    resetGame,
    nextMatch,
  } = useContext(GameControllerContext)

  useEffect(() => {
    if (winner) {
      alert(`${winner.type} wins!`)
      nextMatch()
    } else if (draw) {
      alert(`It's a draw!`)
      nextMatch()
    }
  }, [ grid ])

  return (
    <>
      <header>
        <div>
          <p>{`Player turn: `}</p>
          <p>
            {`${currentPlayer.type} - ${currentPlayer.symbol}`}
          </p>
        </div>
        <h1>TIC-TAC-TOE</h1>
        <button onClick={resetGame}>RESET</button>
      </header>

      <main>
        <div />
        <Board />
        <ScoreBoard />
      </main>

      <footer>
        <p>Made by Luis Larghi</p>
      </footer>

      <SymbolSelectionModal />
    </>
  )
}

export default App
