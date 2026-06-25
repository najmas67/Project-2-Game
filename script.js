const duckCountEl = document.getElementById("duckCount");
const ducksPerClickEl = document.getElementById("ducksPerClick");
const autoPerSecondEl = document.getElementById("autoPerSecond");
const duckButton = document.getElementById("duckButton");
const floatingAnchor = document.getElementById("floatingTextAnchor");
const upgradeList = document.getElementById("upgradeList");
const upgradeTemplate = document.getElementById("upgradeTemplate");
const skinList = document.getElementById("skinList");
const skinTemplate = document.getElementById("skinTemplate");
const tutorialButton = document.getElementById("tutorialButton");
const tutorialOverlay = document.getElementById("tutorialOverlay");
const tutorialCard = tutorialOverlay.querySelector(".tutorial-card");
const closeTutorialButton = document.getElementById("closeTutorialButton");
const tutorialBackButton = document.getElementById("tutorialBackButton");
const tutorialNextButton = document.getElementById("tutorialNextButton");
const tutorialStepMeta = document.getElementById("tutorialStepMeta");
const tutorialText = document.getElementById("tutorialText");
const menuToggle = document.getElementById("menuToggle");
const menuPanel = document.getElementById("menuPanel");
const upgradesSection = document.getElementById("upgradesSection");
const skinsSection = document.getElementById("skinsSection");
const ranksSection = document.getElementById("ranksSection");
const currentRankEl = document.getElementById("currentRank");
const nextRankNeedEl = document.getElementById("nextRankNeed");
const rankList = document.getElementById("rankList");
const rankNotificationLayer = document.getElementById("rankNotificationLayer");

const storageKey = "silly-ducks-save-v1";
const MAX_TIER_VALUE = 1_000_000_000;

const upgrades = [
  {
    id: "beak-blitz",
    name: "Beak Blitz",
    description: "",
    baseCost: 25,
    type: "click",
    basePower: 1,
    level: 0,
  },
  {
    id: "wing-whirl",
    name: "Wing Whirl",
    description: "",
    baseCost: 70,
    type: "click",
    basePower: 2,
    level: 0,
  },
  {
    id: "splash-surge",
    name: "Splash Surge",
    description: "",
    baseCost: 220,
    type: "click",
    basePower: 3,
    level: 0,
  },
  {
    id: "feather-frenzy",
    name: "Feather Frenzy",
    description: "",
    baseCost: 420,
    type: "click",
    basePower: 5,
    level: 0,
  },
  {
    id: "pond-pulse",
    name: "Pond Pulse",
    description: "",
    baseCost: 120,
    type: "auto",
    basePower: 1,
    level: 0,
  },
  {
    id: "marsh-matrix",
    name: "Marsh Matrix",
    description: "",
    baseCost: 360,
    type: "auto",
    basePower: 2,
    level: 0,
  },
  {
    id: "quack-assembler",
    name: "Quack Assembler",
    description: "",
    baseCost: 760,
    type: "auto",
    basePower: 4,
    level: 0,
  },
  {
    id: "flock-reactor",
    name: "Flock Reactor",
    description: "",
    baseCost: 1450,
    type: "auto",
    basePower: 7,
    level: 0,
  },
];

const rankTiers = [
  { name: "Pond Scout", ducks: 1000 },
  { name: "Quack Ranger", ducks: 2500 },
  { name: "Feather Knight", ducks: 5000 },
  { name: "Marsh Captain", ducks: 10000 },
  { name: "Flock Commander", ducks: 25000 },
  { name: "Duck Legend", ducks: 60000 },
  { name: "Quack Emperor", ducks: 150000 },
  { name: "Celestial Drake", ducks: 300000 },
  { name: "Nebula Waddler", ducks: 10000000 },
  { name: "Infinity Quacker", ducks: 1000000000 },
];

