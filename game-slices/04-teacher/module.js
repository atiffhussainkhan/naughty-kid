/* Teacher states. Classic script. CLASSROOM.modules.teacher.
   Authority: design/04-teacher-states.md, then mega-requirements.
   Ten states. Starting to wake is only the feather window.
   Wakes up emits freezeAll. Eyes open emits catchMovers.
   During Laughing for 5 seconds, kids may move — no freezeAll, no catchMovers.
   This module does not move kids and invents no penalties. */
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

  var TEN = [ASLEEP, STIR, LAUGH, WAKE, EYES, STAND, BOARD, TYPING, READING, LOOK];

  var ACTIVITIES = {};
  ACTIVITIES[BOARD] = true;
  ACTIVITIES[TYPING] = true;
  ACTIVITIES[READING] = true;

  var KNOWN = {};
  var i;
  for (i = 0; i < TEN.length; i++) KNOWN[TEN[i]] = true;

  var ALIAS = {
    "asleep": ASLEEP,
    "starting to wake": STIR,
    "starts to wake": STIR,
    "start to wake": STIR,
    "stir": STIR,
    "laughing for 5 seconds": LAUGH,
    "laughing 5s": LAUGH,
    "laughing": LAUGH,
    "laugh": LAUGH,
    "wakes up": WAKE,
    "wake": WAKE,
    "eyes open": EYES,
    "opens their eyes": EYES,
    "standing into phase b": STAND,
    "stand": STAND,
    "facing the whiteboard": BOARD,
    "facing whiteboard": BOARD,
    "whiteboard": BOARD,
    "board": BOARD,
    "standing facing a whiteboard": BOARD,
    "standing facing the whiteboard": BOARD,
    "typing": TYPING,
    "typing on a computer": TYPING,
    "reading": READING,
    "reading a big book": READING,
    "turned away investigating": LOOK,
    "investigating": LOOK,
    "listen": LOOK
  };

  var POSES = {};
  POSES[ASLEEP] = { pose: "asleep", seated: true, place: "desk", eyes: "closed", facing: "desk", strict: false, featherWindow: false };
  POSES[STIR] = { pose: "stir", seated: true, place: "desk", eyes: "closed", facing: "desk", strict: false, featherWindow: true };
  POSES[LAUGH] = { pose: "laugh", seated: true, place: "desk", eyes: null, facing: "desk", strict: false, featherWindow: false, laughMs: LAUGH_MS };
  POSES[WAKE] = { pose: "awake", seated: true, place: "desk", eyes: null, facing: "desk", strict: false, featherWindow: false };
  POSES[EYES] = { pose: "eyes", seated: true, place: "desk", eyes: "open", facing: "desk", strict: false, featherWindow: false };
  POSES[STAND] = { pose: "stand", seated: false, place: "standing", eyes: null, facing: null, strict: true, featherWindow: false };
  POSES[BOARD] = { pose: "board", seated: false, place: "standing", eyes: null, facing: "whiteboard", strict: true, featherWindow: false };
  POSES[TYPING] = { pose: "typing", seated: false, place: "standing", eyes: null, facing: "computer", strict: true, featherWindow: false };
  POSES[READING] = { pose: "reading", seated: false, place: "standing", eyes: null, facing: "book", strict: true, featherWindow: false };
  POSES[LOOK] = { pose: "investigate", seated: false, place: "standing", eyes: null, facing: "away", strict: true, featherWindow: false };

  function norm(value) {
    return String(value == null ? "" : value).replace(/[\u2019\u2018]/g, "'").replace(/\s+/g, " ").trim().toLowerCase();
  }

  function resolveName(raw) {
    if (typeof raw !== "string") return null;
    if (KNOWN[raw]) return raw;
    return ALIAS[norm(raw)] || null;
  }

  function unwrap(state) {
    if (!state || typeof state !== "object") return {};
    if (typeof state.teacher !== "string" && state.state && typeof state.state.teacher === "string") {
      return state.state;
    }
    return state;
  }

  function copy(state) {
    var src = unwrap(state);
    var next = {};
    var keys = Object.keys(src);
    var k;
    for (k = 0; k < keys.length; k++) next[keys[k]] = src[keys[k]];
    return next;
  }

  function teacherOf(state) {
    var resolved = resolveName(unwrap(state).teacher);
    return resolved || ASLEEP;
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
    next.laughOpen = teacher === LAUGH;
    return { state: next, events: events || [] };
  }

  function keep(state) {
    var teacher = teacherOf(state);
    return pack(state, teacher, laughOf(state, teacher), []);
  }

  function phaseB(teacher) {
    return teacher === STAND || teacher === BOARD || teacher === TYPING || teacher === READING || teacher === LOOK;
  }

  function activityFrom(action) {
    if (!action || typeof action !== "object") return null;
    var raw = action.activity;
    if (raw == null && action.payload && typeof action.payload === "object") {
      raw = action.payload.activity;
    }
    return resolveName(raw);
  }

  function actionOf(action) {
    if (typeof action === "string") return { type: action };
    if (!action || typeof action !== "object") return { type: "" };
    return action;
  }

  function hostStir(state) {
    if (teacherOf(state) !== ASLEEP) return keep(state);
    return pack(state, STIR, 0, []);
  }

  function hostLaughStart(state) {
    if (teacherOf(state) !== STIR) return keep(state);
    return pack(state, LAUGH, LAUGH_MS, [{ type: "laughWindow", open: true }]);
  }

  function hostLaughEnd(state) {
    if (teacherOf(state) !== LAUGH) return keep(state);
    return pack(state, ASLEEP, 0, [{ type: "laughWindow", open: false }]);
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
    var events;
    if (teacher === LAUGH || phaseB(teacher)) return keep(state);
    if (teacher !== WAKE && teacher !== EYES && teacher !== STIR) return keep(state);
    events = [];
    if (teacher === WAKE) events.push({ type: "asleep" });
    if (teacher === EYES) events.push({ type: "eyesShut" });
    return pack(state, ASLEEP, 0, events);
  }

  function hostStand(state) {
    if (teacherOf(state) !== ASLEEP) return keep(state);
    return pack(state, STAND, 0, [{ type: "standUp" }]);
  }

  function hostActivity(state, action) {
    var name = activityFrom(action);
    var teacher = teacherOf(state);
    if (!name || !ACTIVITIES[name]) return keep(state);
    if (teacher === STAND || teacher === LOOK) return pack(state, name, 0, []);
    if ((teacher === TYPING || teacher === READING) && name === BOARD) {
      return pack(state, BOARD, 0, []);
    }
    if (teacher === BOARD && name === BOARD) return pack(state, BOARD, 0, []);
    return keep(state);
  }

  function hostInvestigate(state) {
    if (!ACTIVITIES[teacherOf(state)]) return keep(state);
    return pack(state, LOOK, 0, []);
  }

  function reduce(state, action) {
    var act = actionOf(action);
    var type = act.type;
    if (type === "hostStir") return hostStir(state);
    if (type === "hostLaughStart") return hostLaughStart(state);
    if (type === "hostLaughEnd") return hostLaughEnd(state);
    if (type === "hostWake") return hostWake(state);
    if (type === "hostEyes") return hostEyes(state);
    if (type === "hostSleep") return hostSleep(state);
    if (type === "hostStand") return hostStand(state);
    if (type === "hostActivity") return hostActivity(state, act);
    if (type === "hostInvestigate") return hostInvestigate(state);
    return keep(state);
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

  function viewModel(state) {
    var teacher = teacherOf(state);
    var pose = poseFor(state);
    var shortName = teacher;
    if (teacher === LAUGH) shortName = "Laughing";
    return {
      teacher: teacher,
      short: shortName,
      states: TEN.slice(),
      pose: pose.pose,
      seated: pose.seated,
      place: pose.place,
      eyes: pose.eyes,
      facing: pose.facing,
      strict: pose.strict,
      featherWindow: pose.featherWindow === true,
      laughOpen: teacher === LAUGH,
      laughMs: pose.laughMs,
      wakeFreezes: teacher === WAKE,
      eyesCatchMovers: teacher === EYES,
      phaseB: phaseB(teacher),
      board: "whiteboard"
    };
  }

  var api = {
    reduce: reduce,
    viewModel: viewModel,
    poseFor: poseFor,
    states: TEN.slice(),
    hostStir: hostStir,
    hostLaughStart: hostLaughStart,
    hostLaughEnd: hostLaughEnd,
    hostWake: hostWake,
    hostEyes: hostEyes,
    hostSleep: hostSleep,
    hostStand: hostStand,
    hostActivity: hostActivity,
    hostInvestigate: hostInvestigate
  };

  var classroom = root.CLASSROOM || (root.CLASSROOM = {});
  classroom.modules = classroom.modules || {};
  classroom.modules.teacher = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof globalThis !== "undefined" ? globalThis : this);

