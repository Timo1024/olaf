"use strict";
exports.__esModule = true;
exports.SudokuBacktracker = void 0;
var _ = require("lodash");
/**
 * Implements a backtracking algorithm to solve 9x9 sudokus.
 */
var SudokuBacktracker = /** @class */ (function () {
    function SudokuBacktracker(grid) {
        this.iterations = 0;
        // Clone the given array so we don't override the unsolved puzzle 
        this.grid = _.cloneDeep(grid);
    }
    SudokuBacktracker.prototype.getSudoku = function () {
        return this.grid;
    };
    SudokuBacktracker.prototype.getNeededIterations = function () {
        return this.iterations;
    };
    /**
     * Finds the first empty cell in this.grid and returns its coordinations in an
     * array where the first entry represents the row (x) and the second entry the
     * column (y).
     */
    SudokuBacktracker.prototype.findEmptyCell = function () {
        var coords = [-1, -1];
        for (var x = 0; x < 9; x++) {
            for (var y = 0; y < 9; y++) {
                if (this.grid[x][y] === 0) {
                    coords[0] = x;
                    coords[1] = y;
                    return coords;
                }
            }
        }
        return coords;
    };
    /**
     * Checks if a number is allowed to be used in a given row.
     */
    SudokuBacktracker.prototype.usedInRow = function (row, number) {
        for (var x = 0; x < 9; x++) {
            if (this.grid[row][x] === number) {
                return true;
            }
        }
        return false;
    };
    /**
     * Checks if a number is allowed in a given column.
     */
    SudokuBacktracker.prototype.usedInColumn = function (column, number) {
        for (var y = 0; y < 9; y++) {
            if (this.grid[y][column] === number) {
                return true;
            }
        }
        return false;
    };
    /**
     * Checks if a number is allowed in a given square.
     */
    SudokuBacktracker.prototype.usedInSquare = function (row, column, number) {
        row -= row % 3;
        column -= column % 3;
        for (var x = 0; x < 3; x++) {
            for (var y = 0; y < 3; y++) {
                if (this.grid[x + row][y + column] === number) {
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * Checks if a given number can be placed in a row/column.
     */
    SudokuBacktracker.prototype.isLocationSafe = function (row, column, number) {
        return !this.usedInColumn(column, number)
            && !this.usedInRow(row, number)
            && !this.usedInSquare(row, column, number);
    };
    /**
     * Recursively solves the sudoku. Returns the solved sudoku grid
     * if possible, or false if there is no solution possible.
     *
     * Use `<number[][]>sudoku` to cast the output of this
     * method after you have made sure it is an array.
     */
    SudokuBacktracker.prototype.solve = function () {
        this.iterations++;
        // Find the next empty cell
        var _a = this.findEmptyCell(), row = _a[0], column = _a[1];
        // If no empty cell was found then the sudoku has been solved
        if (row === -1 && column === -1) {
            return true;
        }
        // Try numbers from 1 to 9
        for (var number = 1; number <= 9; number++) {
            // Make sure the location is safe for the current number
            if (this.isLocationSafe(row, column, number)) {
                // Seems good! Store the number in the grid
                this.grid[row][column] = number;
                // Recursively try the next cell with numbers from 1 to 9
                // If it returns true, the sudoku has been solved
                if (this.solve()) {
                    return this.grid;
                }
                // Looks like we were wrong, revert back and try again
                this.grid[row][column] = 0;
            }
        }
        return false;
    };
    return SudokuBacktracker;
}());
exports.SudokuBacktracker = SudokuBacktracker;
