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
const closeTutorialButton = document.getElementById("closeTutorialButton");
const menuToggle = document.getElementById("menuToggle");
const menuPanel = document.getElementById("menuPanel");
const upgradesSection = document.getElementById("upgradesSection");
const skinsSection = document.getElementById("skinsSection");

const storageKey = "silly-ducks-save-v1";

const upgrades = [
  {
    id: "beak-tier",
    name: "Beak Tier Boost",
    description: "",
    baseCost: 25,
    type: "click",
    basePower: 1,
    level: 0,
  },
  {
    id: "quack-tier",
    name: "Quack Tier Boost",
    description: "",
    baseCost: 120,
    type: "click",
    basePower: 4,
    level: 0,
  },
  {
    id: "pond-tier",
    name: "Pond Tier Engine",
    description: "",
    baseCost: 140,
    type: "auto",
    basePower: 1,
    level: 0,
  },
  {
    id: "factory-tier",
    name: "Factory Tier Engine",
    description: "",
    baseCost: 420,
    type: "auto",
    basePower: 6,
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
];

const state = {
  ducks: 0,
  ducksPerClick: 1,
  autoPerSecond: 0,
  selectedSkin: "golden-fluff",
};

function formatNumber(value) {
  return Math.floor(value).toLocaleString();
}

function getUpgradeCost(upgrade) {
  return Math.floor(upgrade.baseCost * Math.pow(3.2, upgrade.level));
}

function getUpgradePower(upgrade) {
  return upgrade.basePower * Math.pow(10, upgrade.level);
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

  if (state.selectedSkin === "sunset-splash") {
    duckButton.style.background = "radial-gradient(circle at 25% 20%, #ffe0a5 0%, #ffb86f 45%, #e88921 100%)";
  } else if (state.selectedSkin === "mint-quack") {
    duckButton.style.background = "radial-gradient(circle at 25% 20%, #eaffdc 0%, #9debc0 42%, #56be8b 100%)";
  } else {
    duckButton.style.background = "radial-gradient(circle at 25% 20%, #fff4b5 0%, #ffd95f 42%, #f0b400 100%)";
  }
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
    const tierGain = getUpgradePower(upgrade);

    nameEl.textContent = upgrade.name;
    if (upgrade.type === "click") {
      descEl.textContent = `Next tier: +${formatNumber(tierGain)} ducks/click (10x each tier)`;
    } else {
      descEl.textContent = `Next tier: +${formatNumber(tierGain)} auto ducks/sec (10x each tier)`;
    }
    levelEl.textContent = String(upgrade.level);
    costEl.textContent = formatNumber(currentCost);

    buyButton.disabled = state.ducks < currentCost;
    buyButton.addEventListener("click", () => {
      if (state.ducks < currentCost) {
        return;
      }

      state.ducks -= currentCost;
      const purchasedPower = getUpgradePower(upgrade);
      upgrade.level += 1;

      if (upgrade.type === "click") {
        state.ducksPerClick += purchasedPower;
      } else {
        state.autoPerSecond += purchasedPower;
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

function openTutorial() {
  tutorialOverlay.setAttribute("aria-hidden", "false");
}

function closeTutorial() {
  tutorialOverlay.setAttribute("aria-hidden", "true");
}

function setupSectionMenu() {
  const allSections = [upgradesSection, skinsSection];

  function showSection(sectionToShow) {
    allSections.forEach((section) => {
      section.hidden = section !== sectionToShow;
    });

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
  applySkin();
  updateStats();
  renderUpgrades();
  renderSkins();

  duckButton.addEventListener("click", () => {
    state.ducks += state.ducksPerClick;
    updateStats();
    showFloatingGain(state.ducksPerClick);
    renderUpgrades();
    renderSkins();
    saveGame();
  });

  tutorialButton.addEventListener("click", openTutorial);
  closeTutorialButton.addEventListener("click", closeTutorial);

  tutorialOverlay.addEventListener("click", (event) => {
    if (event.target === tutorialOverlay) {
      closeTutorial();
    }
  });

  setupSectionMenu();

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
