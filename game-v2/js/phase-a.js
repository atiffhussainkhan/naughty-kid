/* Phase A beats 1–5 for game-v2.
   Classic script. Prefers CLASSROOM.modules.phaseA from game-slices/02-phase-a.
   Also exposes CLASSROOM.phaseA.reduce for the shared fold used by the integrator.
   Authority: mega-requirements, design/game-design.md, design/02-phase-a.md.
   Squeaky walk, plush + 5s laugh, statue, sticky note, prize + blast.
   Claim ends Phase A only. Session win waits for both finales. */

(function (root) {
  "use strict";

  var CLASSROOM = root.CLASSROOM || (root.CLASSROOM = {});
  CLASSROOM.modules = CLASSROOM.modules || {};

  function loadSlice() {
    if (CLASSROOM.modules.phaseA && typeof CLASSROOM.modules.phaseA.reduce === "function") {
      return CLASSROOM.modules.phaseA;
    }
    if (typeof require === "function") {
      try {
        var loaded = require("../../game-slices/02-phase-a/module.js");
        if (loaded && typeof loaded.reduce === "function") {
          CLASSROOM.modules.phaseA = loaded;
          return loaded;
        }
      } catch (err) {
        /* Browser build may load the slice with a script tag first. */
      }
    }
    return CLASSROOM.modules.phaseA || null;
  }

  function unwrap(packet, prev) {
    if (!packet || typeof packet !== "object") return prev;
    if (Object.prototype.hasOwnProperty.call(packet, "state") &&
        (Object.prototype.hasOwnProperty.call(packet, "events") ||
         Object.prototype.hasOwnProperty.call(packet, "gaps"))) {
      var next = packet.state;
      if (packet.events) next.events = packet.events;
      if (packet.gaps) next.gaps = packet.gaps;
      return next;
    }
    return packet;
  }

  function reduce(state, action) {
    var api = loadSlice();
    if (!api || typeof api.reduce !== "function") {
      var empty = state && typeof state === "object" ? state : {};
      empty.events = [{ type: "refused", text: "Phase A slice is not loaded." }];
      empty.gaps = [{
        id: "phase-a-slice",
        text: "Load game-slices/02-phase-a/module.js before game-v2/js/phase-a.js."
      }];
      return empty;
    }
    return unwrap(api.reduce(state, action), state);
  }

  function viewModel(state) {
    var api = loadSlice();
    if (api && typeof api.viewModel === "function") return api.viewModel(state);
    return {
      phase: state && state.phase,
      beat: state && state.beat,
      phaseAEnded: !!(state && state.finals && (state.finals.a || state.finals.confetti)),
      sessionWon: false,
      hostLine: null
    };
  }

  function syncBeats(state) {
    var vm = viewModel(state);
    var beat = vm.beat || 0;
    var flags = {
      beat: beat,
      title: vm.title || null,
      underFootVisible: beat === 1 && !!vm.underFoot,
      underFootKind: vm.underFoot || null,
      plushInHand: beat === 2 && vm.plushOnMat !== true,
      plushOnMat: vm.plushOnMat === true,
      shieldMatNamed: beat >= 1 && beat <= 2,
      checkpointLine: beat >= 1 && beat <= 5,
      linePassed: vm.linePassed === true,
      stickyNoteReady: beat === 4 && vm.noteOnBack !== true,
      stickyNoteOnBack: vm.noteOnBack === true,
      prizeOnDesk: vm.prizeClaimed !== true,
      prizeClaimed: vm.prizeClaimed === true,
      blastReady: beat === 5 && vm.prizeClaimed !== true,
      blastUsed: !!vm.blast,
      blast: vm.blast || null,
      kidsMayMove: vm.mayMove === true,
      frozen: vm.frozen === true,
      statue: vm.eyesOpened === true && vm.caught && vm.caught.length > 0,
      statuePose: vm.statuePose || null,
      phaseAEnded: vm.phaseAEnded === true,
      sessionWon: false
    };

    if (CLASSROOM.props && typeof CLASSROOM.props.applyPhaseA === "function") {
      try { CLASSROOM.props.applyPhaseA(flags, state); } catch (err) {}
    }
    if (CLASSROOM.characters && typeof CLASSROOM.characters.applyPhaseA === "function") {
      try { CLASSROOM.characters.applyPhaseA(flags, state); } catch (err) {}
    }
    return flags;
  }

  CLASSROOM.phaseA = { reduce: reduce, viewModel: viewModel, syncBeats: syncBeats };
  if (!CLASSROOM.modules.phaseA) {
    CLASSROOM.modules.phaseA = { reduce: reduce, viewModel: viewModel };
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = CLASSROOM.phaseA;
  }
})(typeof globalThis !== "undefined" ? globalThis : this);

if (typeof require !== "undefined" && require.main === module) {
  require("../../game-slices/02-phase-a/module.js");
  var phaseA = globalThis.CLASSROOM.phaseA;
  var failures = 0;

  function check(cond, text) {
    if (!cond) {
      failures += 1;
      console.error("FAIL " + text);
    }
  }

  function start() {
    return {
      phase: "A",
      beat: 1,
      finals: { a: false, b: false },
      picks: { noisemaker: "a squeaky dog toy", victory: "pop a safe party popper" },
      kidsAtRear: true
    };
  }

  var walk = phaseA.reduce(start(), {
    type: "beat1Step",
    underFoot: "squeaky",
    backSideOfLine: true
  });
  check(walk.beat === 2 && walk.prizeClaimed !== true, "squeaky walk ends on beat 2, prize unclaimed");

  var miss = phaseA.reduce(walk, { type: "beat2Throw", onMat: true });
  check(miss.events && miss.events.some(function (e) { return e.type === "refused"; }), "throw needs stir");

  var stir = phaseA.reduce(walk, { type: "hostStir" });
  var hit = phaseA.reduce(stir, { type: "beat2Throw", onMat: true });
  check(hit.laughing === true && hit.mayMove === true, "plush hit starts 5s move window");

  var after = phaseA.reduce(hit, { type: "beat2LaughEnd" });
  check(after.beat === 3, "laugh end starts beat 3");

  var eyes = phaseA.reduce(after, { type: "beat3Eyes", moving: true, laughed: true });
  check(eyes.caught === true && eyes.sendBack && eyes.sendBack.steps === 3, "statue + three steps");
  var sleep = phaseA.reduce(eyes, { type: "hostSleep" });
  check(sleep.beat === 4, "sleep after statue starts beat 4");

  var note = phaseA.reduce(sleep, { type: "beat4Note", noticed: false });
  check(note.beat === 5 && note.linePassed === true, "sticky note passes line");

  var claim = phaseA.reduce(note, { type: "beat5Prize", caught: false, blast: "popper" });
  check(claim.finals.a === true && claim.sessionWon === false, "prize blast ends Phase A only");
  check(phaseA.syncBeats(claim).phaseAEnded === true, "syncBeats sees claim");

  if (failures) {
    console.error(failures + " failed");
    process.exit(1);
  }
  console.log("ok");
}
