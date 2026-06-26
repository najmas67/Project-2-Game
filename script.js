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
const kingdomSection = document.getElementById("kingdomSection");
const currentRankEl = document.getElementById("currentRank");
const nextRankNeedEl = document.getElementById("nextRankNeed");
const rankList = document.getElementById("rankList");
const rankNotificationLayer = document.getElementById("rankNotificationLayer");
const gameTitleEl = document.getElementById("gameTitle");
const heroSection = document.querySelector(".hero");
const statsSection = document.querySelector(".stats");
const clickZoneSection = document.querySelector(".click-zone");
const kingdomLevelEl = document.getElementById("kingdomLevel");
const kingdomPopulationEl = document.getElementById("kingdomPopulation");
const kingdomIncomeEl = document.getElementById("kingdomIncome");
const kingdomList = document.getElementById("kingdomList");
const kingdomFestivalButton = document.getElementById("kingdomFestivalButton");
const kingdomFestivalMeta = document.getElementById("kingdomFestivalMeta");
const kingdomEntryFx = document.getElementById("kingdomEntryFx");
const kingdomCityLayer = document.getElementById("kingdomCityLayer");
const kingdomFestivalLayer = document.getElementById("kingdomFestivalLayer");

const storageKey = "silly-ducks-save-v1";
const MAX_TIER_VALUE = 1_000_000_000;
const UPGRADE_START_COST = 50;
const UPGRADE_MAX_COST = 100_000;
const UPGRADE_COST_GROWTH = 1.6;
const SECRET_RANK = {
  name: "Duck of the Hidden Dawn",
  ducks: 0,
};
const KINGDOM_FESTIVAL_COOLDOWN_MS = 30_000;
const KINGDOM_DUCK_LINES = [
  "Quack! Keep building this kingdom!",
  "I guard the grass lane every morning.",
  "The pond snacks are excellent today.",
  "More huts means more duck neighbors!",
  "Festival night is my favorite shift.",
  "Command center says we are thriving.",
  "Harbor deliveries arrived right on time.",
  "Quack quack. I believe in this empire.",
];

const upgrades = [
  {
    id: "beak-blitz",
    name: "Beak Blitz",
    description: "",
    baseCost: UPGRADE_START_COST,
    type: "click",
    basePower: 1,
    level: 0,
  },
  {
    id: "pond-pulse",
    name: "Pond Pulse",
    description: "",
    baseCost: UPGRADE_START_COST,
    type: "auto",
    basePower: 1,
    level: 0,
  },
  {
    id: "lucky-feather",
    name: "Lucky Feather",
    description: "",
    baseCost: 120,
    type: "crit-chance",
    basePower: 0.04,
    level: 0,
  },
  {
    id: "treasure-talon",
    name: "Treasure Talon",
    description: "",
    baseCost: 180,
    type: "click-multiplier",
    basePower: 0.35,
    level: 0,
  },
  {
    id: "windmill-docks",
    name: "Windmill Docks",
    description: "",
    baseCost: 220,
    type: "auto-multiplier",
    basePower: 0.3,
    level: 0,
  },
  {
    id: "crown-engine",
    name: "Crown Engine",
    description: "",
    baseCost: 400,
    type: "kingdom-multiplier",
    basePower: 0.25,
    level: 0,
  },
];