if (typeof require !== "undefined" && require.main === module) {
  var teacher = globalThis.CLASSROOM.modules.teacher;
  var failures = 0;
  var passed = 0;

  function check(cond, text) {
    if (!cond) {
      failures += 1;
      console.error("FAIL " + text);
    } else {
      passed += 1;
    }
  }

  check(teacher.states.length === 10, "ten states");
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
    check(teacher.states[n] === names[n], "state order " + names[n]);
    var posed = teacher.poseFor({ teacher: names[n] });
    check(posed.state === names[n], "pose state " + names[n]);
    check(typeof posed.pose === "string" && !seen[posed.pose], "unique pose " + names[n]);
    seen[posed.pose] = true;
  }

  check(teacher.poseFor({ teacher: "Starting to wake" }).featherWindow === true, "stir is feather window");
  check(teacher.poseFor({ teacher: "Asleep" }).featherWindow === false, "asleep is not feather");
  check(teacher.poseFor({ teacher: "Laughing for 5 seconds" }).laughMs === 5000, "laugh is 5s");
  check(teacher.viewModel({ teacher: "Laughing 5s" }).teacher === "Laughing for 5 seconds", "alias laughing 5s");
  check(teacher.viewModel({ teacher: "Facing whiteboard" }).teacher === "Facing the whiteboard", "alias board");

  var kids = [{ id: "a", spot: 4, moving: true }];
  var start = { teacher: "Asleep", laughMs: 0, kids: kids };
  var stirred = teacher.reduce(start, { type: "hostStir" });
  check(start.teacher === "Asleep" && kids[0].spot === 4, "input kids stay put");
  check(stirred.state.teacher === "Starting to wake" && stirred.events.length === 0, "stir emits nothing");
  check(teacher.viewModel(stirred.state).featherWindow === true, "stir view is feather");

  var tooSoon = teacher.reduce(start, { type: "hostLaughStart" });
  check(tooSoon.state.teacher === "Asleep", "laugh waits for stir");

  var laughing = teacher.reduce(stirred.state, { type: "hostLaughStart" });
  check(laughing.state.teacher === "Laughing for 5 seconds" && laughing.state.laughMs === 5000, "laugh starts");
  check(laughing.state.laughOpen === true, "laughOpen flag");
  check(laughing.events.length === 1 && laughing.events[0].type === "laughWindow" && laughing.events[0].open === true, "laugh opens window event");
  check(laughing.state.kids[0].moving === true && laughing.state.kids[0].spot === 4, "laugh does not move kids");

  var wakeDuring = teacher.reduce(laughing.state, { type: "hostWake" });
  var eyesDuring = teacher.reduce(laughing.state, { type: "hostEyes" });
  check(wakeDuring.state.teacher === "Laughing for 5 seconds" && wakeDuring.events.length === 0, "no freeze during laugh");
  check(eyesDuring.state.teacher === "Laughing for 5 seconds" && eyesDuring.events.length === 0, "no catch during laugh");

  var slept = teacher.reduce(laughing.state, { type: "hostLaughEnd" });
  check(slept.state.teacher === "Asleep" && slept.state.laughMs === 0, "laugh ends asleep");
  check(slept.events[0] && slept.events[0].type === "laughWindow" && slept.events[0].open === false, "laugh closes window");

  var woke = teacher.reduce(slept.state, { type: "hostWake" });
  check(woke.events.length === 1 && woke.events[0].type === "freezeAll", "wake emits freezeAll");
  check(woke.state.teacher === "Wakes up" && woke.state.kids[0].spot === 4, "freezeAll does not move");

  var eyesFromWake = teacher.reduce(woke.state, { type: "hostEyes" });
  check(eyesFromWake.state.teacher === "Wakes up" && eyesFromWake.events.length === 0, "eyes not stacked on wake");

  var asleepAgain = teacher.reduce(woke.state, { type: "hostSleep" });
  var eyes = teacher.reduce(asleepAgain.state, { type: "hostEyes" });
  check(eyes.events.length === 1 && eyes.events[0].type === "catchMovers", "eyes emits catchMovers");
  check(eyes.state.teacher === "Eyes open" && eyes.state.kids[0].moving === true, "catch does not move");

  var fromStir = teacher.reduce(stirred.state, { type: "hostWake" });
  check(fromStir.state.teacher === "Wakes up" && fromStir.events[0].type === "freezeAll", "wake leaves feather window");

  var stood = teacher.reduce({ teacher: "Asleep", laughMs: 0, kids: kids }, { type: "hostStand" });
  check(stood.state.teacher === "Standing into Phase B", "stand");
  check(stood.events.length === 1 && stood.events[0].type === "standUp", "stand emits standUp");
  var board = teacher.reduce(stood.state, { type: "hostActivity", payload: { activity: "board" } });
  check(board.state.teacher === "Facing the whiteboard", "board activity");
  var typed = teacher.reduce(stood.state, { type: "hostActivity", activity: "typing on a computer" });
  check(typed.state.teacher === "Typing", "typing");
  var read = teacher.reduce(stood.state, { type: "hostActivity", payload: { activity: "reading a big book" } });
  check(read.state.teacher === "Reading", "reading");
  var windowOpen = teacher.reduce(typed.state, { type: "hostActivity", payload: { activity: "Facing the whiteboard" } });
  check(windowOpen.state.teacher === "Facing the whiteboard", "doodle turn to board");
  var phaseFreeze = teacher.reduce(board.state, { type: "hostWake" });
  check(phaseFreeze.state.teacher === "Facing the whiteboard" && phaseFreeze.events.length === 0, "phase B no pose");
  var looking = teacher.reduce(board.state, { type: "hostInvestigate" });
  check(looking.state.teacher === "Turned away investigating", "investigate");
  check(looking.state.kids[0].spot === 4, "investigate does not move");
  var back = teacher.reduce(looking.state, { type: "hostActivity", payload: { activity: "board" } });
  check(back.state.teacher === "Facing the whiteboard", "back from investigate");

  if (failures) {
    console.error(failures + " failed");
    process.exit(1);
  }
  console.log("teacher: " + passed + " checks passed");
  process.exit(0);
}
