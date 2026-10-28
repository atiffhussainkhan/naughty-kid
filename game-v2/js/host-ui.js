/* Host UI beside the 3D stage. Classic script.
   CLASSROOM.ui.mount(root, getState, dispatch)
   Setup: the five closed picks from design/07-setup-and-options.md (via game-slices/07-options).
   Play: beat sidebar, cue speeches from game-slices/08-cues, host/beat controls.
   Picks lock before Phase A. No sixth pick. No invented Say lines. */
(function (root) {
  "use strict";

  var FALLBACK_LISTS = {
    prize: ["a golden trophy", "a toy", "a bucket of treats"],
    noisemaker: ["a squeaky dog toy", "bubble wrap"],
    victory: [
      "pop a safe party popper",
      "throw a handful of paper confetti over the teacher's head"
    ],
    activity: [
      "standing facing a whiteboard",
      "typing on a computer",
      "reading a big book"
    ],
    stringTarget: ["the teacher's desk", "the teacher's shoes"]
  };

  var PICK_META = [
    { key: "prize", legend: "Prize type" },
    { key: "noisemaker", legend: "Shoe noisemaker" },
    { key: "victory", legend: "Victory effect" },
    { key: "activity", legend: "Strict-teacher activity" },
    { key: "stringTarget", legend: "Silly-string target" }
  ];

  /* Beat titles from design/08-host-script.md cue titles (sidebar labels, not Say lines). */
  var BEAT_TITLES = [
    "The Squeaky Toy Shoes",
    "The Feather Tickle Trigger",
    "The Copycat Pose",
    "The Sticky Note Sabotage",
    "Confetti Victory Blast",
    "The Whoopee Cushion Pathway",
    "The Reverse Homework Trick",
    "The Doodle Attack",
    "The Monster Talk Distraction",
    "Silly String Finale"
  ];

  var draft = {
    prize: null,
    noisemaker: null,
    victory: null,
    activity: null,
    stringTarget: null
  };

  var localLock = null;
  var lockError = "";
  var localSetup = "session";

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
    return String(value || "")
      .replace(/[\u2019\u2018]/g, "'")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  }

  function has(value, part) {
    return norm(value).indexOf(part) !== -1;
  }

  function optionsApi() {
    return root.CLASSROOM && root.CLASSROOM.modules && root.CLASSROOM.modules.options;
  }

  function cuesApi() {
    return root.CLASSROOM && root.CLASSROOM.modules && root.CLASSROOM.modules.cues;
  }

  function listsOf() {
    var api = optionsApi();
    if (api && api.lists) {
      return {
        prize: api.lists.prize.slice(),
        noisemaker: api.lists.noisemaker.slice(),
        victory: api.lists.victory.slice(),
        activity: api.lists.activity.slice(),
        stringTarget: api.lists.stringTarget.slice()
      };
    }
    return {
      prize: FALLBACK_LISTS.prize.slice(),
      noisemaker: FALLBACK_LISTS.noisemaker.slice(),
      victory: FALLBACK_LISTS.victory.slice(),
      activity: FALLBACK_LISTS.activity.slice(),
      stringTarget: FALLBACK_LISTS.stringTarget.slice()
    };
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
    if (named === "board" || named === "whiteboard" || has(named, "whiteboard") || has(named, "facing")) return "board";
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
    var api = optionsApi();
    var fromApi = api && api.picksLocked && api.picks ? api.picks : null;
    var picks = (state && state.picks) || fromApi || localLock || {};
    return {
      prize: picks.prize || state.prize || null,
      noisemaker: picks.noisemaker || picks.noise || state.noise || null,
      victory: picks.victory || picks.blast || state.blast || null,
      activity: picks.activity || state.activity || null,
      stringTarget: picks.stringTarget || picks.string || picks.spray || state.spray || null
    };
  }

  function picksComplete(set) {
    return !!(set && set.prize && set.noisemaker && set.victory && set.activity && set.stringTarget);
  }

  function locked(state) {
    var api = optionsApi();
    if (api && api.picksLocked === true) return true;
    if (localLock && picksComplete(localLock)) return true;
    if (!state) return false;
    if (state.picksLocked === true) return true;
    if (Number(state.beat) >= 1) return true;
    if (state.phase === "A" || state.phase === "B" || state.phase === "won") return true;
    return picksComplete(state.picks);
  }

  function playBeat(state) {
    var beat = Number(state && state.beat);
    if (!isFinite(beat) || beat < 1) return locked(state) ? 0 : 0;
    if (beat > 10) return 10;
    return Math.floor(beat);
  }

  function teacherToken(state, beat, picks) {
    var teacher = state && state.teacher;
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
      if (beat >= 1) return "asleep";
      return "";
    }
    if (named === "asleep" || named === "sleep") return "asleep";
    if (named === "laughing" || named === "laugh") return "laughing";
    if (named === "eyes open" || named === "eyes") return "eyes";
    if (named === "wakes up" || named === "awake" || named === "wake") return "awake";
    if (named === "starting to wake" || named === "stirring" || named === "start to wake") return "stirring";
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

  function setupCueId(state) {
    var setup = state && state.setup != null ? String(state.setup).toLowerCase() : String(localSetup || "");
    if (setup === "2" || setup === "c02" || setup === "places") return "C02";
    if (setup === "3" || setup === "c03" || setup === "choices") return "C03";
    if (setup === "4" || setup === "c04" || setup === "calls") return "C04";
    return "C01";
  }

  function cueInput(state) {
    var picks = picksFrom(state);
    var beat = playBeat(state);
    var finals = (state && state.finals) || {};
    var sprayed = truthy(state, ["sprayed", "stringOn", "sessionWon"]) ||
      finals.sillyString === true || finals.b === true || state.phase === "won";
    var note = truthy(state, ["noteInBox", "noteInMailbox"]) || sprayed;
    var claimed = truthy(state, ["claimed", "blastDone"]) || finals.confetti === true || finals.a === true;
    var setupId;
    var input = {
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
    if (beat < 1) {
      setupId = setupCueId(state);
      input.setup = setupId === "C01" ? "session" : setupId === "C02" ? "places" : setupId === "C03" ? "choices" : "calls";
      if (!input.teacher) {
        input.teacher = input.setup === "session" ? "session" : input.setup;
      }
    }
    return input;
  }

  function writtenCue(state) {
    var cues = cuesApi();
    if (!cues || typeof cues.viewModel !== "function") return null;
    var view = cues.viewModel(cueInput(state));
    return view && view.cue ? view.cue : null;
  }

  function yellPhrase(state) {
    var api = optionsApi();
    var samples = (api && api.samples) || (state && state.samples);
    var phrase = samples && (samples.phrase || samples.yell);
    if (phrase && typeof phrase === "object") phrase = phrase.value;
    if (typeof phrase === "string" && phrase.trim()) return phrase.trim();
    return "The broccoli has landed!";
  }

  function siblingActions(state) {
    var phase = state && state.phase;
    var mod;
    var list;
    if (phase === "A") {
      mod = root.CLASSROOM && (root.CLASSROOM.phaseAUi || (root.CLASSROOM.modules && root.CLASSROOM.modules.phaseAUi));
    } else if (phase === "B") {
      mod = root.CLASSROOM && (root.CLASSROOM.phaseBUi || (root.CLASSROOM.modules && root.CLASSROOM.modules.phaseBUi));
    }
    if (!mod || typeof mod.actionsFor !== "function") return null;
    try { list = mod.actionsFor(state); } catch (err) { return null; }
    return Object.prototype.toString.call(list) === "[object Array]" ? list : null;
  }

  function buttonsFor(state) {
    var beat = playBeat(state);
    var picks = picksFrom(state);
    var teacher = teacherToken(state, beat, picks);
    var blast = shortBlast(picks.victory) || "popper";
    var noise = shortNoise(picks.noisemaker) === "wrap" ? "bubble" : "squeaky";
    var spray = shortSpray(picks.stringTarget) || "desk";
    var list = [];
    var sibling;
    var prizePayload;
    var laughing = teacher === "laughing";
    var i;

    var finals = state && state.finals || {};
    if (state && (state.phase === "won" || (finals.a === true && finals.b === true))) {
      return [{ type: "restartSession", label: "Play another round", payload: {}, host: true }];
    }
    if (state && state.phase === "A" && (finals.a === true || finals.confetti === true)) {
      return [
        { type: "beginPhaseB", label: "Kids at the back — start Phase B", payload: { kidsAtRear: true, activity: picks.activity }, host: true },
        { type: "restartSession", label: "Restart round", payload: {}, host: true }
      ];
    }

    if (beat < 1) {
      list.push({ type: "hostSetup", label: "Session", payload: { setup: "session" }, host: true });
      list.push({ type: "hostSetup", label: "Places", payload: { setup: "places" }, host: true });
      list.push({ type: "hostSetup", label: "Choices", payload: { setup: "choices" }, host: true });
      list.push({ type: "hostSetup", label: "Three calls", payload: { setup: "calls" }, host: true });
      list.push({ type: "startPhaseA", label: "Start Phase A", payload: {}, host: true });
      return beat >= 1 ? list.concat([{ type: "restartSession", label: "Restart round", payload: {}, host: true }]) : list;
    }

    sibling = siblingActions(state);
    if (sibling && sibling.length) {
      for (i = 0; i < sibling.length; i += 1) list.push(sibling[i]);
      if (beat >= 1 && beat <= 10) {
        list.push({
          type: "kidStep",
          label: "Moving",
          payload: laughing ? { duringLaugh: true } : { moving: true }
        });
        list.push({ type: "kidStill", label: "Still", payload: {} });
      }
      return beat >= 1 ? list.concat([{ type: "restartSession", label: "Restart round", payload: {}, host: true }]) : list;
    }

    if (beat === 1) {
      list.push({ type: "beat1Step", label: "Walk", payload: { underFoot: noise, backSideOfLine: true } });
    }
    if (beat === 2) {
      list.push({ type: "hostStir", label: "Start to wake", payload: {}, host: true, off: laughing });
      list.push({ type: "beat2Throw", label: "Throw", payload: { onMat: true } });
      list.push({ type: "beat2LaughEnd", label: "Laugh ends", payload: {} });
    }
    if (beat === 3) {
      list.push({ type: "hostEyes", label: "Eyes open", payload: {}, host: true, off: laughing });
      list.push({ type: "kidLaugh", label: "Caught laugh", payload: { caught: true } });
    }
    if (beat === 4) {
      list.push({ type: "beat4Note", label: "Note", payload: { noticed: false } });
    }
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
      list.push({ type: "hostWake", label: "Wake", payload: {}, host: true, off: laughing });
      if (beat !== 3) {
        list.push({ type: "hostEyes", label: "Eyes open", payload: {}, host: true, off: laughing });
      }
    }
    if (beat >= 1 && beat <= 10) {
      list.push({
        type: "kidStep",
        label: "Moving",
        payload: laughing ? { duringLaugh: true } : { moving: true }
      });
      list.push({ type: "kidStill", label: "Still", payload: {} });
    }
    return beat >= 1 ? list.concat([{ type: "restartSession", label: "Restart round", payload: {}, host: true }]) : list;
  }

  function fingerprint(state) {
    var picks = picksFrom(state);
    var api = optionsApi();
    return [
      locked(state) ? "1" : "0",
      playBeat(state),
      teacherToken(state, playBeat(state), picks),
      state && state.setup, localSetup,
      picks.prize, picks.noisemaker, picks.victory, picks.activity, picks.stringTarget,
      draft.prize, draft.noisemaker, draft.victory, draft.activity, draft.stringTarget,
      lockError,
      api && api.picksLocked,
      state && state.noteInBox, state && state.sprayed, state && state.claimed,
      state && state.phase, state && state.caughtLaugh,
      state && state.finals && state.finals.a,
      state && state.finals && state.finals.b,
      state && state.round, state && state.laughing,
      JSON.stringify(state && state.phaseA || null), JSON.stringify(state && state.phaseB || null)
    ].join("|");
  }

  function tryLock(send) {
    var set = {
      prize: draft.prize,
      noisemaker: draft.noisemaker,
      victory: draft.victory,
      activity: draft.activity,
      stringTarget: draft.stringTarget
    };
    var api = optionsApi();
    var result;
    lockError = "";
    if (!picksComplete(set)) {
      lockError = "Choose one option for each of the five picks.";
      return false;
    }
    if (api && typeof api.lockPicks === "function") {
      result = api.lockPicks(set);
      if (!result || result.ok !== true) {
        lockError = (result && result.reason) || "incomplete";
        return false;
      }
      localLock = result.picks || set;
    } else {
      localLock = {
        prize: set.prize,
        noisemaker: set.noisemaker,
        victory: set.victory,
        activity: set.activity,
        stringTarget: set.stringTarget
      };
    }
    send("lockPicks", localLock);
    return true;
  }

  function renderPicks(panel, send) {
    var lists = listsOf();
    var form = el("div", "classroom-picks");
    var heading = el("h2");
    var note = el("p", "classroom-setup-note");
    var i;
    var k;
    var field;
    var legend;
    var choice;
    var input;
    var button;
    var err;
    var options;

    text(heading, "Five picks");
    panel.appendChild(heading);
    text(note, "Lock all five before Phase A.");
    panel.appendChild(note);

    panel.appendChild(form);
    for (i = 0; i < PICK_META.length; i += 1) {
      options = lists[PICK_META[i].key] || [];
      field = el("fieldset");
      legend = el("legend");
      text(legend, PICK_META[i].legend);
      field.appendChild(legend);
      for (k = 0; k < options.length; k += 1) {
        choice = el("label", "classroom-choice");
        input = el("input");
        input.type = "radio";
        input.name = "classroom-" + PICK_META[i].key;
        input.value = options[k];
        input.checked = draft[PICK_META[i].key] === options[k];
        input.setAttribute("data-pick", PICK_META[i].key);
        choice.appendChild(input);
        text(choice, options[k]);
        field.appendChild(choice);
      }
      form.appendChild(field);
    }
    button = el("button", "classroom-lock");
    button.type = "button";
    button.setAttribute("data-action", "lockPicks");
    button.disabled = !picksComplete(draft);
    text(button, "Lock the five picks");
    form.appendChild(button);
    if (lockError) {
      err = el("p", "classroom-lock-error");
      text(err, lockError);
      form.appendChild(err);
    }
    form.addEventListener("change", function (event) {
      var target = event.target;
      var key;
      if (!target || target.type !== "radio") return;
      key = target.getAttribute("data-pick");
      if (key && Object.prototype.hasOwnProperty.call(draft, key)) {
        draft[key] = target.value;
        lockError = "";
        button.disabled = !picksComplete(draft);
      }
    });
    button.addEventListener("click", function () {
      tryLock(send);
    });
  }

  function renderLockedPicks(panel, state) {
    var picks = picksFrom(state);
    var box = el("div", "classroom-locked");
    var heading = el("h2");
    var list = el("ul");
    var rows = [
      ["Prize", picks.prize],
      ["Noisemaker", picks.noisemaker],
      ["Victory", picks.victory],
      ["Activity", picks.activity],
      ["Silly string", picks.stringTarget]
    ];
    var i;
    var item;
    text(heading, "Locked picks");
    box.appendChild(heading);
    for (i = 0; i < rows.length; i += 1) {
      item = el("li");
      text(item, rows[i][0] + ": " + (rows[i][1] || "—"));
      list.appendChild(item);
    }
    box.appendChild(list);
    panel.appendChild(box);
  }

  function renderPlay(panel, state, send) {
    var beat = playBeat(state);
    var cue = writtenCue(state);
    var strip = el("ol", "classroom-beats");
    var article = el("article", "classroom-cue");
    var actions = el("div", "classroom-actions");
    var n;
    var item;
    var title;
    var line;
    var paragraph;
    var tag;
    var buttons;
    var b;
    var button;
    var i;
    var phaseLine;

    renderLockedPicks(panel, state);

    phaseLine = el("p", "classroom-phase");
    if (beat < 1) text(phaseLine, "Picks locked. Phase A has not started.");
    else if (state.phase === "B") text(phaseLine, "Round " + (state.round || 1) + " · Phase B · Beat " + beat);
    else if (state.phase === "won") text(phaseLine, "Session won");
    else if (state.finals && (state.finals.a || state.finals.confetti)) text(phaseLine, "Phase A complete. Return the kids to the back for Phase B.");
    else text(phaseLine, "Round " + (state.round || 1) + " · Phase A · Beat " + beat);
    phaseLine.setAttribute("role", "status");
    panel.appendChild(phaseLine);

    for (n = 1; n <= 10; n += 1) {
      item = el("li");
      title = BEAT_TITLES[n - 1];
      item.setAttribute("title", title);
      item.setAttribute("aria-label", "Beat " + n + ", " + title);
      if (n === beat) { item.className = "on"; item.setAttribute("aria-current", "step"); }
      else if (beat >= 1 && n < beat) item.className = "done";
      text(item, String(n));
      strip.appendChild(item);
    }
    panel.appendChild(strip);

    if (beat >= 1 && beat <= 10) {
      panel.appendChild(text(el("p", "classroom-beat-title"), "Beat " + beat + " · " + BEAT_TITLES[beat - 1]));
    }

    if (cue) {
      article.setAttribute("data-cue", cue.id);
      article.appendChild(text(el("h2"), cue.title));
      for (i = 0; i < cue.lines.length; i += 1) {
        line = cue.lines[i];
        paragraph = el("p");
        paragraph.appendChild(document.createTextNode(String(line.text || "").replace(/^(?:(?:REQUIREMENT|DESIGN-DECISION|RECOMMENDATION)(?:\s+\d+)?\s*[:.—-]\s*)+/i, "")));
        article.appendChild(paragraph);
      }
    } else {
      article.appendChild(text(el("p", "classroom-cue-missing"), "Cue module not loaded."));
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
    var href;
    if (document.querySelector("link[data-classroom-host-ui]")) return;
    for (i = 0; i < scripts.length; i += 1) {
      src = scripts[i].getAttribute("src") || "";
      if (src.indexOf("host-ui.js") === -1 && src.indexOf("ui.js") === -1) continue;
      href = src.replace(/host-ui\.js(\?.*)?$/, "host-ui.css").replace(/ui\.js(\?.*)?$/, "host-ui.css");
      if (href === src) continue;
      link = document.createElement("link");
      link.rel = "stylesheet";
      link.setAttribute("data-classroom-host-ui", "true");
      link.href = href;
      document.head.appendChild(link);
      return;
    }
  }

  function viewModel(state) {
    var current = state || {};
    var picks = picksFrom(current);
    var cue = writtenCue(current);
    return {
      locked: locked(current),
      beat: playBeat(current),
      picks: picks,
      cue: cue,
      beats: BEAT_TITLES.slice(),
      controls: buttonsFor(current)
    };
  }

  function reset(state) {
    localSetup = "session";
    lockError = "";
    localLock = state && state.picks ? state.picks : null;
    for (var i = 0; i < PICK_META.length; i++) draft[PICK_META[i].key] = localLock && localLock[PICK_META[i].key] || null;
  }

  function mount(mountRoot, getState, dispatch) {
    var panel;
    var shell;
    var stage;
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

    shell = mountRoot.classList && mountRoot.classList.contains("classroom-shell")
      ? mountRoot
      : (mountRoot.querySelector && mountRoot.querySelector(".classroom-shell"));
    stage = shell && shell.querySelector
      ? shell.querySelector(".classroom-stage") || shell.querySelector("#stage")
      : null;
    canvas = mountRoot.querySelector ? mountRoot.querySelector("canvas") : null;

    if (shell && stage) {
      panel.classList.add("classroom-ui-dock");
      shell.appendChild(panel);
    } else if (canvas && canvas.parentNode === mountRoot) {
      panel.classList.add("classroom-ui-dock");
      if (!mountRoot.classList.contains("classroom-shell")) {
        try { mountRoot.classList.add("classroom-shell"); } catch (err) { /* ignore */ }
      }
      mountRoot.appendChild(panel);
    } else {
      panel.classList.add("classroom-ui-float");
      if (mountRoot !== document.body) {
        mountRoot.style.pointerEvents = "none";
        try {
          if (window.getComputedStyle(mountRoot).position === "static") mountRoot.style.position = "relative";
        } catch (err) { /* root is not in the document yet */ }
      }
      mountRoot.appendChild(panel);
    }

    function send(type, payload) {
      payload = payload || {};
      if (type === "hostSetup" && payload.setup) {
        localSetup = String(payload.setup);
      }
      if (typeof dispatch === "function") dispatch({ type: type, payload: payload });
      draw();
    }

    function draw() {
      var state = readState(getState);
      scroll = panel.scrollTop;
      while (panel.firstChild) panel.removeChild(panel.firstChild);
      if (locked(state)) renderPlay(panel, state, send);
      else renderPicks(panel, send);
      panel.scrollTop = scroll;
      last = fingerprint(state);
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
      },
      viewModel: function () { return viewModel(readState(getState)); }
    };
    mountRoot.__classroomUi = api;
    return api;
  }

  var classroom = root.CLASSROOM || (root.CLASSROOM = {});
  classroom.modules = classroom.modules || {};
  classroom.modules.hostUi = {
    mount: mount,
    viewModel: viewModel,
    beats: BEAT_TITLES.slice(),
    reset: reset,
    lists: listsOf
  };
  classroom.ui = { mount: mount, viewModel: viewModel, reset: reset };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = classroom.modules.hostUi;
  }
})(typeof globalThis !== "undefined" ? globalThis : this);
