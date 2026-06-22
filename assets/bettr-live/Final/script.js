// left is bettr's label, right is what it actually is

const reframings = [
  { left: "Hesitation",            right: "Consideration" },
  { left: "Inefficiency",          right: "Care"          },
  { left: "Cognitive Friction",    right: "Conscience"    },
  { left: "Latency",               right: "Thought"       },
  { left: "Emotional Variability", right: "Humanity"      },
  { left: "Decision Resistance",   right: "Integrity"     },
  { left: "Autonomy Residual",     right: "You"           }
];

// background drone, low frequency, hopefully a bit unsettling

function startAmbientSound() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);
  oscillator.frequency.setValueAtTime(55, ctx.currentTime);
  oscillator.type = 'sine';
  gainNode.gain.setValueAtTime(0, ctx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 4);
  oscillator.start();
  return { ctx, oscillator, gainNode };
}

let audioRef = null;

const rowPairs = [];

function buildSplitScreen() {
  const splitLeft  = document.getElementById('split-left');
  const splitRight = document.getElementById('split-right');

  const leftLabel = document.createElement('div');
  leftLabel.className = 'split-label left';
  leftLabel.textContent = 'BETTR CLASSIFICATION';
  splitLeft.appendChild(leftLabel);

  const rightLabel = document.createElement('div');
  rightLabel.className = 'split-label right';
  rightLabel.textContent = 'WHAT YOU ACTUALLY ARE';
  splitRight.appendChild(rightLabel);

  reframings.forEach(item => {
    const leftRow = document.createElement('div');
    leftRow.className = 'left-row';
    leftRow.textContent = item.left;
    splitLeft.appendChild(leftRow);

    const rightRow = document.createElement('div');
    rightRow.className = 'right-row';
    rightRow.textContent = item.right;
    splitRight.appendChild(rightRow);

    rowPairs.push({ left: leftRow, right: rightRow });
  });
}

function runFinalMessage() {
  const msg1    = document.getElementById('msg-1');
  const msg2g   = document.getElementById('msg-2-group');
  const msgIntr = document.getElementById('msg-interactive');
  const msgResp = document.getElementById('msg-response');
  const msg3g   = document.getElementById('msg-3-group');
  const msgLast = document.getElementById('msg-last');

  const gameData = (() => {
    try { return JSON.parse(sessionStorage.getItem('bettr_game')) || {}; } catch { return {}; }
  })();

  // the three lines about what they just did
  const msg2Lines = [
    "You sorted human qualities into efficiency categories.",
    "You answered questions about your hesitation.",
    "You gave a system your patterns, your words, your pace."
  ];

  // critique lines — appear after they pick one of the tags
  const msg3Lines = [
    "BETTR is not a warning about the future.",
    "Systems like this already exist.",
    "Every app that learns your habits.",
    "Every platform that measures your hesitation.",
    "Every interface designed to reduce your friction."
  ];

  const finalMessage = document.getElementById('final-message');
  finalMessage.style.opacity = '1';

  msg1.textContent = "You just spent the last few minutes being profiled.";
  setTimeout(() => msg1.classList.add('visible'), 200);

  msg2Lines.forEach((line, i) => {
    const p = document.createElement('p');
    p.textContent = line;
    msg2g.appendChild(p);
    setTimeout(() => p.classList.add('visible'), 1000 + i * 700);
  });

  // show the tags after the action lines come in
  const interactiveDelay = 1000 + msg2Lines.length * 700 + 400;
  setTimeout(() => {
    msgIntr.style.display = 'flex';
    setTimeout(() => { msgIntr.style.opacity = '1'; }, 30);

    let choiceMade = false;
    document.querySelectorAll('.choice-tag').forEach(tag => {
      tag.addEventListener('click', () => {
        if (choiceMade) return;
        choiceMade = true;

        document.querySelectorAll('.choice-tag').forEach(t => t.classList.remove('selected'));
        tag.classList.add('selected');

        msgResp.textContent = "Yes. Exactly that.";
        setTimeout(() => msgResp.classList.add('visible'), 200);

        // clear just in case it ran twice somehow
        msg3g.innerHTML = '';
        const msg3Start = 1200;
        msg3Lines.forEach((line, i) => {
          const p = document.createElement('p');
          p.textContent = line;
          msg3g.appendChild(p);
          setTimeout(() => p.classList.add('visible'), msg3Start + i * 700);
        });

        // final line then the buttons show up
        const lastDelay = msg3Start + msg3Lines.length * 700 + 600;
        setTimeout(() => {
          msgLast.textContent = "Optimisation is not neutral. And neither was this.";
          msgLast.classList.add('visible');
        }, lastDelay);

        setTimeout(() => {
          document.getElementById('final-actions').style.opacity = '1';
        }, lastDelay + 1200);
      });
    });
  }, interactiveDelay);
}

