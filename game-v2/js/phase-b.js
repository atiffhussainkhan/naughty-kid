/* Phase B beats 6–10 for game-v2.
   Classic script. Prefers CLASSROOM.modules.phaseB from game-slices/03-phase-b.
   Also exposes CLASSROOM.phaseB.reduce for the shared fold used by the integrator.
   Authority: mega-requirements, design/game-design.md, design/03-phase-b.md.
   Exactly three hidden whoopees. Foot-pass sunglasses. Flashlight doodle. Monster yell + optional crawl.
   Beat 10 wins Phase B only when the note is in the mailbox, the spray is gentle on the target, and the kids dance. */

(function (root) {
  "use strict";

  var CLASSROOM = root.CLASSROOM || (root.CLASSROOM = {});
  CLASSROOM.modules = CLASSROOM.modules || {};

  function loadSlice() {
    if (CLASSROOM.modules.phaseB && typeof CLASSROOM.modules.phaseB.reduce === "function") {
      return CLASSROOM.modules.phaseB;
    }
    if (typeof require === "function") {
      try {
        var loaded = require("../../game-slices/03-phase-b/module.js");
        if (loaded && typeof loaded.reduce === "function") {
          CLASSROOM.modules.phaseB = loaded;
          return loaded;
        }
      } catch (err) {
        /* Browser build may load the slice with a script tag first. */
      }
    }
    return CLASSROOM.modules.phaseB || null;
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
      empty.events = [{ type: "refused", text: "Phase B slice is not loaded." }];
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
      phaseBWon: !!(state && state.phaseBWon),
      sessionWon: !!(state && state.sessionWon),
      whoopeeCount: 3,
      sendBack: false,
      hostLine: null
    };
  }

  CLASSROOM.phaseB = { reduce: reduce, viewModel: viewModel };
  if (!CLASSROOM.modules.phaseB) {
    CLASSROOM.modules.phaseB = { reduce: reduce, viewModel: viewModel };
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = CLASSROOM.phaseB;
  }
})(typeof globalThis !== "undefined" ? globalThis : this);

if (typeof require !== "undefined" && require.main === module) {
  require("../../game-slices/03-phase-b/module.js");
  var phaseB = globalThis.CLASSROOM.phaseB;
  var failures = 0;

  function check(cond, text) {
    if (!cond) {
      failures += 1;
      console.error("FAIL " + text);
    }
  }

  function start() {
    return {
      phase: "B",
      beat: 6,
      kids: 2,
      activity: "standing facing a whiteboard",
      finals: { a: true, b: false },
      room: "classroom"
    };
  }

  var noise = phaseB.reduce(start(), { type: "beat6Step", wrong: true });
  check(noise.phaseB.whoopeeCount === 3 && noise.phaseB.lastNoise === true, "exactly 3 whoopees; noise is not a win");
  check(noise.phaseB.sendBack === false, "whoopee is not a send-back");

  var path = phaseB.reduce(noise, { type: "beat6Step", allOffMailboxSide: true });
  check(path.beat === 7 && path.phaseB.note === "carrier" && path.phaseB.mailbox === false, "beat 6 ends on mailbox side");

  var drop = phaseB.reduce(path, { type: "beat7Pass", dropped: true });
  check(drop.beat === 7, "drop stays on beat 7");
  var pass = phaseB.reduce(drop, { type: "beat7Pass", feet: true, dropped: false });
  check(pass.beat === 8, "feet pass ends beat 7");

  var draw = phaseB.reduce(pass, { type: "beat8Draw", picture: "giant ears" });
  check(draw.beat === 9 && draw.phaseB.picture === "ears", "flashlight doodle ends beat 8");

  var yell = phaseB.reduce(draw, {
    type: "beat9Yell",
    voice: "monster",
    phrase: "The broccoli has landed!",
    crawl: true
  });
  check(yell.beat === 10 && yell.phaseB.crawls.length === 1, "yell ends beat 9; other kid may crawl");

  var mail = phaseB.reduce(yell, { type: "beat10Mailbox" });
  check(mail.phaseB.mailbox === true && mail.phaseBWon !== true, "mailbox starts finale only");

  var dry = phaseB.reduce(mail, { type: "beat10Spray", target: "desk", gentle: true, dance: false });
  check(dry.phaseBWon !== true, "dance is required");

  var win = phaseB.reduce(dry, { type: "beat10Spray", target: "desk", gentle: true, dance: true });
  check(win.phaseBWon === true && win.phase === "B" && win.sessionWon === true, "beat 10 wins Phase B; session needs finale A");

  if (failures) {
    console.error(failures + " failed");
    process.exit(1);
  }
  console.log("game-v2 phase-b ok");
}