const kingdomBuildings = [
  {
    id: "nest-huts",
    name: "Nest Huts",
    description: "Tiny homes for your duck citizens.",
    baseCost: 160,
    populationGain: 6,
    incomePerSecond: 2,
    count: 0,
  },
  {
    id: "pond-plaza",
    name: "Pond Plaza",
    description: "A social center where ducks trade snacks and stories.",
    baseCost: 520,
    populationGain: 15,
    incomePerSecond: 8,
    count: 0,
  },
  {
    id: "quack-castle",
    name: "Quack Castle",
    description: "The royal command center for your growing kingdom.",
    baseCost: 1_650,
    populationGain: 40,
    incomePerSecond: 28,
    count: 0,
  },
  {
    id: "sky-harbor",
    name: "Sky Harbor",
    description: "Airship docks that attract elite duck merchants.",
    baseCost: 4_800,
    populationGain: 90,
    incomePerSecond: 85,
    count: 0,
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
  secretRankUnlocked: false,
  clickMultiplier: 1,
  autoMultiplier: 1,
  critChance: 0,
  critMultiplier: 2,
  kingdomMultiplier: 1,
  kingdomPopulation: 0,
  kingdomLevel: 1,
  kingdomFestivalReadyAt: 0,
};

const tutorialSteps = [
  {
    text: "Welcome to Silly Ducks. I am Captain Quackers, and this quick guide will show you how to play efficiently.",
    focusId: "duckButton",
  },
  {
    text: "Tap the big duck button to collect ducks. Every tap increases your total right away.",
    focusId: "duckButton",
  },
  {
    text: "Use this top-right menu to open your sections. It is your main navigation during the game.",
    focusId: "menuToggle",
    openMenu: true,
  },
  {
    text: "In Upgrades, buy power boosts for clicks, auto income, and special abilities.",
    focusId: "upgradesSection",
    sectionId: "upgradesSection",
  },
  {
    text: "In Skins, unlock new looks. Skins are cosmetic and keep your progress intact.",
    focusId: "skinsSection",
    sectionId: "skinsSection",
  },
  {
    text: "In Ranks, track milestones and see what you need for your next title.",
    focusId: "ranksSection",
    sectionId: "ranksSection",
  },
  {
    text: "In Duck Kingdom, build structures, grow population, and host festivals for bonus ducks.",
    focusId: "kingdomSection",
    sectionId: "kingdomSection",
  },
  {
    text: "You are ready. Keep tapping, invest in upgrades, and rotate sections often for faster growth.",
    focusId: "duckButton",
  },
];

let tutorialStepIndex = 0;
let activeTutorialFocus = null;
let lastAnnouncedRankIndex = -1;
let secretRankAnnounced = false;
let lastVisibleSectionId = "";
let lastKingdomVisualKey = "";

function formatNumber(value) {
  return Math.floor(value).toLocaleString();
}

function parseColorToRgb(colorValue) {
  if (typeof colorValue !== "string") {
    return null;
  }

  const color = colorValue.trim();
  if (color.startsWith("#")) {
    const hex = color.slice(1);
    if (hex.length === 3 || hex.length === 4) {
      const r = Number.parseInt(hex[0] + hex[0], 16);
      const g = Number.parseInt(hex[1] + hex[1], 16);
      const b = Number.parseInt(hex[2] + hex[2], 16);
      return { r, g, b };
    }

    if (hex.length === 6 || hex.length === 8) {
      const r = Number.parseInt(hex.slice(0, 2), 16);
      const g = Number.parseInt(hex.slice(2, 4), 16);
      const b = Number.parseInt(hex.slice(4, 6), 16);
      return { r, g, b };
    }

    return null;
  }

  const rgbMatch = color.match(/^rgba?\(([^)]+)\)$/i);
  if (!rgbMatch) {
    return null;
  }

  const channels = rgbMatch[1]
    .split(",")
    .map((part) => Number.parseFloat(part.trim()))
    .filter((value) => Number.isFinite(value));

  if (channels.length < 3) {
    return null;
  }

  return {
    r: Math.max(0, Math.min(255, channels[0])),
    g: Math.max(0, Math.min(255, channels[1])),
    b: Math.max(0, Math.min(255, channels[2])),
  };
}

function getRelativeLuminance({ r, g, b }) {
  const normalizeChannel = (channel) => {
    const value = channel / 255;
    return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
  };

  const red = normalizeChannel(r);
  const green = normalizeChannel(g);
  const blue = normalizeChannel(b);

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function getReadableTextColor(backgroundColor, darkText, lightText) {
  const rgb = parseColorToRgb(backgroundColor);
  if (!rgb) {
    return darkText;
  }

  const luminance = getRelativeLuminance(rgb);
  return luminance > 0.52 ? darkText : lightText;
}

function getUpgradeCost(upgrade) {
  const scaledCost = upgrade.baseCost * Math.pow(UPGRADE_COST_GROWTH, upgrade.level);
  return Math.min(UPGRADE_MAX_COST, Math.floor(scaledCost));
}

function getKingdomBuildingCost(building) {
  return Math.floor(building.baseCost * Math.pow(1.55, building.count));
}

function getKingdomIncomePerSecond() {
  const baseIncome = kingdomBuildings.reduce(
    (sum, building) => sum + building.incomePerSecond * building.count,
    0,
  );
  return Math.floor(baseIncome * state.kingdomMultiplier);
}

function getEffectiveClickGain() {
  const baseClick = Math.max(1, state.ducksPerClick);
  let gain = Math.floor(baseClick * state.clickMultiplier);
  const critTriggered = Math.random() < state.critChance;
  if (critTriggered) {
    gain = Math.floor(gain * state.critMultiplier);
  }

  return {
    gain: Math.max(1, gain),
    critTriggered,
  };
}

function getEffectiveAutoPerSecond() {
  const baseAuto = Math.max(0, state.autoPerSecond);
  const boostedAuto = Math.floor(baseAuto * state.autoMultiplier);
  return boostedAuto + getKingdomIncomePerSecond();
}

function pickRandomItem(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return "";
  }

  return items[Math.floor(Math.random() * items.length)];
}

