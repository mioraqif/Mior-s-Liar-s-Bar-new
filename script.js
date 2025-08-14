const cards = ['Ace', 'King', 'Queen', 'Joker'];
let deck = [];
let currentPlayer = 0;
let playerHands = [];
let selectedCards = [];
const numPlayers = 2; // Change 2-6 for local multiplayer

function initDeck() {
    deck = [];
    cards.forEach(card => {
        for(let i=0;i<6;i++) deck.push(card);
    });
    shuffle(deck);
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function dealCards() {
    playerHands = [];
    for(let i=0;i<numPlayers;i++) {
        playerHands.push(deck.splice(0,5));
    }
}

function renderHand() {
    const handDiv = document.getElementById('player-hand');
    handDiv.innerHTML = '';
    playerHands[currentPlayer].forEach((card,index)=>{
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.textContent = card;
        cardDiv.onclick = () => toggleSelect(index);
        if(selectedCards.includes(index)) cardDiv.classList.add('selected');
        handDiv.appendChild(cardDiv);
    });
}

function toggleSelect(index) {
    const idx = selectedCards.indexOf(index);
    if(idx>-1) selectedCards.splice(idx,1);
    else selectedCards.push(index);
    renderHand();
}

document.getElementById('play-button').onclick = () => {
    if(selectedCards.length===0) return;
    let played = [];
    selectedCards.sort((a,b)=>b-a);
    selectedCards.forEach(idx=>{
        played.push(playerHands[currentPlayer][idx]);
        playerHands[currentPlayer].splice(idx,1);
    });
    document.getElementById('table-area').innerHTML = 'Played: ' + played.join(', ');
    selectedCards = [];
    currentPlayer = (currentPlayer+1)%numPlayers;
    renderHand();
    document.getElementById('player-info').textContent = `Player ${currentPlayer+1}'s turn`;
}

// initialize game
initDeck();
dealCards();
document.getElementById('player-info').textContent = `Player ${currentPlayer+1}'s turn`;
renderHand();
