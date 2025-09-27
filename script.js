initLeaderboard();

const startGameBtn = document.querySelector('#start-game-btn');
const easyBtn = document.querySelector('#easy-btn');
const hardBtn = document.querySelector('#hard-btn');
const menuScreen = document.querySelector('#menu-screen');
const gameScreen = document.querySelector('#game-screen');
const playerNameInput = document.querySelector('#player-name');
const playerDisplay = document.querySelector('#player-display');
const timerDisplay = document.querySelector('#timer');
const gameBoard = document.querySelector('#game-board');

let timer;
let secondsElapsed = 0;
let selectedDifficulty = 'easy'; 

const easyMaps = [
    [
        [{ type: 'empty' }, { type: 'mountain', rotation: 90 }, { type: 'empty' }, { type: 'empty' }, { type: 'oasis' }],
        [{ type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'bridge', rotation: 0 }, { type: 'oasis' }],
        [{ type: 'bridge', rotation: 0 }, { type: 'empty' }, { type: 'mountain', rotation: 180 }, { type: 'empty' }, { type: 'empty' }],
        [{ type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'oasis' }, { type: 'empty' }],
        [{ type: 'empty' }, { type: 'empty' }, { type: 'mountain', rotation: 270 }, { type: 'empty' }, { type: 'empty' }]
    ],
    [
        [{ type: 'oasis' }, { type: 'empty' }, { type: 'bridge', rotation: 90 }, { type: 'empty' }, { type: 'empty' }],
        [{ type: 'empty' }, { type: 'mountain', rotation: 180 }, { type: 'empty' }, { type: 'empty' }, { type: 'mountain', rotation: 180 }],
        [{ type: 'bridge', rotation: 0 },  { type: 'oasis' }, { type: 'mountain', rotation: 270 }, { type: 'empty' }, { type: 'empty' }],
        [{ type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'oasis' }, { type: 'empty' }],
        [{ type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' },{ type: 'empty' }]
    ],
    [
        [{ type: 'empty' }, { type: 'empty' }, { type: 'bridge', rotation: 90 }, { type: 'empty' }, { type: 'empty' }],
        [{ type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'bridge', rotation: 0 }],
        [{ type: 'empty' }, { type: 'mountain', rotation: 180 }, { type: 'bridge', rotation: 0 }, { type: 'empty' }, { type: 'empty' }],
        [{ type: 'empty' }, { type: 'oasis' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }],
        [{ type: 'empty' }, { type: 'bridge', rotation: 90 }, { type: 'empty' }, { type: 'empty' }, { type: 'mountain', rotation: 180 }]
    ],
    [
        [{ type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'bridge', rotation: 90 }, { type: 'empty' }],
        [{ type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }],
        [{ type: 'bridge', rotation: 0 }, { type: 'empty' }, { type: 'mountain', rotation: 90 }, { type: 'empty' }, { type: 'mountain', rotation: 90 }],
        [{ type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }],
        [{ type: 'empty' }, { type: 'empty' }, { type: 'oasis' }, { type: 'mountain', rotation: 270 },{ type: 'empty' } ]
    ],
    [
        [{ type: 'empty' }, { type: 'empty' }, { type: 'bridge', rotation: 90 }, { type: 'empty' }, { type: 'empty' }],
        [{ type: 'empty' }, { type: 'mountain', rotation: 0 }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }],
        [{ type: 'bridge', rotation: 0 }, { type: 'empty' }, { type: 'empty' }, { type: 'mountain', rotation: 270 }, { type: 'empty' }],
        [{ type: 'empty' }, { type: 'empty' }, { type: 'bridge', rotation: 0 }, { type: 'oasis' }, { type: 'empty' }],
        [{ type: 'empty' }, { type: 'mountain', rotation: 180 }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }]
    ]
];

