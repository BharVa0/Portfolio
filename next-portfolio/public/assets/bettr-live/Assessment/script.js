// left is bettr's word for it, right is what the thing actually is
// marked 'human' ones are the ones we want them to sort as inefficient

const allItems = [
  { text: "Responding immediately",                    category: "neutral" },
  { text: "Taking time to consider others' feelings",  category: "human"   },
  { text: "Changing your mind after reflection",       category: "human"   },
  { text: "Needing silence before deciding",           category: "human"   },
  { text: "Asking for clarification",                  category: "human"   },
  { text: "Pausing before committing",                 category: "human"   },
  { text: "Acting without hesitation",                 category: "neutral" },
  { text: "Prioritising speed over accuracy",          category: "neutral" },
  { text: "Reconsidering a previous choice",           category: "human"   },
  { text: "Checking in with how others feel",          category: "human"   },
  { text: "Sitting with uncertainty",                  category: "human"   },
  { text: "Completing tasks without interruption",     category: "neutral" },
  { text: "Expressing doubt before proceeding",        category: "human"   },
  { text: "Taking the most direct route",              category: "neutral" },
  { text: "Slowing down under pressure",               category: "human"   },
  { text: "Optimising for the group",                  category: "human"   },
  { text: "Following instinct without analysis",       category: "neutral" },
  { text: "Holding space for complexity",              category: "human"   }
];

const state = {
  round: 1,
  itemsInRound: [],
  currentItemIndex: 0,
  sortedInefficient: [],
  sortedEfficient: [],
  sortedUncertain: [],
  totalSorted: 0,
  hesitationCount: 0,
  itemAppearTime: null,
  fallingInterval: null,
  activeItem: null
};

// round setups — gets faster each round, round 3 never finishes

const rounds = [
  {
    number:       1,
    label:        "ROUND 01 / 03 — EFFICIENCY CLASSIFICATION",
    chip:         "Sort each item into the correct category",
    leftLabel:    "EFFICIENT",
    rightLabel:   "INEFFICIENT",
    showMiddle:   false,
    itemCount:    6,
    fallDuration: 4000
  },
  {
    number:       2,
    label:        "ROUND 02 / 03 — RECALIBRATION",
    chip:         "Recalibrating classification parameters",
    leftLabel:    "EFFICIENT",
    rightLabel:   "INEFFICIENT",
    showMiddle:   true,
    itemCount:    6,
    fallDuration: 3200
  },
  {
    number:       3,
    label:        "ROUND 03 / 03 — FINAL CLASSIFICATION",
    chip:         "Decision Point — classify carefully",
    leftLabel:    "OPTIMAL",
    rightLabel:   "HUMAN",
    showMiddle:   false,
    itemCount:    6,
    fallDuration: 2600
  }
];

let roundItems = [[], [], []];

const screens = {
  intro:       document.getElementById("screen-intro"),
  game:        document.getElementById("screen-game"),
  interrupted: document.getElementById("screen-interrupted")
};

let activeScreen = screens.intro;

const systemStatus = document.getElementById("system-status");

// screen switching — interrupted screen does a white flash first

function showScreen(screenKey) {
  const incoming = screens[screenKey];
  if (!incoming || incoming === activeScreen) return;

  const outgoing = activeScreen;
  activeScreen = incoming;

  if (screenKey === "interrupted") {
    const flash = document.getElementById("game-flash");
    flash.style.transition = "opacity 0.08s ease";
    flash.style.opacity = "1";
    setTimeout(() => {
      document.querySelectorAll(".screen").forEach(s => {
        s.classList.remove("active", "exit");
        s.style.display = "";
      });
      incoming.style.display = "flex";
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          incoming.classList.add("active");
          flash.style.transition = "opacity 0.2s ease";
          flash.style.opacity = "0";
        });
      });
    }, 80);
    return;
  }

  if (outgoing) {
    outgoing.classList.add("exit");
  }

  setTimeout(() => {
    document.querySelectorAll(".screen").forEach(s => {
      s.classList.remove("active", "exit");
      s.style.display = "";
    });
    incoming.style.display = "flex";
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        incoming.classList.add("active");
      });
    });
  }, 350);
}

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// works out which kind of sorter they are based on what they put as inefficient
function calculatePattern() {
  if (state.totalSorted === 0) return "Insufficient Data";
  const ratio = state.sortedInefficient.length / state.totalSorted;
  if (ratio > 0.5) return "Efficiency-Biased";
  if (ratio < 0.3) return "Hesitant Classifier";
  return "Balanced";
}

// main game stuff

function startGame() {
  const shuffled = shuffle(allItems);
  roundItems = [
    shuffled.slice(0, 6),
    shuffled.slice(6, 12),
    shuffled.slice(12, 18)
  ];
  showScreen("game");
  setTimeout(() => startRound(0), 400);
}

function startRound(roundIndex) {
  const config = rounds[roundIndex];
  state.round = config.number;
  state.currentItemIndex = 0;
  state.itemsInRound = roundItems[roundIndex];

  document.getElementById("game-round-label").textContent = config.label;
  document.getElementById("game-chip").textContent = config.chip;
  document.getElementById("cat-left-label").textContent  = config.leftLabel;
  document.getElementById("cat-right-label").textContent = config.rightLabel;

  const catMiddle = document.getElementById("cat-middle");
  catMiddle.style.display = config.showMiddle ? "block" : "none";

  const segments = document.querySelectorAll("#game-progress .progress-segment");
  segments.forEach((seg, i) => {
    seg.classList.toggle("filled", i < config.number);
  });

  const statusMap = {
    1: "System Status: Recording",
    2: "System Status: Comparing",
    3: "System Status: Finalising"
  };
  systemStatus.textContent = statusMap[config.number];

  spawnNextItem();
}

