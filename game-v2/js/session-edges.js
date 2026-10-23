/* Session frame + pacing edges for game-v2.
   Loads CLASSROOM.modules.session and CLASSROOM.modules.edges into one dispatch.
   Other slices (phase A/B, teacher, room) may also reduce; this file only owns
   the session seam and the five edges / one-kid gaps. */

(function (root) {
  "use strict";

  var CLASSROOM = root.CLASSROOM || (root.CLASSROOM = {});
  CLASSROOM.modules = CLASSROOM.modules || {};

  function unwrap(out, prev) {
    if (!out || typeof out !== "object") return { state: prev, events: [], gaps: [], packet: null };
    var packed = Object.prototype.hasOwnProperty.call(out, "state") &&
      (Object.prototype.hasOwnProperty.call(out, "events") || Object.prototype.hasOwnProperty.call(out, "gaps"));
    if (packed) {
      return {
        state: out.state,
        events: out.events || [],
        gaps: out.gaps || [],
        packet: out
      };
    }
    return { state: out, events: out.events || [], gaps: out.gaps || [], packet: null };
  }

  function owned(type) {
    var sessionTypes = {
      startSession: 1,
      markFinalA: 1,
      beginPhaseB: 1,
      markFinalB: 1
    };
    /* Integrator (docs win): Phase A owns hostStir / beat2Throw / beat2LaughEnd.
       Phase B owns beat7Pass / beat9Yell. Edges keep only the named edge actions
       and one-kid gap probes (edgeLinePass / beat9Crawl / firstTouch). Routing
       beat2* through edges advanced beat before Phase A cleared laughing. */
    var edgeTypes = {
      edgeNeverStir: 1,
      neverStir: 1,
      edgeNeverTurn: 1,
      neverTurn: 1,
      edgeSunglassesDrop: 1,
      sunglassesDrop: 1,
      edgeLinePass: 1,
      edgeNoteNoticed: 1,
      noteNoticed: 1,
      edgeLaughDuringFive: 1,
      laughDuringFive: 1,
      edgeOtherCrawl: 1,
      beat9Crawl: 1,
      firstTouch: 1
    };
    return { session: !!sessionTypes[type], edge: !!edgeTypes[type] };
  }

  function foldSessionEdges(state, action) {
    var current = state && typeof state === "object" ? state : {};
    var act = action;
    if (typeof act === "string") act = { type: act };
    if (!act || typeof act !== "object" || !act.type) {
      return { state: current, events: [{ type: "refused", text: "No action." }], gaps: [], packet: null };
    }

    var who = owned(act.type);
    var session = CLASSROOM.modules.session;
    var edges = CLASSROOM.modules.edges;
    var events = [];
    var gaps = [];
    var packet = null;
    var step;

    if (who.session && session && typeof session.reduce === "function") {
      step = unwrap(session.reduce(current, act), current);
      current = step.state;
      events = events.concat(step.events);
      gaps = gaps.concat(step.gaps);
      packet = step.packet;
    }

    if (who.edge && edges && typeof edges.reduce === "function") {
      step = unwrap(edges.reduce(current, act), current);
      current = step.state;
      events = events.concat(step.events);
      gaps = gaps.concat(step.gaps);
      if (step.packet) packet = step.packet;
    }

    if (!who.session && !who.edge) {
      return {
        state: current,
        events: [{ type: "pass", text: "Not a session or edges action." }],
        gaps: [],
        packet: null
      };
    }

    return {
      state: current,
      events: events,
      gaps: gaps,
      packet: packet || { state: current, events: events, gaps: gaps }
    };
  }

  function view(state) {
    var session = CLASSROOM.modules.session;
    var edges = CLASSROOM.modules.edges;
    var out = {};
    if (session && typeof session.viewModel === "function") {
      out.session = session.viewModel(state);
    }
    if (edges && typeof edges.viewModel === "function") {
      out.edges = edges.viewModel(state);
    }
    out.sessionWon = !!(out.session && out.session.sessionWon);
    out.kidsAtRear = !!(out.session && out.session.kidsAtRear);
    out.phase = out.session ? out.session.phase : null;
    out.beat = out.session ? out.session.beat : 0;
    out.finals = out.session ? out.session.finals : { a: false, b: false };
    out.hostLine = out.session ? out.session.hostLine : null;
    return out;
  }

  CLASSROOM.sessionEdges = {
    reduce: foldSessionEdges,
    viewModel: view,
    owned: owned
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = CLASSROOM.sessionEdges;
  }
})(typeof globalThis !== "undefined" ? globalThis : this);

if (typeof require !== "undefined" && require.main === module) {
  require("../../game-slices/01-session/module.js");
  require("../../game-slices/09-edges/module.js");
  var wire = globalThis.CLASSROOM.sessionEdges;
  var failures = 0;

  function check(cond, text) {
    if (!cond) {
      failures += 1;
      console.error("FAIL " + text);
    }
  }

  var one = wire.reduce(null, { type: "startSession", kids: 1 });
  check(one.state.phase == null, "min two kids");

  var started = wire.reduce(null, { type: "startSession", kids: 2, prize: "a golden trophy" });
  check(started.state.phase === "A" && started.state.beat === 1, "session starts in phase A");
  check(started.state.kidsAtRear === true, "kids start at the rear");

  var blast = wire.reduce(started.state, { type: "markFinalA", blast: "pop a safe party popper" });
  check(blast.state.finals.a === true && wire.viewModel(blast.state).sessionWon === false, "finale A is not session won");

  var blocked = wire.reduce(blast.state, { type: "beginPhaseB", kidsAtRear: false });
  check(blocked.state.phase === "A", "handoff waits for kids at rear");

  var phaseB = wire.reduce(blast.state, {
    type: "beginPhaseB",
    kidsAtRear: true,
    activity: "reading a big book"
  });
  check(phaseB.state.phase === "B" && phaseB.state.beat === 6, "beat 6 from the rear");

  var solo = wire.reduce(Object.assign({}, phaseB.state, { beat: 7 }), {
    type: "beat7Pass",
    kids: 1,
    feet: true,
    dropped: false
  });
  check(solo.state.edges && solo.state.edges.recorded.indexOf("one-kid-line-pass") !== -1, "one-kid line gap");

  var crawl = wire.reduce(Object.assign({}, phaseB.state, { beat: 9 }), {
    type: "beat9Crawl",
    kids: 1,
    yellDone: true,
    crawl: true
  });
  check(crawl.state.edges && crawl.state.edges.recorded.indexOf("one-kid-other-crawl") !== -1, "one-kid crawl gap");

  var won = wire.reduce(phaseB.state, { type: "markFinalB", spray: "the teacher's desk" });
  check(won.state.phase === "won" && wire.viewModel(won.state).sessionWon === true, "both finales win the session");

  if (failures) {
    console.error(failures + " failed");
    process.exit(1);
  }
  console.log("ok");
}
