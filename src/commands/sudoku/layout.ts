type sudokuType = number[][][];

// possible empty sudoku
type inputType = number[][];
let inputVeryEasy : inputType = [
    [0, 8, 6, 0, 0, 4, 2, 7, 0],
    [0, 5, 3, 2, 0, 9, 8, 1, 0],
    [0, 0, 1, 5, 0, 8, 9, 0, 0],
    [6, 9, 0, 1, 2, 0, 0, 0, 4],
    [1, 7, 0, 0, 3, 0, 6, 8, 0],
    [3, 0, 0, 0, 9, 6, 0, 2, 7],
    [8, 0, 0, 7, 0, 0, 5, 3, 2],
    [0, 1, 7, 6, 5, 0, 0, 0, 8],
    [5, 0, 4, 0, 8, 2, 0, 0, 1]
]

let inputEasy : inputType = [
    [4, 0, 0, 6, 3, 1, 5, 7, 0],
    [0, 1, 6, 0, 5, 0, 0, 9, 0],
    [5, 0, 0, 0, 4, 2, 1, 0, 3],
    [0, 5, 4, 0, 0, 0, 8, 0, 0],
    [8, 0, 0, 0, 7, 0, 0, 0, 9],
    [0, 0, 7, 0, 0, 0, 6, 1, 0],
    [7, 0, 5, 8, 1, 0, 0, 0, 6],
    [0, 8, 0, 0, 6, 0, 7, 2, 0],
    [0, 4, 9, 5, 2, 7, 0, 0, 1]
]

let inputMedium : inputType = [
    [0, 0, 5, 0, 0, 0, 0, 4, 1],
    [1, 0, 2, 6, 3, 0, 5, 7, 0],
    [0, 9, 0, 0, 5, 1, 2, 0, 0],
    [0, 0, 4, 0, 0, 9, 0, 0, 5],
    [9, 0, 0, 3, 0, 2, 0, 0, 4],
    [2, 0, 0, 4, 0, 0, 9, 0, 0],
    [0, 0, 9, 5, 7, 0, 0, 8, 0],
    [0, 1, 6, 0, 2, 8, 4, 0, 3],
    [5, 2, 0, 0, 0, 0, 6, 0, 0]
]

let inputHard : inputType = [
    [0, 0, 8, 0, 0, 4, 2, 9, 0],
    [2, 3, 0, 0, 0, 0, 4, 0, 0],
    [0, 4, 0, 0, 5, 0, 1, 0, 0],
    [3, 0, 0, 0, 1, 9, 7, 2, 0],
    [5, 0, 0, 0, 2, 0, 0, 0, 8],
    [0, 1, 2, 3, 7, 0, 0, 0, 4],
    [0, 0, 9, 0, 4, 0, 0, 3, 0],
    [0, 0, 3, 0, 0, 0, 0, 7, 9],
    [0, 8, 5, 9, 0, 0, 6, 0, 0]
]

let inputVeryHard : inputType = [
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

let inputAllFilled : inputType = [];
let indexCount : number = 1;
for (let i = 0; i < 9; i++) {
    inputAllFilled.push([]);
    for (let j = 0; j < 9; j++) {
        inputAllFilled[i].push(indexCount);
        indexCount++;
    }
}


// initializing the sudoku grid
function initializeSudokuGrid() : sudokuType {
    let grid : sudokuType = [];
    for (let i = 0; i < 9; i++) {
        grid.push([]);
        for (let j = 0; j < 9; j++) {
            grid[i].push([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        }
    }
    return grid;
}

// getting the rows
function getRows(grid : sudokuType) : sudokuType {
    return grid;
}

// getting normal sudoku from row format
function sudokuFromRows(rows : sudokuType) : sudokuType {
    return rows;
}

// getting the columns
function getColumns(grid : sudokuType) : sudokuType {
    let columns : sudokuType = [];
    for (let i = 0; i < 9; i++) {
        columns.push([]);
        for (let j = 0; j < 9; j++) {
            columns[i].push(grid[j][i]);
        }
    }
    return columns;
}

// getting normal sudoku from column format
function sudokuFromColumns(columns : sudokuType) : sudokuType {
    let grid : sudokuType = [];
    for (let i = 0; i < 9; i++) {
        grid.push([]);
        for (let j = 0; j < 9; j++) {
            grid[i].push(columns[j][i]);
        }
    }
    return grid;
}

// getting the 3x3 squares
function getSquares(grid : sudokuType) : sudokuType {
    let squares : sudokuType = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            squares.push([]);
            let lengthIndex : number = squares.length-1;
            for (let iOffset = 0; iOffset < 3; iOffset++) {
                for (let jOffset = 0; jOffset < 3; jOffset++) {
                    squares[lengthIndex].push(grid[i*3+iOffset][j*3+jOffset]);      
                }                
            }
        };
    }
    return squares;
}

// getting normal sudoku from square format
function sudokuFromSquares(squares : sudokuType) : sudokuType {
    let grid : sudokuType = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            grid.push([]);
            let lengthIndex : number = grid.length-1;
            for (let iOffset = 0; iOffset < 3; iOffset++) {
                for (let jOffset = 0; jOffset < 3; jOffset++) {
                    grid[lengthIndex].push(squares[i*3+iOffset][j*3+jOffset]);      
                }                
            }
        };
    }
    return grid;
}