const hardMaps = [
    [
        [{ type: 'empty' }, { type: 'mountain', rotation: 90 }, { type: 'oasis' }, { type: 'oasis' }, { type: 'empty' }, { type: 'bridge', rotation: 90 }, { type: 'empty' }],
        [{ type: 'bridge', rotation: 0 }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }],
        [{ type: 'empty' }, { type: 'empty' },{ type: 'bridge', rotation: 0 }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }],
        [{ type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'mountain', rotation: 270 }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }],
        [{ type: 'mountain', rotation: 270 }, { type: 'empty' }, { type: 'mountain', rotation: 90 }, { type: 'empty' }, { type: 'bridge', rotation: 90 }, { type: 'empty' }, { type: 'oasis' }],
        [{ type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }],
        [{ type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'bridge', rotation: 90 },{ type: 'empty' }, { type: 'empty' }, { type: 'empty' }]
    ],

    [
        [{ type: 'empty' }, { type: 'empty' }, { type: 'oasis' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' },],
        [{ type: 'bridge', rotation: 0 },{ type: 'empty' },  { type: 'bridge', rotation: 90 },{ type: 'empty' }, { type: 'empty' }, { type: 'mountain', rotation: 180 }, { type: 'empty' }],
        [{ type: 'empty' }, { type: 'empty' }, { type: 'bridge', rotation: 90 }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'bridge', rotation: 0 }],
        [{ type: 'mountain', rotation: 0 }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }],
        [{ type: 'empty' }, { type: 'oasis' }, { type: 'empty' }, { type: 'mountain', rotation: 90 }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }],
        [{ type: 'empty' }, { type: 'mountain', rotation: 0 }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }],
        [{ type: 'empty' }, { type: 'empty' }, { type: 'oasis' },{ type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }]
    ],

    [
        [{ type: 'empty' }, { type: 'empty' }, { type: 'bridge', rotation: 90 }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }],
        [{ type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'bridge', rotation: 0 }],
        [{ type: 'oasis' }, { type: 'empty' }, { type: 'mountain', rotation: 270 }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }],
        [{ type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' },{ type: 'empty' },{ type: 'empty' }],
        [{ type: 'empty' }, { type: 'oasis' }, { type: 'mountain', rotation: 270 }, { type: 'empty' }, { type: 'bridge', rotation: 90 }, { type: 'empty' }, { type: 'empty' }],
        [{ type: 'bridge', rotation: 0 }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'mountain', rotation: 90 }, { type: 'empty' }],
        [{ type: 'empty' }, { type: 'empty' }, { type: 'oasis' },{ type: 'mountain', rotation: 270 }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }]
    ],
    
    [
        [{ type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }],
        [{ type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'bridge', rotation: 0 }, { type: 'empty' },{ type: 'mountain', rotation: 180 }, { type: 'empty' }],
        [{ type: 'empty' }, { type: 'empty' }, { type: 'mountain', rotation: 270 }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }],
        [{ type: 'empty' }, { type: 'bridge', rotation: 90 }, { type: 'empty' }, { type: 'oasis' }, { type: 'empty' }, { type: 'bridge', rotation: 90 }, { type: 'empty' }],
        [{ type: 'empty' }, { type: 'empty' }, { type: 'mountain', rotation: 180 }, { type: 'empty' }, { type: 'mountain', rotation: 90 }, { type: 'empty' }, { type: 'empty' }],
        [{ type: 'bridge', rotation: 0 }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'mountain', rotation: 270 }, { type: 'empty' }],
        [{ type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }]
    ],

    [
        [{ type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }],
        [{ type: 'empty' },  { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'mountain', rotation: 0 }, { type: 'empty' }],
        [{ type: 'empty' }, { type: 'bridge', rotation: 90 }, { type: 'bridge', rotation: 90 }, { type: 'empty' }, { type: 'mountain', rotation: 90 }, { type: 'empty' }, { type: 'empty' }],
        [{ type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }],
        [{ type: 'empty' }, { type: 'empty' }, { type: 'mountain', rotation: 0 }, { type: 'empty' }, { type: 'oasis' }, { type: 'empty' }, { type: 'empty' }],
        [{ type: 'empty' },  { type: 'mountain', rotation: 180 }, { type: 'empty' }, { type: 'bridge', rotation: 0 }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }],
        [{ type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }, { type: 'empty' }]
    ]
];

