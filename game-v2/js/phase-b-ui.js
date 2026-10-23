/* Host actions for Phase B beats 6–10. Classic script.
   Integrator mounts CLASSROOM.phaseBUi.actionsFor(state) into the side panel.
   Labels follow design/03-phase-b.md and game-design.md. No invented beats. */

(function (root) {
  "use strict";

  var CLASSROOM = root.CLASSROOM || (root.CLASSROOM = {});
  var SAMPLE = "The broccoli has landed!";

  function yellPhrase(state) {
    var host = state && state.samples && state.samples.phrase;
    if (host && typeof host === "object") host = host.value || host.text;
    if (typeof host === "string" && host) return host;
    return SAMPLE;
  }

  function sprayTarget(state) {
    var picks = state && state.picks;
    var named = (picks && (picks.stringTarget || picks.string)) || state && state.stringTarget;
    if (!named) return "desk";
    var text = String(named).toLowerCase();
    if (text.indexOf("shoe") !== -1) return "shoes";
    return "desk";
  }

  function actionsFor(state) {
    var list = [];
    if (!state || state.phase !== "B") return list;
    var beat = state.beat;
    var pb = state.phaseB || {};

    if (beat === 6) {
      list.push({ type: "beat6Step", label: "Wrong step (whoopee)", payload: { wrong: true } });
      list.push({ type: "beat6Step", label: "All off, mailbox side", payload: { allOffMailboxSide: true } });
    }
    if (beat === 7) {
      list.push({ type: "beat7Pass", label: "Foot-pass (no drop)", payload: { feet: true, dropped: false } });
      list.push({ type: "beat7Pass", label: "Drop / non-foot", payload: { dropped: true } });
    }
    if (beat === 8) {
      list.push({ type: "beat8Draw", label: "Open whiteboard window", payload: { openWindow: true } });
      list.push({ type: "beat8Draw", label: "Draw a hat", payload: { picture: "hat" } });
      list.push({ type: "beat8Draw", label: "Draw giant ears", payload: { picture: "ears" } });
      list.push({ type: "beat8Draw", label: "Quiet pause (no turn)", payload: { quiet: true } });
    }
    if (beat === 9) {
      list.push({
        type: "beat9Yell",
        label: "Monster yell",
        payload: { voice: "monster", phrase: yellPhrase(state) }
      });
      list.push({
        type: "beat9Yell",
        label: "Yell + others crawl",
        payload: { voice: "monster", phrase: yellPhrase(state), crawl: true }
      });
    }
    if (beat === 10) {
      if (pb.mailbox !== true) {
        list.push({ type: "beat10Mailbox", label: "Note into mailbox", payload: {} });
      } else if (pb.phaseBWon !== true) {
        list.push({
          type: "beat10Spray",
          label: "Gentle spray + dance",
          payload: { target: sprayTarget(state), gentle: true, dance: true }
        });
        list.push({
          type: "beat10Spray",
          label: "Spray without dance",
          payload: { target: sprayTarget(state), gentle: true, dance: false }
        });
      }
    }
    return list;
  }

  CLASSROOM.phaseBUi = { actionsFor: actionsFor, yellPhrase: yellPhrase, sprayTarget: sprayTarget };
  CLASSROOM.modules = CLASSROOM.modules || {};
  CLASSROOM.modules.phaseBUi = CLASSROOM.phaseBUi;

  if (typeof module !== "undefined" && module.exports) module.exports = CLASSROOM.phaseBUi;
})(typeof globalThis !== "undefined" ? globalThis : this);
