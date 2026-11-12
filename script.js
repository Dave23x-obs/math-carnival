let currentLevel = 1;
let score = 0;
let selectedScoops = [];
let podiumArrangement = [null, null, null];
let padlockCode = [1, 2, 3];

function startCarnival() {
    document.getElementById('screen-welcome').classList.add('hidden');
    document.getElementById('screen-game').classList.remove('hidden');
    loadLevel(1);
}

function loadLevel(level) {
    currentLevel = level;
    document.getElementById('next-btn').classList.add('hidden');
    document.getElementById('level-indicator').innerText = `Level ${level} of 3`;

    const content = document.getElementById('level-content');
    
    if (level === 1) {
        document.getElementById('level-title').innerText = "Ice Cream Parlor (Combinations)";
        selectedScoops = [];
        content.innerHTML = `
            <p class="text-sm md:text-base mb-4 text-center">Select <strong>2 different flavors</strong> out of 4 available flavors. (Order doesn't matter!)</p>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <button onclick="selectFlavor('Vanilla')" id="flavor-Vanilla" class="bg-white/10 hover:bg-white/20 border border-white/20 p-4 rounded-2xl text-center transition">
                    <div class="text-3xl mb-1">🍨</div>
                    <div class="font-bold">Vanilla</div>
                </button>
                <button onclick="selectFlavor('Chocolate')" id="flavor-Chocolate" class="bg-white/10 hover:bg-white/20 border border-white/20 p-4 rounded-2xl text-center transition">
                    <div class="text-3xl mb-1">🍫</div>
                    <div class="font-bold">Chocolate</div>
                </button>
                <button onclick="selectFlavor('Strawberry')" id="flavor-Strawberry" class="bg-white/10 hover:bg-white/20 border border-white/20 p-4 rounded-2xl text-center transition">
                    <div class="text-3xl mb-1">🍓</div>
                    <div class="font-bold">Strawberry</div>
                </button>
                <button onclick="selectFlavor('Mint')" id="flavor-Mint" class="bg-white/10 hover:bg-white/20 border border-white/20 p-4 rounded-2xl text-center transition">
                    <div class="text-3xl mb-1">🍃</div>
                    <div class="font-bold">Mint</div>
                </button>
            </div>
            <div class="text-center bg-black/30 p-3 rounded-xl">
                <span class="text-xs text-gray-300">Selected Flavors:</span> <span id="selected-flavors-text" class="font-bold text-yellow-300">None</span>
            </div>
        `;
    } else if (level === 2) {
        document.getElementById('level-title').innerText = "Podium Finish (Permutations)";
        podiumArrangement = [null, null, null];
        content.innerHTML = `
            <p class="text-sm md:text-base mb-4 text-center">Arrange 3 runners (Alice, Bob, Charlie) into <strong>1st, 2nd, and 3rd place</strong>. (Order DOES matter!)</p>
            <div class="flex justify-center gap-3 mb-4">
                <button onclick="assignRunner('Alice')" class="bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded-xl font-bold text-sm">👤 Alice</button>
                <button onclick="assignRunner('Bob')" class="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-xl font-bold text-sm">👤 Bob</button>
                <button onclick="assignRunner('Charlie')" class="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-xl font-bold text-sm text-indigo-950">👤 Charlie</button>
            </div>
            <div class="grid grid-cols-3 gap-3 text-center">
                <div class="bg-black/30 p-3 rounded-xl border border-yellow-400">
                    <span class="text-xs text-yellow-400 font-bold block">1st Place (Gold)</span>
                    <span id="podium-0" class="font-bold text-lg">-</span>
                </div>
                <div class="bg-black/30 p-3 rounded-xl border border-gray-300">
                    <span class="text-xs text-gray-300 font-bold block">2nd Place (Silver)</span>
                    <span id="podium-1" class="font-bold text-lg">-</span>
                </div>
                <div class="bg-black/30 p-3 rounded-xl border border-amber-600">
                    <span class="text-xs text-amber-500 font-bold block">3rd Place (Bronze)</span>
                    <span id="podium-2" class="font-bold text-lg">-</span>
                </div>
            </div>
        `;
    } else if (level === 3) {
        document.getElementById('level-title').innerText = "Padlock Code (Permutations with Repetition)";
        padlockCode = [1, 2, 3];
        content.innerHTML = `
            <p class="text-sm md:text-base mb-4 text-center">Crack the 3-digit vault lock using numbers 1 to 4 (Digits can repeat!). Set combination to <strong>[2, 4, 2]</strong>.</p>
            <div class="flex justify-center gap-4 my-6">
                <div class="text-center">
                    <button onclick="spinDial(0, 1)" class="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-lg font-bold mb-2">▲</button>
                    <div id="dial-0" class="bg-black/50 text-yellow-300 text-3xl font-black w-16 h-16 flex items-center justify-center rounded-2xl border border-white/20">2</div>
                    <button onclick="spinDial(0, -1)" class="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-lg font-bold mt-2">▼</button>
                </div>
                <div class="text-center">
                    <button onclick="spinDial(1, 1)" class="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-lg font-bold mb-2">▲</button>
                    <div id="dial-1" class="bg-black/50 text-yellow-300 text-3xl font-black w-16 h-16 flex items-center justify-center rounded-2xl border border-white/20">4</div>
                    <button onclick="spinDial(1, -1)" class="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-lg font-bold mt-2">▼</button>
                </div>
                <div class="text-center">
                    <button onclick="spinDial(2, 1)" class="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-lg font-bold mb-2">▲</button>
                    <div id="dial-2" class="bg-black/50 text-yellow-300 text-3xl font-black w-16 h-16 flex items-center justify-center rounded-2xl border border-white/20">2</div>
                    <button onclick="spinDial(2, -1)" class="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-lg font-bold mt-2">▼</button>
                </div>
            </div>
            <div class="text-center">
                <button onclick="checkPadlock()" class="bg-yellow-400 hover:bg-yellow-500 text-indigo-950 font-extrabold px-6 py-2.5 rounded-xl shadow">Unlock Vault</button>
            </div>
        `;
    }
}

