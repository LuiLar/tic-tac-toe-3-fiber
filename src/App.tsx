import { useContext, useEffect } from 'react'
import Board from './components/Board'
import { GameControllerContext } from './providers/GameControllerProvider'
import './App.css'

const App = () => {
  const { winner, draw, grid, currentPlayer, resetGame } = useContext(GameControllerContext)

  useEffect(() => {
    if (winner) {
      alert(`${winner.type} wins!`)
      resetGame()
    } else if (draw) {
      alert(`It's a draw!`)
      resetGame()
    }
  }, [ grid ])

  return (
    <>
      <header>
        <p>{`Player turn: ${currentPlayer.type}`}</p>
        <h1>TIC-TAC-TOE</h1>
        <button onClick={resetGame}>RESET</button>
      </header>

      <Board />

      <footer>
        <p>Made by Luis Larghi</p>
      </footer>
    </>
  )
}

export default App