const skins = [
  {
    id: "golden-fluff",
    name: "Golden Fluff",
    description: "A shiny classic duck look.",
    cost: 120,
    unlocked: true,
  },
  {
    id: "sunset-splash",
    name: "Sunset Splash",
    description: "Warm orange tint for your duck button.",
    cost: 300,
    unlocked: false,
  },
  {
    id: "mint-quack",
    name: "Mint Quack",
    description: "Cool mint style for a fresh vibe.",
    cost: 500,
    unlocked: false,
  },
  {
    id: "berry-bubble",
    name: "Berry Bubble",
    description: "Sweet berry tones for a playful pop.",
    cost: 900,
    unlocked: false,
  },
  {
    id: "ocean-glide",
    name: "Ocean Glide",
    description: "Deep sea blues with a crisp shine.",
    cost: 1500,
    unlocked: false,
  },
  {
    id: "lava-quack",
    name: "Lava Quack",
    description: "Fiery reds for turbo duck energy.",
    cost: 2400,
    unlocked: false,
  },
  {
    id: "midnight-feather",
    name: "Midnight Feather",
    description: "Dark glossy blend with electric highlights.",
    cost: 4000,
    unlocked: false,
  },
  {
    id: "cotton-cloud",
    name: "Cotton Cloud",
    description: "Soft pastel look with dreamy brightness.",
    cost: 6500,
    unlocked: false,
  },
  {
    id: "forest-float",
    name: "Forest Float",
    description: "Mossy greens with cozy woodland warmth.",
    cost: 12000,
    unlocked: false,
  },
  {
    id: "frost-glimmer",
    name: "Frost Glimmer",
    description: "Icy crystal tones and cool winter shine.",
    cost: 18000,
    unlocked: false,
  },
  {
    id: "neon-disco",
    name: "Neon Disco",
    description: "Electric club colors with vibrant pop energy.",
    cost: 28000,
    unlocked: false,
  },
  {
    id: "desert-dune",
    name: "Desert Dune",
    description: "Sunbaked gold and terracotta tones.",
    cost: 42000,
    unlocked: false,
  },
  {
    id: "candy-comet",
    name: "Candy Comet",
    description: "Sweet cosmic pinks with starburst sparkle.",
    cost: 65000,
    unlocked: false,
  },
  {
    id: "royal-plume",
    name: "Royal Plume",
    description: "A premium golden-blue prestige style.",
    cost: 10000,
    unlocked: false,
  },
];

const state = {
  ducks: 0,
  totalDucksEarned: 0,
  ducksPerClick: 1,
  autoPerSecond: 0,
  selectedSkin: "golden-fluff",
  hasPlayed: false,
  tutorialCompleted: false,
};

const tutorialSteps = [
  {
    text: "Hi, I am Captain Quackers. I will teach you the game in under a minute.",
    focusId: "duckButton",
  },
  {
    text: "Tap this big duck button to collect ducks. Every click grows your total.",
    focusId: "duckButton",
  },
  {
    text: "Use the top-right menu to open hidden sections whenever you need them.",
    focusId: "menuToggle",
  },
  {
    text: "Open Upgrades ! to boost ducks per click and auto ducks over time.",
    focusId: "upgradesSection",
    sectionId: "upgradesSection",
  },
  {
    text: "Open Skins ! to unlock new looks using ducks you collect from clicking.",
    focusId: "skinsSection",
    sectionId: "skinsSection",
  },
];

let tutorialStepIndex = 0;
let activeTutorialFocus = null;
let lastAnnouncedRankIndex = -1;

function formatNumber(value) {
  return Math.floor(value).toLocaleString();
}

function getUpgradeCost(upgrade) {
  return Math.floor(upgrade.baseCost * Math.pow(3.2, upgrade.level));
}

function updateStats() {
  duckCountEl.textContent = formatNumber(state.ducks);
  ducksPerClickEl.textContent = formatNumber(state.ducksPerClick);
  autoPerSecondEl.textContent = formatNumber(state.autoPerSecond);
}

function getCurrentRankIndex() {
  let currentTierIndex = -1;
  rankTiers.forEach((tier, index) => {
    if (state.totalDucksEarned >= tier.ducks) {
      currentTierIndex = index;
    }
  });

  return currentTierIndex;
}

function spawnFireworksBurst() {
  if (!rankNotificationLayer) {
    return;
  }

  const burst = document.createElement("div");
  burst.className = "rank-fireworks-burst";
  burst.style.left = `${Math.floor(Math.random() * 80) + 10}%`;
  burst.style.top = `${Math.floor(Math.random() * 42) + 20}%`;

  const particleCount = 16;
  for (let i = 0; i < particleCount; i += 1) {
    const particle = document.createElement("span");
    particle.className = "rank-firework-particle";

    const angle = (Math.PI * 2 * i) / particleCount;
    const distance = 44 + Math.random() * 62;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    particle.style.setProperty("--dx", `${dx}px`);
    particle.style.setProperty("--dy", `${dy}px`);
    particle.style.setProperty("--hue", String(Math.floor(Math.random() * 360)));

    burst.appendChild(particle);
  }

  rankNotificationLayer.appendChild(burst);
  window.setTimeout(() => burst.remove(), 800);
}

