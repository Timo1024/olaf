import { SudokuBacktracker } from './sudoku-backtracker';

/**
 * Prints a sudoku grid to stdout, not needed for the actual algorithm.
 */
 const printSudoku = (grid: number[][]) => {
    const getChar = (char : any) => {
      return char > 0 ? char.toString() : ' ';
    };
    const separatorLine = '+-------+-------+-------+'; 
    
    for (let x = 0; x < 9; x++) {
      if (x === 0) console.log(separatorLine);
  
      let out = '';
      for (let y = 0; y < 9; y++) {
        if (y === 0) out += '| ';
        if ((y + 1) % 3 === 0) {
          out += getChar(grid[x][y]) + ' | ';
        } else {
          out += getChar(grid[x][y]) + ' ';
        }
      }
      console.log(out);
      
      if ((x + 1) % 3 === 0) {
        console.log(separatorLine);
      }
    }
  }

let inputVeryHard : number[][] = [
    [4, 1, 0, 0, 0, 3, 0, 0, 0],
    [0, 8, 6, 0, 9, 0, 0, 0, 0],
    [0, 9, 0, 8, 0, 0, 0, 0, 4],
    [5, 0, 0, 0, 0, 0, 8, 3, 0],
    [0, 6, 4, 3, 0, 2, 7, 9, 0],
    [0, 3, 9, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 5, 0, 4, 0],
    [0, 0, 0, 0, 3, 0, 2, 5, 0],
    [0, 0, 0, 9, 0, 0, 0, 1, 7]
]

// Print the unsolved sudoku
printSudoku(inputVeryHard);

let backtracker = new SudokuBacktracker(inputVeryHard);


// Solve the sudoku and measure how long it took
console.time('Solve Duration');
let solvedSudoku = backtracker.solve();
console.timeEnd('Solve Duration');
console.log('Iterations:', backtracker.getNeededIterations());

// Print the solved sudoku if possible
// If solvedSudoku is false then the sudoku was not impossible to solve.
if (solvedSudoku) {  
  printSudoku(<number[][]>solvedSudoku);  
} else {
  console.log('No solution found');
}