let railwayPlaced = false; 
let railwayCellCount = 0; 

let currentMap = []; 

function updateCurrentMap() {
    const gridSize = Math.sqrt(gameBoard.children.length); 
    currentMap = [];

    for (let i = 0; i < gridSize; i++) {
        const row = [];
        for (let j = 0; j < gridSize; j++) {
            const cell = gameBoard.children[i * gridSize + j];
            row.push({
                type: cell.dataset.railType || cell.dataset.type,
                rotation: parseInt(cell.dataset.rotation, 10) || 0,
            });
        }
        currentMap.push(row);
    }

    console.log("Updated currentMap:", currentMap);
}

function selectDifficulty(difficulty) {
    selectedDifficulty = difficulty;
    easyBtn.classList.toggle('selected', difficulty === 'easy');
    hardBtn.classList.toggle('selected', difficulty === 'hard');
    checkStartConditions();
}

function checkStartConditions() {
    const playerName = playerNameInput.value.trim();
    startGameBtn.disabled = playerName === "" || (!easyBtn.classList.contains("selected") && !hardBtn.classList.contains("selected"));
}

easyBtn.addEventListener('click', () => selectDifficulty('easy'));
hardBtn.addEventListener('click', () => selectDifficulty('hard'));
playerNameInput.addEventListener('input', checkStartConditions);
startGameBtn.addEventListener('click', startGame);

function startGame() {
    localStorage.removeItem('savedGameState'); 
    menuScreen.style.display = 'none';
    gameScreen.style.display = 'flex';
    playerDisplay.textContent = playerNameInput.value;
    railwayPlaced = false; 
    railwayCellCount = 0;
    secondsElapsed = 0; 
    clearInterval(timer); 
    startTimer();
    loadMap(selectedDifficulty);
}

function startTimer() {
    clearInterval(timer); 
    timer = setInterval(() => {
        secondsElapsed++;
        const minutes = Math.floor(secondsElapsed / 60).toString().padStart(2, '0');
        const seconds = (secondsElapsed % 60).toString().padStart(2, '0');
        timerDisplay.textContent = `${minutes}:${seconds}`;
    }, 1000);

    const minutes = Math.floor(secondsElapsed / 60).toString().padStart(2, '0');
    const seconds = (secondsElapsed % 60).toString().padStart(2, '0');
    timerDisplay.textContent = `${minutes}:${seconds}`;
}

function loadMap(difficulty) {
    const easySelectedMap = easyMaps[Math.floor(Math.random() * easyMaps.length)];
    const hardSelectedMap = hardMaps[Math.floor(Math.random() * hardMaps.length)];
    const mapData = difficulty === 'easy' ? easySelectedMap : hardSelectedMap;
    const gridSize = mapData.length;
    gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    gameBoard.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    gameBoard.innerHTML = '';

    mapData.forEach((row, rowIndex) => {
        row.forEach((cellData, colIndex) => {
            const cell = document.createElement('div');
            cell.classList.add('game-cell');
            cell.dataset.type = cellData.type;
            cell.dataset.rotation = cellData.rotation || 0;
            cell.dataset.row = rowIndex; 
            cell.dataset.col = colIndex; 
            cell.className = `game-cell tile-${cellData.type}`;

            if (cellData.rotation !== undefined) {
                cell.style.transform = `rotate(${cellData.rotation}deg)`;
            }

            gameBoard.appendChild(cell);
        });
    });

    initGameBoardActions();
}

