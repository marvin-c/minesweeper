document.addEventListener('DOMContentLoaded', startGame)
document.addEventListener('click', checkForWin)
let restart = false;
var board = {};
var cells = [];
var difficulty = sessionStorage.getItem("passDifficulty");

let cell = 0;
for (x = 0; x != difficulty; x++) {
  for (y = 0; y != difficulty; y++) {
    let random_boolean = Math.random() >= 0.5;
    cells[cell] = {row: x, col: y, isMine: random_boolean, isMarked: false, hidden: true};
    cell++;
  }
}1
board.cells = cells;
let count = 0;
let boardCells = board.cells.length;
function startGame () {

  // Don't remove this function call: it makes the game work!
  // let boardCells = board.cells.length;
  for (let i = 0; i < boardCells; i++) {
    count = 0;
    countSurroundingMines(board.cells[i]);
    board.cells[i].surroundingMines = count;
  }
  lib.initBoard()
  
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  
  for (let i = 0; i != boardCells; i++) {
    
    if (board.cells[i].hidden && !board.cells[i].isMine) {
      return;
    } else if (board.cells[i].hidden && board.cells[i].isMarked) {
      return;
    } 

  }
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
    
    lib.displayMessage('You win!'); 
    soundEffect('win');
    // removeListeners();
    gameRestart();
  }

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`:
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines(cell) {
  let surroundingCells = lib.getSurroundingCells(cell.row, cell.col);
  
  for (let o = 0; o < surroundingCells.length; o++){
  
    if (surroundingCells[o].isMine) {
      count++;
    }
  }
  
}
