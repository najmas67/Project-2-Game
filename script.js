const duckCountEl = document.getElementById("duckCount");
const ducksPerClickEl = document.getElementById("ducksPerClick");
const autoPerSecondEl = document.getElementById("autoPerSecond");
const duckButton = document.getElementById("duckButton");
const floatingTextAnchor = document.getElementById("floatingTextAnchor");
const upgradeList = document.getElementById("upgradeList");
const upgradeTemplate = document.getElementById("upgradeTemplate");
const tutorialOverlay = document.getElementById("tutorialOverlay");
const tutorialButton = document.getElementById("tutorialButton");
const closeTutorialButton = document.getElementById("closeTutorialButton");
const SAVE_KEY = "silly-ducks-save-v1";
const TUTORIAL_SEEN_KEY = "silly-ducks-tutorial-seen-v1";

const gameState = {
  ducks: 0,
  ducksPerClick: 1,
  autoPerSecond: 0,
  upgrades: [
    {
      id: "bigger-beak",
      name: "Bigger Beak",
      description: "+1 duck per click each level",
      baseCost: 25,
      costScale: 1.45,
      level: 0,
      apply: (state, level) => {
        state.ducksPerClick = 1 + level;
      },
    },
    {
      id: "duck-whistle",
      name: "Duck Whistle",
      description: "+1 auto duck/sec each level",
      baseCost: 50,
      costScale: 1.55,
      level: 0,
      apply: (state, level) => {
        state.autoPerSecond = level;
      },
    },
    {
      id: "feather-frenzy",
      name: "Feather Frenzy",
      description: "Click cooldown reduced by 10% each level",
      baseCost: 100,
      costScale: 1.65,
      level: 0,
      apply: () => {},
    },
  ],
  lastClickTime: 0,
};

function formatNumber(value) {
  return Math.floor(value).toLocaleString();
}

function saveGame() {
  const payload = {
    ducks: gameState.ducks,
    upgrades: gameState.upgrades.map((upgrade) => ({
      id: upgrade.id,
      level: upgrade.level,
    })),
  };

  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore storage failures so gameplay continues even in restricted environments.
  }
}

function loadGame() {
  let rawData;

  try {
    rawData = localStorage.getItem(SAVE_KEY);
  } catch {
    return;
  }

  if (!rawData) {
    return;
  }

  let parsed;
  try {
    parsed = JSON.parse(rawData);
  } catch {
    return;
  }

  if (typeof parsed.ducks === "number" && Number.isFinite(parsed.ducks)) {
    gameState.ducks = Math.max(0, parsed.ducks);
  }

  if (Array.isArray(parsed.upgrades)) {
    for (const savedUpgrade of parsed.upgrades) {
      const upgrade = gameState.upgrades.find((u) => u.id === savedUpgrade.id);
      if (!upgrade) {
        continue;
      }

      if (typeof savedUpgrade.level === "number" && Number.isFinite(savedUpgrade.level)) {
        upgrade.level = Math.max(0, Math.floor(savedUpgrade.level));
      }
    }
  }
}

function upgradeCost(upgrade) {
  return Math.floor(upgrade.baseCost * Math.pow(upgrade.costScale, upgrade.level));
}

function cooldownMs() {
  const frenzy = gameState.upgrades.find((u) => u.id === "feather-frenzy");
  const reductionFactor = Math.pow(0.9, frenzy.level);
  return Math.max(80, 320 * reductionFactor);
}

function recalculateState() {
  const biggerBeak = gameState.upgrades.find((u) => u.id === "bigger-beak");
  const whistle = gameState.upgrades.find((u) => u.id === "duck-whistle");

  biggerBeak.apply(gameState, biggerBeak.level);
  whistle.apply(gameState, whistle.level);
}

function render() {
  duckCountEl.textContent = formatNumber(gameState.ducks);
  ducksPerClickEl.textContent = formatNumber(gameState.ducksPerClick);
  autoPerSecondEl.textContent = formatNumber(gameState.autoPerSecond);

  for (const upgrade of gameState.upgrades) {
    const card = document.querySelector(`[data-upgrade-id="${upgrade.id}"]`);
    const cost = upgradeCost(upgrade);
    card.querySelector(".upgrade-level-value").textContent = upgrade.level;
    card.querySelector(".upgrade-cost-value").textContent = formatNumber(cost);

    const buyButton = card.querySelector(".upgrade-buy");
    buyButton.disabled = gameState.ducks < cost;
  }
}

function showFloatingText(amount) {
  const node = document.createElement("span");
  node.className = "float-text";
  node.textContent = `+${formatNumber(amount)} ducks`;
  floatingTextAnchor.appendChild(node);
  setTimeout(() => node.remove(), 620);
}

function tryClickDuck() {
  const now = performance.now();
  if (now - gameState.lastClickTime < cooldownMs()) {
    return;
  }

  gameState.lastClickTime = now;
  gameState.ducks += gameState.ducksPerClick;
  showFloatingText(gameState.ducksPerClick);
  render();
  saveGame();
}

function buyUpgrade(id) {
  const upgrade = gameState.upgrades.find((u) => u.id === id);
  if (!upgrade) {
    return;
  }

  const cost = upgradeCost(upgrade);
  if (gameState.ducks < cost) {
    return;
  }

  gameState.ducks -= cost;
  upgrade.level += 1;
  recalculateState();
  render();
  saveGame();
}

function buildUpgradeList() {
  for (const upgrade of gameState.upgrades) {
    const fragment = upgradeTemplate.content.cloneNode(true);
    const card = fragment.querySelector(".upgrade-card");
    card.dataset.upgradeId = upgrade.id;

    fragment.querySelector(".upgrade-name").textContent = upgrade.name;
    fragment.querySelector(".upgrade-desc").textContent = upgrade.description;

    const buyButton = fragment.querySelector(".upgrade-buy");
    buyButton.textContent = "Buy";
    buyButton.addEventListener("click", () => buyUpgrade(upgrade.id));

    upgradeList.appendChild(fragment);
  }
}

function startAutoDuckLoop() {
  setInterval(() => {
    if (gameState.autoPerSecond <= 0) {
      return;
    }

    gameState.ducks += gameState.autoPerSecond;
    render();
    saveGame();
  }, 1000);
}

function setupPersistenceHandlers() {
  window.addEventListener("beforeunload", saveGame);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      saveGame();
    }
  });
}

function openTutorial() {
  tutorialOverlay.setAttribute("aria-hidden", "false");
}

function closeTutorial() {
  tutorialOverlay.setAttribute("aria-hidden", "true");

  try {
    localStorage.setItem(TUTORIAL_SEEN_KEY, "1");
  } catch {
    // Ignore storage failures so the game still works.
  }
}

function setupTutorial() {
  tutorialButton.addEventListener("click", openTutorial);
  closeTutorialButton.addEventListener("click", closeTutorial);

  let hasSeenTutorial = false;

  try {
    hasSeenTutorial = localStorage.getItem(TUTORIAL_SEEN_KEY) === "1";
  } catch {
    hasSeenTutorial = false;
  }

  if (!hasSeenTutorial) {
    openTutorial();
  }
}

function init() {
  buildUpgradeList();
  loadGame();
  recalculateState();
  render();

  duckButton.addEventListener("click", tryClickDuck);
  startAutoDuckLoop();
  setupPersistenceHandlers();
  setupTutorial();
}

init();