function railwayPlaceOrRotate(cell) {
    const cellType = cell.dataset.type;

    if (cellType === 'empty' || !cellType) {
        if (!cell.dataset.railType) {
            cell.dataset.railType = 'straight_rail';
            cell.dataset.rotation = 0;
            railwayPlaced = true; 
            railwayCellCount++; 
        } else if (cell.dataset.railType === 'straight_rail' && cell.dataset.rotation == 0) {
            cell.dataset.railType = 'curve_rail';
            cell.dataset.rotation = 270;
        } else if (cell.dataset.railType === 'curve_rail' && cell.dataset.rotation == 270) {
            cell.dataset.railType = 'curve_rail';
            cell.dataset.rotation = 0;
        } else if (cell.dataset.railType === 'curve_rail' && cell.dataset.rotation == 0) {
            cell.dataset.railType = 'straight_rail';
            cell.dataset.rotation = 90;
        } else if (cell.dataset.railType === 'straight_rail' && cell.dataset.rotation == 90) {
            cell.dataset.railType = 'curve_rail';
            cell.dataset.rotation = 90;
        } else if (cell.dataset.railType === 'curve_rail' && cell.dataset.rotation == 90) {
            cell.dataset.railType = 'curve_rail';
            cell.dataset.rotation = 180;
        }  else {
            cell.dataset.railType = 'straight_rail';
            cell.dataset.rotation = 0;
        }
        updateCellByDegree(cell);

    } else if (cellType === 'bridge') {
        cell.dataset.railType = 'bridge_rail';
        cell.dataset.rotation = cell.dataset.rotation || 0;
        updateCellByDegree(cell);
    } else if (cellType === 'oasis') {
        return;
    } else if (cellType === 'mountain') {
        cell.dataset.railType = 'mountain_rail';
        cell.dataset.rotation = cell.dataset.rotation || 0;
        updateCellByDegree(cell);
    }

    updateCurrentMap(); 
    checkWin();
}

function showWinModal() {
    const winModal = document.querySelector('#win-modal');
    const modalTime = document.querySelector('#modal-time');
    const difficultyDisplay = document.querySelector('#difficulty-display');
    const bestScoreElement = document.querySelector('#best-score');
    
    modalTime.textContent = timerDisplay.textContent; 
    difficultyDisplay.textContent = selectedDifficulty === 'easy' ? 'Easy' : 'Hard'; 

    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || { easy: [], hard: [] };
    const bestScore = leaderboard[selectedDifficulty][0]; 

    if (bestScore) {
        bestScoreElement.textContent = `${bestScore.name} - ${bestScore.time}s`;
    } else {
        bestScoreElement.textContent = 'No best score yet!';
    }

    winModal.style.display = 'block'; 
}

function loadLeaderboardForWinModal() {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || { easy: [], hard: [] };
    const easyLeaderboard = document.getElementById('modal-easy-leaderboard');
    const hardLeaderboard = document.getElementById('modal-hard-leaderboard');

    easyLeaderboard.innerHTML = leaderboard.easy
        .map(entry => `<li>${entry.name} - ${entry.time}s</li>`)
        .join('');
    hardLeaderboard.innerHTML = leaderboard.hard
        .map(entry => `<li>${entry.name} - ${entry.time}s</li>`)
        .join('');
}

function updateCellByDegree(cell) {
    const railType = cell.dataset.railType;
    const rotation = cell.dataset.rotation;

    if (railType) {
        cell.className = `game-cell tile-${railType}`;
        cell.style.transform = `rotate(${rotation}deg)`;
    } else {
        cell.className = 'game-cell';
        cell.style.transform = '';
    }
}

function initGameBoardActions() {
    const cells = document.querySelectorAll('.game-cell');

    cells.forEach(cell => {
        cell.addEventListener('click', () => railwayPlaceOrRotate(cell));
        cell.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            railwayPlaceOrRotate(cell);
        });
    });

    updateCurrentMap(); 
}

const requiredCells = []; 

function initRequiredCells(currentMap) {
    requiredCells.length = 0; 
    if (!currentMap || currentMap.length === 0) {
        console.error("Current map is empty or undefined");
        return;
    }
    for (let row = 0; row < currentMap.length; row++) {
        for (let col = 0; col < currentMap[row].length; col++) {
            if (currentMap[row][col].type && currentMap[row][col].type.includes('rail')) { 
                requiredCells.push([row, col]);
            }
        }
    }
}

