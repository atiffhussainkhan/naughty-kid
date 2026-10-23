/* Host panel. Classic script. CLASSROOM.ui.mount(root, getState, dispatch).
   Five picks, then beats 1–10. Cue text comes from CLASSROOM.modules.cues.
   The panel does not replace a canvas. */
(function (root) {
  "use strict";

  var PICKS = [
    {
      key: "prize",
      legend: "Prize type",
      options: ["a golden trophy", "a toy", "a bucket of treats"]
    },
    {
      key: "noisemaker",
      legend: "Shoe noisemaker",
      options: ["a squeaky dog toy", "bubble wrap"]
    },
    {
      key: "victory",
      legend: "Victory effect",
      options: [
        "pop a safe party popper",
        "throw a handful of paper confetti over the teacher's head"
      ]
    },
    {
      key: "activity",
      legend: "Strict-teacher activity",
      options: [
        "standing facing a whiteboard",
        "typing on a computer",
        "reading a big book"
      ]
    },
    {
      key: "stringTarget",
      legend: "Silly-string target",
      options: ["the teacher's desk", "the teacher's shoes"]
    }
  ];

  var draft = {
    prize: PICKS[0].options[0],
    noisemaker: PICKS[1].options[0],
    victory: PICKS[2].options[0],
    activity: PICKS[3].options[0],
    stringTarget: PICKS[4].options[0]
  };

  var localLock = null;

  function el(tag, className) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    return node;
  }

  function text(node, value) {
    node.appendChild(document.createTextNode(value == null ? "" : String(value)));
    return node;
  }

  function norm(value) {
    return String(value || "").replace(/[\u2019\u2018]/g, "'").replace(/\s+/g, " ").trim().toLowerCase();
  }

  function has(value, part) {
    return norm(value).indexOf(part) !== -1;
  }

  function shortPrize(value) {
    var named = norm(value);
    if (!named) return null;
    if (named === "trophy" || has(named, "trophy")) return "trophy";
    if (named === "treats" || named === "bucket" || has(named, "treat")) return "treats";
    if (named === "toy" || has(named, "toy")) return "toy";
    return null;
  }

  function shortNoise(value) {
    var named = norm(value);
    if (!named) return null;
    if (named === "wrap" || named === "bubble" || has(named, "bubble") || has(named, "wrap")) return "wrap";
    if (named === "toy" || named === "squeaky" || has(named, "squeak") || has(named, "dog toy")) return "toy";
    return null;
  }

  function shortBlast(value) {
    var named = norm(value);
    if (!named) return null;
    if (named === "confetti" || has(named, "confetti")) return "confetti";
    if (named === "popper" || has(named, "popper")) return "popper";
    return null;
  }

  function shortActivity(value) {
    var named = norm(value);
    if (!named) return null;
    if (named === "board" || named === "whiteboard" || has(named, "whiteboard") || has(named, "board")) return "board";
    if (named === "typing" || named === "computer" || has(named, "typ") || has(named, "computer")) return "typing";
    if (named === "reading" || named === "book" || has(named, "read") || has(named, "book")) return "reading";
    return null;
  }

  function shortSpray(value) {
    var named = norm(value);
    if (!named) return null;
    if (named === "shoes" || named === "shoe" || has(named, "shoe")) return "shoes";
    if (named === "desk" || has(named, "desk")) return "desk";
    return null;
  }

  function readState(getState) {
    var value = {};
    if (typeof getState === "function") {
      try { value = getState() || {}; } catch (err) { value = {}; }
    }
    return value;
  }

  function picksFrom(state) {
    var picks = (state && state.picks) || localLock || {};
    return {
      prize: picks.prize || state.prize || null,
      noisemaker: picks.noisemaker || picks.noise || state.noise || null,
      victory: picks.victory || picks.blast || state.blast || null,
      activity: picks.activity || state.activity || null,
      stringTarget: picks.stringTarget || picks.string || picks.spray || state.spray || null
    };
  }

  function locked(state) {
    if (localLock) return true;
    if (!state) return false;
    if (state.picksLocked === true) return true;
    if (Number(state.beat) >= 1) return true;
    if (state.phase === "A" || state.phase === "B" || state.phase === "won") return true;
    return !!(state.picks && (state.picks.prize || state.picks.noisemaker || state.picks.victory || state.picks.noise));
  }

  function playBeat(state) {
    var beat = Number(state && state.beat);
    if (!isFinite(beat) || beat < 1) return locked(state) ? 1 : 0;
    if (beat > 10) return 10;
    return Math.floor(beat);
  }

  function teacherToken(state, beat, picks) {
    var teacher = state.teacher;
    var activity;
    if (teacher && typeof teacher === "object") {
      activity = shortActivity(teacher.activity);
      if (teacher.posture === "standing" || teacher.manner === "strict") {
        return activity || "activity";
      }
      if (teacher.posture === "asleep") return "asleep";
      teacher = teacher.posture || teacher.state || "";
    }
    var named = norm(teacher);
    if (!named) {
      activity = shortActivity(picks.activity);
      if (beat >= 6) return activity || "activity";
      return "asleep";
    }
    if (named === "asleep" || named === "sleep") return "asleep";
    if (named === "laughing" || named === "laugh") return "laughing";
    if (named === "eyes open" || named === "eyes") return "eyes";
    if (named === "wakes up" || named === "awake" || named === "wake") return "awake";
    if (named === "starting to wake" || named === "stirring") return "stirring";
    if (named === "investigating" || named === "turned") return "turned";
    if (named === "standing") return "standing";
    activity = shortActivity(named);
    if (activity) return activity;
    return named;
  }

  function truthy(state, keys) {
    var i;
    for (i = 0; i < keys.length; i += 1) {
      if (state && state[keys[i]] === true) return true;
    }
    return false;
  }

  function cueInput(state) {
    var picks = picksFrom(state);
    var beat = playBeat(state);
    var finals = (state && state.finals) || {};
    var sprayed = truthy(state, ["sprayed", "stringOn", "sessionWon"]) ||
      finals.sillyString === true || finals.b === true || state.phase === "won";
    var note = truthy(state, ["noteInBox", "noteInMailbox"]) || sprayed;
    var claimed = truthy(state, ["claimed", "blastDone"]) || finals.confetti === true || finals.a === true;
    return {
      beat: beat,
      teacher: teacherToken(state, beat, picks),
      picks: {
        prize: shortPrize(picks.prize),
        noise: shortNoise(picks.noisemaker),
        blast: shortBlast(picks.victory),
        activity: shortActivity(picks.activity),
        string: shortSpray(picks.stringTarget)
      },
      noteInBox: note,
      sprayed: sprayed,
      claimed: claimed && beat === 5,
      caughtLaugh: !!(state && (state.caughtLaugh || state.laughed)),
      kids: state && state.kids
    };
  }

  function writtenCue(state) {
    var cues = root.CLASSROOM && root.CLASSROOM.modules && root.CLASSROOM.modules.cues;
    if (!cues || typeof cues.viewModel !== "function") return null;
    var view = cues.viewModel(cueInput(state));
    return view && view.cue ? view.cue : null;
  }

  function yellPhrase(state) {
    var samples = state && state.samples;
    var phrase = samples && (samples.phrase || samples.yell);
    if (phrase && typeof phrase === "object") phrase = phrase.value;
    if (typeof phrase === "string" && phrase.trim()) return phrase.trim();
    return "The broccoli has landed!";
  }

  function buttonsFor(state) {
    var beat = playBeat(state);
    var picks = picksFrom(state);
    var teacher = teacherToken(state, beat, picks);
    var blast = shortBlast(picks.victory) || "popper";
    var noise = shortNoise(picks.noisemaker) === "wrap" ? "bubble" : "squeaky";
    var spray = shortSpray(picks.stringTarget) || "desk";
    var list = [];
    var prizePayload;

    if (beat === 1) list.push({ type: "beat1Step", label: "Walk", payload: { underFoot: noise, backSideOfLine: true } });
    if (beat === 2) {
      list.push({ type: "beat2Throw", label: "Throw", payload: { onMat: true } });
      list.push({ type: "beat2LaughEnd", label: "Laugh ends", payload: {} });
    }
    if (beat === 3) list.push({ type: "beat3Eyes", label: "Eyes open", payload: {} });
    if (beat === 4) list.push({ type: "beat4Note", label: "Note", payload: { noticed: false } });
    if (beat === 5) {
      prizePayload = { caught: false, blast: blast };
      if (blast === "confetti") prizePayload.overHead = true;
      list.push({ type: "beat5Prize", label: "Claim", payload: prizePayload });
    }
    if (beat === 6) list.push({ type: "beat6Step", label: "Step", payload: {} });
    if (beat === 7) list.push({ type: "beat7Pass", label: "Pass", payload: { feet: true, dropped: false } });
    if (beat === 8) {
      list.push({ type: "beat8Draw", label: "A hat", payload: { picture: "hat" } });
      list.push({ type: "beat8Draw", label: "Giant ears", payload: { picture: "ears" } });
    }
    if (beat === 9) {
      list.push({ type: "beat9Yell", label: "Yell", payload: { voice: "monster", phrase: yellPhrase(state) } });
    }
    if (beat === 10) {
      list.push({ type: "beat10Mailbox", label: "Mailbox", payload: {} });
      list.push({ type: "beat10Spray", label: "Spray", payload: { target: spray, gentle: true, dance: true } });
    }
    if (beat >= 1 && beat <= 5) {
      list.push({ type: "hostSleep", label: "Asleep", payload: {}, host: true });
      list.push({ type: "hostWake", label: "Wake", payload: {}, host: true, off: teacher === "laughing" });
      list.push({ type: "hostEyes", label: "Eyes open", payload: {}, host: true, off: teacher === "laughing" });
    }
    if (beat >= 1 && beat <= 10) {
      list.push({
        type: "kidStep",
        label: "Step",
        payload: teacher === "laughing" ? { duringLaugh: true } : { moving: true }
      });
      list.push({ type: "kidStill", label: "Still", payload: {} });
    }
    return list;
  }

  function fingerprint(state) {
    var picks = picksFrom(state);
    return [
      locked(state) ? "1" : "0",
      playBeat(state),
      teacherToken(state, playBeat(state), picks),
      picks.prize, picks.noisemaker, picks.victory, picks.activity, picks.stringTarget,
      state && state.noteInBox, state && state.sprayed, state && state.claimed,
      state && state.phase, state && state.caughtLaugh,
      state && state.finals && state.finals.a,
      state && state.finals && state.finals.b,
      state && state.finals && state.finals.confetti,
      state && state.finals && state.finals.sillyString
    ].join("|");
  }

  function renderPicks(panel, send) {
    var form = el("div", "classroom-picks");
    var i;
    var k;
    var field;
    var legend;
    var choice;
    var input;
    var button;
    panel.appendChild(form);
    for (i = 0; i < PICKS.length; i += 1) {
      field = el("fieldset");
      legend = el("legend");
      text(legend, PICKS[i].legend);
      field.appendChild(legend);
      for (k = 0; k < PICKS[i].options.length; k += 1) {
        choice = el("label", "classroom-choice");
        input = el("input");
        input.type = "radio";
        input.name = "classroom-" + PICKS[i].key;
        input.value = PICKS[i].options[k];
        input.checked = draft[PICKS[i].key] === PICKS[i].options[k];
        input.setAttribute("data-pick", PICKS[i].key);
        choice.appendChild(input);
        text(choice, PICKS[i].options[k]);
        field.appendChild(choice);
      }
      form.appendChild(field);
    }
    button = el("button", "classroom-lock");
    button.type = "button";
    button.setAttribute("data-action", "lockPicks");
    text(button, "Lock the five picks");
    form.appendChild(button);
    form.addEventListener("change", function (event) {
      var target = event.target;
      var key;
      if (!target || target.type !== "radio") return;
      key = target.getAttribute("data-pick");
      if (key && draft.hasOwnProperty(key)) draft[key] = target.value;
    });
    button.addEventListener("click", function () {
      localLock = {
        prize: draft.prize,
        noisemaker: draft.noisemaker,
        victory: draft.victory,
        activity: draft.activity,
        stringTarget: draft.stringTarget
      };
      send("lockPicks", localLock);
    });
  }

  function renderPlay(panel, state, send) {
    var beat = playBeat(state);
    var cue = writtenCue(state);
    var strip = el("ol", "classroom-beats");
    var article = el("article", "classroom-cue");
    var actions = el("div", "classroom-actions");
    var n;
    var item;
    var line;
    var paragraph;
    var tag;
    var buttons;
    var b;
    var button;
    var i;

    for (n = 1; n <= 10; n += 1) {
      item = el("li");
      if (n === beat) item.className = "on";
      else if (n < beat) item.className = "done";
      text(item, String(n));
      strip.appendChild(item);
    }
    panel.appendChild(strip);

    if (cue) {
      article.setAttribute("data-cue", cue.id);
      article.appendChild(text(el("h2"), cue.title));
      for (i = 0; i < cue.lines.length; i += 1) {
        line = cue.lines[i];
        paragraph = el("p");
        tag = el("span", "classroom-tag");
        text(tag, line.tag);
        paragraph.appendChild(tag);
        paragraph.appendChild(document.createTextNode(" " + line.text));
        article.appendChild(paragraph);
      }
    }
    panel.appendChild(article);

    buttons = buttonsFor(state);
    for (b = 0; b < buttons.length; b += 1) {
      button = el("button", buttons[b].host ? "host" : "");
      button.type = "button";
      button.setAttribute("data-action", buttons[b].type);
      if (buttons[b].payload && buttons[b].payload.picture) {
        button.setAttribute("data-picture", buttons[b].payload.picture);
      }
      if (buttons[b].off) button.disabled = true;
      text(button, buttons[b].label);
      button.addEventListener("click", (function (spec) {
        return function () { send(spec.type, spec.payload); };
      })(buttons[b]));
      actions.appendChild(button);
    }
    panel.appendChild(actions);
  }

  function ensureCss() {
    var scripts = document.getElementsByTagName("script");
    var i;
    var src;
    var link;
    if (document.querySelector("link[data-classroom-ui]")) return;
    for (i = 0; i < scripts.length; i += 1) {
      src = scripts[i].getAttribute("src") || "";
      if (src.indexOf("ui.js") === -1) continue;
      link = document.createElement("link");
      link.rel = "stylesheet";
      link.setAttribute("data-classroom-ui", "true");
      link.href = src.replace(/ui\.js(\?.*)?$/, "ui.css");
      document.head.appendChild(link);
      return;
    }
  }

  function mount(mountRoot, getState, dispatch) {
    var panel;
    var canvas;
    var alive = true;
    var frame = 0;
    var last = "";
    var scroll = 0;

    if (!mountRoot || !mountRoot.appendChild) return null;
    ensureCss();
    if (mountRoot.__classroomUi && mountRoot.__classroomUi.destroy) mountRoot.__classroomUi.destroy();

    panel = el("aside", "classroom-ui");
    panel.setAttribute("aria-label", "Host");
    canvas = mountRoot.querySelector ? mountRoot.querySelector("canvas") : null;
    if (canvas) panel.classList.add("classroom-ui-dock");
    else {
      panel.classList.add("classroom-ui-float");
      if (mountRoot !== document.body) {
        mountRoot.style.pointerEvents = "none";
        try {
          if (window.getComputedStyle(mountRoot).position === "static") mountRoot.style.position = "relative";
        } catch (err) { /* root is not in the document yet */ }
      }
    }
    mountRoot.appendChild(panel);

    function send(type, payload) {
      if (typeof dispatch === "function") dispatch({ type: type, payload: payload || {} });
      draw();
    }

    function draw() {
      var state = readState(getState);
      var key = fingerprint(state);
      scroll = panel.scrollTop;
      while (panel.firstChild) panel.removeChild(panel.firstChild);
      if (locked(state)) renderPlay(panel, state, send);
      else renderPicks(panel, send);
      panel.scrollTop = scroll;
      last = key;
    }

    function tick() {
      var key;
      if (!alive) return;
      key = fingerprint(readState(getState));
      if (key !== last) draw();
      frame = root.requestAnimationFrame(tick);
    }

    draw();
    if (typeof root.requestAnimationFrame === "function") frame = root.requestAnimationFrame(tick);

    var api = {
      update: draw,
      destroy: function () {
        alive = false;
        if (frame && root.cancelAnimationFrame) root.cancelAnimationFrame(frame);
        if (panel.parentNode) panel.parentNode.removeChild(panel);
        if (mountRoot.__classroomUi === api) mountRoot.__classroomUi = null;
      }
    };
    mountRoot.__classroomUi = api;
    return api;
  }

  var classroom = root.CLASSROOM || (root.CLASSROOM = {});
  classroom.ui = { mount: mount };
})(typeof globalThis !== "undefined" ? globalThis : this);
