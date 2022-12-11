"use strict";
exports.__esModule = true;
var sudoku_backtracker_1 = require("./sudoku-backtracker");
/**
 * Prints a sudoku grid to stdout, not needed for the actual algorithm.
 */
var printSudoku = function (grid) {
    var getChar = function (char) {
        return char > 0 ? char.toString() : ' ';
    };
    var separatorLine = '+-------+-------+-------+';
    for (var x = 0; x < 9; x++) {
        if (x === 0)
            console.log(separatorLine);
        var out = '';
        for (var y = 0; y < 9; y++) {
            if (y === 0)
                out += '| ';
            if ((y + 1) % 3 === 0) {
                out += getChar(grid[x][y]) + ' | ';
            }
            else {
                out += getChar(grid[x][y]) + ' ';
            }
        }
        console.log(out);
        if ((x + 1) % 3 === 0) {
            console.log(separatorLine);
        }
    }
};
var inputVeryHard = [
    [4, 1, 0, 0, 0, 3, 0, 0, 0],
    [0, 8, 6, 0, 9, 0, 0, 0, 0],
    [0, 9, 0, 8, 0, 0, 0, 0, 4],
    [5, 0, 0, 0, 0, 0, 8, 3, 0],
    [0, 6, 4, 3, 0, 2, 7, 9, 0],
    [0, 3, 9, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 5, 0, 4, 0],
    [0, 0, 0, 0, 3, 0, 2, 5, 0],
    [0, 0, 0, 9, 0, 0, 0, 1, 7]
];
// Print the unsolved sudoku
printSudoku(inputVeryHard);
var backtracker = new sudoku_backtracker_1.SudokuBacktracker(inputVeryHard);
// Solve the sudoku and measure how long it took
console.time('Solve Duration');
var solvedSudoku = backtracker.solve();
console.timeEnd('Solve Duration');
console.log('Iterations:', backtracker.getNeededIterations());
// Print the solved sudoku if possible
// If solvedSudoku is false then the sudoku was not impossible to solve.
if (solvedSudoku) {
    printSudoku(solvedSudoku);
}
else {
    console.log('No solution found');
}