function showRankNotification(rankTier) {
  if (!rankNotificationLayer || !rankTier) {
    return;
  }

  const popup = document.createElement("article");
  popup.className = "rank-popup";
  popup.innerHTML = `
    <h3>Rank Up!</h3>
    <p>You reached <strong>${rankTier.name}</strong> at ${formatNumber(rankTier.ducks)} total ducks.</p>
  `;

  rankNotificationLayer.appendChild(popup);
  window.requestAnimationFrame(() => popup.classList.add("show"));

  spawnFireworksBurst();
  window.setTimeout(spawnFireworksBurst, 140);
  window.setTimeout(spawnFireworksBurst, 280);

  window.setTimeout(() => {
    popup.classList.remove("show");
    window.setTimeout(() => popup.remove(), 320);
  }, 2300);
}

function maybeNotifyRankUp() {
  const currentRankIndex = getCurrentRankIndex();
  if (currentRankIndex <= lastAnnouncedRankIndex) {
    return;
  }

  for (let index = lastAnnouncedRankIndex + 1; index <= currentRankIndex; index += 1) {
    const rankTier = rankTiers[index];
    if (!rankTier) {
      continue;
    }

    window.setTimeout(() => {
      showRankNotification(rankTier);
    }, (index - lastAnnouncedRankIndex - 1) * 900);
  }

  lastAnnouncedRankIndex = currentRankIndex;
}

function renderRanks() {
  if (!currentRankEl || !nextRankNeedEl || !rankList) {
    return;
  }

  const currentTierIndex = getCurrentRankIndex();
  const currentTier = currentTierIndex >= 0 ? rankTiers[currentTierIndex] : null;
  const nextTier = currentTierIndex >= 0 ? rankTiers[currentTierIndex + 1] || null : rankTiers[0];

  currentRankEl.textContent = currentTier ? currentTier.name : "Unranked";
  if (!nextTier) {
    nextRankNeedEl.textContent = "Max rank reached. Your flock is unstoppable.";
  } else {
    const ducksNeeded = Math.max(0, nextTier.ducks - state.totalDucksEarned);
    nextRankNeedEl.textContent = `${formatNumber(ducksNeeded)} ducks to reach ${nextTier.name}.`;
  }

  rankList.innerHTML = "";
  rankTiers.forEach((tier, index) => {
    const card = document.createElement("article");
    card.className = "upgrade-card rank-tier-card";

    const achieved = state.totalDucksEarned >= tier.ducks;
    if (achieved) {
      card.classList.add("rank-achieved");
    }
    if (index === currentTierIndex) {
      card.classList.add("rank-current");
    }

    card.innerHTML = `
      <div class="upgrade-info">
        <h3>${tier.name}</h3>
        <p>Requirement: ${formatNumber(tier.ducks)} ducks</p>
      </div>
      <div class="upgrade-actions rank-status">${achieved ? "Unlocked" : "Locked"}</div>
    `;

    rankList.appendChild(card);
  });
}

function showFloatingGain(value) {
  const text = document.createElement("span");
  text.className = "float-text";
  text.textContent = `+${formatNumber(value)} ducks`;
  floatingAnchor.appendChild(text);
  window.setTimeout(() => text.remove(), 640);
}

