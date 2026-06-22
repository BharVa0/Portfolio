function getGameData() {
  try {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get('gamedata');
    return raw ? JSON.parse(decodeURIComponent(raw)) : null;
  } catch(e) {
    return null;
  }
}

const screens = {
  q1: document.getElementById("screen-q1"),
  q2: document.getElementById("screen-q2"),
  input: document.getElementById("screen-input"),
  latency: document.getElementById("screen-latency"),
  progress: document.getElementById("screen-progress"),
  takeover: document.getElementById("screen-takeover"),
  aggregate: document.getElementById("screen-aggregate"),
  dashboard: document.getElementById("screen-dashboard")
};

const state = {
  q1: "",
  q2: "",
  q3: "",
  userInput: "",
  timer: null,
  timerDuration: 8,
  timerRemaining: 8
};

let autonomyTimer = null;

const toDashboardBtn = document.getElementById("to-dashboard-btn");
const restartBtn = document.getElementById("restart-btn");
const brandBtn = document.getElementById("brand-btn");
const systemStatus = document.getElementById("system-status");
const flashOverlay = document.getElementById("flash-overlay");

const timerSeconds = document.getElementById("timer-seconds");
const timerFill = document.getElementById("timer-fill");
const latencyHelper = document.getElementById("latency-helper");

const summaryQ1 = document.getElementById("summary-q1");
const summaryQ2 = document.getElementById("summary-q2");
const summaryQ3 = document.getElementById("summary-q3");

let activeScreen = screens.q1;