function selectFlavor(flavor) {
    if (selectedScoops.includes(flavor)) {
        selectedScoops = selectedScoops.filter(f => f !== flavor);
        document.getElementById(`flavor-${flavor}`).classList.remove('bg-pink-600', 'border-yellow-400');
    } else {
        if (selectedScoops.length < 2) {
            selectedScoops.push(flavor);
            document.getElementById(`flavor-${flavor}`).classList.add('bg-pink-600', 'border-yellow-400');
        }
    }
    document.getElementById('selected-flavors-text').innerText = selectedScoops.length > 0 ? selectedScoops.join(', ') : 'None';

    if (selectedScoops.length === 2) {
        score += 30;
        document.getElementById('score-display').innerText = score;
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
        document.getElementById('next-btn').classList.remove('hidden');
    }
}

function assignRunner(runner) {
    for (let i = 0; i < 3; i++) {
        if (!podiumArrangement[i]) {
            podiumArrangement[i] = runner;
            document.getElementById(`podium-${i}`).innerText = runner;
            break;
        }
    }
    if (podiumArrangement.every(r => r !== null)) {
        score += 40;
        document.getElementById('score-display').innerText = score;
        confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
        document.getElementById('next-btn').classList.remove('hidden');
    }
}

function spinDial(index, delta) {
    padlockCode[index] = ((padlockCode[index] - 1 + delta + 4) % 4) + 1;
    document.getElementById(`dial-${index}`).innerText = padlockCode[index];
}

function checkPadlock() {
    if (padlockCode[0] === 2 && padlockCode[1] === 4 && padlockCode[2] === 2) {
        score += 50;
        document.getElementById('score-display').innerText = score;
        confetti({ particleCount: 100, spread: 90, origin: { y: 0.6 } });
        alert("Vault Unlocked Successfully! 🎉");
        document.getElementById('next-btn').classList.remove('hidden');
    } else {
        alert("Incorrect code! Try setting the dials to [2, 4, 2].");
    }
}

function nextLevel() {
    if (currentLevel < 3) {
        loadLevel(currentLevel + 1);
    } else {
        document.getElementById('screen-game').classList.add('hidden');
        document.getElementById('screen-checkout').classList.remove('hidden');
        document.getElementById('final-score').innerText = score;
        confetti({ particleCount: 150, spread: 120, origin: { y: 0.5 } });
    }
}

function openLearningModal() {
    const modal = document.getElementById('learning-modal');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');

    if (currentLevel === 1) {
        title.innerText = "Why Combinations?";
        body.innerHTML = `
            <p><strong>Combination Formula (nCr):</strong> When selecting items where order does not matter.</p>
            <p>Vanilla + Chocolate is identical to Chocolate + Vanilla. With 4 flavors choosing 2:</p>
            <p class="bg-black/30 p-2 rounded text-yellow-300 font-mono text-center">4 C 2 = 4! / (2! * (4-2)!) = 6 combinations</p>
        `;
    } else if (currentLevel === 2) {
        title.innerText = "Why Permutations?";
        body.innerHTML = `
            <p><strong>Permutation Formula (nPr):</strong> When arrangement or position matters!</p>
            <p>1st, 2nd, and 3rd place are unique positions. Choosing 3 runners from 5:</p>
            <p class="bg-black/30 p-2 rounded text-yellow-300 font-mono text-center">5 P 3 = 5! / (5-3)! = 60 permutations</p>
        `;
    } else {
        title.innerText = "Permutations with Repetition";
        body.innerHTML = `
            <p><strong>Formula (n^r):</strong> When items can be reused or repeated in each slot.</p>
            <p>3 digits on a padlock, each with 4 options (1 to 4):</p>
            <p class="bg-black/30 p-2 rounded text-yellow-300 font-mono text-center">4 × 4 × 4 = 4³ = 64 possible codes</p>
        `;
    }
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeLearningModal() {
    const modal = document.getElementById('learning-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

function processCheckout() {
    const name = document.getElementById('buyer-name').value || "Math Explorer";
    const item = document.getElementById('item-select').value;
    const payment = document.getElementById('payment-select').value;

    document.getElementById('rec-name').innerText = name;
    document.getElementById('rec-item').innerText = item;
    document.getElementById('rec-payment').innerText = payment;
    document.getElementById('rec-score').innerText = score;

    document.getElementById('screen-checkout').classList.add('hidden');
    document.getElementById('screen-receipt').classList.remove('hidden');
    confetti({ particleCount: 200, spread: 120, origin: { y: 0.5 } });
}

function resetCarnival() {
    score = 0;
    currentLevel = 1;
    document.getElementById('screen-receipt').classList.add('hidden');
    document.getElementById('screen-welcome').classList.remove('hidden');
}