function getKingdomDuckLine() {
  const contextualLines = [];

  if (state.kingdomPopulation >= 100) {
    contextualLines.push(`Population watch: ${formatNumber(state.kingdomPopulation)} ducks and growing!`);
  }

  const kingdomIncome = getKingdomIncomePerSecond();
  if (kingdomIncome > 0) {
    contextualLines.push(`Treasury report: ${formatNumber(kingdomIncome)} ducks per second.`);
  }

  return pickRandomItem([...KINGDOM_DUCK_LINES, ...contextualLines]);
}

function showKingdomDuckDialogue(duckNode, message) {
  if (!kingdomCityLayer || !duckNode || !message) {
    return;
  }

  const bubble = document.createElement("div");
  bubble.className = "kingdom-duck-dialogue";
  bubble.textContent = message;
  bubble.style.left = duckNode.style.left;
  bubble.style.bottom = `${Number.parseFloat(duckNode.style.bottom || "0") + 10}%`;
  kingdomCityLayer.appendChild(bubble);

  window.setTimeout(() => {
    bubble.remove();
  }, 1900);
}

function updateStats() {
  duckCountEl.textContent = formatNumber(state.ducks);
  ducksPerClickEl.textContent = formatNumber(Math.floor(state.ducksPerClick * state.clickMultiplier));
  autoPerSecondEl.textContent = formatNumber(getEffectiveAutoPerSecond());
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

function showSecretRankNotification() {
  if (!rankNotificationLayer) {
    return;
  }

  const popup = document.createElement("article");
  popup.className = "rank-popup";
  popup.innerHTML = `
    <h3>Secret Found!</h3>
    <p>You unlocked <strong>${SECRET_RANK.name}</strong> by discovering a hidden easter egg.</p>
  `;

  rankNotificationLayer.appendChild(popup);
  window.requestAnimationFrame(() => popup.classList.add("show"));

  spawnFireworksBurst();
  window.setTimeout(spawnFireworksBurst, 140);
  window.setTimeout(spawnFireworksBurst, 280);

  window.setTimeout(() => {
    popup.classList.remove("show");
    window.setTimeout(() => popup.remove(), 320);
  }, 2500);
}

function startDuckShower() {
  const showerCount = 50;
  const duckRainImageSrc = "images/duck-rain-transparent.png";

  for (let index = 0; index < showerCount; index += 1) {
    const duck = document.createElement("img");
    duck.className = "duck-rain";
    duck.src = duckRainImageSrc;
    duck.alt = "";
    duck.setAttribute("aria-hidden", "true");
    duck.style.left = `${Math.random() * 100}vw`;
    const duckSize = Math.floor(42 + Math.random() * 42);
    duck.style.width = `${duckSize}px`;
    duck.style.height = "auto";
    duck.style.transform = `rotate(${Math.floor(-18 + Math.random() * 36)}deg)`;
    duck.style.animationDuration = `${(1.8 + Math.random() * 2.2).toFixed(2)}s`;
    duck.style.animationDelay = `${(Math.random() * 0.75).toFixed(2)}s`;
    document.body.appendChild(duck);
    window.setTimeout(() => duck.remove(), 5000);
  }
}

function triggerSecretEasterEgg() {
  startDuckShower();

  if (state.secretRankUnlocked) {
    return;
  }

  state.secretRankUnlocked = true;
  secretRankAnnounced = true;
  showSecretRankNotification();
  renderRanks();
  saveGame();
}

function maybeNotifyRankUp() {
  const currentRankIndex = getCurrentRankIndex();
  if (currentRankIndex <= lastAnnouncedRankIndex) {
    if (state.secretRankUnlocked && !secretRankAnnounced) {
      showSecretRankNotification();
      secretRankAnnounced = true;
    }
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

  if (state.secretRankUnlocked && !secretRankAnnounced) {
    showSecretRankNotification();
    secretRankAnnounced = true;
  }
}

function renderRanks() {
  if (!currentRankEl || !nextRankNeedEl || !rankList) {
    return;
  }

  const currentTierIndex = getCurrentRankIndex();
  const currentTier = currentTierIndex >= 0 ? rankTiers[currentTierIndex] : null;
  const nextTier = currentTierIndex >= 0 ? rankTiers[currentTierIndex + 1] || null : rankTiers[0];
  const usingSecretRank = state.secretRankUnlocked;

  currentRankEl.textContent = usingSecretRank ? SECRET_RANK.name : currentTier ? currentTier.name : "Unranked";
  if (usingSecretRank) {
    nextRankNeedEl.textContent = "You discovered the hidden rank. Your flock now knows forbidden quack lore.";
  } else if (!nextTier) {
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

  const secretCard = document.createElement("article");
  secretCard.className = "upgrade-card rank-tier-card";
  if (state.secretRankUnlocked) {
    secretCard.classList.add("rank-achieved", "rank-current");
  }

  secretCard.innerHTML = `
    <div class="upgrade-info">
      <h3>${SECRET_RANK.name}</h3>
      <p>Requirement: Discover the hidden title easter egg.</p>
    </div>
    <div class="upgrade-actions rank-status">${state.secretRankUnlocked ? "Unlocked" : "Hidden"}</div>
  `;

  rankList.appendChild(secretCard);
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

  const adaptiveThemeOverrides = {
    "lava-quack": {
      text: "#fff2e6",
      panelText: "#ffe9d4",
      menuText: "#ffe7cc",
      mutedText: "#ffd1ad",
    },
    "midnight-feather": {
      text: "#f4f7ff",
      panelText: "#edf2ff",
      menuText: "#e8efff",
      mutedText: "#cbd6ff",
    },
    "royal-plume": {
      text: "#f9f0d8",
      panelText: "#f7ead0",
      menuText: "#f7e7c7",
      mutedText: "#dfc99f",
    },
  };

  Object.entries(appTheme).forEach(([variable, value]) => {
    root.style.setProperty(variable, value);
  });

  const adaptiveText = getReadableTextColor(appTheme["--bg-bottom"], "#402600", "#fff4df");
  const adaptivePanelText = getReadableTextColor(appTheme["--panel"], "#4f3000", "#fff2e0");
  const adaptiveMenuText = getReadableTextColor(appTheme["--menu-bg"], "#4d2f00", "#fff1dc");
  const adaptiveMutedText = adaptivePanelText === "#fff2e0" ? "#f4dfc3" : "#6f4a14";
  const skinAdaptiveOverride = adaptiveThemeOverrides[state.selectedSkin] || null;

  root.style.setProperty("--adaptive-text", skinAdaptiveOverride?.text || adaptiveText);
  root.style.setProperty("--adaptive-panel-text", skinAdaptiveOverride?.panelText || adaptivePanelText);
  root.style.setProperty("--adaptive-menu-text", skinAdaptiveOverride?.menuText || adaptiveMenuText);
  root.style.setProperty("--adaptive-muted-text", skinAdaptiveOverride?.mutedText || adaptiveMutedText);

  duckButton.style.setProperty("--clicker-bg", theme.bg);
  duckButton.style.setProperty("--clicker-shadow-edge", theme.edge);
  duckButton.style.setProperty("--clicker-text", theme.text);
}

function saveGame() {
  const snapshot = {
    state,
    upgrades: upgrades.map((upgrade) => ({ id: upgrade.id, level: upgrade.level })),
    skins: skins.map((skin) => ({ id: skin.id, unlocked: skin.unlocked })),
    kingdomBuildings: kingdomBuildings.map((building) => ({ id: building.id, count: building.count })),
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
      state.secretRankUnlocked = Boolean(parsed.state.secretRankUnlocked);
      state.clickMultiplier = Number(parsed.state.clickMultiplier) || 1;
      state.autoMultiplier = Number(parsed.state.autoMultiplier) || 1;
      state.critChance = Math.max(0, Number(parsed.state.critChance) || 0);
      state.critMultiplier = Math.max(2, Number(parsed.state.critMultiplier) || 2);
      state.kingdomMultiplier = Math.max(1, Number(parsed.state.kingdomMultiplier) || 1);
      state.kingdomPopulation = Math.max(0, Number(parsed.state.kingdomPopulation) || 0);
      state.kingdomLevel = Math.max(1, Number(parsed.state.kingdomLevel) || 1);
      state.kingdomFestivalReadyAt = Math.max(0, Number(parsed.state.kingdomFestivalReadyAt) || 0);
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

    if (Array.isArray(parsed.kingdomBuildings)) {
      parsed.kingdomBuildings.forEach((savedBuilding) => {
        const target = kingdomBuildings.find((item) => item.id === savedBuilding.id);
        if (target) {
          target.count = Math.max(0, Number(savedBuilding.count) || 0);
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
    let atCap = false;

    nameEl.textContent = upgrade.name;
    if (upgrade.type === "click") {
      const nextTypeValue = Math.min(MAX_TIER_VALUE, state.ducksPerClick * 10);
      atCap = state.ducksPerClick >= MAX_TIER_VALUE;
      descEl.textContent = atCap
        ? "Max reached: 1,000,000,000 base ducks/click"
        : `Next tier: ${formatNumber(state.ducksPerClick)} -> ${formatNumber(nextTypeValue)} base ducks/click (10x)`;
    } else if (upgrade.type === "auto") {
      const nextTypeValue = state.autoPerSecond === 0 ? 1 : Math.min(MAX_TIER_VALUE, state.autoPerSecond * 10);
      atCap = state.autoPerSecond >= MAX_TIER_VALUE;
      descEl.textContent = atCap
        ? "Max reached: 1,000,000,000 base auto ducks/sec"
        : `Next tier: ${formatNumber(state.autoPerSecond)} -> ${formatNumber(nextTypeValue)} base auto ducks/sec (10x)`;
    } else if (upgrade.type === "crit-chance") {
      const nextChance = Math.min(0.6, state.critChance + upgrade.basePower);
      atCap = state.critChance >= 0.6;
      descEl.textContent = atCap
        ? "Max reached: 60% critical chance"
        : `Next tier: ${Math.round(state.critChance * 100)}% -> ${Math.round(nextChance * 100)}% crit chance`;
    } else if (upgrade.type === "click-multiplier") {
      const nextMultiplier = Math.min(8, state.clickMultiplier + upgrade.basePower);
      atCap = state.clickMultiplier >= 8;
      descEl.textContent = atCap
        ? "Max reached: 8x click multiplier"
        : `Next tier: ${state.clickMultiplier.toFixed(2)}x -> ${nextMultiplier.toFixed(2)}x click boost`;
    } else if (upgrade.type === "auto-multiplier") {
      const nextMultiplier = Math.min(8, state.autoMultiplier + upgrade.basePower);
      atCap = state.autoMultiplier >= 8;
      descEl.textContent = atCap
        ? "Max reached: 8x auto multiplier"
        : `Next tier: ${state.autoMultiplier.toFixed(2)}x -> ${nextMultiplier.toFixed(2)}x auto boost`;
    } else {
      const nextMultiplier = Math.min(6, state.kingdomMultiplier + upgrade.basePower);
      atCap = state.kingdomMultiplier >= 6;
      descEl.textContent = atCap
        ? "Max reached: 6x kingdom income"
        : `Next tier: ${state.kingdomMultiplier.toFixed(2)}x -> ${nextMultiplier.toFixed(2)}x kingdom income`;
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
      } else if (upgrade.type === "auto") {
        const autoBase = state.autoPerSecond === 0 ? 1 : state.autoPerSecond;
        state.autoPerSecond = Math.min(MAX_TIER_VALUE, autoBase * 10);
      } else if (upgrade.type === "crit-chance") {
        state.critChance = Math.min(0.6, state.critChance + upgrade.basePower);
      } else if (upgrade.type === "click-multiplier") {
        state.clickMultiplier = Math.min(8, state.clickMultiplier + upgrade.basePower);
      } else if (upgrade.type === "auto-multiplier") {
        state.autoMultiplier = Math.min(8, state.autoMultiplier + upgrade.basePower);
      } else if (upgrade.type === "kingdom-multiplier") {
        state.kingdomMultiplier = Math.min(6, state.kingdomMultiplier + upgrade.basePower);
      }

      updateStats();
      renderUpgrades();
      renderSkins();
      renderRanks();
      renderKingdom();
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

function renderKingdom() {
  if (!kingdomList || !kingdomLevelEl || !kingdomPopulationEl || !kingdomIncomeEl) {
    return;
  }

  const derivedPopulation = kingdomBuildings.reduce(
    (sum, building) => sum + building.populationGain * building.count,
    0,
  );
  if (state.kingdomPopulation < derivedPopulation) {
    state.kingdomPopulation = derivedPopulation;
  }

  state.kingdomLevel = Math.max(1, Math.floor(state.kingdomPopulation / 100) + 1);
  kingdomLevelEl.textContent = String(state.kingdomLevel);
  kingdomPopulationEl.textContent = formatNumber(state.kingdomPopulation);
  kingdomIncomeEl.textContent = formatNumber(getKingdomIncomePerSecond());

  if (kingdomSection) {
    const visualTier = Math.min(5, Math.max(1, Math.floor((state.kingdomLevel - 1) / 2) + 1));
    kingdomSection.setAttribute("data-kingdom-tier", String(visualTier));
  }

  renderKingdomVisuals();

  kingdomList.innerHTML = "";
  kingdomBuildings.forEach((building) => {
    const card = document.createElement("article");
    card.className = "upgrade-card";

    const cost = getKingdomBuildingCost(building);
    const nextIncome = Math.floor(building.incomePerSecond * (building.count + 1) * state.kingdomMultiplier);

    card.innerHTML = `
      <div class="upgrade-info">
        <h3>${building.name}</h3>
        <p>${building.description}</p>
        <p>Owned: ${formatNumber(building.count)} | Next income: ${formatNumber(nextIncome)} ducks/sec</p>
      </div>
      <div class="upgrade-actions">
        <p class="upgrade-level">Population +${formatNumber(building.populationGain)}</p>
        <p class="upgrade-cost">Cost: ${formatNumber(cost)} ducks</p>
        <button class="upgrade-buy">Build</button>
      </div>
    `;

    const buildButton = card.querySelector(".upgrade-buy");
    buildButton.disabled = state.ducks < cost;
    buildButton.addEventListener("click", () => {
      if (state.ducks < cost) {
        return;
      }

      state.ducks -= cost;
      building.count += 1;
      state.kingdomPopulation += building.populationGain;

      updateStats();
      renderUpgrades();
      renderSkins();
      renderRanks();
      renderKingdom();
      saveGame();
    });

    kingdomList.appendChild(card);
  });

  if (!kingdomFestivalButton || !kingdomFestivalMeta) {
    return;
  }

  const now = Date.now();
  const remainingMs = state.kingdomFestivalReadyAt - now;
  if (remainingMs > 0) {
    kingdomFestivalButton.disabled = true;
    kingdomFestivalMeta.textContent = `Festival ready in ${Math.ceil(remainingMs / 1000)}s.`;
  } else {
    kingdomFestivalButton.disabled = false;
    kingdomFestivalMeta.textContent = "Festival ready now.";
  }
}

function createKingdomEntity(label, className, leftPercent, bottomPercent) {
  if (!kingdomCityLayer) {
    return;
  }

  const node = document.createElement("span");
  node.className = `kingdom-entity ${className}`;
  node.textContent = label;
  const titleMap = {
    "social-center": "Social Center",
    "command-center": "Command Center",
    harbor: "Harbor",
    airdock: "Airship Dock"
  };
  node.title = titleMap[className] || className;
  node.style.left = `${leftPercent}%`;
  node.style.bottom = `${bottomPercent}%`;
  kingdomCityLayer.appendChild(node);
}

function renderKingdomVisuals() {
  if (!kingdomCityLayer) {
    return;
  }

  const nestHuts = kingdomBuildings.find((item) => item.id === "nest-huts")?.count || 0;
  const pondPlaza = kingdomBuildings.find((item) => item.id === "pond-plaza")?.count || 0;
  const commandCenters = kingdomBuildings.find((item) => item.id === "quack-castle")?.count || 0;
  const skyHarbors = kingdomBuildings.find((item) => item.id === "sky-harbor")?.count || 0;

  const duckCount = Math.min(18, Math.max(3, Math.floor(state.kingdomPopulation / 18) + 2));
  const visualStateKey = [nestHuts, pondPlaza, commandCenters, skyHarbors, duckCount].join("|");
  if (visualStateKey === lastKingdomVisualKey) {
    return;
  }
  lastKingdomVisualKey = visualStateKey;

  kingdomCityLayer.innerHTML = "";

  for (let index = 0; index < duckCount; index += 1) {
    const duck = document.createElement("span");
    duck.className = "kingdom-entity duck";
    duck.textContent = "🦆";
    const left = 8 + ((index * 11) % 84);
    const bottom = 8 + (index % 2) * 2;
    duck.style.left = `${left}%`;
    duck.style.bottom = `${bottom}%`;
    duck.style.animationDelay = `${((index % 7) * 0.14).toFixed(2)}s`;
    duck.style.animationDuration = `${(2.2 + (index % 4) * 0.26).toFixed(2)}s`;
    duck.setAttribute("role", "button");
    duck.setAttribute("tabindex", "0");
    duck.setAttribute("aria-label", "Talk to kingdom duck");
    duck.title = "Talk to duck";

    const talkToDuck = () => {
      const now = Date.now();
      const cooldownUntil = Number.parseInt(duck.dataset.cooldownUntil || "0", 10);
      if (now < cooldownUntil) {
        return;
      }

      duck.dataset.cooldownUntil = String(now + 650);
      duck.classList.remove("is-talking");
      void duck.offsetWidth;
      duck.classList.add("is-talking");
      showKingdomDuckDialogue(duck, getKingdomDuckLine());
      window.setTimeout(() => duck.classList.remove("is-talking"), 380);
    };

    duck.addEventListener("click", talkToDuck);
    duck.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        talkToDuck();
      }
    });

    kingdomCityLayer.appendChild(duck);
  }

  const socialLane = [17, 32, 47, 62];
  const socialCount = Math.min(4, pondPlaza);
  for (let index = 0; index < socialCount; index += 1) {
    createKingdomEntity("", "social-center", socialLane[index], 14 + (index % 2));
  }

  const commandLane = [56, 68, 80];
  const commandCount = Math.min(3, commandCenters);
  for (let index = 0; index < commandCount; index += 1) {
    createKingdomEntity("", "command-center", commandLane[index], 15 + (index % 2));
  }

  const harborLane = [14, 26, 38, 50];
  const harborCount = Math.min(4, Math.max(1, skyHarbors));
  for (let index = 0; index < harborCount; index += 1) {
    createKingdomEntity("", "harbor", harborLane[index], 10 + (index % 2));
  }

  const airdockLane = [66, 76, 86, 94];
  const dockCount = Math.min(4, skyHarbors);
  for (let index = 0; index < dockCount; index += 1) {
    createKingdomEntity("", "airdock", airdockLane[index], 16 + (index % 2));
  }
}

function playKingdomFestivalShow() {
  if (!kingdomFestivalLayer || !kingdomSection) {
    return;
  }

  kingdomFestivalLayer.innerHTML = "";
  kingdomSection.classList.add("festival-live");

  const banner = document.createElement("div");
  banner.className = "kingdom-festival-banner";
  banner.textContent = "Royal Duck Festival!";
  kingdomFestivalLayer.appendChild(banner);

  const confettiCount = 46;
  for (let index = 0; index < confettiCount; index += 1) {
    const confetti = document.createElement("span");
    confetti.className = "kingdom-confetti";
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.top = `${-8 - Math.random() * 20}px`;
    confetti.style.background = `hsl(${Math.floor(Math.random() * 360)}, 92%, 62%)`;
    confetti.style.animationDuration = `${(1.8 + Math.random() * 1.6).toFixed(2)}s`;
    confetti.style.animationDelay = `${(Math.random() * 0.35).toFixed(2)}s`;
    kingdomFestivalLayer.appendChild(confetti);
  }

  const spawnFireworkBurst = (left, top) => {
    const burst = document.createElement("div");
    burst.className = "kingdom-firework-burst";
    burst.style.left = `${left}%`;
    burst.style.top = `${top}%`;

    const sparks = 12;
    for (let sparkIndex = 0; sparkIndex < sparks; sparkIndex += 1) {
      const spark = document.createElement("span");
      spark.className = "kingdom-firework-spark";
      const angle = (Math.PI * 2 * sparkIndex) / sparks;
      const distance = 24 + Math.random() * 38;
      spark.style.setProperty("--spark-x", `${Math.cos(angle) * distance}px`);
      spark.style.setProperty("--spark-y", `${Math.sin(angle) * distance}px`);
      spark.style.setProperty("--spark-hue", String(Math.floor(Math.random() * 360)));
      burst.appendChild(spark);
    }

    kingdomFestivalLayer.appendChild(burst);
    window.setTimeout(() => burst.remove(), 760);
  };

  spawnFireworkBurst(20, 28);
  window.setTimeout(() => spawnFireworkBurst(50, 22), 120);
  window.setTimeout(() => spawnFireworkBurst(76, 30), 240);
  window.setTimeout(() => spawnFireworkBurst(35, 20), 360);
  window.setTimeout(() => spawnFireworkBurst(64, 24), 520);

  window.setTimeout(() => {
    kingdomSection.classList.remove("festival-live");
    kingdomFestivalLayer.innerHTML = "";
  }, 4200);
}

function triggerKingdomFestival() {
  const now = Date.now();
  if (state.kingdomFestivalReadyAt > now) {
    renderKingdom();
    return;
  }

  const reward = Math.max(25, Math.floor(state.kingdomPopulation * 1.8 + getKingdomIncomePerSecond() * 6));
  state.ducks += reward;
  state.totalDucksEarned += reward;
  state.kingdomFestivalReadyAt = now + KINGDOM_FESTIVAL_COOLDOWN_MS;
  playKingdomFestivalShow();

  updateStats();
  showFloatingGain(reward);
  maybeNotifyRankUp();
  renderUpgrades();
  renderSkins();
  renderRanks();
  renderKingdom();
  saveGame();
}

function playKingdomEntryAnimation() {
  if (!kingdomEntryFx) {
    return;
  }

  kingdomEntryFx.innerHTML = "";
  const wipeCount = 6;
  for (let index = 0; index < wipeCount; index += 1) {
    const panel = document.createElement("span");
    panel.className = "kingdom-wipe-panel";
    panel.style.left = `${index * 18}%`;
    panel.style.animationDelay = `${(index * 0.055).toFixed(2)}s`;
    panel.style.opacity = String(0.62 - index * 0.06);
    kingdomEntryFx.appendChild(panel);
  }

  window.setTimeout(() => {
    kingdomEntryFx.innerHTML = "";
  }, 860);
}

function setKingdomPageMode(isKingdomPage) {
  document.body.classList.toggle("kingdom-page-active", isKingdomPage);

  if (heroSection) {
    heroSection.hidden = isKingdomPage;
  }

  if (statsSection) {
    statsSection.hidden = isKingdomPage;
  }

  if (clickZoneSection) {
    clickZoneSection.hidden = isKingdomPage;
  }
}

function setVisibleSection(sectionId) {
  const allSections = [upgradesSection, skinsSection, ranksSection, kingdomSection];
  allSections.forEach((section) => {
    section.hidden = section.id !== sectionId;
  });

  const enteringKingdom = sectionId === "kingdomSection";
  setKingdomPageMode(enteringKingdom);

  if (enteringKingdom && lastVisibleSectionId !== "kingdomSection") {
    playKingdomEntryAnimation();
  }

  lastVisibleSectionId = sectionId;
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

  if (menuPanel && menuToggle) {
    const shouldOpenMenu = Boolean(step.openMenu);
    menuPanel.hidden = !shouldOpenMenu;
    menuToggle.setAttribute("aria-expanded", String(shouldOpenMenu));
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

  if (menuPanel && menuToggle) {
    menuPanel.hidden = true;
    menuToggle.setAttribute("aria-expanded", "false");
  }
}

function completeTutorial() {
  state.tutorialCompleted = true;
  saveGame();
  closeTutorial();
}

function setupSectionMenu() {
  function showHome() {
    setVisibleSection("");

    if (statsSection) {
      statsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      statsSection.classList.remove("section-flash");
      // Restart the animation each time Home is selected.
      void statsSection.offsetWidth;
      statsSection.classList.add("section-flash");
    }
  }

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

      if (targetId === "homeSection") {
        showHome();
        closeMenu();
        return;
      }

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
  secretRankAnnounced = state.secretRankUnlocked;
  ensureSaveBootstrap();
  applySkin();
  updateStats();
  renderUpgrades();
  renderSkins();
  renderRanks();
  renderKingdom();

  duckButton.addEventListener("click", () => {
    if (!state.hasPlayed) {
      state.hasPlayed = true;
    }

    const clickResult = getEffectiveClickGain();
    state.ducks += clickResult.gain;
    state.totalDucksEarned += clickResult.gain;
    updateStats();
    showFloatingGain(clickResult.gain);
    maybeNotifyRankUp();
    renderUpgrades();
    renderSkins();
    renderRanks();
    renderKingdom();
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

  if (kingdomFestivalButton) {
    kingdomFestivalButton.addEventListener("click", triggerKingdomFestival);
  }

  if (gameTitleEl) {
    gameTitleEl.addEventListener("click", triggerSecretEasterEgg);
  }

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
    const passiveGain = getEffectiveAutoPerSecond();
    if (passiveGain <= 0) {
      renderKingdom();
      return;
    }

    state.ducks += passiveGain;
    state.totalDucksEarned += passiveGain;
    updateStats();
    maybeNotifyRankUp();
    renderUpgrades();
    renderSkins();
    renderRanks();
    renderKingdom();
    saveGame();
  }, 1000);
}

setupGame();