function applySkin() {
  duckButton.dataset.skin = state.selectedSkin;
  const root = document.documentElement;

  const skinThemes = {
    "golden-fluff": {
      bg: "radial-gradient(circle at 22% 18%, #fff9d8 0%, #ffe8a8 44%, #f5c970 100%)",
      edge: "#c6984e",
      text: "#6e4f1c",
    },
    "sunset-splash": {
      bg: "radial-gradient(circle at 22% 18%, #ffe9dd 0%, #ffc7a8 42%, #f59f8a 100%)",
      edge: "#c67864",
      text: "#6d3d2f",
    },
    "mint-quack": {
      bg: "radial-gradient(circle at 22% 18%, #effff4 0%, #c9f0d8 44%, #8edcb2 100%)",
      edge: "#5daf86",
      text: "#2f634a",
    },
    "berry-bubble": {
      bg: "radial-gradient(circle at 22% 18%, #ffeaf9 0%, #f9bee1 44%, #e68fc4 100%)",
      edge: "#b56a93",
      text: "#60344f",
    },
    "ocean-glide": {
      bg: "radial-gradient(circle at 22% 18%, #ecfbff 0%, #c8e7f7 43%, #9ec8ec 100%)",
      edge: "#6f9fc8",
      text: "#2f4c6e",
    },
    "lava-quack": {
      bg: "radial-gradient(circle at 18% 14%, #413235 0%, #2b1f2a 45%, #170d17 100%)",
      edge: "#6e3b47",
      text: "#ffd9bf",
    },
    "midnight-feather": {
      bg: "radial-gradient(circle at 18% 14%, #2f345f 0%, #1f2344 46%, #0f1127 100%)",
      edge: "#4d5b9e",
      text: "#e8ecff",
    },
    "cotton-cloud": {
      bg: "radial-gradient(circle at 22% 18%, #ffffff 0%, #ffe9f5 42%, #ffd9c9 100%)",
      edge: "#caa1a4",
      text: "#6a4f5e",
    },
    "forest-float": {
      bg: "radial-gradient(circle at 22% 18%, #f4ffe9 0%, #d7f3bb 42%, #a3d67e 100%)",
      edge: "#6ca050",
      text: "#2f5530",
    },
    "frost-glimmer": {
      bg: "radial-gradient(circle at 22% 18%, #f8fdff 0%, #d9f2ff 42%, #afe4ff 100%)",
      edge: "#6ca6c7",
      text: "#244f68",
    },
    "neon-disco": {
      bg: "radial-gradient(circle at 22% 18%, #fff2fd 0%, #ffc7fa 42%, #ff7df0 100%)",
      edge: "#af4fa2",
      text: "#53214d",
    },
    "desert-dune": {
      bg: "radial-gradient(circle at 22% 18%, #fff4dd 0%, #ffd8a8 42%, #eead73 100%)",
      edge: "#ba7740",
      text: "#6e3f1f",
    },
    "candy-comet": {
      bg: "radial-gradient(circle at 22% 18%, #ffeaf7 0%, #ffc0e5 42%, #ff86ce 100%)",
      edge: "#b65490",
      text: "#6e2c55",
    },
    "royal-plume": {
      bg: "radial-gradient(circle at 18% 14%, #4a467d 0%, #2d2b59 46%, #171634 100%)",
      edge: "#7b6fb6",
      text: "#f5ebd0",
    },
  };

  const appThemes = {
    "golden-fluff": {
      "--bg-top": "#fff8c9",
      "--bg-mid": "#ffe680",
      "--bg-bottom": "#ffd34f",
      "--panel": "#fff6d6ee",
      "--panel-border": "#e3b942",
      "--menu-bg": "rgba(255, 244, 188, 0.98)",
      "--menu-border": "#a26a00",
      "--menu-item-bg": "linear-gradient(180deg, #ffe889 0%, #ffcc4f 100%)",
      "--menu-item-text": "#603800",
      "--text": "#5f3d00",
    },
    "sunset-splash": {
      "--bg-top": "#ffe7cb",
      "--bg-mid": "#ffbf87",
      "--bg-bottom": "#f58f6a",
      "--panel": "#fff0dded",
      "--panel-border": "#dc8f4f",
      "--menu-bg": "rgba(255, 226, 198, 0.97)",
      "--menu-border": "#9a4e21",
      "--menu-item-bg": "linear-gradient(180deg, #ffd3a9 0%, #ffab7a 100%)",
      "--menu-item-text": "#6b2f16",
      "--text": "#6c3216",
    },
    "mint-quack": {
      "--bg-top": "#ebfff2",
      "--bg-mid": "#c9f2dc",
      "--bg-bottom": "#95ddbb",
      "--panel": "#f3fff7ed",
      "--panel-border": "#72bf96",
      "--menu-bg": "rgba(224, 250, 236, 0.97)",
      "--menu-border": "#327152",
      "--menu-item-bg": "linear-gradient(180deg, #d5f8e6 0%, #9de6c0 100%)",
      "--menu-item-text": "#22573f",
      "--text": "#245640",
    },
    "berry-bubble": {
      "--bg-top": "#ffe9f8",
      "--bg-mid": "#f6c2e2",
      "--bg-bottom": "#e697c9",
      "--panel": "#fff0f8ef",
      "--panel-border": "#ce85ae",
      "--menu-bg": "rgba(255, 229, 245, 0.97)",
      "--menu-border": "#8f4773",
      "--menu-item-bg": "linear-gradient(180deg, #ffd7ef 0%, #f5aad4 100%)",
      "--menu-item-text": "#5e2f4f",
      "--text": "#5f3150",
    },
    "ocean-glide": {
      "--bg-top": "#e8f8ff",
      "--bg-mid": "#bfe2f7",
      "--bg-bottom": "#93c3e8",
      "--panel": "#eef8ffed",
      "--panel-border": "#6ca4cf",
      "--menu-bg": "rgba(224, 243, 255, 0.97)",
      "--menu-border": "#3b6f9a",
      "--menu-item-bg": "linear-gradient(180deg, #cfe9fb 0%, #9fcdea 100%)",
      "--menu-item-text": "#244866",
      "--text": "#244a68",
    },
    "lava-quack": {
      "--bg-top": "#3f3033",
      "--bg-mid": "#2a1d28",
      "--bg-bottom": "#160d17",
      "--panel": "#3b2f37ec",
      "--panel-border": "#7f4a56",
      "--menu-bg": "rgba(62, 45, 54, 0.97)",
      "--menu-border": "#b67a58",
      "--menu-item-bg": "linear-gradient(180deg, #6d4550 0%, #4f313b 100%)",
      "--menu-item-text": "#ffe0c3",
      "--text": "#ffd9bf",
    },
    "midnight-feather": {
      "--bg-top": "#2f3560",
      "--bg-mid": "#1f2343",
      "--bg-bottom": "#0f1228",
      "--panel": "#2a3152ec",
      "--panel-border": "#5568af",
      "--menu-bg": "rgba(41, 49, 87, 0.97)",
      "--menu-border": "#8ea3de",
      "--menu-item-bg": "linear-gradient(180deg, #5162a4 0%, #38467e 100%)",
      "--menu-item-text": "#f3f6ff",
      "--text": "#e8ecff",
    },
    "cotton-cloud": {
      "--bg-top": "#fff7fb",
      "--bg-mid": "#ffe9f6",
      "--bg-bottom": "#ffd9ca",
      "--panel": "#fff7f3ed",
      "--panel-border": "#d4a8b0",
      "--menu-bg": "rgba(255, 241, 247, 0.97)",
      "--menu-border": "#9f6f86",
      "--menu-item-bg": "linear-gradient(180deg, #ffe7f3 0%, #ffd1df 100%)",
      "--menu-item-text": "#6a4f5e",
      "--text": "#6a4f5e",
    },
    "forest-float": {
      "--bg-top": "#effce9",
      "--bg-mid": "#cae9b8",
      "--bg-bottom": "#9ed179",
      "--panel": "#f4ffeced",
      "--panel-border": "#6ca150",
      "--menu-bg": "rgba(234, 249, 222, 0.97)",
      "--menu-border": "#3d6c2a",
      "--menu-item-bg": "linear-gradient(180deg, #dff4cd 0%, #afdd90 100%)",
      "--menu-item-text": "#2d5624",
      "--text": "#2f5530",
    },
    "frost-glimmer": {
      "--bg-top": "#f5fdff",
      "--bg-mid": "#d8f0ff",
      "--bg-bottom": "#a9ddfb",
      "--panel": "#eff9ffef",
      "--panel-border": "#79b1d3",
      "--menu-bg": "rgba(229, 246, 255, 0.97)",
      "--menu-border": "#3f7292",
      "--menu-item-bg": "linear-gradient(180deg, #dcf2ff 0%, #b3ddf5 100%)",
      "--menu-item-text": "#28516a",
      "--text": "#244f68",
    },
    "neon-disco": {
      "--bg-top": "#ffeafd",
      "--bg-mid": "#ffc7fa",
      "--bg-bottom": "#ff83ef",
      "--panel": "#fff0ffef",
      "--panel-border": "#cc79c1",
      "--menu-bg": "rgba(255, 229, 253, 0.97)",
      "--menu-border": "#8f3d87",
      "--menu-item-bg": "linear-gradient(180deg, #ffd7ff 0%, #ff9bf5 100%)",
      "--menu-item-text": "#5b2558",
      "--text": "#53214d",
    },
    "desert-dune": {
      "--bg-top": "#fff1da",
      "--bg-mid": "#ffd3a2",
      "--bg-bottom": "#e8a66d",
      "--panel": "#fff2dfed",
      "--panel-border": "#ca864a",
      "--menu-bg": "rgba(255, 235, 206, 0.97)",
      "--menu-border": "#8f5428",
      "--menu-item-bg": "linear-gradient(180deg, #ffddb4 0%, #f2b57f 100%)",
      "--menu-item-text": "#603618",
      "--text": "#6e3f1f",
    },
    "candy-comet": {
      "--bg-top": "#ffeaf8",
      "--bg-mid": "#ffc2e7",
      "--bg-bottom": "#ff86cf",
      "--panel": "#fff1f9ef",
      "--panel-border": "#d07aa9",
      "--menu-bg": "rgba(255, 232, 247, 0.97)",
      "--menu-border": "#8f3f68",
      "--menu-item-bg": "linear-gradient(180deg, #ffd8ef 0%, #ffa8d6 100%)",
      "--menu-item-text": "#612844",
      "--text": "#6e2c55",
    },
    "royal-plume": {
      "--bg-top": "#4a467d",
      "--bg-mid": "#2d2b59",
      "--bg-bottom": "#171634",
      "--panel": "#2f2d57eb",
      "--panel-border": "#7b6fb6",
      "--menu-bg": "rgba(53, 50, 92, 0.97)",
      "--menu-border": "#b8aadf",
      "--menu-item-bg": "linear-gradient(180deg, #6a64a8 0%, #4a467d 100%)",
      "--menu-item-text": "#f5ebd0",
      "--text": "#f5ebd0",
    },
  };

  const theme = skinThemes[state.selectedSkin] || skinThemes["golden-fluff"];
  const appTheme = appThemes[state.selectedSkin] || appThemes["golden-fluff"];

  Object.entries(appTheme).forEach(([variable, value]) => {
    root.style.setProperty(variable, value);
  });

  duckButton.style.setProperty("--clicker-bg", theme.bg);
  duckButton.style.setProperty("--clicker-shadow-edge", theme.edge);
  duckButton.style.setProperty("--clicker-text", theme.text);
}