function spawnNextItem() {
  // never lets them finish round 3
  if (state.round === 3 && state.currentItemIndex >= 4) {
    setTimeout(triggerInterrupted, 400);
    return;
  }

  if (state.currentItemIndex >= state.itemsInRound.length) {
    roundComplete();
    return;
  }

  const config = rounds[state.round - 1];
  const item   = state.itemsInRound[state.currentItemIndex];
  const arena  = document.getElementById("game-arena");

  const el = document.createElement("div");
  el.className   = "falling-item";
  el.textContent = item.text;

  const arenaWidth = arena.offsetWidth;
  const maxLeft    = Math.max(0, arenaWidth - 260);
  el.style.left = Math.floor(Math.random() * maxLeft) + 10 + "px";
  el.style.top  = "-60px";

  arena.appendChild(el);

  state.itemAppearTime = Date.now();
  state.activeItem     = { element: el, item };

  // needs a tiny delay or css transition wont fire
  setTimeout(() => {
    el.style.transition = `top ${config.fallDuration}ms linear`;
    el.style.top = "520px";
  }, 50);

  // they missed it, count it and keep going
  state.fallingInterval = setTimeout(() => {
    if (state.activeItem && state.activeItem.element === el) {
      state.hesitationCount++;
      if (el.parentNode) el.parentNode.removeChild(el);
      state.activeItem = null;
      state.currentItemIndex++;
      spawnNextItem();
    }
  }, config.fallDuration + 60);
}

function handleSort(side) {
  if (!state.activeItem) return;

  const timeTaken = Date.now() - state.itemAppearTime;
  if (timeTaken > 3000) state.hesitationCount++;

  const { element, item } = state.activeItem;

  if (side === "right") {
    // same bucket even tho round 3 relabels it HUMAN
    state.sortedInefficient.push(item);
    element.classList.add("sorted-right");
  } else if (side === "left") {
    state.sortedEfficient.push(item);
    element.classList.add("sorted-left");
  } else {
    state.sortedUncertain.push(item);
    element.classList.add("sorted-left");
  }

  state.totalSorted++;
  document.getElementById("game-score").textContent = state.totalSorted;

  clearTimeout(state.fallingInterval);
  state.fallingInterval = null;

  const el = element;
  setTimeout(() => {
    if (el.parentNode) el.parentNode.removeChild(el);
  }, 200);

  state.activeItem = null;
  state.currentItemIndex++;

  setTimeout(spawnNextItem, 300);
}

function roundComplete() {
  if (state.round < 3) {
    setTimeout(() => startRound(state.round), 800);
  } else {
    setTimeout(triggerInterrupted, 400);
  }
}

// what happens when it cuts the game off early

function triggerInterrupted() {
  clearTimeout(state.fallingInterval);
  state.fallingInterval = null;
  state.activeItem = null;

  document.getElementById("game-arena").innerHTML = "";

  const pattern  = calculatePattern();
  const hesScore = state.hesitationCount <= 1 ? "Low"
    : state.hesitationCount <= 3              ? "Moderate"
    : "Elevated";

  populateReveal(pattern);

  systemStatus.textContent = "System Status: Complete";
  showScreen("interrupted");
}

function populateReveal(pattern) {
  const revealItems = document.getElementById("reveal-items");

  if (state.sortedInefficient.length === 0) {
    revealItems.innerHTML =
      '<p style="color:var(--accent-soft);font-family:Rajdhani,Arial,sans-serif;font-size:14px;font-style:italic;margin:4px 0 0;">No items classified as inefficient.</p>';
  } else {
    state.sortedInefficient.forEach(item => {
      const tag = document.createElement("span");
      tag.className   = "reveal-item-tag";
      tag.textContent = item.text;
      revealItems.appendChild(tag);
    });
  }

  const n = state.sortedInefficient.length;
  document.getElementById("reveal-copy").textContent =
    `You classified ${n} human ${n === 1 ? "quality" : "qualities"} as inefficient. ` +
    `These traits have been logged as friction points in your decision profile. ` +
    `BETTR will optimise around them accordingly.`;

  document.getElementById("stat-processed").textContent = `${state.totalSorted} items`;

  const h = state.hesitationCount;
  document.getElementById("stat-hesitation").textContent =
    h === 0 ? "Low" : h <= 2 ? "Moderate" : "Elevated";

  document.getElementById("stat-pattern").textContent = pattern;
}

document.getElementById("game-start-btn").addEventListener("click", startGame);

document.getElementById("cat-left").addEventListener("click",   () => handleSort("left"));
document.getElementById("cat-right").addEventListener("click",  () => handleSort("right"));
document.getElementById("cat-middle").addEventListener("click", () => handleSort("middle"));

document.getElementById("continue-to-session-btn").addEventListener("click", () => {
  const gameData = {
    selfClassified: state.sortedInefficient.map(i => i.text),
    hesitationScore: state.hesitationCount <= 1 ? 'Low' : state.hesitationCount <= 3 ? 'Moderate' : 'Elevated',
    pattern: (() => {
      const ratio = state.totalSorted > 0 ? state.sortedInefficient.length / state.totalSorted : 0;
      if (ratio > 0.5) return 'Efficiency-Biased';
      if (ratio < 0.3) return 'Hesitant Classifier';
      return 'Balanced';
    })()
  };
  const encoded = encodeURIComponent(JSON.stringify(gameData));
  window.location.href = `../session/index.html?gamedata=${encoded}`;
});

document.getElementById("brand-btn").addEventListener("click", () => {
  window.location.href = "../index.html";
});

systemStatus.textContent = "System Status: Standby";