function animateSequence() {
  const INITIAL_DELAY   = 600;
  const LEFT_RIGHT_GAP  = 400;
  const PAIR_INTERVAL   = 1100;

  // rows come in one by one
  rowPairs.forEach((pair, i) => {
    const leftDelay  = INITIAL_DELAY + i * PAIR_INTERVAL;
    const rightDelay = leftDelay + LEFT_RIGHT_GAP;
    setTimeout(() => { pair.left.style.opacity = '1';  pair.left.style.transform  = 'translateY(0)'; }, leftDelay  + 50);
    setTimeout(() => { pair.right.style.opacity = '1'; pair.right.style.transform = 'translateY(0)'; }, rightDelay + 50);
  });

  const lastRightDelay   = INITIAL_DELAY + (rowPairs.length - 1) * PAIR_INTERVAL + LEFT_RIGHT_GAP;
  const endSequenceStart = lastRightDelay + 2000;

  setTimeout(() => {
    const splitLeft  = document.getElementById('split-left');
    const splitRight = document.getElementById('split-right');

    // left side fades
    splitLeft.style.transition = 'opacity 3s ease';
    splitLeft.style.opacity    = '0';

    // right fills the space
    setTimeout(() => {
      splitRight.style.transition  = 'all 2s ease';
      splitRight.style.gridColumn  = '1 / -1';
    }, 1500);

    // show the message bit after left goes away
    setTimeout(() => {
      if (audioRef) {
        audioRef.oscillator.frequency.linearRampToValueAtTime(62, audioRef.ctx.currentTime + 3);
        audioRef.gainNode.gain.linearRampToValueAtTime(0.02, audioRef.ctx.currentTime + 4);
      }
      runFinalMessage();
    }, 3800);

    setTimeout(() => {
      if (audioRef) {
        audioRef.gainNode.gain.linearRampToValueAtTime(0, audioRef.ctx.currentTime + 6);
      }
    }, 6300);

  }, endSequenceStart);
}

document.getElementById('btn-restart').addEventListener('click', () => {
  window.location.href = '../index.html';
});

