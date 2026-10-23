/* Wires teacher events into movement for game-v2.
   Binding (design/04 + design/05):
   - Starting to wake = feather window only (no freeze, no catch)
   - Wakes up → freezeAll (every kid pose)
   - Eyes open → catchMovers (statue for movers)
   - Laughing for 5 seconds → laughWindow open (kids may move)
   - Caught kid laugh → three-step send-back (movement.kidLaugh only)
   No other penalty is invented here. */
(function (root) {
  "use strict";

  var CLASSROOM = root.CLASSROOM || (root.CLASSROOM = {});

  var FOLLOW = {
    freezeAll: true,
    catchMovers: true,
    standUp: true,
    asleep: true,
    eyesShut: true,
    laughWindow: true
  };

  function followUps(events) {
    var extra = [];
    var i;
    var ev;
    var type;
    if (!events || !events.length) return extra;
    for (i = 0; i < events.length; i++) {
      ev = events[i];
      type = ev && ev.type;
      if (!FOLLOW[type]) continue;
      if (type === "laughWindow") {
        extra.push({ type: "laughWindow", open: ev.open === true });
      } else {
        extra.push({ type: type });
      }
    }
    return extra;
  }

  function unwrap(out, prev) {
    if (!out || typeof out !== "object") return { state: prev, events: [] };
    if (Object.prototype.hasOwnProperty.call(out, "state")) {
      return { state: out.state, events: out.events || [] };
    }
    return { state: out, events: out.events || [] };
  }

  function foldTeacherMove(state, action) {
    var teacher = CLASSROOM.teacher;
    var movement = CLASSROOM.movement;
    var current = state && typeof state === "object" ? state : {};
    var step;
    var pending = [];
    var guard = 0;
    var next;
    var packet;

    if (teacher && typeof teacher.reduce === "function") {
      step = unwrap(teacher.reduce(current, action), current);
      current = step.state;
      pending = pending.concat(followUps(step.events));
      packet = step;
    }

    if (movement && typeof movement.reduce === "function") {
      current = movement.reduce(current, action);
      while (pending.length && guard < 6) {
        next = pending.shift();
        guard += 1;
        current = movement.reduce(current, next);
      }
    }

    return {
      state: current,
      events: packet && packet.events ? packet.events : [],
      pending: []
    };
  }

  /* Page fold in index.html already runs teacher.reduce + movement.reduce
     and applies followUps. fold() is for harness / node checks only.
     reduce is intentionally omitted so the page does not double-apply. */
  CLASSROOM.teacherMove = {
    fold: foldTeacherMove,
    followUps: followUps
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = CLASSROOM.teacherMove;
  }
})(typeof globalThis !== "undefined" ? globalThis : this);

if (typeof require !== "undefined" && require.main === module) {
  require("../../game-slices/05-movement/module.js");
  require("../../game-slices/04-teacher/module.js");
  require("./teacher.js");
  require("./movement.js");
  require("./teacher-move-bind.js");

  var fold = globalThis.CLASSROOM.teacherMove.fold;
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

  function kid(state, id) {
    var i;
    for (i = 0; i < state.kids.length; i++) {
      if (state.kids[i].id === id) return state.kids[i];
    }
    return null;
  }

  var state = {
    teacher: "Asleep",
    laughMs: 0,
    laughOpen: false,
    standing: false,
    kids: [
      { id: "a", spot: 2, moving: false, frozen: false, statue: false },
      { id: "b", spot: 1, moving: false, frozen: false, statue: false }
    ],
    sentBack: {}
  };

  state = fold(state, { type: "hostStir" }).state;
  check(state.teacher === "Starting to wake", "stir is feather state");
  check(state.kids[0].frozen === false && state.kids[1].frozen === false, "stir freezes nobody");

  state = fold(state, { type: "kidStep", id: "a" }).state;
  check(kid(state, "a").spot === 3 && kid(state, "a").moving === true, "step during stir");

  state = fold(state, { type: "hostLaughStart" }).state;
  check(state.teacher === "Laughing for 5 seconds" && state.laughOpen === true, "laugh opens window");
  state = fold(state, { type: "kidStep", id: "b" }).state;
  check(kid(state, "b").spot === 2 && kid(state, "b").moving === true, "kids may move during laugh");
  state = fold(state, { type: "hostWake" }).state;
  check(state.teacher === "Laughing for 5 seconds" && kid(state, "a").frozen === false, "wake skipped in laugh");
  state = fold(state, { type: "hostEyes" }).state;
  check(state.teacher === "Laughing for 5 seconds" && kid(state, "a").statue === false, "eyes skipped in laugh");

  state = fold(state, { type: "hostLaughEnd" }).state;
  check(state.teacher === "Asleep" && state.laughOpen === false, "laugh ends");

  state = fold(state, { type: "kidStill", id: "a" }).state;
  state = fold(state, { type: "kidStill", id: "b" }).state;
  state = fold(state, { type: "kidStep", id: "a" }).state;
  state = fold(state, { type: "hostWake" }).state;
  check(state.teacher === "Wakes up", "wake state");
  check(kid(state, "a").frozen === true && kid(state, "b").frozen === true, "wake freezes all");
  check(kid(state, "a").statue === false && kid(state, "a").spot === 4, "wake is pose not statue or send-back");

  state = fold(state, { type: "hostSleep" }).state;
  check(state.teacher === "Asleep" && kid(state, "a").frozen === false, "asleep clears freeze");

  state = fold(state, { type: "kidStep", id: "a" }).state;
  state = fold(state, { type: "kidStill", id: "b" }).state;
  state = fold(state, { type: "hostEyes" }).state;
  check(state.teacher === "Eyes open", "eyes state");
  check(kid(state, "a").statue === true && kid(state, "b").statue === false, "eyes catches movers only");
  check(kid(state, "a").spot === 5 && kid(state, "b").spot === 2, "catch does not move");

  state = fold(state, { type: "kidLaugh", id: "a" }).state;
  check(kid(state, "a").spot === 2, "three-step send-back");
  check(kid(state, "b").spot === 2, "neighbor stays");
  state = fold(state, { type: "kidLaugh", id: "b" }).state;
  check(kid(state, "b").spot === 2, "uncatched laugh is not send-back");

  state = fold(state, { type: "hostSleep" }).state;
  check(kid(state, "a").statue === false, "eyesShut clears statue");

  if (failures) {
    console.error(failures + " failed");
    process.exit(1);
  }
  console.log("teacher-move-bind: " + passed + " checks passed");
  process.exit(0);
}