function saveGame() {
  const snapshot = {
    state,
    upgrades: upgrades.map((upgrade) => ({ id: upgrade.id, level: upgrade.level })),
    skins: skins.map((skin) => ({ id: skin.id, unlocked: skin.unlocked })),
  };

  localStorage.setItem(storageKey, JSON.stringify(snapshot));
}

function loadGame() {
  const rawSave = localStorage.getItem(storageKey);
  if (!rawSave) {
    return;
  }

  try {
    const parsed = JSON.parse(rawSave);

    if (parsed.state) {
      state.ducks = Number(parsed.state.ducks) || 0;
      state.totalDucksEarned = Number(parsed.state.totalDucksEarned) || state.ducks;
      state.ducksPerClick = Number(parsed.state.ducksPerClick) || 1;
      state.autoPerSecond = Number(parsed.state.autoPerSecond) || 0;
      state.selectedSkin = parsed.state.selectedSkin || "golden-fluff";
      state.hasPlayed = Boolean(parsed.state.hasPlayed);
      state.tutorialCompleted = Boolean(parsed.state.tutorialCompleted);
    }

    if (Array.isArray(parsed.upgrades)) {
      parsed.upgrades.forEach((savedUpgrade) => {
        const target = upgrades.find((item) => item.id === savedUpgrade.id);
        if (target) {
          target.level = Math.max(0, Number(savedUpgrade.level) || 0);
        }
      });
    }

    if (Array.isArray(parsed.skins)) {
      parsed.skins.forEach((savedSkin) => {
        const target = skins.find((item) => item.id === savedSkin.id);
        if (target) {
          target.unlocked = Boolean(savedSkin.unlocked);
        }
      });
    }
  } catch {
    localStorage.removeItem(storageKey);
  }
}

