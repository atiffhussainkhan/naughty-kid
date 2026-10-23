/* Phase A beats 1–5. Classic script. CLASSROOM.modules.phaseA.
   Authority: mega-requirements.md, then design/game-design.md, then design/02-phase-a.md.
   DESIGN-DECISION lines are binding. Recommendation exits are labeled in comments.
   Does not start Phase B. Does not invent failure rules. UNKNOWN stays a gap. */

(function (root) {
  "use strict";

  var STATUE = "Balancing on one foot with a finger on the nose";
  var STIR_NAMES = {
    "Starting to wake": true,
    "starting to wake": true,
    stir: true
  };
  var ASLEEP_NAMES = {
    Asleep: true,
    asleep: true,
    sleep: true
  };

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
    var a = finals.a === true || finals.confetti === true;
    next.finals = {
      a: a,
      b: finals.b === true,
      confetti: a,
      sillyString: finals.sillyString === true,
      sessionWon: finals.sessionWon === true
    };
    if (Array.isArray(src.kids)) next.kids = src.kids.map(copyKid);
    if (src.picks && typeof src.picks === "object") {
      next.picks = {};
      keys = Object.keys(src.picks);
      for (i = 0; i < keys.length; i++) next.picks[keys[i]] = src.picks[keys[i]];
    }
    if (src.samples && typeof src.samples === "object") {
      next.samples = {};
      keys = Object.keys(src.samples);
      for (i = 0; i < keys.length; i++) next.samples[keys[i]] = src.samples[keys[i]];
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
    if (state.frozen === true) return true;
    var t = state.teacher;
    return t === "Wakes up" || t === "awake" || t === "Awake";
  }

  function teacherStirring(state) {
    var t = state.teacher;
    return !!(t && STIR_NAMES[t]);
  }

  function teacherAsleep(state) {
    var t = state.teacher;
    if (t == null || t === "") return true;
    return !!ASLEEP_NAMES[t];
  }

  function throwWindow(state, action) {
    if (state.throwWindow === true) return true;
    if (field(action, "startedToWake") === true) return true;
    return teacherStirring(state);
  }

  function inBeat(state, beat) {
    return state.phase === "A" && state.beat === beat && state.finals.a !== true;
  }

  function noiseFrom(value) {
    if (value === true) return "";
    var key = norm(value);
    if (!key || key === "false") return "";
    if (key === "squeaky" || key === "toy" || key.indexOf("squeaky") !== -1 || key.indexOf("dog toy") !== -1) {
      return "a squeaky dog toy";
    }
    if (key === "wrap" || key === "bubble" || key.indexOf("bubble") !== -1) return "bubble wrap";
    return "";
  }

  function chosenNoise(state, action) {
    var fromAction = noiseFrom(field(action, "underFoot"));
    if (fromAction) return fromAction;
    var picks = state.picks || {};
    return noiseFrom(picks.noisemaker) ||
      noiseFrom(picks.noise) ||
      noiseFrom(state.noise) ||
      noiseFrom(state.underFoot);
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
    if (key.indexOf("confetti") !== -1) {
      return "throw a handful of paper confetti over the teacher's head";
    }
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
    var i;
    state.sound = true;
    state.silent = false;
    state.underFoot = noise;
    state.prizeClaimed = state.prizeClaimed === true;

    if (list) {
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

    if (pastLine) {
      return pack(state, [{
        type: "beat1-step",
        text: "The walk has not reached the back side of the line."
      }]);
    }

    var ready = true;
    if (list) {
      for (i = 0; i < list.length; i++) {
        if (list[i].walking !== false && list[i].walked !== true) ready = false;
      }
    }

    if (!ready) {
      return pack(state, [{
        type: "beat1-step",
        text: "A walker still has the object under their feet."
      }]);
    }

    /* RECOMMENDATION end (design/02-phase-a.md §Beat 1). Walk ends on the back
       side of the checkpoint line. Objects come out. Beat 2 starts. Prize unclaimed. */
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
    if (state.laughing === true || state.plushOnMat === true) {
      return refused(state, "The plush is already on the mat.");
    }
    if (frozen(state)) return refused(state, "The throw window is not open during a wake freeze.");
    /* DESIGN-DECISION. "Starts to wake" is only this throw window. Session does not open it. */
    if (!throwWindow(state, action)) {
      return refused(state, "A kid can throw only while the teacher is starting to wake.");
    }

    var onMat = field(action, "onMat");
    if (onMat == null) onMat = field(action, "landed");
    if (onMat !== true) {
      /* RECOMMENDATION. A miss does not start the laugh. Same window may throw again. */
      return pack(state, [{
        type: "beat2-miss",
        text: "The throw misses the mat. The laugh does not start."
      }]);
    }

    state.plushOnMat = true;
    state.throwWindow = false;
    state.laughing = true;
    state.laughSeconds = 5;
    /* DESIGN-DECISION. During the 5-second laugh the kids may move. */
    state.mayMove = true;
    state.prizeClaimed = false;
    if (state.zone !== "deskSide" && state.zone !== "desk") state.zone = state.zone || "backSide";
    return pack(state, [{
      type: "beat2-laugh",
      text: "The plush on the mat forces a 5-second laugh. The kids may move. The prize stays unclaimed."
    }]);
  }

  function endBeat2Quiet(state, text) {
    state.laughing = false;
    state.mayMove = false;
    state.throwWindow = false;
    state.beat = 3;
    return pack(state, [{ type: "beat2-ended", text: text }]);
  }

  function beat2LaughEnd(state, action) {
    if (!inBeat(state, 2)) return refused(state, "Ending the laugh is beat 2.");

    if (state.laughing === true && state.plushOnMat === true) {
      state.laughing = false;
      state.mayMove = false;
      /* RECOMMENDATION end. Laugh ends; beat 3 starts. Prize unclaimed. */
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

    /* RECOMMENDATION end (unknown 5). No start-to-wake → end with no throw/laugh. */
    return endBeat2Quiet(state, "Beat 2 ends with no laugh. Beat 3 starts.");
  }

  function applyLaughs(state, action) {
    var laughed = field(action, "laughed");
    var list = kidsOf(state);
    var i;
    if (list) {
      for (i = 0; i < list.length; i++) {
        var kid = list[i];
        var did = laughed === true ||
          (Array.isArray(laughed) && laughed.indexOf(kid.id) !== -1) ||
          laughed === kid.id;
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
      if (
        list[i].caught === true &&
        list[i].laughed === true &&
        !(list[i].sendBack && list[i].sendBack.steps === 3)
      ) {
        return false;
      }
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
    /* RECOMMENDATION end. Eyes opened once; movers are statues; teacher asleep again. */
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
      /* DESIGN-DECISION. Eyes open is the copycat statue for anyone still moving. */
      openEyes(state, action);
      applyLaughs(state, action);
    }

    var asleepAgain = field(action, "asleepAgain") === true || teacherAsleep(state);
    if (asleepAgain && state.eyesOpened === true && moversAreStatues(state) && field(action, "asleepAgain") === true) {
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
      /* RECOMMENDATION. Noticed note does not pass the line. Beat stays open. */
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
    /* RECOMMENDATION end. One unnoticed note lets the group cross. Beat 5 starts. */
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
      return refused(state, "The claim waits while a wake freeze is set.");
    }
    if (field(action, "caught") === true) {
      /* RECOMMENDATION. Prize stays; blast unused; beat stays open; no steps back. */
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

    /* REQUIREMENT (REQ-MEGA-018, REQ-MEGA-019, REQ-MEGA-056).
       DESIGN-DECISION. Claim ends Phase A. Session is not won. Phase B not started here. */
    state.prizeClaimed = true;
    state.phaseAEnded = true;
    state.blast = blast;
    state.finals = {
      a: true,
      b: state.finals.b === true,
      confetti: true,
      sillyString: state.finals.sillyString === true,
      sessionWon: false
    };
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

  function hostSleep(state) {
    if (!inBeat(state, 2) && !inBeat(state, 3)) {
      return pack(state, [], []);
    }

    if (inBeat(state, 2)) {
      if (state.laughing === true && state.plushOnMat === true) {
        /* Laugh still counting; caller must end laugh first. */
        return pack(state, [], []);
      }
      if (state.throwWindow === true || teacherStirring(state)) {
        return pack(state, [], []);
      }
      if (state.plushOnMat === true) {
        return pack(state, [], []);
      }
      /* RECOMMENDATION. Full wake closed the window before the plush landed:
         when the teacher sleeps again, beat 2 ends with no laugh.
         Never-stir exit stays on beat2LaughEnd (one quiet pause), not every sleep. */
      if (state.throwWindowClosed === true) {
        state.throwWindowClosed = false;
        return endBeat2Quiet(state, "Beat 2 ends with no laugh. Beat 3 starts.");
      }
      return pack(state, [], []);
    }

    if (inBeat(state, 3) && state.eyesOpened === true && moversAreStatues(state)) {
      endBeat3(state);
      return pack(state, [{ type: "beat3-ended", text: "The eyes have closed. Beat 4 starts." }]);
    }
    return pack(state, [], []);
  }

  function hostStir(state) {
    if (!inBeat(state, 2)) return pack(state, [], []);
    if (frozen(state) || state.laughing === true || state.plushOnMat === true) {
      return pack(state, [], []);
    }
    /* DESIGN-DECISION. Starts to wake opens the throw window only. */
    state.throwWindow = true;
    return pack(state, [{
      type: "throw-window",
      text: "The teacher is starting to wake. The throw window is open."
    }]);
  }

  function hostWake(state) {
    if (state.phase !== "A" || state.finals.a === true) return pack(state, [], []);
    if (state.laughing === true) {
      /* DESIGN-DECISION. Host does not call wake during the five seconds. */
      return refused(state, "A wake is not called during the 5-second laugh.");
    }
    state.frozen = true;
    state.throwWindow = false;
    state.mayMove = false;
    if (inBeat(state, 2) && state.plushOnMat !== true) {
      state.throwWindowClosed = true;
    }
    return pack(state, [{
      type: "freezeAll",
      text: "The teacher wakes up. Every kid freezes in a pose."
    }]);
  }

  function clearFreeze(state) {
    if (state.phase !== "A" || state.frozen !== true) return pack(state, [], []);
    state.frozen = false;
    return pack(state, [{
      type: "unfreeze",
      text: "The teacher is sleeping again. The current beat continues."
    }]);
  }

  function reduce(state, action) {
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
    if (act.type === "hostStir") return hostStir(next);
    if (act.type === "hostSleep") {
      var wasFrozen = next.frozen === true;
      var slept = clearFreeze(next);
      next = slept.state;
      var end = hostSleep(next);
      if (end.events && end.events.length) {
        if (wasFrozen && slept.events && slept.events.length) {
          end.events = slept.events.concat(end.events);
        }
        return end;
      }
      return slept;
    }
    if (act.type === "hostWake") return hostWake(next);
    if (act.type === "hostLaughEnd") return beat2LaughEnd(next, act);

    return pack(next, [], []);
  }

  function viewModel(state) {
    var current = copy(state);
    var beat = typeof current.beat === "number" ? current.beat : 0;
    var titles = {
      1: "The Squeaky Toy Shoes",
      2: "The Feather Tickle Trigger",
      3: "The Copycat Pose",
      4: "The Sticky Note Sabotage",
      5: "The Confetti Victory Blast"
    };
    var list = kidsOf(current);
    var caught = [];
    var i;
    if (list) {
      for (i = 0; i < list.length; i++) {
        if (list[i].caught === true) caught.push(list[i].id);
      }
    } else if (current.caught === true) {
      caught.push("kid");
    }

    return {
      phase: current.phase || null,
      beat: beat,
      title: titles[beat] || null,
      phaseAEnded: current.phaseAEnded === true || current.finals.a === true,
      sessionWon: false,
      underFoot: current.underFoot || null,
      sound: current.sound === true,
      silent: current.silent === false ? false : current.silent,
      plushOnMat: current.plushOnMat === true,
      throwWindow: current.throwWindow === true || teacherStirring(current),
      laughing: current.laughing === true,
      laughSeconds: current.laughing === true ? 5 : 0,
      mayMove: current.mayMove === true || current.laughing === true,
      eyesOpened: current.eyesOpened === true,
      statuePose: statueText(current),
      caught: caught,
      linePassed: current.linePassed === true,
      noteOnBack: current.noteOnBack === true,
      zone: current.zone || null,
      prizeClaimed: current.prizeClaimed === true,
      blast: current.blast || null,
      frozen: frozen(current),
      finals: {
        a: current.finals.a === true,
        confetti: current.finals.confetti === true || current.finals.a === true,
        b: current.finals.b === true,
        sillyString: current.finals.sillyString === true,
        sessionWon: false
      },
      hostLine: current.finals.a === true
        ? "Phase A ends. The session is not won."
        : (titles[beat] || null)
    };
  }

  var api = { reduce: reduce, viewModel: viewModel };
  var classroom = root.CLASSROOM || (root.CLASSROOM = {});
  classroom.modules = classroom.modules || {};
  classroom.modules.phaseA = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof globalThis !== "undefined" ? globalThis : this);

if (typeof require !== "undefined" && require.main === module) {
  var phaseA = globalThis.CLASSROOM.modules.phaseA;
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
      zone: "back",
      kidsAtRear: true
    };
  }

  var s = start();
  var r = phaseA.reduce(s, { type: "beat1Step", underFoot: "squeaky", backSideOfLine: true });
  check(r.state.beat === 2, "beat 1 ends on back side of line");
  check(r.state.prizeClaimed !== true, "walk is not the prize claim");
  check(r.state.underFoot == null, "under-foot object comes out");
  check(phaseA.viewModel(r.state).title === "The Feather Tickle Trigger", "beat 2 title");

  var early = phaseA.reduce(r.state, { type: "beat2Throw", onMat: true });
  check(early.events.some(function (e) { return e.type === "refused"; }), "throw needs start-to-wake");

  var stirred = phaseA.reduce(r.state, { type: "hostStir" });
  check(stirred.state.throwWindow === true, "stir opens throw window");
  var miss = phaseA.reduce(stirred.state, { type: "beat2Throw", onMat: false });
  check(miss.state.plushOnMat !== true && miss.state.beat === 2, "miss does not laugh");
  var hit = phaseA.reduce(stirred.state, { type: "beat2Throw", onMat: true });
  check(hit.state.laughing === true && hit.state.laughSeconds === 5, "5-second laugh");
  check(hit.state.mayMove === true, "kids may move during laugh");
  check(hit.state.prizeClaimed !== true, "laugh leaves prize unclaimed");

  var afterLaugh = phaseA.reduce(hit.state, { type: "beat2LaughEnd" });
  check(afterLaugh.state.beat === 3, "laugh end starts beat 3");

  var quiet = phaseA.reduce(r.state, { type: "beat2LaughEnd" });
  check(quiet.state.beat === 3, "no stir ends beat 2 with no laugh");

  var sleepOnly = phaseA.reduce(r.state, { type: "hostSleep" });
  check(sleepOnly.state.beat === 2, "plain sleep does not end beat 2");
  var wakeClose = phaseA.reduce(r.state, { type: "hostWake" });
  check(wakeClose.state.throwWindowClosed === true, "wake closes throw window");
  var afterWake = phaseA.reduce(wakeClose.state, { type: "hostSleep" });
  check(afterWake.state.beat === 3 && afterWake.state.frozen !== true, "sleep after closed window ends beat 2");

  var eyes = phaseA.reduce(afterLaugh.state, {
    type: "beat3Eyes",
    moving: true,
    laughed: true
  });
  check(eyes.state.eyesOpened === true && eyes.state.caught === true, "mover is caught");
  check(eyes.state.statue === true, "mover is a statue");
  check(eyes.state.sendBack && eyes.state.sendBack.steps === 3, "caught laugh owes three steps");
  check(eyes.state.beat === 3, "beat 3 waits for sleep");

  var slept3 = phaseA.reduce(eyes.state, { type: "hostSleep" });
  check(slept3.state.beat === 4, "sleep after statue starts beat 4");

  var noticed = phaseA.reduce(slept3.state, { type: "beat4Note", noticed: true });
  check(noticed.state.beat === 4 && noticed.state.linePassed !== true, "noticed note does not pass");
  var note = phaseA.reduce(slept3.state, { type: "beat4Note", noticed: false });
  check(note.state.beat === 5 && note.state.linePassed === true, "unnoticed note passes line");
  check(note.state.zone === "deskSide", "group on desk side");

  var caught5 = phaseA.reduce(note.state, { type: "beat5Prize", caught: true });
  check(caught5.state.prizeClaimed !== true && caught5.state.beat === 5, "caught claim stays open");

  var claim = phaseA.reduce(note.state, {
    type: "beat5Prize",
    caught: false,
    blast: "popper"
  });
  check(claim.state.prizeClaimed === true && claim.state.finals.a === true, "claim ends phase A");
  check(claim.state.finals.confetti === true, "confetti finale flag");
  check(claim.state.sessionWon === false, "session not won");
  check(claim.state.phase === "A", "phase B is not started here");
  check(phaseA.viewModel(claim.state).hostLine === "Phase A ends. The session is not won.", "host line");

  var confetti = phaseA.reduce(note.state, {
    type: "beat5Prize",
    caught: false,
    blast: "confetti",
    overHead: true
  });
  check(confetti.state.blast.indexOf("confetti") !== -1, "confetti blast counts");

  var wake = phaseA.reduce(start(), { type: "hostWake" });
  check(wake.state.frozen === true, "wake freezes");
  check(wake.events.some(function (e) { return e.type === "freezeAll"; }), "wake emits freezeAll");
  var walkFrozen = phaseA.reduce(wake.state, {
    type: "beat1Step",
    underFoot: "squeaky",
    backSideOfLine: true
  });
  check(walkFrozen.events.some(function (e) { return e.type === "refused"; }), "walk waits on freeze");
  var clear = phaseA.reduce(wake.state, { type: "hostSleep" });
  check(clear.state.frozen !== true, "sleep clears freeze");

  if (failures) {
    console.error(failures + " failed");
    process.exit(1);
  }
  console.log("ok");
}
