/* Teacher states for the 3D classroom.
   CLASSROOM.teacher.reduce(state, action) and poseFor(state).
   Starts to wake is the feather window only. Wakes up emits freezeAll.
   Eyes open emits catchMovers. The laugh is 5 seconds.
   This file does not move kids. It calls game-slices/04-teacher/module.js
   when that file is present. */
(function (root) {
  "use strict";

  var ASLEEP = "Asleep";
  var STIR = "Starting to wake";
  var LAUGH = "Laughing for 5 seconds";
  var WAKE = "Wakes up";
  var EYES = "Eyes open";
  var STAND = "Standing into Phase B";
  var BOARD = "Facing the whiteboard";
  var TYPING = "Typing";
  var READING = "Reading";
  var LOOK = "Turned away investigating";
  var LAUGH_MS = 5000;

  var ACTIVITIES = {};
  ACTIVITIES[BOARD] = true;
  ACTIVITIES[TYPING] = true;
  ACTIVITIES[READING] = true;

  var KNOWN = {};
  KNOWN[ASLEEP] = true;
  KNOWN[STIR] = true;
  KNOWN[LAUGH] = true;
  KNOWN[WAKE] = true;
  KNOWN[EYES] = true;
  KNOWN[STAND] = true;
  KNOWN[BOARD] = true;
  KNOWN[TYPING] = true;
  KNOWN[READING] = true;
  KNOWN[LOOK] = true;
  /* Aliases kept so older 3D saves still resolve. */
  KNOWN["Laughing 5s"] = true;
  KNOWN["Facing whiteboard"] = true;

  var ACTIVITY_NAMES = {
    "facing whiteboard": BOARD,
    "facing the whiteboard": BOARD,
    "board": BOARD,
    "whiteboard": BOARD,
    "standing facing a whiteboard": BOARD,
    "standing facing the whiteboard": BOARD,
    "typing": TYPING,
    "typing on a computer": TYPING,
    "reading": READING,
    "reading a big book": READING,
    "laughing 5s": LAUGH,
    "laughing": LAUGH
  };

  var POSES = {};
  POSES[ASLEEP] = { pose: "asleep", seated: true, place: "desk", eyes: "closed", facing: "desk", strict: false };
  POSES[STIR] = { pose: "stir", seated: true, place: "desk", eyes: "closed", facing: "desk", strict: false, featherWindow: true };
  POSES[LAUGH] = { pose: "laugh", seated: true, place: "desk", eyes: null, facing: "desk", strict: false, laughMs: LAUGH_MS };
  POSES[WAKE] = { pose: "awake", seated: true, place: "desk", eyes: null, facing: "desk", strict: false };
  POSES[EYES] = { pose: "eyes", seated: true, place: "desk", eyes: "open", facing: "desk", strict: false };
  POSES[STAND] = { pose: "stand", seated: false, place: "standing", eyes: null, facing: null, strict: true };
  POSES[BOARD] = { pose: "board", seated: false, place: "standing", eyes: null, facing: "whiteboard", strict: true };
  POSES[TYPING] = { pose: "typing", seated: false, place: "standing", eyes: null, facing: "computer", strict: true };
  POSES[READING] = { pose: "reading", seated: false, place: "standing", eyes: null, facing: "book", strict: true };
  POSES[LOOK] = { pose: "investigate", seated: false, place: "standing", eyes: null, facing: "away", strict: true };

  function norm(value) {
    return String(value).replace(/[\u2019\u2018]/g, "'").replace(/\s+/g, " ").trim().toLowerCase();
  }

  function unwrap(state) {
    if (!state || typeof state !== "object") return {};
    if (typeof state.teacher !== "string" && state.state && typeof state.state.teacher === "string") return state.state;
    return state;
  }

  function copy(state) {
    var src = unwrap(state);
    var next = {};
    var keys = Object.keys(src);
    var i;
    for (i = 0; i < keys.length; i++) next[keys[i]] = src[keys[i]];
    return next;
  }

  function teacherOf(state) {
    var name = unwrap(state).teacher;
    if (name === "Laughing 5s" || name === "Laughing") return LAUGH;
    if (name === "Facing whiteboard") return BOARD;
    if (KNOWN[name] && name !== "Laughing 5s" && name !== "Facing whiteboard") return name;
    if (typeof name === "string") {
      var mapped = ACTIVITY_NAMES[norm(name)];
      if (mapped) return mapped;
    }
    return ASLEEP;
  }

  function laughOf(state, teacher) {
    if (teacher !== LAUGH) return 0;
    var ms = unwrap(state).laughMs;
    return typeof ms === "number" ? ms : LAUGH_MS;
  }

  function pack(state, teacher, laughMs, events) {
    var next = copy(state);
    next.teacher = teacher;
    next.laughMs = laughMs;
    return { state: next, events: events };
  }

  function keep(state) {
    var teacher = teacherOf(state);
    return pack(state, teacher, laughOf(state, teacher), []);
  }

  function activityFrom(action) {
    if (!action || typeof action !== "object") return null;
    var raw = action.activity;
    if (raw == null && action.payload && typeof action.payload === "object") raw = action.payload.activity;
    if (typeof raw !== "string") return null;
    if (KNOWN[raw] && ACTIVITIES[raw]) return raw;
    return ACTIVITY_NAMES[norm(raw)] || null;
  }

  function phaseB(teacher) {
    return teacher === STAND || teacher === BOARD || teacher === TYPING || teacher === READING || teacher === LOOK;
  }

  function sliceFile() {
    if (typeof require !== "function") return null;
    try {
      var fs = require("fs");
      var path = require("path");
      var dir = typeof __dirname === "string" ? __dirname : "";
      return path.join(dir, "..", "..", "game-slices", "04-teacher", "module.js");
    } catch (err) {
      return null;
    }
  }

  var sliceLoading = false;

  function loadSlice() {
    var modules = root.CLASSROOM && root.CLASSROOM.modules;
    var registered = modules && modules.teacher;
    if (registered && registered !== api && (typeof registered.reduce === "function" || typeof registered.hostWake === "function")) {
      return registered;
    }
    if (sliceLoading || typeof require !== "function") return null;
    var file = sliceFile();
    if (!file) return null;
    try {
      if (!require("fs").existsSync(file)) return null;
      sliceLoading = true;
      return require(file);
    } catch (err) {
      return null;
    } finally {
      sliceLoading = false;
    }
  }

  function actionOf(action) {
    if (typeof action === "string") return { type: action };
    if (!action || typeof action !== "object") return { type: "" };
    return action;
  }

  function delegate(mod, state, action) {
    if (!mod) return null;
    if (typeof mod.reduce === "function" && mod.reduce !== reduce) {
      var reduced = mod.reduce(state, action);
      if (!reduced) return null;
      if (reduced.state && typeof reduced.state.teacher === "string") return reduced;
      if (typeof reduced.teacher === "string") {
        return pack(state, reduced.teacher, typeof reduced.laughMs === "number" ? reduced.laughMs : laughOf(reduced, reduced.teacher), reduced.events || []);
      }
      return null;
    }
    var fn = mod[action.type];
    if (typeof fn !== "function") return null;
    var box = { teacher: teacherOf(state), laughMs: laughOf(state, teacherOf(state)) };
    var activity = activityFrom(action);
    var out = activity == null ? fn(box) : fn(box, activity);
    if (!out || typeof out.teacher !== "string") {
      out = { teacher: box.teacher, laughMs: box.laughMs, events: [] };
    }
    var ms = typeof out.laughMs === "number" ? out.laughMs : laughOf(out, out.teacher);
    return pack(state, out.teacher, ms, out.events || []);
  }

  function hostStir(state) {
    if (teacherOf(state) !== ASLEEP) return keep(state);
    return pack(state, STIR, 0, []);
  }

  function hostLaughStart(state) {
    if (teacherOf(state) !== STIR) return keep(state);
    return pack(state, LAUGH, LAUGH_MS, []);
  }

  function hostLaughEnd(state) {
    if (teacherOf(state) !== LAUGH) return keep(state);
    return pack(state, ASLEEP, 0, []);
  }

  function hostWake(state) {
    var teacher = teacherOf(state);
    if (teacher === LAUGH) return keep(state);
    if (teacher !== ASLEEP && teacher !== STIR) return keep(state);
    return pack(state, WAKE, 0, [{ type: "freezeAll" }]);
  }

  function hostEyes(state) {
    var teacher = teacherOf(state);
    if (teacher === LAUGH) return keep(state);
    if (teacher !== ASLEEP) return keep(state);
    return pack(state, EYES, 0, [{ type: "catchMovers" }]);
  }

  function hostSleep(state) {
    var teacher = teacherOf(state);
    if (teacher === LAUGH || phaseB(teacher)) return keep(state);
    if (teacher !== WAKE && teacher !== EYES && teacher !== STIR) return keep(state);
    return pack(state, ASLEEP, 0, []);
  }

  function hostStand(state) {
    if (teacherOf(state) !== ASLEEP) return keep(state);
    return pack(state, STAND, 0, []);
  }

  function hostActivity(state, action) {
    var name = activityFrom(action);
    var teacher = teacherOf(state);
    if (!name) return keep(state);
    if (teacher === STAND || teacher === LOOK) return pack(state, name, 0, []);
    if ((teacher === TYPING || teacher === READING) && name === BOARD) return pack(state, BOARD, 0, []);
    return keep(state);
  }

  function hostInvestigate(state) {
    if (!ACTIVITIES[teacherOf(state)]) return keep(state);
    return pack(state, LOOK, 0, []);
  }

  function localReduce(state, action) {
    var type = action.type;
    if (type === "hostStir") return hostStir(state);
    if (type === "hostLaughStart") return hostLaughStart(state);
    if (type === "hostLaughEnd") return hostLaughEnd(state);
    if (type === "hostWake") return hostWake(state);
    if (type === "hostEyes") return hostEyes(state);
    if (type === "hostSleep") return hostSleep(state);
    if (type === "hostStand") return hostStand(state);
    if (type === "hostActivity") return hostActivity(state, action);
    if (type === "hostInvestigate") return hostInvestigate(state);
    return keep(state);
  }

  function reduce(state, action) {
    var act = actionOf(action);
    var mod = loadSlice();
    var handed = delegate(mod, state, act);
    if (handed) return handed;
    return localReduce(state, act);
  }

  function poseFor(state) {
    var teacher = teacherOf(state);
    var pose = POSES[teacher];
    return {
      state: teacher,
      pose: pose.pose,
      seated: pose.seated,
      place: pose.place,
      eyes: pose.eyes,
      facing: pose.facing,
      strict: pose.strict,
      featherWindow: pose.featherWindow === true,
      laughMs: teacher === LAUGH ? LAUGH_MS : 0
    };
  }

  var api = { reduce: reduce, poseFor: poseFor };
  var classroom = root.CLASSROOM || (root.CLASSROOM = {});
  classroom.teacher = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof globalThis !== "undefined" ? globalThis : this);

if (typeof require !== "undefined" && require.main === module) {
  var teacher = globalThis.CLASSROOM.teacher;
  var failures = 0;

  function check(cond, text) {
    if (!cond) {
      failures += 1;
      console.error("FAIL " + text);
    }
  }

  var names = [
    "Asleep",
    "Starting to wake",
    "Laughing for 5 seconds",
    "Wakes up",
    "Eyes open",
    "Standing into Phase B",
    "Facing the whiteboard",
    "Typing",
    "Reading",
    "Turned away investigating"
  ];
  var seen = {};
  var n;
  for (n = 0; n < names.length; n++) {
    var posed = teacher.poseFor({ teacher: names[n], laughMs: names[n] === "Laughing for 5 seconds" ? 5000 : 0 });
    check(posed.state === names[n], "pose state " + names[n]);
    check(typeof posed.pose === "string" && !seen[posed.pose], "pose id " + names[n]);
    seen[posed.pose] = true;
  }
  check(teacher.poseFor({ teacher: "Starting to wake" }).featherWindow === true, "stir is the feather window");
  check(teacher.poseFor({ teacher: "Asleep" }).featherWindow === false, "asleep is not the feather window");
  check(teacher.poseFor({ teacher: "Laughing for 5 seconds" }).laughMs === 5000, "laugh pose is 5 seconds");
  check(teacher.poseFor({ teacher: "Laughing for 5 seconds" }).seated === true, "laugh stays seated");
  check(teacher.poseFor({ teacher: "Standing into Phase B" }).seated === false, "stand is standing");

  var kids = [{ id: "a", spot: 4, moving: true }];
  var start = { teacher: "Asleep", laughMs: 0, kids: kids };
  var stirred = teacher.reduce(start, { type: "hostStir" });
  check(start.teacher === "Asleep" && kids[0].spot === 4 && kids[0].moving === true, "input kids stay put");
  check(stirred.state.kids === kids, "same kids array");
  check(stirred.state.teacher === "Starting to wake" && stirred.events.length === 0, "stir emits nothing");

  var tooSoon = teacher.reduce(start, { type: "hostLaughStart" });
  check(tooSoon.state.teacher === "Asleep" && tooSoon.events.length === 0, "laugh waits for the feather window");

  var laughing = teacher.reduce(stirred.state, { type: "hostLaughStart" });
  check(laughing.state.teacher === "Laughing for 5 seconds" && laughing.state.laughMs === 5000, "laugh is 5000 ms");
  check(laughing.state.kids[0].moving === true, "laugh does not freeze or move");

  var wakeDuring = teacher.reduce(laughing.state, { type: "hostWake" });
  var eyesDuring = teacher.reduce(laughing.state, { type: "hostEyes" });
  check(wakeDuring.state.teacher === "Laughing for 5 seconds" && wakeDuring.events.length === 0, "no freezeAll during the laugh");
  check(eyesDuring.state.teacher === "Laughing for 5 seconds" && eyesDuring.events.length === 0, "no catchMovers during the laugh");

  var slept = teacher.reduce(laughing.state, { type: "hostLaughEnd" });
  check(slept.state.teacher === "Asleep" && slept.state.laughMs === 0, "laugh ends asleep");

  var woke = teacher.reduce(slept.state, { type: "hostWake" });
  check(woke.events.length === 1 && woke.events[0].type === "freezeAll", "wakes up emits freezeAll");
  check(woke.state.teacher === "Wakes up" && woke.state.kids[0].spot === 4, "freezeAll does not move a kid");

  var eyesFromWake = teacher.reduce(woke.state, { type: "hostEyes" });
  check(eyesFromWake.state.teacher === "Wakes up" && eyesFromWake.events.length === 0, "eyes are not stacked on the wake");

  var asleepAgain = teacher.reduce(woke.state, { type: "hostSleep" });
  var eyes = teacher.reduce(asleepAgain.state, { type: "hostEyes" });
  check(eyes.events.length === 1 && eyes.events[0].type === "catchMovers", "eyes open emits catchMovers");
  check(eyes.state.teacher === "Eyes open" && eyes.state.kids[0].moving === true, "catchMovers does not move a kid");

  var fullWake = teacher.reduce(stirred.state, { type: "hostWake" });
  check(fullWake.state.teacher === "Wakes up" && fullWake.events[0].type === "freezeAll", "a full wake leaves the feather window");

  var stood = teacher.reduce({ teacher: "Asleep", laughMs: 0, kids: kids }, { type: "hostStand" });
  check(stood.state.teacher === "Standing into Phase B", "stand");
  var board = teacher.reduce(stood.state, { type: "hostActivity", payload: { activity: "board" } });
  check(board.state.teacher === "Facing the whiteboard", "board activity");
  var typed = teacher.reduce(stood.state, { type: "hostActivity", activity: "typing on a computer" });
  check(typed.state.teacher === "Typing", "typing activity");
  var read = teacher.reduce(stood.state, { type: "hostActivity", payload: { activity: "reading a big book" } });
  check(read.state.teacher === "Reading", "reading activity");
  var windowOpen = teacher.reduce(typed.state, { type: "hostActivity", payload: { activity: "Facing the whiteboard" } });
  check(windowOpen.state.teacher === "Facing the whiteboard", "typing turns to the whiteboard");
  var phaseFreeze = teacher.reduce(board.state, { type: "hostWake" });
  check(phaseFreeze.state.teacher === "Facing the whiteboard" && phaseFreeze.events.length === 0, "phase B does not use the pose");
  var looking = teacher.reduce(board.state, { type: "hostInvestigate" });
  check(looking.state.teacher === "Turned away investigating", "investigate does not freeze");
  check(looking.state.kids[0].spot === 4, "investigate does not move a kid");
  var back = teacher.reduce(looking.state, { type: "hostActivity", payload: { activity: "board" } });
  check(back.state.teacher === "Facing the whiteboard", "investigate turns back");

  if (failures) {
    console.error(failures + " failed");
    process.exit(1);
  }
  process.exit(0);
}
