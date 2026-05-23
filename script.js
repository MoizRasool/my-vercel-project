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
  const grid = document.getElementById('puzzleGrid');
  grid.innerHTML = '';
  
  // Create pairs (double the emojis)
  puzzleCards = [...petEmojis, ...petEmojis].sort(() => Math.random() - 0.5);
  
  // Create tiles
  puzzleCards.forEach((emoji, index) => {
    const tile = document.createElement('div');
    tile.className = 'puzzle-tile';
    tile.dataset.index = index;
    tile.dataset.emoji = emoji;
    tile.innerHTML = `<div class="puzzle-tile-inner">?</div>`;
    tile.onclick = () => flipTile(tile);
    grid.appendChild(tile);
  });
  
  flippedCards = [];
  matchedPairs = 0;
  moveCount = 0;
  gameActive = true;
  updatePuzzleStats();
  document.getElementById('puzzleGameStatus').textContent = 'Game started! Good luck! 🍀';
}

// Flip tile
function flipTile(tile) {
  if (!gameActive || tile.classList.contains('matched') || flippedCards.includes(tile)) return;
  
  tile.classList.add('flipped');
  tile.querySelector('.puzzle-tile-inner').textContent = tile.dataset.emoji;
  flippedCards.push(tile);
  
  if (flippedCards.length === 2) {
    moveCount++;
    checkMatch();
  }
}

// Check if tiles match
function checkMatch() {
  const [tile1, tile2] = flippedCards;
  const match = tile1.dataset.emoji === tile2.dataset.emoji;
  
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
  document.getElementById('pairsMatched').textContent = `${matchedPairs}/${petEmojis.length}`;
  document.getElementById('moveCounter').textContent = moveCount;
  document.getElementById('bestScore').textContent = bestScore;
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
}

// Set difficulty (placeholder for future difficulties)
function setPuzzleDifficulty(level) {
  document.querySelectorAll('.puzzle-difficulty button').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  updatePuzzleStats();
});