document.getElementById('btn-leave').addEventListener('click', () => {
  const leaveScreen = document.getElementById('leave-screen');

  // bring up the leave screen
  leaveScreen.style.display = 'flex';
  requestAnimationFrame(() => {
    leaveScreen.style.opacity = '1';
  });

  // cut the old audio
  if (audioRef) {
    try {
      audioRef.gainNode.gain.linearRampToValueAtTime(0, audioRef.ctx.currentTime + 3);
    } catch(e) {}
  }

  // softer tone for this bit
  let leaveAudio;
  try {
    const ctx2 = new (window.AudioContext || window.webkitAudioContext)();
    const osc2 = ctx2.createOscillator();
    const gain2 = ctx2.createGain();
    osc2.connect(gain2);
    gain2.connect(ctx2.destination);
    osc2.frequency.setValueAtTime(48, ctx2.currentTime);
    osc2.type = 'sine';
    gain2.gain.setValueAtTime(0, ctx2.currentTime);
    gain2.gain.linearRampToValueAtTime(0.03, ctx2.currentTime + 3);
    osc2.start();
    leaveAudio = { ctx: ctx2, osc: osc2, gain: gain2 };
  } catch(e) {}

  const lv0    = document.getElementById('lv-0');
  const lvg1   = document.getElementById('lv-group-1');
  const lvg2   = document.getElementById('lv-group-2');
  const lvg3   = document.getElementById('lv-group-3');
  const lvLast = document.getElementById('lv-last');

  setTimeout(() => {
    lv0.textContent = 'Before you go.';
    lv0.classList.add('visible');
  }, 800);

  const g1Lines = [
    'The version of you that hesitates before deciding —',
    'that changes their mind after reflection —',
    'that needs silence before committing —'
  ];
  g1Lines.forEach((text, i) => {
    setTimeout(() => {
      const p = document.createElement('p');
      p.textContent = text;
      lvg1.appendChild(p);
      requestAnimationFrame(() => requestAnimationFrame(() => p.classList.add('visible')));
    }, 2000 + (i * 1000));
  });

  const g2Lines = [
    'That is not a flaw in your system.',
    'That is your system working.'
  ];
  g2Lines.forEach((text, i) => {
    setTimeout(() => {
      const p = document.createElement('p');
      p.textContent = text;
      lvg2.appendChild(p);
      requestAnimationFrame(() => requestAnimationFrame(() => p.classList.add('visible')));
    }, 5500 + (i * 1100));
  });

  const g3Lines = [
    'But friction is often just care.',
    'Hesitation is often just thought.',
    'And slowness is sometimes the most human thing you can do.'
  ];
  g3Lines.forEach((text, i) => {
    setTimeout(() => {
      const p = document.createElement('p');
      p.textContent = text;
      lvg3.appendChild(p);
      requestAnimationFrame(() => requestAnimationFrame(() => p.classList.add('visible')));
    }, 8500 + (i * 1200));
  });

  // last thing they see
  setTimeout(() => {
    lvLast.textContent = 'Protect that.';
    lvLast.classList.add('visible');
  }, 13500);

  setTimeout(() => {
    if (leaveAudio) {
      try {
        leaveAudio.gain.linearRampToValueAtTime(0, leaveAudio.ctx.currentTime + 4);
      } catch(e) {}
    }
  }, 15000);

  // try to close the tab
  setTimeout(() => {
    leaveScreen.style.transition = 'opacity 3s ease';
    leaveScreen.style.background = '#000000';
    document.getElementById('leave-content').style.transition = 'opacity 3s ease';
    document.getElementById('leave-content').style.opacity = '0';
  }, 16500);

  setTimeout(() => {
    try { window.close(); } catch(e) {}
    // doesnt always work, fallback if not
    document.getElementById('leave-content').style.opacity = '1';
    document.getElementById('leave-content').innerHTML = '<p style="font-family: Rajdhani, Arial, sans-serif; font-size: 14px; color: rgba(255,255,255,0.3); letter-spacing: 0.1em;">You can close this tab now.</p>';
  }, 20000);
});

window.addEventListener('load', () => {
  // flash in then out, entry thing
  const flash = document.getElementById('final-flash');
  flash.style.transition = 'opacity 0.08s ease';
  flash.style.opacity    = '1';
  setTimeout(() => {
    flash.style.transition = 'opacity 0.3s ease';
    flash.style.opacity    = '0';
  }, 80);

  buildSplitScreen();

  // browser might block audio autoplay, thats ok
  try {
    audioRef = startAmbientSound();
    if (audioRef.ctx.state === 'suspended') {
      audioRef.ctx.resume();
    }
  } catch (e) {
    audioRef = null;
  }

  animateSequence();
});