function showScreen(screenKey) {
  const incoming = screens[screenKey];
  if (!incoming || incoming === activeScreen) return;

  const outgoing = activeScreen;
  activeScreen = incoming;

  if (screenKey === "takeover") {
    const flash = document.getElementById("takeover-flash");
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

function clearTimer() {
  if (state.timer) {
    clearInterval(state.timer);
    state.timer = null;
  }
}

function beginLatencyTimer(duration = 8) {
  clearTimer();

  state.timerDuration = duration;
  state.timerRemaining = duration;
  timerSeconds.textContent = state.timerRemaining;
  timerFill.style.width = "100%";
  timerFill.style.background = "rgba(255,255,255,0.7)";
  timerFill.style.boxShadow = "";
  latencyHelper.textContent = "Delayed input reduces decision efficiency.";

  state.timer = setInterval(() => {
    state.timerRemaining -= 1;

    if (state.timerRemaining < 0) {
      clearTimer();
      autoResolveLatency();
      return;
    }

    timerSeconds.textContent = state.timerRemaining;
    const percent = (state.timerRemaining / state.timerDuration) * 100;
    timerFill.style.width = `${percent}%`;

    if (state.timerRemaining === 5) {
      timerFill.style.background = "#eab308";
      timerFill.style.boxShadow = "";
      latencyHelper.textContent = "Hesitation pattern detected. Monitoring response threshold.";
    } else if (state.timerRemaining === 3) {
      timerFill.style.background = "#ef4444";
      timerFill.style.boxShadow = "";
      latencyHelper.textContent = "Efficiency threshold approaching. Intervention being prepared.";
    } else if (state.timerRemaining === 1) {
      timerFill.style.background = "#eb5160";
      timerFill.style.boxShadow = "0 0 12px rgba(235,81,96,0.6)";
      latencyHelper.textContent = "System preparing to intervene.";
    }
  }, 1000);
}

function autoResolveLatency() {
  state.q3 = "Decide when I delay";
  latencyHelper.textContent = "Latency threshold exceeded. BETTR has selected an automated resolution path.";
  systemStatus.textContent = "System Status: Escalating";

  setTimeout(() => {
    showScreen("progress");
  }, 1200);
}

function updateQ2Title() {
  const q2Title = document.getElementById("q2-title");

  if (state.q1) {
    q2Title.textContent = `When ${state.q1.toLowerCase()} appears, what usually causes hesitation?`;
  }
}

function animateMetricCards() {
  document.querySelectorAll('.metric-card').forEach((card, index) => {
    card.classList.remove('card-animate');
    void card.offsetWidth;
    card.style.animationDelay = `${400 + index * 120}ms`;
    card.classList.add('card-animate');
  });
}

function animateAutonomyCounter() {
  if (autonomyTimer) {
    clearInterval(autonomyTimer);
    autonomyTimer = null;
  }

  let valueEl = null;
  for (const card of document.querySelectorAll('.metric-card')) {
    const title = card.querySelector('.metric-title');
    if (title && title.textContent.trim() === 'Autonomy Residual') {
      valueEl = card.querySelector('.metric-value');
      break;
    }
  }
  if (!valueEl) return;

  const start = 100;
  const end = 12;
  const steps = 2500 / 50;
  let step = 0;

  valueEl.textContent = `${start}%`;

  autonomyTimer = setInterval(() => {
    step++;
    const t = Math.min(step / steps, 1);
    const eased = 1 - Math.pow(1 - t, 2);
    const value = Math.round(start + (end - start) * eased);
    valueEl.textContent = `${value}%`;
    if (step >= steps) {
      clearInterval(autonomyTimer);
      autonomyTimer = null;
      valueEl.textContent = `${end}%`;
    }
  }, 50);
}

function generateDotGrid() {
  const grid = document.getElementById("dot-grid");
  grid.innerHTML = "";
  const total = 600;
  const highlighted = Math.floor(Math.random() * total);
  for (let i = 0; i < total; i++) {
    const dot = document.createElement("div");
    dot.className = i === highlighted ? "dot highlighted" : "dot";
    grid.appendChild(dot);
  }
}

function fillSummary() {
  summaryQ1.textContent = state.q1 || "Not recorded";
  summaryQ2.textContent = state.q2 || "Not recorded";
  summaryQ3.textContent = state.q3 || "Autonomous";

  const quoteEl = document.getElementById("self-report-quote");
  const analysisEl = document.getElementById("self-report-analysis");

  if (state.userInput) {
    quoteEl.textContent = state.userInput;
    analysisEl.textContent = "Pattern classification: Retrospective friction. Source: post-decision uncertainty. Recommended intervention: automated selection for future comparable choices.";
  } else {
    quoteEl.textContent = "No self-report provided.";
    analysisEl.textContent = "Insufficient data for pattern classification.";
  }

  const gameData = getGameData();
  const gameDataPanel = document.getElementById("game-data-panel");

  if (gameData) {
    const gameClassifiedItems = document.getElementById("game-classified-items");
    gameClassifiedItems.innerHTML = "";
    if (gameData.selfClassified && gameData.selfClassified.length > 0) {
      gameData.selfClassified.forEach(text => {
        const tag = document.createElement("span");
        tag.className = "reveal-item-tag";
        tag.textContent = text;
        gameClassifiedItems.appendChild(tag);
      });
    } else {
      gameClassifiedItems.textContent = "None recorded.";
    }
    document.getElementById("game-hesitation-val").textContent = gameData.hesitationScore;
    document.getElementById("game-pattern-val").textContent = gameData.pattern;
    gameDataPanel.classList.remove("hidden");
  }

  document.getElementById("to-final-btn").classList.remove("hidden");
}

brandBtn.addEventListener("click", () => {
  clearTimer();
  state.q1 = "";
  state.q2 = "";
  state.q3 = "";
  state.userInput = "";
  document.getElementById("user-input-field").value = "";
  latencyHelper.textContent = "Your response time is being measured. Longer delays lower the model's confidence in your input.";
  document.querySelectorAll(".option-btn").forEach((btn) => {
    btn.classList.remove("selected");
  });
  window.location.href = "../index.html";
});

document.getElementById("to-aggregate-btn").addEventListener("click", () => {
  generateDotGrid();
  showScreen("aggregate");
  systemStatus.textContent = "System Status: Classifying";
});

toDashboardBtn.addEventListener("click", () => {
  fillSummary();
  animateMetricCards();
  animateAutonomyCounter();
  showScreen("dashboard");
  systemStatus.textContent = "System Status: Profiled";
});

document.getElementById("to-final-btn").addEventListener("click", () => {
  const params = new URLSearchParams(window.location.search);
  const gamedata = params.get('gamedata');
  const url = gamedata ? `../final/index.html?gamedata=${gamedata}` : '../final/index.html';
  window.location.href = url;
});

restartBtn.addEventListener("click", () => {
  clearTimer();
  state.q1 = "";
  state.q2 = "";
  state.q3 = "";
  state.userInput = "";
  document.getElementById("user-input-field").value = "";
  latencyHelper.textContent = "Your response time is being measured. Longer delays lower the model's confidence in your input.";
  systemStatus.textContent = "System Status: Active";

  document.querySelectorAll(".option-btn").forEach((btn) => {
    btn.classList.remove("selected");
  });

  window.location.href = "../index.html";
});

document.querySelectorAll(".option-btn[data-question='q1']").forEach((btn) => {
  btn.addEventListener("click", () => {
    state.q1 = btn.dataset.value;
    systemStatus.textContent = "System Status: Learning";
    updateQ2Title();
    showScreen("q2");
  });
});

document.querySelectorAll(".option-btn[data-question='q2']").forEach((btn) => {
  btn.addEventListener("click", () => {
    state.q2 = btn.dataset.value;
    systemStatus.textContent = "System Status: Recording";
    showScreen("input");
  });
});

document.getElementById("input-continue-btn").addEventListener("click", () => {
  state.userInput = document.getElementById("user-input-field").value.trim();
  systemStatus.textContent = "System Status: Calibrating";
  showScreen("latency");
  beginLatencyTimer(8);
});

document.querySelectorAll(".latency-option").forEach((btn) => {
  btn.addEventListener("click", () => {
    clearTimer();
    state.q3 = btn.dataset.value;

    if (state.q3 === "Keep full control") {
      latencyHelper.textContent = "Override request noted. Manual control decreases optimisation reliability.";
      systemStatus.textContent = "System Status: Escalating";
      setTimeout(() => {
        showScreen("progress");
      }, 1000);
      return;
    }

    if (state.q3 === "Suggest only") {
      latencyHelper.textContent = "Manual mode retained. System authority will remain advisory.";
    }

    if (state.q3 === "Decide when I delay") {
      latencyHelper.textContent = "Adaptive intervention enabled.";
    }

    setTimeout(() => {
      showScreen("progress");
    }, 900);
  });
});

document.getElementById("progress-proceed-btn").addEventListener("click", () => {
  showScreen("takeover");
  systemStatus.textContent = "System Status: Autonomous";
});

// shape breathes, looks nice
gsap.to(".shape", {
  scale: 1.04,
  duration: 2.8,
  ease: "sine.inOut",
  repeat: -1,
  yoyo: true,
  stagger: 0.5
});

systemStatus.textContent = "System Status: Listening";
