/* Session frame. Classic script. CLASSROOM.modules.session.
   Authority: mega-requirements, then design/game-design.md, then design/01-session-architecture.md.
   Sets phase, beat, and finals only as those texts allow. UNKNOWN comes back as a gap. */

(function (root) {
  var PRIZES = {
    "a golden trophy": "a golden trophy",
    "golden trophy": "a golden trophy",
    "a toy": "a toy",
    "toy": "a toy",
    "a bucket of treats": "a bucket of treats",
    "bucket of treats": "a bucket of treats"
  };

  var ACTIVITIES = {
    "standing facing a whiteboard": "whiteboard",
    "standing facing the whiteboard": "whiteboard",
    "typing on a computer": "typing",
    "reading a big book": "reading"
  };

  var BLASTS = {
    "pop a safe party popper": "pop a safe party popper",
    "safe party popper": "pop a safe party popper",
    "throw a handful of paper confetti": "throw a handful of paper confetti",
    "throw a handful of paper confetti over the teacher's head": "throw a handful of paper confetti",
    "a handful of paper confetti": "throw a handful of paper confetti",
    "paper confetti": "throw a handful of paper confetti"
  };

  var SPRAYS = {
    "the teacher's desk": "the teacher's desk",
    "teacher's desk": "the teacher's desk",
    "the teacher's shoes": "the teacher's shoes",
    "teacher's shoes": "the teacher's shoes"
  };

  function norm(value) {
    if (typeof value !== "string") return "";
    return value.toLowerCase().replace(/[\u2018\u2019]/g, "'").replace(/\s+/g, " ").trim();
  }

  function lookup(table, value) {
    var key = norm(value);
    return Object.prototype.hasOwnProperty.call(table, key) ? table[key] : null;
  }

  function base(state) {
    var next = {};
    var src = state && typeof state === "object" ? state : {};
    var keys = Object.keys(src);
    var i;
    for (i = 0; i < keys.length; i++) next[keys[i]] = src[keys[i]];
    var finals = src.finals && typeof src.finals === "object" ? src.finals : {};
    next.finals = { a: finals.a === true, b: finals.b === true };
    if (!Object.prototype.hasOwnProperty.call(src, "phase")) next.phase = null;
    if (!Object.prototype.hasOwnProperty.call(src, "beat")) next.beat = 0;
    return next;
  }

  function pack(state, events, gaps) {
    return { state: state, events: events || [], gaps: gaps || [] };
  }

  function refused(state, text) {
    return pack(base(state), [{ type: "refused", text: text }], []);
  }

  function integerKids(value) {
    return typeof value === "number" && isFinite(value) && value === Math.floor(value) && value >= 2;
  }

  function restartSession(state) {
    var previous = state && typeof state === "object" ? state : {};
    var count = Array.isArray(previous.kids) ? previous.kids.length : previous.kids;
    var round = typeof previous.round === "number" && isFinite(previous.round) && previous.round >= 1 ? Math.floor(previous.round) : (previous.phase ? 1 : 0);
    var next = { phase: null, beat: 0, finals: { a: false, b: false }, round: round + 1,
      host: "teacher", kids: integerKids(count) ? count : 2, kidsAtRear: true, room: "classroom" };
    if (previous.picks && typeof previous.picks === "object") {
      next.picks = {};
      var names = ["prize", "noisemaker", "victory", "activity", "stringTarget"];
      next.picksLocked = true;
      for (var i = 0; i < names.length; i++) {
        next.picks[names[i]] = previous.picks[names[i]];
        if (typeof next.picks[names[i]] !== "string" || !next.picks[names[i]]) next.picksLocked = false;
      }
    }
    return pack(next, [{ type: "session-reset", text: "Round " + next.round + ". Ready to start Phase A." }], []);
  }

  function doodleWindow(activity) {
    if (activity === "whiteboard") return "turn away and then turn back";
    if (activity === "typing" || activity === "reading") return "turn to face the whiteboard";
    return null;
  }

  function startSession(state, action) {
    var current = base(state);
    if (current.phase === "A" || current.phase === "B" || current.phase === "won") {
      return refused(current, "One session. This one is already open.");
    }
    if (action.host != null && action.host !== "teacher") {
      return refused(current, "The teacher hosts. There is no other role.");
    }
    if (!integerKids(action.kids)) {
      return refused(current, "Two kids is the smallest group.");
    }

    var prize = lookup(PRIZES, action.prize);
    current.phase = "A";
    current.beat = 1;
    current.finals = { a: false, b: false };
    current.host = "teacher";
    current.round = typeof current.round === "number" && isFinite(current.round) && current.round >= 1 ? Math.floor(current.round) : 1;
    current.kids = action.kids;
    current.kidsAtRear = true;
    current.room = "classroom";
    if (prize) current.prize = prize;
    else delete current.prize;

    var gaps = [];
    if (!prize) {
      gaps.push({
        id: "target-prize",
        text: "Which target prize is guarded is still open. One of: a golden trophy, a toy, or a bucket of treats."
      });
    }
    return pack(current, [{
      type: "session-started",
      text: "One session. Phase A. The teacher is asleep at the desk, guarding the prize. The kids are at the back."
    }], gaps);
  }

  function markFinalA(state, action) {
    var current = base(state);
    if (current.phase !== "A") {
      return refused(current, "The confetti victory blast ends Phase A. It does not skip ahead, and it does not win the session.");
    }
    if (current.finals.a === true) {
      return pack(current, [{
        type: "phase-a-ended",
        text: "Phase A is over. The session is not won."
      }], []);
    }

    var blast = lookup(BLASTS, action.blast);
    current.finals = { a: true, b: current.finals.b === true };
    current.beat = 5;
    current.phase = "A";
    current.kidsAtRear = false;
    if (blast) current.blast = blast;

    var gaps = [{
      id: "beats-2-through-4",
      text: "How beats 2, 3, and 4 finish is UNKNOWN in this slice. They are not advanced here."
    }];
    if (!blast) {
      gaps.push({
        id: "victory-blast",
        text: "Which confetti victory blast was used is still open. Either the safe party popper or the handful of paper confetti counts."
      });
    }
    return pack(current, [{
      type: "phase-a-ended",
      text: "Phase A is over. The session is not won."
    }], gaps);
  }

  function beginPhaseB(state, action) {
    var current = base(state);
    if (current.phase === "B" || current.phase === "won") {
      return refused(current, "Phase B has already started.");
    }
    if (current.phase !== "A" || current.finals.a !== true) {
      return refused(current, "Phase B starts when Phase A ends on the claim. Beat 10 does not skip Phase A.");
    }
    if (action.kidsAtRear !== true) {
      var waiting = [];
      if (action.kidsAtRear == null) {
        waiting.push({
          id: "kids-at-rear",
          text: "Whether the kids are at the back yet is still open. Beat 6 waits until they are."
        });
      }
      return pack(current, [{
        type: "refused",
        text: "Beat 6 waits until the kids are at the back."
      }], waiting);
    }

    var activity = lookup(ACTIVITIES, action.activity);
    current.phase = "B";
    current.beat = 6;
    current.kidsAtRear = true;
    current.room = current.room || "classroom";
    if (activity) current.activity = activity;

    var gaps = [{
      id: "return-path",
      text: "The route from the desk to the back is UNKNOWN. The kids are at the back before beat 6."
    }, {
      id: "phase-b-objects",
      text: "When the Phase B objects are placed is UNKNOWN. This slice does not place them."
    }];
    if (!activity) {
      gaps.push({
        id: "strict-activity",
        text: "Which strict-teacher activity is in use is still open. One of: standing facing a whiteboard, typing on a computer, or reading a big book."
      });
      gaps.push({
        id: "doodle-window",
        text: "The beat 8 window depends on that activity. Facing the whiteboard: turn away and then turn back. Typing or reading: turn to face the whiteboard."
      });
    }
    return pack(current, [{
      type: "phase-b-started",
      text: "Phase B. Same room. Kids at the back. This teacher is now the strict teacher."
    }], gaps);
  }

  function markFinalB(state, action) {
    var current = base(state);
    if (current.phase === "won") {
      return pack(current, [{
        type: "session-won",
        text: "Phase B is won. The session is won."
      }], []);
    }
    if (current.phase !== "B") {
      return refused(current, "Beat 10 wins Phase B. It does not skip Phase A. The session is not won.");
    }

    var spray = lookup(SPRAYS, action.spray);
    var both = current.finals.a === true;
    current.finals = { a: both, b: true };
    current.beat = 10;
    if (both) current.phase = "won";
    if (spray) current.spray = spray;

    var events = [{ type: "phase-b-won", text: "Phase B is won." }];
    if (both) events.push({ type: "session-won", text: "The session is won." });
    else events.push({ type: "session-open", text: "The session is not won." });

    var gaps = [{
      id: "beats-7-through-9",
      text: "How beats 7, 8, and 9 finish is UNKNOWN in this slice. They are not advanced here."
    }];
    if (!spray) {
      gaps.push({
        id: "silly-string-target",
        text: "Which silly-string target was sprayed is still open. Either the teacher's desk or the teacher's shoes counts."
      });
    }
    return pack(current, events, gaps);
  }

  function reduce(state, action) {
    var act = action;
    if (typeof act === "string") act = { type: act };
    if (!act || typeof act !== "object") {
      return refused(state, "No action.");
    }
    if (act.type === "restartSession") return restartSession(state);
    if (act.type === "startSession") return startSession(state, act);
    if (act.type === "markFinalA") return markFinalA(state, act);
    if (act.type === "beginPhaseB") return beginPhaseB(state, act);
    if (act.type === "markFinalB") return markFinalB(state, act);
    return refused(state, "That action is not part of the session frame.");
  }

  function viewModel(state) {
    var current = base(state);
    var both = current.finals.a === true && current.finals.b === true && current.phase === "won";
    var teacher = null;
    if (current.phase === "A") {
      teacher = {
        posture: "asleep",
        place: "desk",
        front: true,
        guarding: current.finals.a !== true
      };
    } else if (current.phase === "B" || current.phase === "won") {
      teacher = {
        posture: "standing",
        manner: "strict",
        activity: current.activity || null
      };
    }
    var hostLine = null;
    if (current.phase === "A" && current.finals.a === true) hostLine = "Phase A is over. The session is not won.";
    else if (current.phase === "B") hostLine = "Phase B. Same room. Kids at the back. This teacher is now the strict teacher.";
    else if (both) hostLine = "Phase B is won. The session is won.";

    return {
      phase: current.phase,
      beat: current.beat,
      finals: { a: current.finals.a === true, b: current.finals.b === true },
      sessionWon: both,
      phaseBWon: current.finals.b === true && current.beat === 10,
      host: current.host === "teacher" ? "teacher" : null,
      kids: Array.isArray(current.kids) ? current.kids.length : (integerKids(current.kids) ? current.kids : 0),
      round: current.round || 1,
      kidsAtRear: current.kidsAtRear === true,
      room: current.room || null,
      teacher: teacher,
      board: current.phase ? "whiteboard" : null,
      doodleWindow: doodleWindow(current.activity),
      prize: current.prize || null,
      blast: current.blast || null,
      spray: current.spray || null,
      hostLine: hostLine
    };
  }

  var api = { reduce: reduce, viewModel: viewModel };
  var classroom = root.CLASSROOM || (root.CLASSROOM = {});
  classroom.modules = classroom.modules || {};
  classroom.modules.session = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof globalThis !== "undefined" ? globalThis : this);

if (typeof require !== "undefined" && require.main === module) {
  var session = globalThis.CLASSROOM.modules.session;
  var failures = 0;

  function check(cond, text) {
    if (!cond) {
      failures += 1;
      console.error("FAIL " + text);
    }
  }

  var empty = session.reduce(null, { type: "startSession", kids: 1 });
  check(empty.state.phase == null && empty.state.beat === 0, "one kid does not start");
  check(empty.state.finals.a === false && empty.state.finals.b === false, "refused start has no finale");

  var otherHost = session.reduce(null, { type: "startSession", kids: 2, host: "kid" });
  check(otherHost.state.phase == null, "a kid does not host");

  var started = session.reduce(null, { type: "startSession", kids: 2 });
  check(started.state.phase === "A", "phase A");
  check(started.state.beat === 1, "beat 1");
  check(started.state.host === "teacher", "teacher hosts");
  check(started.state.kids === 2, "two kids");
  check(started.state.kidsAtRear === true, "kids start at the back");
  check(started.state.room === "classroom", "one room");
  check(started.state.finals.a === false && started.state.finals.b === false, "no finales yet");
  check(session.viewModel(started.state).sessionWon === false, "start is not a win");
  check(started.gaps.some(function (gap) { return gap.id === "target-prize"; }), "unpicked prize stays a gap");

  var input = { phase: null, beat: 0, finals: { a: false, b: false }, plushOnMat: false };
  var kept = session.reduce(input, { type: "startSession", kids: 3, prize: "a golden trophy" });
  check(input.phase == null && input.plushOnMat === false, "input state is left as it was");
  check(kept.state.plushOnMat === false, "other slice fields stay");
  check(kept.state.kids === 3, "more than two kids share the role");
  check(kept.state.prize === "a golden trophy", "a named prize is kept");
  check(!kept.gaps.some(function (gap) { return gap.id === "target-prize"; }), "a named prize is not a gap");

  var again = session.reduce(kept.state, { type: "startSession", kids: 9 });
  check(again.state.kids === 3 && again.state.phase === "A", "a second start does not open another session");

  var earlyB = session.reduce(started.state, { type: "beginPhaseB", kidsAtRear: true });
  check(earlyB.state.phase === "A" && earlyB.state.beat === 1, "phase B waits for the claim");

  var earlyWin = session.reduce(started.state, { type: "markFinalB" });
  check(earlyWin.state.phase === "A" && earlyWin.state.finals.b === false, "beat 10 does not skip phase A");
  check(session.viewModel(earlyWin.state).sessionWon === false, "skipped finale is not a session win");

  var finalA = session.reduce(started.state, { type: "markFinalA" });
  check(finalA.state.phase === "A", "the blast leaves the session open");
  check(finalA.state.beat === 5, "the claim is beat 5");
  check(finalA.state.finals.a === true && finalA.state.finals.b === false, "only finale A");
  check(finalA.state.kidsAtRear === false, "the claim is at the desk");
  check(session.viewModel(finalA.state).sessionWon === false, "finale A is not the session win");
  check(session.viewModel(finalA.state).hostLine === "Phase A is over. The session is not won.", "host line after the blast");

  var notRear = session.reduce(finalA.state, { type: "beginPhaseB", kidsAtRear: false });
  check(notRear.state.phase === "A" && notRear.state.beat === 5, "beat 6 does not start away from the back");

  var omittedRear = session.reduce(finalA.state, { type: "beginPhaseB" });
  check(omittedRear.state.beat === 5, "an unstated rear position does not start beat 6");
  check(omittedRear.gaps.some(function (gap) { return gap.id === "kids-at-rear"; }), "unstated rear position is a gap");

  var phaseB = session.reduce(finalA.state, {
    type: "beginPhaseB",
    kidsAtRear: true,
    activity: "reading a big book"
  });
  check(phaseB.state.phase === "B" && phaseB.state.beat === 6, "beat 6 from the back");
  check(phaseB.state.kidsAtRear === true, "kids are at the rear for beat 6");
  check(phaseB.state.room === "classroom", "phase B stays in the room");
  check(phaseB.state.finals.a === true && phaseB.state.phase !== "won", "phase B is not the session win");
  check(session.viewModel(phaseB.state).teacher.posture === "standing", "the teacher stands");
  check(session.viewModel(phaseB.state).teacher.manner === "strict", "the teacher is strict");
  check(session.viewModel(phaseB.state).doodleWindow === "turn to face the whiteboard", "typing or reading opens on the turn toward the board");
  check(session.viewModel(phaseB.state).board === "whiteboard", "the board is the whiteboard");

  var facing = session.reduce(finalA.state, {
    type: "beginPhaseB",
    kidsAtRear: true,
    activity: "standing facing a whiteboard"
  });
  check(session.viewModel(facing.state).doodleWindow === "turn away and then turn back", "already facing the board turns away and back");

  var badActivity = session.reduce(finalA.state, {
    type: "beginPhaseB",
    kidsAtRear: true,
    activity: "a second board"
  });
  check(!badActivity.state.activity, "a second board is not an activity");
  check(badActivity.gaps.some(function (gap) { return gap.id === "doodle-window"; }), "the window stays open as a gap");

  var won = session.reduce(phaseB.state, { type: "markFinalB", spray: "the teacher's desk" });
  check(won.state.phase === "won", "both finales win the session");
  check(won.state.beat === 10, "beat 10");
  check(won.state.finals.a === true && won.state.finals.b === true, "both finale flags");
  check(session.viewModel(won.state).sessionWon === true, "view agrees the session is won");
  check(session.viewModel(won.state).phaseBWon === true, "beat 10 wins phase B");
  check(won.state.spray === "the teacher's desk", "the desk from phase A can be the spray");

  var onlyB = session.reduce({
    phase: "B",
    beat: 6,
    finals: { a: false, b: false },
    kidsAtRear: true,
    host: "teacher",
    kids: 2,
    room: "classroom"
  }, { type: "markFinalB" });
  check(onlyB.state.phase === "B" && onlyB.state.finals.b === true, "finale B without the blast stays phase B");
  check(session.viewModel(onlyB.state).sessionWon === false, "one finale does not win the session");

  var stopped = session.reduce(won.state, { type: "startSession", kids: 2 });
  check(stopped.state.phase === "won" && stopped.state.kids === won.state.kids, "play stops when the session is won");

  if (failures) {
    console.error(failures + " failed");
    process.exit(1);
  }
  console.log("ok");
}