// printing the sudoku
function printSudoku(grid : sudokuType) : void {
    let output : string = "";
    for (let i = 0; i < 9; i++) {
        output += " ";
        for (let j = 0; j < 9; j++) {
            let placeholder : string = grid[i][j].length === 1 ? grid[i][j][0].toString() : "";
            for (let k = 0; k < (1 - placeholder.length); k++) {
                output += " ";
            }
            output += placeholder;
            if(![2, 5, 8].includes(j)) output += " | ";
            if([2, 5].includes(j)) output += " || ";
        }
        if(![2, 5, 8].includes(i)) output += "\n-------------------------------------\n";
        if([2, 5].includes(i)) output += "\n=====================================\n";
    }
    console.log(output);
}

///////////////////////////
// The logic functions ////
///////////////////////////

function intersection (numberArrays : number[][]) : number[] {
    return numberArrays.reduce((a, b) => a.filter(c => b.includes(c)));
}

function getSingleValue(numberArrays : number[][]) : number {
    for (let i = 0; i < 9; i++) {
        if(numberArrays.filter(x => (x.includes(i+1)) && x.length !== 1).length === 1){
            return i+1;
        }
    }
    return -1;
}

function initialize(input : inputType) : sudokuType {
    let grid : sudokuType = initializeSudokuGrid();
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if(input[i][j] != 0){
                grid[i][j] = [input[i][j]];
            }
        }
    }
    return grid;
}

function deleteNoteNumbers(
    grid : sudokuType, 
    functionToCheckOn : (x: sudokuType) => sudokuType
) : sudokuType {
    let sections : sudokuType = functionToCheckOn(grid);

    for (let line = 0; line < 9; line++) {

        // get the numbers in the area which are known
        let fixNumbers : number[][] = sections[line].filter(x => x.length === 1);
        let fixNumberArray : number[] = [];
        fixNumbers.forEach(element => {
            fixNumberArray.push(element[0]);
        });

        // deletes the known numbers from all other fields in the current area
        for (let index = 0; index < 9; index++) {
            if(sections[line][index].length != 1){
                sections[line][index] = sections[line][index].filter(x => !fixNumberArray.includes(x));
            }
        }

    }

    return functionToCheckOn(sections);
}

function deleteAllNoteNumbers(grid : sudokuType) : sudokuType {
    grid = deleteNoteNumbers(grid, getRows);
    grid = deleteNoteNumbers(grid, getColumns);
    grid = deleteNoteNumbers(grid, getSquares);
    return grid;
}

function searchForSingleNumbers(
    grid : sudokuType, 
    functionToCheckOn : (x: sudokuType) => sudokuType
) : sudokuType {
    let sections : sudokuType = functionToCheckOn(grid);

    for (let line = 0; line < 9; line++) {

        // sets a number if the field is the only one where this number can go
        let lonelyValue : number = getSingleValue(sections[line]);
        if(lonelyValue != -1){
            let index2 : number = sections[line].findIndex((x) => x.includes(lonelyValue));
            sections[line][index2] = [lonelyValue];
        }

    }

    return functionToCheckOn(sections);
}

///////////////////////////
// main program ///////////
///////////////////////////

let grid : sudokuType = initialize(inputVeryHard);

console.log(grid);
console.log("\n\n");
printSudoku(grid);
grid = deleteAllNoteNumbers(grid);

for (let i = 0; i < 5; i++) {
    
    
    grid = searchForSingleNumbers(grid, getRows);
    grid = deleteAllNoteNumbers(grid);

    grid = searchForSingleNumbers(grid, getColumns);
    grid = deleteAllNoteNumbers(grid);

    grid = searchForSingleNumbers(grid, getSquares);
    grid = deleteAllNoteNumbers(grid);

    // console.log("rows: \n");
    // console.log(getRows(grid));
    // console.log("columns: \n");
    // console.log(getColumns(grid));
    // console.log("squares: \n");
    // console.log(getSquares(grid));
    // console.log("\n\n");
    // console.log(grid);
    console.log("\n\n");
    printSudoku(grid);  
}

console.log("\n\n");
console.log(grid);
// console.log("\n\n");
// printSudoku(grid);


///////////////////////
// Testing stuff //////
///////////////////////

// console.log(getSingleValue([
//     [ 4, 6, 7 ],
//     [ 4, 6, 7 ],
//     [ 4, 6, 7, 9 ],
//     [ 3 ],
//     [ 1 ],
//     [ 2 ],
//     [ 4, 5, 6, 7 ],
//     [ 4, 5, 6, 7, 8 ],
//     [ 4, 6, 7, 8 ]
//   ]));