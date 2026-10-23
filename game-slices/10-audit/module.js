/* Playable scenarios for the classroom session.
   Action types and the expect shape are fixed. Rules come from the game design. */
(function (root) {
  var CLASSROOM = root.CLASSROOM || (root.CLASSROOM = {});
  CLASSROOM.modules = CLASSROOM.modules || {};

  var ACTIONS = {
    startSession: 1, lockPicks: 1, beginPhaseB: 1, markFinalA: 1, markFinalB: 1,
    beat1Step: 1, beat2Throw: 1, beat2LaughEnd: 1, beat3Eyes: 1, beat4Note: 1,
    beat5Prize: 1, beat6Step: 1, beat7Pass: 1, beat8Draw: 1, beat9Yell: 1,
    beat10Mailbox: 1, beat10Spray: 1, hostSleep: 1, hostStir: 1, hostLaughStart: 1,
    hostLaughEnd: 1, hostWake: 1, hostEyes: 1, hostStand: 1, hostActivity: 1,
    hostInvestigate: 1, kidStep: 1, kidStill: 1, freezeAll: 1, catchMovers: 1,
    placeRoom: 1, revealWhoopee: 1, setKidCount: 1
  };

  var POPPER = { prize: "trophy", noise: "squeaky", blast: "popper", activity: "board", string: "desk" };
  var CONFETTI = { prize: "trophy", noise: "squeaky", blast: "confetti", activity: "board", string: "desk" };

  function act(type, payload) {
    return { type: type, payload: payload || {} };
  }

  function cat(parts) {
    var out = [];
    var p, i;
    for (p = 0; p < parts.length; p++) {
      for (i = 0; i < parts[p].length; i++) out.push(parts[p][i]);
    }
    return out;
  }

  function setup(picks) {
    return [
      act("setKidCount", { count: 2 }),
      act("lockPicks", picks),
      act("placeRoom", {}),
      act("startSession", {})
    ];
  }

  function walk(picks) {
    return [act("beat1Step", { underFoot: picks.noise, backSideOfLine: true })];
  }

  function laughHit() {
    return [
      act("hostStir", {}),
      act("beat2Throw", { onMat: true }),
      act("hostLaughStart", {}),
      act("kidStep", { duringLaugh: true })
    ];
  }

  function eyesOpen() {
    return [
      act("kidStill", {}),
      act("kidStep", { moving: true }),
      act("beat3Eyes", {}),
      act("catchMovers", {})
    ];
  }

  function threeBack() {
    return [
      act("kidStep", { direction: "back", caughtLaugh: true }),
      act("kidStep", { direction: "back", caughtLaugh: true }),
      act("kidStep", { direction: "back", caughtLaugh: true })
    ];
  }

  function claim(picks) {
    var payload = { caught: false, blast: picks.blast };
    if (picks.blast === "confetti") payload.overHead = true;
    return [act("beat5Prize", payload), act("markFinalA", {})];
  }

  function standUp() {
    return [
      act("hostStand", {}),
      act("hostActivity", { activity: "board" }),
      act("beginPhaseB", { room: "same" })
    ];
  }

  function toBeat2(picks) { return cat([setup(picks), walk(picks)]); }
  function toLaughing() { return cat([toBeat2(POPPER), laughHit()]); }
  function toBeat3() { return cat([toLaughing(), [act("beat2LaughEnd", {})]]); }
  function toCaught() { return cat([toBeat3(), eyesOpen()]); }
  function toBeat4() { return cat([toCaught(), [act("hostSleep", {})]]); }
  function toBeat5() { return cat([toBeat4(), [act("beat4Note", { noticed: false })]]); }
  function toClaim(picks) { return cat([setup(picks), walk(picks), laughHit(), [act("beat2LaughEnd", {})], eyesOpen(), [act("hostSleep", {}), act("beat4Note", { noticed: false })], claim(picks)]); }
  function toPhaseB() { return cat([toClaim(POPPER), standUp()]); }
  function toBeat7() { return cat([toPhaseB(), [act("beat6Step", { allOffMailboxSide: true })]]); }
  function toBeat8() { return cat([toBeat7(), [act("beat7Pass", { feet: true, dropped: false })]]); }
  function toBeat9() { return cat([toBeat8(), [act("beat8Draw", { picture: "hat" })]]); }
  function toBeat10() {
    return cat([toBeat9(), [
      act("beat9Yell", { voice: "monster", phrase: "The broccoli has landed!" }),
      act("hostInvestigate", {}),
      act("hostActivity", { activity: "board" })
    ]]);
  }
  function toSprayed() {
    return cat([toBeat10(), [
      act("beat10Mailbox", {}),
      act("beat10Spray", { target: "desk", gentle: true, dance: true }),
      act("markFinalB", {})
    ]]);
  }

  function none() { return { confetti: false, sillyString: false, sessionWon: false }; }
  function blastOnly() { return { confetti: true, sillyString: false, sessionWon: false }; }
  function bothWon() { return { confetti: true, sillyString: true, sessionWon: true }; }

  function scene(id, beat, actions, phase, atBeat, teacher, finals) {
    return {
      id: id,
      beat: beat,
      actions: actions,
      expect: { phase: phase, beat: atBeat, teacher: teacher, finals: finals }
    };
  }

  var scenarios = [
    scene("beat-01", 1, toBeat2(POPPER), "A", 2, "Asleep", none()),
    scene("beat-01-wake", 1, cat([setup(POPPER), [
      act("hostWake", {}),
      act("freezeAll", {}),
      act("hostSleep", {})
    ], walk(POPPER)]), "A", 2, "Asleep", none()),
    scene("laugh", 2, toLaughing(), "A", 2, "Laughing", none()),
    scene("beat-02", 2, toBeat3(), "A", 3, "Asleep", none()),
    scene("beat-03", 3, toBeat4(), "A", 4, "Asleep", none()),
    scene("send-back", 3, cat([toCaught(), threeBack()]), "A", 3, "Eyes open", none()),
    scene("beat-04", 4, toBeat5(), "A", 5, "Asleep", none()),
    scene("beat-05", 5, toClaim(POPPER), "A", 5, "Asleep", blastOnly()),
    scene("final-a", 5, toClaim(CONFETTI), "A", 5, "Asleep", blastOnly()),
    scene("phase-b-open", 6, toPhaseB(), "B", 6, "Facing the whiteboard", blastOnly()),
    scene("beat-06-noise", 6, cat([toPhaseB(), [
      act("revealWhoopee", {}),
      act("beat6Step", { wrong: true })
    ]]), "B", 6, "Facing the whiteboard", blastOnly()),
    scene("beat-06", 6, toBeat7(), "B", 7, "Facing the whiteboard", blastOnly()),
    scene("beat-07", 7, toBeat8(), "B", 8, "Facing the whiteboard", blastOnly()),
    scene("beat-08", 8, toBeat9(), "B", 9, "Facing the whiteboard", blastOnly()),
    scene("beat-09", 9, toBeat10(), "B", 10, "Facing the whiteboard", blastOnly()),
    scene("beat-10-mailbox", 10, cat([toBeat10(), [act("beat10Mailbox", {})]]), "B", 10, "Facing the whiteboard", blastOnly()),
    scene("beat-10", 10, toSprayed(), "B", 10, "Facing the whiteboard", bothWon()),
    scene("final-b", 10, toSprayed(), "B", 10, "Facing the whiteboard", bothWon()),
    scene("session-won", 10, toSprayed(), "B", 10, "Facing the whiteboard", bothWon())
  ];

  CLASSROOM.modules.audit = { scenarios: scenarios };

  function checkScenarios(list) {
    var seen = {};
    var beats = {};
    var i, s, a, n;
    if (!list || !list.length) return "scenarios missing";
    for (i = 0; i < list.length; i++) {
      s = list[i];
      if (!s.id || seen[s.id]) return "bad id at " + i;
      seen[s.id] = 1;
      if (s.beat < 1 || s.beat > 10) return "beat out of range: " + s.id;
      beats[s.beat] = 1;
      if (!s.actions || !s.actions.length) return "no actions: " + s.id;
      for (a = 0; a < s.actions.length; a++) {
        if (!ACTIONS[s.actions[a].type]) return "bad action " + s.actions[a].type + " in " + s.id;
        if (!s.actions[a].payload || typeof s.actions[a].payload !== "object") return "bad payload in " + s.id;
      }
      if (!s.expect || (s.expect.phase !== "A" && s.expect.phase !== "B")) return "bad phase: " + s.id;
      if (typeof s.expect.beat !== "number") return "bad expect.beat: " + s.id;
      if (!s.expect.teacher) return "bad teacher: " + s.id;
      if (!s.expect.finals) return "bad finals: " + s.id;
      if (typeof s.expect.finals.confetti !== "boolean") return "bad confetti: " + s.id;
      if (typeof s.expect.finals.sillyString !== "boolean") return "bad sillyString: " + s.id;
      if (typeof s.expect.finals.sessionWon !== "boolean") return "bad sessionWon: " + s.id;
    }
    for (n = 1; n <= 10; n++) {
      if (!beats[n]) return "no scenario for beat " + n;
    }
    if (list.some(function (item) { return item.id === "send-back"; }) !== true) return "missing send-back";
    if (!seen.laugh) return "missing laugh";
    if (!seen["final-a"] || !seen["final-b"] || !seen["session-won"]) return "missing finales";
    if (seen["final-a"] && list.filter(function (item) { return item.id === "final-a"; })[0].expect.finals.sessionWon) {
      return "final-a must leave the session unwinned";
    }
    if (!list.filter(function (item) { return item.id === "session-won"; })[0].expect.finals.sessionWon) {
      return "session-won must be won";
    }
    var won = list.filter(function (item) { return item.id === "session-won"; })[0].expect.finals;
    if (!won.confetti || !won.sillyString) return "session-won needs both finales";
    return "";
  }

  CLASSROOM.modules.audit.check = checkScenarios;

  if (typeof module !== "undefined" && module.exports) module.exports = CLASSROOM.modules.audit;

  if (typeof module !== "undefined" && require.main === module) {
    var problem = checkScenarios(scenarios);
    if (problem) {
      console.error(problem);
      process.exit(1);
    }
    process.exit(0);
  }
})(typeof globalThis !== "undefined" ? globalThis : this);