function isConnected(row1, col1, row2, col2, currentMap) {
    const cell1 = currentMap[row1][col1];
    const cell2 = currentMap[row2][col2];

    const dRow = row2 - row1;
    const dCol = col2 - col1;

    const directionMap = {
        "0,1": "right",
        "0,-1": "left",
        "1,0": "down",
        "-1,0": "up"
    };

    const reverseDirectionMap = {
        "right": "left",
        "left": "right",
        "down": "up",
        "up": "down"
    };

    const direction = directionMap[`${dRow},${dCol}`];
    const reverseDirection = reverseDirectionMap[direction];

    function canConnect(cell, direction) {
        const { type, rotation } = cell;
        const connections = connectionRules[type]?.[rotation];
        return connections && connections.includes(direction);
    }

    const connection = canConnect(cell1, direction) && canConnect(cell2, reverseDirection);
    console.log(`Checking connection between (${row1}, ${col1}) and (${row2}, ${col2}) - connected: ${connection}`);
    
    return connection;
}

const connectionRules = {
    straight_rail: {
        90: ["left", "right"],
        0: ["up", "down"]
    },
    curve_rail: {
        0: ["right", "down"],
        90: ["left", "down"],
        180: ["left", "up"],
        270: ["right", "up"]
    },
    bridge_rail: {
        90: ["left", "right"],
        0: ["up", "down"]
    },
    mountain_rail: {
        0: ["right", "down"],
        90: ["left", "down"],
        180: ["left", "up"],
        270: ["right", "up"]
    }
};

function isWithinBounds(row, col, currentMap) {
    return row >= 0 && row < currentMap.length && col >= 0 && col < currentMap[0].length;
}

function checkTwoConnections(row, col, currentMap) {
    let connections = 0;
    const directions = [
        { name: "right", deltaRow: 0, deltaCol: 1 },
        { name: "left", deltaRow: 0, deltaCol: -1 },
        { name: "down", deltaRow: 1, deltaCol: 0 },
        { name: "up", deltaRow: -1, deltaCol: 0 }
    ];

    const cell = currentMap[row][col];
    const { type, rotation } = cell;

    const requiredConnections = connectionRules[type]?.[rotation] || [];
    console.log(`Cell at (${row}, ${col}) - type: ${type}, rotation: ${rotation}, required connections: ${requiredConnections}`);

    for (const direction of directions) {
        const newRow = row + direction.deltaRow;
        const newCol = col + direction.deltaCol;

        const isConnectedInDirection = requiredConnections.includes(direction.name) &&
            isWithinBounds(newRow, newCol, currentMap) &&
            isConnected(row, col, newRow, newCol, currentMap);

        console.log(`Checking direction ${direction.name} for cell at (${row}, ${col}): connected: ${isConnectedInDirection}`);

        if (isConnectedInDirection) {
            connections++;
        }
    }

    console.log(`Cell at (${row}, ${col}) of type ${type} with rotation ${rotation} has ${connections} connections`);
    
    return connections === 2;
}

const touchedCells = new Set(); 

function dfs(row, col, currentMap) {
    if (touchedCells.has(`${row}-${col}`)) return; 
    touchedCells.add(`${row}-${col}`); 

    const directions = [
        [0, 1], 
        [0, -1], 
        [1, 0], 
        [-1, 0] 
    ];

    for (const [dx, dy] of directions) {
        const newRow = row + dx;
        const newCol = col + dy;
        if (isWithinBounds(newRow, newCol, currentMap) && isConnected(row, col, newRow, newCol, currentMap)) {
            dfs(newRow, newCol, currentMap);
        }
    }
}

