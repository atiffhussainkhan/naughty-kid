/* Phase A beats 1–5. Classic script. CLASSROOM.phaseA.reduce(state, action).
   Authority: mega-requirements, then design/game-design.md, then design/02-phase-a.md.
   DESIGN-DECISIONs are binding. Recommendation ends are marked in comments.
   This file does not name teacher states, measure the three steps, or start Phase B.
   Prefers game-slices/02-phase-a/module.js (CLASSROOM.modules.phaseA) when present. */

(function (root) {
  "use strict";

  var CLASSROOM = root.CLASSROOM || (root.CLASSROOM = {});
  var STATUE = "Balancing on one foot with a finger on the nose";

  function loadSlice() {
    if (loadSlice.done) return loadSlice.api;
    loadSlice.done = true;
    loadSlice.api = null;
    if (CLASSROOM.modules && CLASSROOM.modules.phaseA && typeof CLASSROOM.modules.phaseA.reduce === "function") {
      loadSlice.api = CLASSROOM.modules.phaseA;
      return loadSlice.api;
    }
    if (typeof require === "function") {
      try {
        var loaded = require("../../game-slices/02-phase-a/module.js");
        if (loaded && typeof loaded.reduce === "function") loadSlice.api = loaded;
      } catch (err) {
        loadSlice.api = null;
      }
    }
    return loadSlice.api;
  }

  function pack(state, events, gaps) {
    return { state: state, events: events || [], gaps: gaps || [] };
  }

  function refused(state, text) {
    return pack(state, [{ type: "refused", text: text }], []);
  }

  function copyKid(kid) {
    var next = {};
    var keys = Object.keys(kid);
    var i;
    for (i = 0; i < keys.length; i++) next[keys[i]] = kid[keys[i]];
    if (next.sendBack && typeof next.sendBack === "object") {
      next.sendBack = { steps: next.sendBack.steps, direction: next.sendBack.direction };
    }
    return next;
  }

  function copy(state) {
    var src = state && typeof state === "object" ? state : {};
    var next = {};
    var keys = Object.keys(src);
    var i;
    for (i = 0; i < keys.length; i++) next[keys[i]] = src[keys[i]];
    var finals = src.finals && typeof src.finals === "object" ? src.finals : {};
    next.finals = { a: finals.a === true, b: finals.b === true };
    if (Array.isArray(src.kids)) next.kids = src.kids.map(copyKid);
    if (src.picks && typeof src.picks === "object") {
      next.picks = {};
      keys = Object.keys(src.picks);
      for (i = 0; i < keys.length; i++) next.picks[keys[i]] = src.picks[keys[i]];
    }
    return next;
  }

  function norm(value) {
    if (typeof value !== "string") return "";
    return value.replace(/[\u2019\u2018]/g, "'").replace(/\s+/g, " ").trim().toLowerCase();
  }

  function field(action, key) {
    var payload = action && action.payload;
    if (payload && typeof payload === "object" && Object.prototype.hasOwnProperty.call(payload, key)) {
      return payload[key];
    }
    if (action && typeof action === "object" && Object.prototype.hasOwnProperty.call(action, key) && key !== "type" && key !== "payload") {
      return action[key];
    }
    return undefined;
  }

  function kidsOf(state) {
    return Array.isArray(state.kids) ? state.kids : null;
  }

  function frozen(state) {
    return state.frozen === true;
  }

  function throwWindow(state, action) {
    return state.throwWindow === true || field(action, "startedToWake") === true;
  }

  function inBeat(state, beat) {
    return state.phase === "A" && state.beat === beat && state.finals.a !== true;
  }

  function noiseFrom(value) {
    if (value === true) return "";
    var key = norm(value);
    if (!key || key === "false") return "";
    if (key === "squeaky" || key === "toy" || key.indexOf("squeaky") !== -1) return "a squeaky dog toy";
    if (key === "wrap" || key === "bubble" || key.indexOf("bubble") !== -1) return "bubble wrap";
    return "";
  }

  function chosenNoise(state, action) {
    var fromAction = noiseFrom(field(action, "underFoot"));
    if (fromAction) return fromAction;
    var picks = state.picks || {};
    return noiseFrom(picks.noisemaker) || noiseFrom(picks.noise) || noiseFrom(state.noise) || noiseFrom(state.underFoot);
  }

  function blastOf(state, action) {
    var raw = field(action, "blast");
    if (raw == null && state.picks) raw = state.picks.victory || state.picks.blast;
    if (raw == null) raw = state.blast;
    var key = norm(raw);
    if (!key) return null;
    if (key === "popper" || key === "safe party popper" || key === "pop a safe party popper") {
      return "pop a safe party popper";
    }
    if (key.indexOf("confetti") !== -1) return "throw a handful of paper confetti over the teacher's head";
    return null;
  }

  function statueText(state) {
    var samples = state.samples;
    if (samples && samples.statue && samples.statue.value) return samples.statue.value;
    if (typeof state.statueSample === "string" && state.statueSample) return state.statueSample;
    return STATUE;
  }

  function oweSteps(kid) {
    kid.laughed = true;
    kid.sendBack = { steps: 3, direction: "back" };
  }

  function beat1Step(state, action) {
    if (!inBeat(state, 1)) return refused(state, "The squeaky-shoe walk is beat 1.");
    if (frozen(state)) return refused(state, "The walk waits while a wake freeze is set.");

    var noise = chosenNoise(state, action);
    if (!noise) {
      return pack(state, [], [{
        id: "under-foot",
        text: "The walk holds a squeaky dog toy or bubble wrap under the feet."
      }]);
    }

    var pastLine = field(action, "backSideOfLine") === false;
    var list = kidsOf(state);
    var kidId = field(action, "kidId");
    state.sound = true;
    state.silent = false;
    state.underFoot = noise;
    state.prizeClaimed = state.prizeClaimed === true;

    if (list) {
      var i;
      var found = false;
      for (i = 0; i < list.length; i++) {
        if (kidId != null && list[i].id !== kidId) continue;
        if (list[i].walking === false) continue;
        found = true;
        list[i].underFoot = true;
        if (!pastLine) {
          list[i].walked = true;
          list[i].zone = "backSide";
        }
      }
      if (kidId != null && !found) return refused(state, "That kid is not on the walk.");
    } else if (!pastLine) {
      state.walked = true;
      state.zone = "backSide";
    }

    if (pastLine) return pack(state, [{ type: "beat1-step", text: "The walk has not reached the back side of the line." }]);

    var ready = true;
    if (list) {
      for (i = 0; i < list.length; i++) {
        if (list[i].walking !== false && list[i].walked !== true) ready = false;
      }
    }

    if (!ready) {
      return pack(state, [{ type: "beat1-step", text: "A walker still has the object under their feet." }]);
    }

    /* RECOMMENDATION end. The walk ends when every kid who is walking has walked
       with the object under their feet and the group is still on the back side
       of the checkpoint line. The objects come out. Beat 2 starts. The prize
       stays unclaimed. Nobody takes steps back. */
    state.beat = 2;
    state.underFoot = null;
    state.zone = "backSide";
    state.prizeClaimed = false;
    if (list) {
      for (i = 0; i < list.length; i++) {
        list[i].underFoot = false;
        list[i].zone = "backSide";
      }
    }
    return pack(state, [{
      type: "beat1-ended",
      text: "The walk ends on the back side of the line. Beat 2 starts. The prize is unclaimed."
    }]);
  }

  function beat2Throw(state, action) {
    if (!inBeat(state, 2)) return refused(state, "The plush throw is beat 2.");
    if (state.laughing === true || state.plushOnMat === true) return refused(state, "The plush is already on the mat.");
    if (frozen(state)) return refused(state, "The throw window is not open during a wake freeze.");
    /* DESIGN-DECISION. "Starts to wake" is only this throw window. The session does not open it. */
    if (!throwWindow(state, action)) return refused(state, "A kid can throw only while the teacher is starting to wake.");

    var onMat = field(action, "onMat");
    if (onMat == null) onMat = field(action, "landed");
    if (onMat !== true) {
      /* RECOMMENDATION. A miss does not start the laugh. The same window can throw again. Nobody takes steps back. */
      return pack(state, [{ type: "beat2-miss", text: "The throw misses the mat. The laugh does not start." }]);
    }

    state.plushOnMat = true;
    state.throwWindow = false;
    state.laughing = true;
    state.laughSeconds = 5;
    /* DESIGN-DECISION. During the 5-second laugh the kids may move. This window is the exception. */
    state.mayMove = true;
    state.prizeClaimed = false;
    if (state.zone !== "deskSide" && state.zone !== "desk") state.zone = state.zone || "backSide";
    return pack(state, [{
      type: "beat2-laugh",
      text: "The plush on the mat forces a 5-second laugh. The kids may move. The prize stays unclaimed."
    }]);
  }

  function beat2LaughEnd(state, action) {
    if (!inBeat(state, 2)) return refused(state, "Ending the laugh is beat 2.");

    if (state.laughing === true && state.plushOnMat === true) {
      state.laughing = false;
      state.mayMove = false;
      /* RECOMMENDATION end. The beat ends when the 5 seconds end and the laugh is over.
         The caller counts those 5 seconds. Beat 3 starts from where the kids are.
         The prize stays unclaimed. Nobody takes steps back. */
      state.beat = 3;
      return pack(state, [{
        type: "beat2-ended",
        text: "The 5 seconds end. Beat 3 starts. The prize is unclaimed."
      }]);
    }

    if (frozen(state)) {
      return refused(state, "The beat waits until the wake freeze is cleared.");
    }
    if (throwWindow(state, action)) {
      return refused(state, "The throw window is still open.");
    }

    /* RECOMMENDATION end. If the teacher never starts to wake, one quiet pause ends
       the beat with no throw and no laugh. If a full wake closed the window before
       the plush landed, the beat ends with no laugh once that freeze is gone.
       Beat 3 starts from where the kids are. Nobody takes steps back. */
    state.laughing = false;
    state.mayMove = false;
    state.beat = 3;
    return pack(state, [{
      type: "beat2-ended",
      text: "Beat 2 ends with no laugh. Beat 3 starts."
    }]);
  }

  function applyLaughs(state, action) {
    var laughed = field(action, "laughed");
    var list = kidsOf(state);
    var i;
    if (list) {
      for (i = 0; i < list.length; i++) {
        var kid = list[i];
        var did = laughed === true || (Array.isArray(laughed) && laughed.indexOf(kid.id) !== -1) || laughed === kid.id;
        if (!did) continue;
        if (kid.caught === true && kid.laughed !== true) oweSteps(kid);
      }
      return;
    }
    if (laughed === true && state.caught === true && !(state.sendBack && state.sendBack.steps === 3)) {
      state.laughed = true;
      state.sendBack = { steps: 3, direction: "back" };
    }
  }

  function moversAreStatues(state) {
    var list = kidsOf(state);
    var i;
    if (!list) return state.caught !== true || state.statue === true;
    for (i = 0; i < list.length; i++) {
      if (list[i].caught === true && list[i].statue !== true) return false;
      if (list[i].caught === true && list[i].laughed === true && !(list[i].sendBack && list[i].sendBack.steps === 3)) return false;
    }
    return true;
  }

  function openEyes(state, action) {
    var list = kidsOf(state);
    var movingField = field(action, "moving");
    var pose = statueText(state);
    var i;
    state.eyesOpened = true;
    if (!list) {
      var moving = movingField === true || state.moving === true;
      if (moving) {
        state.caught = true;
        state.statue = true;
        state.moving = false;
        state.statuePose = pose;
      } else {
        state.caught = false;
        state.statue = false;
      }
      return;
    }
    for (i = 0; i < list.length; i++) {
      var kid = list[i];
      var isMoving = kid.moving === true;
      if (movingField && typeof movingField === "object" && Object.prototype.hasOwnProperty.call(movingField, kid.id)) {
        isMoving = movingField[kid.id] === true;
      }
      if (isMoving) {
        kid.caught = true;
        kid.statue = true;
        kid.moving = false;
        kid.statuePose = pose;
      } else {
        kid.caught = false;
        kid.statue = false;
      }
    }
  }

  function endBeat3(state) {
    /* RECOMMENDATION end. The beat ends when the eyes have opened once, every kid
       who was moving has been a statue, any caught kid who laughed has the three
       steps owed, and the caller has returned the teacher to sleep. If nobody was
       moving, nobody is caught, and the beat still ends once that sleep is reported.
       Beat 4 starts. The three-step distance is not applied here. */
    state.beat = 4;
    state.statue = false;
    var list = kidsOf(state);
    var i;
    if (list) {
      for (i = 0; i < list.length; i++) list[i].statue = false;
    }
  }

  function beat3Eyes(state, action) {
    if (!inBeat(state, 3)) return refused(state, "Eyes open is beat 3.");
    if (state.laughing === true) return refused(state, "Eyes open waits until the laugh is over.");
    if (frozen(state)) return refused(state, "Eyes open waits while a wake freeze is set.");

    if (state.eyesOpened === true) {
      if (field(action, "moving") != null) return refused(state, "Eyes open once in this beat.");
      applyLaughs(state, action);
    } else {
      /* DESIGN-DECISION. Eyes open is the copycat statue for anyone still moving.
         It is separate from starting to wake and from a wake freeze. */
      openEyes(state, action);
      applyLaughs(state, action);
    }

    var asleepAgain = field(action, "asleepAgain") === true;
    if (asleepAgain && state.eyesOpened === true && moversAreStatues(state)) {
      endBeat3(state);
      return pack(state, [{ type: "beat3-ended", text: "The eyes have closed. Beat 4 starts." }]);
    }
    return pack(state, [{
      type: "beat3-eyes",
      text: "Anyone who was moving is a statue. A kid who was still is not caught."
    }]);
  }

  function beat4Note(state, action) {
    if (!inBeat(state, 4)) return refused(state, "The sticky note is beat 4.");
    if (frozen(state)) return refused(state, "The note waits while a wake freeze is set.");
    if (state.linePassed === true) return refused(state, "The line is already passed.");

    if (field(action, "noticed") === true) {
      /* RECOMMENDATION. A noticed note does not pass the line. The kids stay where
         they are. The beat stays open. Nobody takes steps back. */
      state.noteOnBack = false;
      state.linePassed = false;
      return pack(state, [{
        type: "beat4-noticed",
        text: "The teacher notices that note. It does not pass the line."
      }]);
    }
    if (field(action, "noticed") !== false) {
      return pack(state, [], [{
        id: "note-noticed",
        text: "Passing the line requires that the teacher does not notice the note."
      }]);
    }

    state.noteOnBack = true;
    state.linePassed = true;
    state.kidsAtRear = false;
    var list = kidsOf(state);
    var i;
    if (list) {
      for (i = 0; i < list.length; i++) list[i].zone = "deskSide";
    }
    state.zone = "deskSide";
    /* RECOMMENDATION end. One unnoticed note lets the whole group cross to the
       desk side of the line. Beat 5 starts there. */
    state.beat = 5;
    return pack(state, [{
      type: "beat4-ended",
      text: "The note is on the teacher's back and the teacher has not noticed it. The group crosses. Beat 5 starts."
    }]);
  }

  function beat5Prize(state, action) {
    if (!inBeat(state, 5)) return refused(state, "The claim is beat 5.");
    if (state.linePassed !== true) return refused(state, "The checkpoint line is still unpassed.");
    if (frozen(state)) {
      /* RECOMMENDATION. A wake pose pauses the claim. Nobody takes steps back. */
      return refused(state, "The claim waits while a wake freeze is set.");
    }
    if (field(action, "caught") === true) {
      /* REQUIREMENT. The claim belongs to a kid who reaches the desk without getting caught.
         RECOMMENDATION. The prize stays on the desk, the blast stays unused, and the beat
         stays open. A finished statue from beat 3 is not this catch. Nobody takes steps back. */
      state.prizeClaimed = false;
      return pack(state, [{
        type: "beat5-caught",
        text: "That kid is caught. The prize stays unclaimed."
      }]);
    }

    var blast = blastOf(state, action);
    if (!blast) {
      return pack(state, [], [{
        id: "victory-blast",
        text: "The claim uses one blast: pop a safe party popper, or throw a handful of paper confetti over the teacher's head."
      }]);
    }
    if (blast.indexOf("confetti") !== -1 && field(action, "overHead") === false) {
      return refused(state, "The paper confetti is thrown over the teacher's head.");
    }

    var list = kidsOf(state);
    var kidId = field(action, "kidId");
    if (list && kidId != null) {
      var i;
      var kid = null;
      for (i = 0; i < list.length; i++) if (list[i].id === kidId) kid = list[i];
      if (!kid) return refused(state, "That kid is not in the session.");
      kid.zone = "desk";
    }

    /* REQUIREMENT end (REQ-MEGA-018, REQ-MEGA-019, REQ-MEGA-056).
       A kid who reaches the desk without getting caught claims the target prize
       and does the one confetti victory blast. Phase A ends.
       DESIGN-DECISION. The session is not won. This beat does not start Phase B. */
    state.prizeClaimed = true;
    state.phaseAEnded = true;
    state.blast = blast;
    state.finals = { a: true, b: state.finals.b === true };
    state.phase = "A";
    state.beat = 5;
    state.sessionWon = false;
    state.zone = "desk";
    state.kidsAtRear = false;
    return pack(state, [{
      type: "phase-a-ended",
      text: "Phase A ends. The session is not won."
    }]);
  }

  function reduce(state, action) {
    var slice = loadSlice();
    if (slice && typeof slice.reduce === "function" && slice.reduce !== reduce) {
      return slice.reduce(state, action);
    }

    var act = action;
    if (typeof act === "string") act = { type: act, payload: {} };
    if (!act || typeof act !== "object" || !act.type) return refused(copy(state), "No action.");

    var next = copy(state);
    if (act.type === "beat1Step") return beat1Step(next, act);
    if (act.type === "beat2Throw") return beat2Throw(next, act);
    if (act.type === "beat2LaughEnd") return beat2LaughEnd(next, act);
    if (act.type === "beat3Eyes") return beat3Eyes(next, act);
    if (act.type === "beat4Note") return beat4Note(next, act);
    if (act.type === "beat5Prize") return beat5Prize(next, act);
    return pack(next, [], []);
  }

  CLASSROOM.phaseA = { reduce: reduce };

  if (typeof module !== "undefined" && module.exports) module.exports = CLASSROOM.phaseA;
})(typeof globalThis !== "undefined" ? globalThis : this);
