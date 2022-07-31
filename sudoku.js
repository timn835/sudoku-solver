function fillGrid(grid) {
    for(var i = 0; i < 9; i++) {
        var row = document.getElementsByClassName('r' + i);
        for(var c of row) {
            var entry = grid[i][parseInt(c.classList[2][1])];
            if(entry === 0) {
                c.firstChild.value = '';
            } else {
                c.firstChild.value = entry;
            }
        }
    }
}

function getGrid() {
    var grid = new Array(9).fill(0).map(() => new Array(9));
    for(var i = 0; i < 9; i++) {
        var row = document.getElementsByClassName('r' + i);
        for(var c of row) {
            //console.log(i, parseInt(c.classList[2][1]))
            grid[i][parseInt(c.classList[2][1])] = c.firstChild.value
        }
    }
    return grid;
}

function validGrid(grid) {
    for(var i = 0; i < 9; i++) {
        for(var j = 0; j < 9; j++) {
            var ch = grid[i][j].trim();
            if(ch.length > 1 || ch === '0' || (ch!== '' && isNaN(parseInt(ch)))) {
                return false;
            }
            if(ch !== '') {
                grid[i][j] = parseInt(ch);
            }
        }
    }
    return true;
}

function solve() {
    error.classList.remove('show-error');
    var grid = getGrid();
    if(validGrid(grid)) {
        if(initialCheck(grid)) {
            if(solveSudoku(grid, 0, 0)) {
                fillGrid(grid);
            } else {
                error.textContent = 'No solution exists';
                error.classList.add('show-error');
            }
        } else {
            error.textContent = 'Entries are initially contradicting';
            error.classList.add('show-error');
        }
    } else {
        error.textContent = 'Entries are not of the correct type';
        error.classList.add('show-error');
    }
}

function solveSudoku(grid, r, c)
{
    if (r === 8 && c === 9)
        return true;

    if (c === 9)
    {
        r++;
        c = 0;
    }
 
    if (grid[r][c] !== '')
        return solveSudoku(grid, r, c + 1);
 
    for(var n = 1; n < 10; n++){
        if (isSafe(grid, r, c, n)) {
            grid[r][c] = n;
            if (solveSudoku(grid, r, c + 1))
                return true;
        }
        grid[r][c] = '';
    }
    return false;
}

function isSafe(grid, r, c, n)
{
     
    // Check if we find the same num
    // in the similar row , we
    // return false
    for(var i = 0; i <= 8; i++)
        if (grid[r][i] === n)
            return false;
    for(var i = 0; i <= 8; i++)
        if (grid[i][c] === n)
            return false;
 
    var startRow = r - r % 3;
    var startCol = c - c % 3;
         
    for(let i = 0; i < 3; i++)
        for(let j = 0; j < 3; j++)
            if (grid[i + startRow][j + startCol] === n)
                return false;
 
    return true;
}
function initialCheck(grid) {
    for(var i = 0; i < 9; i++) {
        for(var j = 0; j < 9; j++) {
            if(grid[i][j] !== '') {
                var n = grid[i][j];
                grid[i][j] = '';
                if(isSafe(grid, i, j, n)) {
                    grid[i][j] = n;
                } else {
                    return false;
                }
            }
        }
    }
    return true;
}

function getExample() {
    error.classList.remove('show-error');
    fillGrid(examples[exampleNum]);
    if(exampleNum === numOfExamples - 1) {
        exampleNum = 0;
    } else {
        exampleNum++;
    }
}

var examples = [
    [
        [5,3,0,0,7,0,0,0,0],
        [6,0,0,1,9,5,0,0,0],
        [0,9,8,0,0,0,0,6,0],
        [8,0,0,0,6,0,0,0,3],
        [4,0,0,8,0,3,0,0,1],
        [7,0,0,0,2,0,0,0,6],
        [0,6,0,0,0,0,2,8,0],
        [0,0,0,4,1,9,0,0,5],
        [0,0,0,0,8,0,0,7,9]
    ],[
        [8,1,7,0,0,0,0,4,5],
        [0,0,0,0,5,1,7,0,6],
        [2,6,5,0,0,3,0,0,1],
        [4,7,0,5,6,8,0,0,0],
        [9,5,1,0,0,0,0,8,0],
        [0,3,0,0,9,0,2,0,0],
        [0,4,0,2,0,0,0,0,0],
        [0,0,0,0,0,5,0,7,9],
        [5,8,9,7,3,0,1,6,0],
    ],[
        [0,0,5,0,0,0,0,0,0],
        [0,0,8,1,0,0,0,2,0],
        [0,4,0,8,0,5,0,0,0],
        [6,3,0,0,9,0,0,0,0],
        [0,0,0,0,2,0,0,0,1],
        [0,0,0,0,0,4,0,3,0],
        [7,0,0,0,0,0,4,0,0],
        [4,0,9,0,0,0,2,0,0],
        [0,0,0,0,0,0,8,1,5],
    ]
]

var exampleNum = 0;
var numOfExamples = 3;
var error = document.querySelector('.error');
var solveButton = document.getElementById('solve');
var getGridButton = document.getElementById('get-grid');
solveButton.addEventListener("click", solve);
getGridButton.addEventListener("click", getExample);