function isPuzzleCompleted(currentMap) {
    touchedCells.clear(); 
    initRequiredCells(currentMap); 

    if (requiredCells.length === 0) {
        console.error("No required cells found in currentMap");
        return false;
    }

    for (const [row, col] of requiredCells) {
        const cell = currentMap[row][col];
        const hasTwoConnections = checkTwoConnections(row, col, currentMap);
        
        console.log(`Cell at (${row}, ${col}) of type ${cell.type} has two connections: ${hasTwoConnections}`);
        
        if (!hasTwoConnections) {
            console.warn(`Cell at (${row}, ${col}) does not have two connections.`);
            return false; 
        }
    }

    const [startRow, startCol] = requiredCells[0];
    dfs(startRow, startCol, currentMap);

    for (const [row, col] of requiredCells) {
        if (!touchedCells.has(`${row}-${col}`)) {
            console.warn(`Cell at (${row}, ${col}) was not touched during traversal.`);
            return false; 
        }
    }

    for (let row = 0; row < currentMap.length; row++) {
        for (let col = 0; col < currentMap[row].length; col++) {
            const cell = currentMap[row][col];
            if (cell.type !== 'oasis' && !cell.type.includes('rail')) {
                console.warn(`Cell at (${row}, ${col}) is not filled with rail.`);
                return false; 
            }
        }
    }

    console.log("All conditions for puzzle completion are met.");
    return true; 
}

function checkWin() {
    if (isPuzzleCompleted(currentMap)) {
        console.log("Congratulations! You've completed the puzzle!");
        clearInterval(timer); 
        const time = secondsElapsed; 
        updateLeaderboard(selectedDifficulty, playerNameInput.value.trim(), time); 
        showWinModal(); 
    } else {
        console.log("Puzzle is not yet complete.");
    }
}

//modal--------------------------------------------------------------------------------------------------------------------------------------
const rulesModal = document.querySelector('#rules-modal');
const rulesBtn = document.querySelector('#rules-btn');
const closeRulesBtn = document.querySelector('.close-rules');

rulesBtn.onclick = function() {
    rulesModal.style.display = 'block';
}

closeRulesBtn.onclick = function() {
    rulesModal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == rulesModal) {
        rulesModal.style.display = 'none';
    }
}

const playAgainBtn = document.querySelector('#play-again-btn');

playAgainBtn.onclick = function() {
  window.location.reload();
};

const leaderboardBtn = document.querySelector('#leaderboard-btn');
const leaderboardModal = document.querySelector('#leaderboard-modal');
const closeLeaderboardIcon = document.querySelector('.close-leaderboard');

const playerName = playerNameInput.value.trim(); 

leaderboardBtn.addEventListener('click', () => {
    loadLeaderboard();
    leaderboardModal.style.display = 'block';
});

closeLeaderboardIcon.addEventListener('click', () => {
    leaderboardModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === leaderboardModal) {
        leaderboardModal.style.display = 'none';
    }
});

function loadLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || { easy: [], hard: [] };
    const easyLeaderboard = document.getElementById('easy-leaderboard');
    const hardLeaderboard = document.getElementById('hard-leaderboard');

    easyLeaderboard.innerHTML = leaderboard.easy.length
        ? leaderboard.easy.map(entry => `<li>${entry.name} - ${entry.time}s</li>`).join('')
        : 'No scores yet!';

    hardLeaderboard.innerHTML = leaderboard.hard.length
        ? leaderboard.hard.map(entry => `<li>${entry.name} - ${entry.time}s</li>`).join('')
        : 'No scores yet!';
}


function initLeaderboard() {
    if (!localStorage.getItem('leaderboard')) {
        localStorage.setItem('leaderboard', JSON.stringify({ easy: [], hard: [] }));
    }
}

function updateLeaderboard(difficulty, playerName, time) {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || { easy: [], hard: [] };

    leaderboard[difficulty].push({ name: playerName, time });

    leaderboard[difficulty].sort((a, b) => a.time - b.time);
    leaderboard[difficulty] = leaderboard[difficulty].slice(0, 3);

    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}

window.addEventListener("load", function() {
    const images = [
      "pics/tiles/bridge_rail.png",
      "pics/tiles/bridge.png",
      "pics/tiles/curve_rail.png",
      "pics/tiles/empty.png",
      "pics/tiles/mountain.png",
      "pics/tiles/oasis.png",
      "pics/tiles/straight_rail.png"
    ];
    images.forEach(src => {
      const img = new Image();
      img.src = src;
    });
});

