/* Host actions for Phase A beats 1–5. Classic script.
   Integrator mounts CLASSROOM.phaseAUi.actionsFor(state) into the side panel.
   Labels follow design/02-phase-a.md and game-design.md. No invented beats. */

(function (root) {
  "use strict";

  var CLASSROOM = root.CLASSROOM || (root.CLASSROOM = {});

  function noisePick(state) {
    var picks = state && state.picks;
    var named = (picks && (picks.noisemaker || picks.noise)) || (state && state.underFoot);
    if (!named) return "squeaky";
    var text = String(named).toLowerCase();
    if (text.indexOf("bubble") !== -1 || text.indexOf("wrap") !== -1) return "bubble";
    return "squeaky";
  }

  function blastPick(state) {
    var picks = state && state.picks;
    var named = (picks && (picks.victory || picks.blast)) || (state && state.blast);
    if (!named) return "popper";
    var text = String(named).toLowerCase();
    if (text.indexOf("confetti") !== -1) return "confetti";
    return "popper";
  }

  function actionsFor(state) {
    var list = [];
    if (!state || state.phase !== "A") return list;
    if (state.finals && (state.finals.a === true || state.finals.confetti === true)) return list;

    var beat = state.beat;
    var laughing = state.laughing === true;
    var teacher = state.teacher;

    if (beat === 1) {
      list.push({
        type: "beat1Step",
        label: "Walk (under-foot object)",
        payload: { underFoot: noisePick(state), backSideOfLine: true }
      });
    }
    if (beat === 2) {
      if (!laughing && state.plushOnMat !== true) {
        list.push({ type: "hostStir", label: "Start to wake (throw window)", payload: {} });
        list.push({ type: "beat2Throw", label: "Throw plush (hit mat)", payload: { onMat: true } });
        list.push({ type: "beat2Throw", label: "Throw plush (miss)", payload: { onMat: false } });
        list.push({ type: "beat2LaughEnd", label: "Quiet pause (no stir)", payload: {} });
      }
      if (laughing || state.plushOnMat === true) {
        list.push({ type: "beat2LaughEnd", label: "Laugh ends (5s)", payload: {} });
      }
    }
    if (beat === 3) {
      list.push({ type: "beat3Eyes", label: "Eyes open (mover caught)", payload: { moving: true } });
      list.push({ type: "beat3Eyes", label: "Eyes open (already still)", payload: { moving: false } });
      list.push({
        type: "beat3Eyes",
        label: "Caught kid laughs (3 steps)",
        payload: { laughed: true }
      });
      list.push({ type: "hostSleep", label: "Asleep again → beat 4", payload: {} });
    }
    if (beat === 4) {
      list.push({ type: "beat4Note", label: "Sticky note (unnoticed)", payload: { noticed: false } });
      list.push({ type: "beat4Note", label: "Sticky note (noticed)", payload: { noticed: true } });
    }
    if (beat === 5) {
      var blast = blastPick(state);
      var prizePayload = { caught: false, blast: blast };
      if (blast === "confetti") prizePayload.overHead = true;
      list.push({ type: "beat5Prize", label: "Claim prize + blast", payload: prizePayload });
      list.push({ type: "beat5Prize", label: "Caught on approach", payload: { caught: true } });
    }

    if (beat >= 1 && beat <= 5 && !laughing) {
      list.push({ type: "hostWake", label: "Wake (freeze pose)", payload: {}, host: true });
      list.push({ type: "hostSleep", label: "Asleep", payload: {}, host: true });
    }

    if (teacher === "Laughing" || teacher === "Laughing 5s") {
      /* DESIGN-DECISION: no wake / eyes during the five seconds. */
    }

    return list;
  }

  CLASSROOM.phaseAUi = { actionsFor: actionsFor, noisePick: noisePick, blastPick: blastPick };
  CLASSROOM.modules = CLASSROOM.modules || {};
  CLASSROOM.modules.phaseAUi = CLASSROOM.phaseAUi;

  if (typeof module !== "undefined" && module.exports) module.exports = CLASSROOM.phaseAUi;
})(typeof globalThis !== "undefined" ? globalThis : this);
