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
    baseCost: 165,
    type: "click",
    basePower: 3,
    level: 0,
  },
  {
    id: "feather-frenzy",
    name: "Feather Frenzy",
    description: "",
    baseCost: 260,
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
    baseCost: 260,
    type: "auto",
    basePower: 2,
    level: 0,
  },
  {
    id: "quack-assembler",
    name: "Quack Assembler",
    description: "",
    baseCost: 520,
    type: "auto",
    basePower: 4,
    level: 0,
  },
  {
    id: "flock-reactor",
    name: "Flock Reactor",
    description: "",
    baseCost: 980,
    type: "auto",
    basePower: 7,
    level: 0,
  },
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
    id: "royal-plume",
    name: "Royal Plume",
    description: "A premium golden-blue prestige style.",
    cost: 10000,
    unlocked: false,
  },
];

const state = {
  ducks: 0,
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

function showFloatingGain(value) {
  const text = document.createElement("span");
  text.className = "float-text";
  text.textContent = `+${formatNumber(value)} ducks`;
  floatingAnchor.appendChild(text);
  window.setTimeout(() => text.remove(), 640);
}

function applySkin() {
  duckButton.dataset.skin = state.selectedSkin;

  const skinThemes = {
    "golden-fluff": {
      bg: "radial-gradient(circle at 25% 20%, #fff4b5 0%, #ffd95f 42%, #f0b400 100%)",
      edge: "#c78400",
      text: "#713f00",
    },
    "sunset-splash": {
      bg: "radial-gradient(circle at 25% 20%, #ffe0a5 0%, #ffb86f 45%, #e88921 100%)",
      edge: "#af5a00",
      text: "#6a3300",
    },
    "mint-quack": {
      bg: "radial-gradient(circle at 25% 20%, #eaffdc 0%, #9debc0 42%, #56be8b 100%)",
      edge: "#2f8b63",
      text: "#1f5a41",
    },
    "berry-bubble": {
      bg: "radial-gradient(circle at 25% 20%, #ffd9f4 0%, #ff91c5 44%, #ca4f8e 100%)",
      edge: "#9f3668",
      text: "#66233f",
    },
    "ocean-glide": {
      bg: "radial-gradient(circle at 25% 20%, #d6fff4 0%, #66e6ca 45%, #1e9f87 100%)",
      edge: "#147a69",
      text: "#0f4f45",
    },
    "lava-quack": {
      bg: "radial-gradient(circle at 25% 20%, #ffd8b0 0%, #ff8d5c 45%, #cf3f1f 100%)",
      edge: "#9d2b12",
      text: "#5f1f0f",
    },
    "midnight-feather": {
      bg: "radial-gradient(circle at 25% 20%, #d2d8ff 0%, #6d74bf 45%, #2b2a4b 100%)",
      edge: "#1e1d38",
      text: "#f4f4ff",
    },
    "cotton-cloud": {
      bg: "radial-gradient(circle at 25% 20%, #ffffff 0%, #ffd7ea 45%, #ffc2a8 100%)",
      edge: "#d18a75",
      text: "#763a30",
    },
    "royal-plume": {
      bg: "radial-gradient(circle at 25% 20%, #f8f1bf 0%, #8db8ff 45%, #3c4ca8 100%)",
      edge: "#2a387f",
      text: "#f8f2cc",
    },
  };

  const theme = skinThemes[state.selectedSkin] || skinThemes["golden-fluff"];
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
  const allSections = [upgradesSection, skinsSection];
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
  ensureSaveBootstrap();
  applySkin();
  updateStats();
  renderUpgrades();
  renderSkins();

  duckButton.addEventListener("click", () => {
    if (!state.hasPlayed) {
      state.hasPlayed = true;
    }

    state.ducks += state.ducksPerClick;
    updateStats();
    showFloatingGain(state.ducksPerClick);
    renderUpgrades();
    renderSkins();
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
    updateStats();
    renderUpgrades();
    renderSkins();
    saveGame();
  }, 1000);
}

setupGame();
