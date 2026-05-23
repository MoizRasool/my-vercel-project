console.log("PetCare Pro 2026 Loaded 🚀");

// ==================== PUZZLE GAME ====================
const petEmojis = ['🐶', '🐱', '🐰', '🐹', '🐾', '🦴', '🎾', '🧸'];
let puzzleCards = [];
let flippedCards = [];
let matchedPairs = 0;
let moveCount = 0;
let gameActive = false;
let bestScore = localStorage.getItem('puzzleBestScore') || '∞';

// Initialize puzzle game
function initPuzzleGame() {
  console.log('Game initialization started...');
  
  const grid = document.getElementById('puzzleGrid');
  if (!grid) {
    console.error('Puzzle grid not found!');
    return;
  }
  
  grid.innerHTML = '';
  
  // Create pairs (double the emojis)
  puzzleCards = [...petEmojis, ...petEmojis].sort(() => Math.random() - 0.5);
  console.log('Puzzle cards created:', puzzleCards);
  
  // Create tiles
  puzzleCards.forEach((emoji, index) => {
    const tile = document.createElement('div');
    tile.className = 'puzzle-tile';
    tile.dataset.index = index;
    tile.dataset.emoji = emoji;
    tile.innerHTML = `<div class="puzzle-tile-inner">?</div>`;
    tile.style.cursor = 'pointer';
    
    tile.addEventListener('click', function() {
      flipTile(this);
    });
    
    grid.appendChild(tile);
  });
  
  flippedCards = [];
  matchedPairs = 0;
  moveCount = 0;
  gameActive = true;
  updatePuzzleStats();
  document.getElementById('puzzleGameStatus').textContent = 'Game started! Good luck! 🍀';
  console.log('Game initialized with', puzzleCards.length, 'tiles');
}

// Make function globally accessible
window.initPuzzleGame = initPuzzleGame;

// Flip tile
function flipTile(tile) {
  if (!gameActive) {
    console.log('Game not active');
    return;
  }
  
  if (tile.classList.contains('matched') || flippedCards.includes(tile)) {
    return;
  }
  
  tile.classList.add('flipped');
  tile.querySelector('.puzzle-tile-inner').textContent = tile.dataset.emoji;
  flippedCards.push(tile);
  
  console.log('Tile flipped, flipped cards:', flippedCards.length);
  
  if (flippedCards.length === 2) {
    moveCount++;
    checkMatch();
  }
}

// Check if tiles match
function checkMatch() {
  const [tile1, tile2] = flippedCards;
  const match = tile1.dataset.emoji === tile2.dataset.emoji;
  
  console.log('Checking match:', tile1.dataset.emoji, 'vs', tile2.dataset.emoji, 'Match:', match);
  
  if (match) {
    tile1.classList.add('matched');
    tile2.classList.add('matched');
    matchedPairs++;
    flippedCards = [];
    updatePuzzleStats();
    
    if (matchedPairs === petEmojis.length) {
      endPuzzleGame();
    }
  } else {
    setTimeout(() => {
      tile1.classList.remove('flipped');
      tile2.classList.remove('flipped');
      tile1.querySelector('.puzzle-tile-inner').textContent = '?';
      tile2.querySelector('.puzzle-tile-inner').textContent = '?';
      flippedCards = [];
      updatePuzzleStats();
    }, 800);
  }
}

// Update stats display
function updatePuzzleStats() {
  const pairsElement = document.getElementById('pairsMatched');
  const moveElement = document.getElementById('moveCounter');
  const scoreElement = document.getElementById('bestScore');
  
  if (pairsElement) pairsElement.textContent = `${matchedPairs}/${petEmojis.length}`;
  if (moveElement) moveElement.textContent = moveCount;
  if (scoreElement) scoreElement.textContent = bestScore;
}

// End game
function endPuzzleGame() {
  gameActive = false;
  
  // Update best score
  if (bestScore === '∞' || moveCount < parseInt(bestScore)) {
    bestScore = moveCount;
    localStorage.setItem('puzzleBestScore', moveCount);
  }
  
  document.getElementById('puzzleGameStatus').textContent = `🎉 Completed in ${moveCount} moves! Best: ${bestScore}`;
  updatePuzzleStats();
  console.log('Game completed! Moves:', moveCount, 'Best:', bestScore);
}

// Set difficulty (placeholder for future difficulties)
function setPuzzleDifficulty(level) {
  document.querySelectorAll('.puzzle-difficulty button').forEach(btn => btn.classList.remove('active'));
  if (event && event.target) {
    event.target.classList.add('active');
  }
}

// Make setPuzzleDifficulty globally accessible
window.setPuzzleDifficulty = setPuzzleDifficulty;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, initializing puzzle stats...');
  updatePuzzleStats();
});
