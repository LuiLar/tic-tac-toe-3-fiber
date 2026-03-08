# TIC TAC TOE GAME

Made with Vite + React + TypeScript.

The current state of the game lets a human player play against a computer.
The human player can select the symbol they want to play with (X or O) and the computer will play with the other symbol. The computer will make random moves on the board.

If you never have played this clasic game, it consist on placing your choosen symbol in a 3x3 grid and try to win by placing 3 of the same symbol in a horizontal, vertical or diagonal line.

If neither of the players can complete a line of 3 symbols after filling up the board, the match ends in a DRAW.

## How to run the game locally

After downloading this repo in your machine:

1. Install needed dependencies
   ```bash
   npm install
   ```
2. Then run the app on a dev env
   ```bash
   npm run dev
   ```
3. Click on the URL shown in the result or copy it and open it in your prefer browser

## Nice to have
* [ ] Show a scoreboard
* [ ] Play againts another human player
* [ ] Flip a coin to see which player starts
* [ ] The looser player from the last round can start in the current round
* [ ] Choose randomly which player starts first turn
* [ ] Add react-three-fiber lib to display 3D elements
* [ ] Add sound FXs