function ensureSaveBootstrap() {
  if (!localStorage.getItem(storageKey)) {
    saveGame();
  }
}

function renderUpgrades() {
  upgradeList.innerHTML = "";

  upgrades.forEach((upgrade) => {
    const card = upgradeTemplate.content.firstElementChild.cloneNode(true);
    const nameEl = card.querySelector(".upgrade-name");
    const descEl = card.querySelector(".upgrade-desc");
    const levelEl = card.querySelector(".upgrade-level-value");
    const costEl = card.querySelector(".upgrade-cost-value");
    const buyButton = card.querySelector(".upgrade-buy");

    const currentCost = getUpgradeCost(upgrade);
    const currentTypeValue = upgrade.type === "click" ? state.ducksPerClick : state.autoPerSecond;
    const nextTypeValue = currentTypeValue === 0 ? 1 : Math.min(MAX_TIER_VALUE, currentTypeValue * 10);
    const atCap = currentTypeValue >= MAX_TIER_VALUE;

    nameEl.textContent = upgrade.name;
    if (upgrade.type === "click") {
      descEl.textContent = atCap
        ? "Max reached: 1,000,000,000 ducks/click"
        : `Next tier: ${formatNumber(currentTypeValue)} -> ${formatNumber(nextTypeValue)} ducks/click (10x)`;
    } else {
      descEl.textContent = atCap
        ? "Max reached: 1,000,000,000 auto ducks/sec"
        : `Next tier: ${formatNumber(currentTypeValue)} -> ${formatNumber(nextTypeValue)} auto ducks/sec (10x)`;
    }
    levelEl.textContent = String(upgrade.level);
    costEl.textContent = formatNumber(currentCost);

    buyButton.disabled = state.ducks < currentCost || atCap;
    buyButton.addEventListener("click", () => {
      if (state.ducks < currentCost || atCap) {
        return;
      }

      state.ducks -= currentCost;
      upgrade.level += 1;

      if (upgrade.type === "click") {
        state.ducksPerClick = Math.min(MAX_TIER_VALUE, state.ducksPerClick * 10);
      } else {
        const autoBase = state.autoPerSecond === 0 ? 1 : state.autoPerSecond;
        state.autoPerSecond = Math.min(MAX_TIER_VALUE, autoBase * 10);
      }

      updateStats();
      renderUpgrades();
      renderSkins();
      renderRanks();
      saveGame();
    });

    upgradeList.appendChild(card);
  });
}

function renderSkins() {
  skinList.innerHTML = "";

  skins.forEach((skin) => {
    const card = skinTemplate.content.firstElementChild.cloneNode(true);
    const nameEl = card.querySelector(".skin-name");
    const descEl = card.querySelector(".skin-desc");
    const costEl = card.querySelector(".skin-cost-value");
    const button = card.querySelector(".skin-buy");

    nameEl.textContent = skin.name;
    descEl.textContent = skin.description;
    costEl.textContent = formatNumber(skin.cost);

    if (!skin.unlocked) {
      button.textContent = `Unlock (${formatNumber(skin.cost)})`;
      button.disabled = state.ducks < skin.cost;
      button.addEventListener("click", () => {
        if (state.ducks < skin.cost) {
          return;
        }

        state.ducks -= skin.cost;
        skin.unlocked = true;
        state.selectedSkin = skin.id;
        applySkin();
        updateStats();
        renderUpgrades();
        renderSkins();
        renderRanks();
        saveGame();
      });
    } else {
      button.textContent = state.selectedSkin === skin.id ? "Selected" : "Use Skin";
      button.disabled = state.selectedSkin === skin.id;
      button.addEventListener("click", () => {
        state.selectedSkin = skin.id;
        applySkin();
        renderSkins();
        saveGame();
      });
    }

    skinList.appendChild(card);
  });
}

function setVisibleSection(sectionId) {
  const allSections = [upgradesSection, skinsSection, ranksSection];
  allSections.forEach((section) => {
    section.hidden = section.id !== sectionId;
  });
}

function clearTutorialFocus() {
  if (activeTutorialFocus) {
    activeTutorialFocus.classList.remove("tutorial-focus");
    activeTutorialFocus = null;
  }
}

function renderTutorialStep() {
  const step = tutorialSteps[tutorialStepIndex];
  tutorialStepMeta.textContent = `Step ${tutorialStepIndex + 1} of ${tutorialSteps.length}`;
  tutorialText.textContent = step.text;

  tutorialBackButton.disabled = tutorialStepIndex === 0;
  tutorialNextButton.textContent = tutorialStepIndex === tutorialSteps.length - 1 ? "Finish" : "Next";
  closeTutorialButton.textContent = tutorialStepIndex === tutorialSteps.length - 1 ? "Close" : "Skip";

  if (step.sectionId) {
    setVisibleSection(step.sectionId);
  }

  clearTutorialFocus();
  const focusTarget = document.getElementById(step.focusId);
  if (focusTarget) {
    focusTarget.scrollIntoView({ behavior: "auto", block: "center" });
    focusTarget.classList.add("tutorial-focus");
    activeTutorialFocus = focusTarget;
  }

  positionTutorialCard(focusTarget);
}

function positionTutorialCard(focusTarget) {
  if (!focusTarget) {
    tutorialCard.style.top = "50%";
    tutorialCard.style.left = "50%";
    tutorialCard.style.transform = "translate(-50%, -50%)";
    return;
  }

  const margin = 12;
  const gap = 14;
  const targetRect = focusTarget.getBoundingClientRect();
  const cardRect = tutorialCard.getBoundingClientRect();

  let top = targetRect.bottom + gap;
  if (top + cardRect.height > window.innerHeight - margin) {
    top = targetRect.top - cardRect.height - gap;
  }
  top = Math.max(margin, Math.min(top, window.innerHeight - cardRect.height - margin));

  let left = targetRect.left + targetRect.width / 2 - cardRect.width / 2;
  left = Math.max(margin, Math.min(left, window.innerWidth - cardRect.width - margin));

  tutorialCard.style.top = `${Math.round(top)}px`;
  tutorialCard.style.left = `${Math.round(left)}px`;
  tutorialCard.style.transform = "none";
}

function openTutorial(fromStart = false) {
  if (fromStart) {
    tutorialStepIndex = 0;
  }

  tutorialOverlay.setAttribute("aria-hidden", "false");
  window.requestAnimationFrame(() => {
    const step = tutorialSteps[tutorialStepIndex];
    const target = document.getElementById(step.focusId);
    positionTutorialCard(target);
  });
  renderTutorialStep();
}

function closeTutorial() {
  tutorialOverlay.setAttribute("aria-hidden", "true");
  clearTutorialFocus();
}

function completeTutorial() {
  state.tutorialCompleted = true;
  saveGame();
  closeTutorial();
}

function setupSectionMenu() {
  function showSection(sectionToShow) {
    setVisibleSection(sectionToShow.id);

    sectionToShow.scrollIntoView({ behavior: "smooth", block: "start" });
    sectionToShow.classList.remove("section-flash");
    // Restart the animation each time a section is selected.
    void sectionToShow.offsetWidth;
    sectionToShow.classList.add("section-flash");
  }

  function closeMenu() {
    menuPanel.hidden = true;
    menuToggle.setAttribute("aria-expanded", "false");
  }

  menuToggle.addEventListener("click", () => {
    const nowOpen = menuPanel.hidden;
    menuPanel.hidden = !nowOpen;
    menuToggle.setAttribute("aria-expanded", String(nowOpen));
  });

  menuPanel.querySelectorAll(".menu-link").forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-target");
      const targetEl = document.getElementById(targetId);

      if (!targetEl) {
        closeMenu();
        return;
      }

      showSection(targetEl);
      closeMenu();
    });
  });

  document.addEventListener("click", (event) => {
    if (menuPanel.hidden) {
      return;
    }

    const clickTarget = event.target;
    if (!menuPanel.contains(clickTarget) && !menuToggle.contains(clickTarget)) {
      closeMenu();
    }
  });
}

function setupGame() {
  loadGame();
  lastAnnouncedRankIndex = getCurrentRankIndex();
  ensureSaveBootstrap();
  applySkin();
  updateStats();
  renderUpgrades();
  renderSkins();
  renderRanks();

  duckButton.addEventListener("click", () => {
    if (!state.hasPlayed) {
      state.hasPlayed = true;
    }

    state.ducks += state.ducksPerClick;
    state.totalDucksEarned += state.ducksPerClick;
    updateStats();
    showFloatingGain(state.ducksPerClick);
    maybeNotifyRankUp();
    renderUpgrades();
    renderSkins();
    renderRanks();
    saveGame();
  });

  tutorialButton.addEventListener("click", () => openTutorial(true));
  tutorialBackButton.addEventListener("click", () => {
    if (tutorialStepIndex > 0) {
      tutorialStepIndex -= 1;
      renderTutorialStep();
    }
  });

  tutorialNextButton.addEventListener("click", () => {
    if (tutorialStepIndex < tutorialSteps.length - 1) {
      tutorialStepIndex += 1;
      renderTutorialStep();
      return;
    }

    completeTutorial();
  });

  closeTutorialButton.addEventListener("click", completeTutorial);

  tutorialOverlay.addEventListener("click", (event) => {
    if (event.target === tutorialOverlay) {
      closeTutorial();
    }
  });

  setupSectionMenu();

  if (!state.tutorialCompleted) {
    openTutorial(true);
  }

  window.addEventListener("beforeunload", saveGame);

  window.addEventListener("resize", () => {
    if (tutorialOverlay.getAttribute("aria-hidden") === "true") {
      return;
    }

    const step = tutorialSteps[tutorialStepIndex];
    const target = document.getElementById(step.focusId);
    positionTutorialCard(target);
  });

  window.setInterval(() => {
    if (state.autoPerSecond <= 0) {
      return;
    }

    state.ducks += state.autoPerSecond;
    state.totalDucksEarned += state.autoPerSecond;
    updateStats();
    maybeNotifyRankUp();
    renderUpgrades();
    renderSkins();
    renderRanks();
    saveGame();
  }, 1000);
}

setupGame();
