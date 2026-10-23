/* Host cues as data. Speeches are the Say lines in design/08-host-script.md.
   A line tag is the label that script prints on that Say.
   No label means REQUIREMENT. Blanks are filled only with that script's option words. */
(function (root) {
  "use strict";

  var TAGS = ["REQUIREMENT", "DESIGN-DECISION", "RECOMMENDATION"];

  var PRIZE = {
    trophy: "a golden trophy",
    toy: "a toy",
    treats: "a bucket of treats",
    bucket: "a bucket of treats"
  };
  var NOISE = {
    toy: "a squeaky dog toy",
    squeaky: "a squeaky dog toy",
    wrap: "bubble wrap",
    bubble: "bubble wrap"
  };
  var NOISE_SPOKEN = {
    toy: "the squeaky dog toy",
    squeaky: "the squeaky dog toy",
    wrap: "the bubble wrap",
    bubble: "the bubble wrap"
  };
  var BLAST = {
    popper: "pop a safe party popper",
    confetti: "throw a handful of paper confetti"
  };
  var ACTIVITY = {
    board: "facing the whiteboard",
    whiteboard: "facing the whiteboard",
    typing: "typing on a computer",
    computer: "typing on a computer",
    reading: "reading a big book",
    book: "reading a big book"
  };
  var SHADOW = {
    hat: "a hat",
    ears: "giant ears"
  };
  var SPRAY = {
    desk: "the teacher\u2019s desk",
    shoes: "the teacher\u2019s shoes",
    shoe: "the teacher\u2019s shoes"
  };

  var CUES = [
    cue("C01", "Before Phase A: the session", [
      line("DESIGN-DECISION", "One session. Phase A, then Phase B. Beats one through ten, in that order. We win the session after the confetti blast and the silly string finale. Beat 10 stays after Phase A.", { decisions: [4], reqs: ["REQ-MEGA-001", "REQ-MEGA-002", "REQ-MEGA-036"] })
    ]),
    cue("C02", "Before Phase A: places", [
      line("REQUIREMENT", "Teacher, sleep at your desk at the front. You are guarding the prize. Kids, you start at the back. You sneak up to grab the prize.", { reqs: ["REQ-MEGA-004", "REQ-MEGA-046", "REQ-MEGA-006", "REQ-MEGA-047"] })
    ]),
    cue("C03", "Before Phase A: the six choices", [
      line("REQUIREMENT", "Prize, [one]. Under your feet, [one]. Blast, [one]. Strict activity, [one]. On the shadow, [one]. Silly string hits [one].", { fill: "choices", reqs: ["REQ-MEGA-005", "REQ-MEGA-048", "REQ-MEGA-019", "REQ-MEGA-057", "REQ-MEGA-066", "REQ-MEGA-069"] })
    ]),
    cue("C04", "Before Phase A: the three calls", [
      line("DESIGN-DECISION", "Three calls. Start to wake opens the plush window. Wake freezes every kid in a ridiculous pose. Eyes open makes anyone still moving a statue. During the five-second laugh, you may move. Outside that laugh, a wake freezes you.", { decisions: [1, 2], reqs: ["REQ-MEGA-007", "REQ-MEGA-010", "REQ-MEGA-012", "REQ-MEGA-015", "REQ-MEGA-049"] })
    ]),
    cue("C05", "Beat 1, The Squeaky Toy Shoes", [
      line("REQUIREMENT", "Beat 1, Squeaky Toy Shoes. Walk across the room with [the squeaky dog toy / the bubble wrap] under your feet. Silent sneaking is impossible. The prize is still ahead.", { fill: "noise", reqs: ["REQ-MEGA-008", "REQ-MEGA-048", "REQ-MEGA-009", "REQ-MEGA-041"] })
    ]),
    cue("C06", "Beat 2, The Feather Tickle Trigger", [
      line("REQUIREMENT", "Beat 2, Feather Tickle Trigger. Teacher, keep sleeping. The plush throw waits for start to wake.", { reqs: ["REQ-MEGA-010", "REQ-MEGA-042"] })
    ]),
    cue("C07", "Start to wake", [
      line("DESIGN-DECISION", "Start to wake. That is the plush window. A kid may throw the soft plush onto the shield mat.", { decisions: [1], reqs: ["REQ-MEGA-010"] })
    ]),
    cue("C08", "The five-second laugh", [
      line("DESIGN-DECISION", "The plush is on the mat. Teacher, laugh for five seconds. Kids, you may move. Five. Four. Three. Two. One. The laugh is over. The move window is closed.", { decisions: [2], reqs: ["REQ-MEGA-011", "REQ-MEGA-049"] }),
      line("RECOMMENDATION", "Teacher, sleep again. You are guarding the prize.", { recommendation: 3, reqs: ["REQ-MEGA-046"] })
    ]),
    cue("C09", "Wake", [
      line("DESIGN-DECISION", "Wake. Every kid, freeze in a ridiculous pose.", { decisions: [1, 2], reqs: ["REQ-MEGA-007"] })
    ]),
    cue("C10", "Beat 3, The Copycat Pose", [
      line("DESIGN-DECISION", "Beat 3, Copycat Pose. Teacher, open your eyes. Anyone still moving, freeze and be a statue. One example is balancing on one foot with a finger on the nose.", { decisions: [1], reqs: ["REQ-MEGA-012", "REQ-MEGA-013", "REQ-MEGA-050"] })
    ]),
    cue("C11", "Three steps back", [
      line("REQUIREMENT", "You were caught moving, and you laughed. Three steps back.", { reqs: ["REQ-MEGA-014", "REQ-MEGA-040"] }),
      line("RECOMMENDATION", "Back is toward the back of the room.", { recommendation: 5 })
    ]),
    cue("C12", "Beat 4, The Sticky Note Sabotage", [
      line("REQUIREMENT", "Beat 4, Sticky Note Sabotage. To pass the checkpoint line, sneak a sticky note onto the teacher\u2019s back. A mustache, or a goofy face, is the example. Teacher, let the note stay unnoticed. Then pass the line.", { reqs: ["REQ-MEGA-016", "REQ-MEGA-051", "REQ-MEGA-052", "REQ-MEGA-017", "REQ-MEGA-053"] })
    ]),
    cue("C13", "Beat 5, the confetti finale", [
      line("DESIGN-DECISION", "Beat 5, Confetti Victory Blast. You reached the desk without getting caught. Pop the safe party popper and claim the prize. Phase A ends. Phase B is next. The session waits for the silly string finale.", { branch: "popper", decisions: [4], reqs: ["REQ-MEGA-018", "REQ-MEGA-019", "REQ-MEGA-054", "REQ-MEGA-056", "REQ-MEGA-036"] }),
      line("DESIGN-DECISION", "Beat 5, Confetti Victory Blast. You reached the desk without getting caught. Throw a handful of paper confetti over the teacher\u2019s head and claim the prize. Phase A ends. Phase B is next. The session waits for the silly string finale.", { branch: "confetti", decisions: [4], reqs: ["REQ-MEGA-018", "REQ-MEGA-019", "REQ-MEGA-055", "REQ-MEGA-056", "REQ-MEGA-036"] })
    ]),
    cue("C14", "Phase B starts", [
      line("REQUIREMENT", "Phase B starts now, in this room. Teacher, stand up. You are the strict teacher. Pretend to be very strict.", { reqs: ["REQ-MEGA-020", "REQ-MEGA-021", "REQ-MEGA-022"] }),
      line("REQUIREMENT", "Face the whiteboard.", { branch: "board", reqs: ["REQ-MEGA-057"] }),
      line("REQUIREMENT", "Type on the computer.", { branch: "typing", reqs: ["REQ-MEGA-057"] }),
      line("REQUIREMENT", "Read the big book.", { branch: "reading", reqs: ["REQ-MEGA-057"] }),
      line("RECOMMENDATION", "Kids, return to the back of the room.", { recommendation: 4, reqs: ["REQ-MEGA-023"] }),
      line("REQUIREMENT", "The props stay in the room. Deliver the secret note to the mailbox on the other side of the room.", { reqs: ["REQ-MEGA-024", "REQ-MEGA-026", "REQ-MEGA-058"] })
    ]),
    cue("C15", "Beat 6, The Whoopee Cushion Pathway", [
      line("REQUIREMENT", "Beat 6, Whoopee Cushion Pathway. The floor is lined with cushions. Three of them hide a whoopee cushion. Guess which cushions are safe. A wrong step makes a loud noise.", { reqs: ["REQ-MEGA-027", "REQ-MEGA-059", "REQ-MEGA-028", "REQ-MEGA-060"] })
    ]),
    cue("C16", "Beat 7, The Reverse Homework Trick", [
      line("REQUIREMENT", "Beat 7, Reverse Homework Trick. Instead of work, pass the giant clown sunglasses down the line. Use only your feet. Keep hold of them.", { reqs: ["REQ-MEGA-029", "REQ-MEGA-061", "REQ-MEGA-062", "REQ-MEGA-063"] })
    ]),
    cue("C17", "Beat 8, The Doodle Attack", [
      line("DESIGN-DECISION", "Beat 8, Doodle Attack. Teacher, turn away from the whiteboard, then turn back to face it. Kids, that turn back is your window. Race to the teacher\u2019s shadow on the wall. Draw with the flashlight: a hat, or giant ears.", { branch: "board", decisions: [3], reqs: ["REQ-MEGA-030", "REQ-MEGA-043", "REQ-MEGA-064", "REQ-MEGA-065", "REQ-MEGA-066"] }),
      line("DESIGN-DECISION", "Beat 8, Doodle Attack. Teacher, turn to face the whiteboard. Kids, that turn is your window. Race to the teacher\u2019s shadow on the wall. Draw with the flashlight: a hat, or giant ears.", { branch: "other", decisions: [3], reqs: ["REQ-MEGA-030", "REQ-MEGA-043", "REQ-MEGA-064", "REQ-MEGA-065", "REQ-MEGA-066"] })
    ]),
    cue("C18", "Beat 9, The Monster Talk Distraction", [
      line("REQUIREMENT", "Beat 9, Monster Talk Distraction. One kid, yell a phrase in a deep monster voice. The example is: The broccoli has landed! Teacher, turn around, confused, and investigate the sound. Other kids, you can crawl forward.", { reqs: ["REQ-MEGA-031", "REQ-MEGA-032", "REQ-MEGA-033", "REQ-MEGA-067"] })
    ]),
    cue("C19", "Beat 10 opens", [
      line("REQUIREMENT", "Beat 10, Silly String Finale. The finale starts once the secret note reaches the mailbox.", { reqs: ["REQ-MEGA-034"] })
    ]),
    cue("C20", "The mailbox, Phase B won", [
      line("DESIGN-DECISION", "The secret note is in the mailbox. Phase B is won. The session waits until the spray joins the confetti blast.", { decisions: [4], reqs: ["REQ-MEGA-034", "REQ-MEGA-036"] })
    ]),
    cue("C21", "The silly string finale, session won", [
      line("DESIGN-DECISION", "Gently spray the teacher\u2019s desk with silly string. Victory dance while you spray. The confetti blast and the silly string finale have both happened. The session is won.", { branch: "desk", decisions: [4], reqs: ["REQ-MEGA-068", "REQ-MEGA-069", "REQ-MEGA-070", "REQ-MEGA-035", "REQ-MEGA-036"] }),
      line("DESIGN-DECISION", "Gently spray the teacher\u2019s shoes with silly string. Victory dance while you spray. The confetti blast and the silly string finale have both happened. The session is won.", { branch: "shoes", decisions: [4], reqs: ["REQ-MEGA-068", "REQ-MEGA-069", "REQ-MEGA-070", "REQ-MEGA-035", "REQ-MEGA-036"] })
    ])
  ];

  var BY_ID = {};
  for (var c = 0; c < CUES.length; c += 1) BY_ID[CUES[c].id] = CUES[c];

  function cue(id, title, lines) {
    return { id: id, title: title, lines: lines };
  }

  function line(tag, script, extra) {
    var row = { tag: tag, text: script, script: script };
    var key;
    extra = extra || {};
    for (key in extra) {
      if (Object.prototype.hasOwnProperty.call(extra, key)) row[key] = extra[key];
    }
    return row;
  }

  function picksOf(state) {
    return (state && state.picks) || {};
  }

  function lookup(table, value) {
    var key;
    var found;
    if (value == null || value === "") return null;
    key = String(value).toLowerCase();
    if (table[key]) return table[key];
    for (found in table) {
      if (Object.prototype.hasOwnProperty.call(table, found) && table[found].toLowerCase() === key) return table[found];
    }
    return null;
  }

  function normToken(value, pairs) {
    var key;
    var i;
    if (value == null || value === "") return null;
    key = String(value).toLowerCase();
    for (i = 0; i < pairs.length; i += 1) {
      if (pairs[i].indexOf(key) !== -1) return pairs[i][0];
    }
    return null;
  }

  function normActivity(value) {
    return normToken(value, [
      ["board", "board", "whiteboard", "facing", "facing the whiteboard"],
      ["typing", "typing", "computer", "typing on a computer"],
      ["reading", "reading", "book", "reading a big book"]
    ]);
  }

  function normBlast(value) {
    return normToken(value, [
      ["popper", "popper", "party", "pop a safe party popper"],
      ["confetti", "confetti", "throw a handful of paper confetti"]
    ]);
  }

  function normSpray(value) {
    return normToken(value, [
      ["desk", "desk", "the teacher\u2019s desk", "the teacher's desk"],
      ["shoes", "shoes", "shoe", "the teacher\u2019s shoes", "the teacher's shoes"]
    ]);
  }

  function normNoise(value) {
    return normToken(value, [
      ["toy", "toy", "squeaky", "a squeaky dog toy", "the squeaky dog toy"],
      ["wrap", "wrap", "bubble", "bubble wrap", "the bubble wrap"]
    ]);
  }

  function normTeacher(value) {
    return normToken(value, [
      ["session", "session", "none"],
      ["places", "places"],
      ["choices", "choices"],
      ["calls", "calls"],
      ["asleep", "asleep", "sleep"],
      ["stirring", "stirring", "stir", "starting", "start-to-wake", "starting to wake"],
      ["laughing", "laughing", "laugh"],
      ["awake", "awake", "wake", "wakes up", "wakes-up"],
      ["eyes", "eyes", "eyes open", "eyes-open"],
      ["standing", "standing", "join"],
      ["board", "board", "whiteboard"],
      ["typing", "typing", "computer"],
      ["reading", "reading", "book"],
      ["activity", "activity", "strict"],
      ["turned", "turned", "investigating"],
      ["string", "string", "spraying", "spray"]
    ]);
  }

  function beatOf(state) {
    var beat;
    if (!state || state.beat == null || state.beat === "") return 0;
    beat = Number(state.beat);
    if (isNaN(beat)) return 0;
    return beat;
  }

  function activityOf(state) {
    var teacher = normTeacher(state && state.teacher);
    var picked = normActivity(picksOf(state).activity);
    var beat = beatOf(state);
    if (teacher === "board" || teacher === "typing" || teacher === "reading") return teacher;
    if (teacher === "turned" && beat === 8) return "board";
    if (picked) return picked;
    if (teacher === "activity") return null;
    return null;
  }

  function blastOf(state) {
    return normBlast(picksOf(state).blast);
  }

  function sprayOf(state) {
    return normSpray(picksOf(state).string || picksOf(state).spray || picksOf(state).target);
  }

  function caughtLaugh(state) {
    var kids;
    var list;
    var key;
    var i;
    var kid;
    if (!state) return false;
    if (state.caughtLaugh === true || state.laughed === true) return true;
    kids = state.kids;
    if (!kids) return false;
    list = [];
    if (Object.prototype.toString.call(kids) === "[object Array]") list = kids;
    else {
      for (key in kids) {
        if (Object.prototype.hasOwnProperty.call(kids, key)) list.push(kids[key]);
      }
    }
    for (i = 0; i < list.length; i += 1) {
      kid = list[i];
      if (kid && kid.caught && (kid.didSteps || kid.laughed || kid.laugh)) return true;
    }
    return false;
  }

  function noteIn(state) {
    return !!(state && (state.noteInBox || state.noteInMailbox));
  }

  function sprayed(state) {
    var teacher;
    if (!state) return false;
    teacher = normTeacher(state.teacher);
    return !!(state.sprayed || state.stringOn || state.sessionWon || state.screen === "won" || teacher === "string");
  }

  function beforeId(state) {
    var setup = state && state.setup != null ? String(state.setup).toLowerCase() : "";
    var teacher = normTeacher(state && state.teacher);
    if (setup === "1" || setup === "c01" || setup === "session") return "C01";
    if (setup === "2" || setup === "c02" || setup === "places") return "C02";
    if (setup === "3" || setup === "c03" || setup === "choices") return "C03";
    if (setup === "4" || setup === "c04" || setup === "calls") return "C04";
    if (teacher === "calls") return "C04";
    if (teacher === "choices") return "C03";
    if (teacher === "places" || teacher === "asleep") return "C02";
    return "C01";
  }

  function selectId(state) {
    var beat = beatOf(state);
    var teacher = normTeacher(state && state.teacher);
    var phaseA = beat >= 1 && beat <= 5;

    if (teacher === "laughing" && phaseA) return "C08";
    if (teacher === "stirring" && beat === 2) return "C07";
    if (teacher === "awake" && phaseA) return "C09";
    if (teacher === "eyes" && beat === 3 && caughtLaugh(state)) return "C11";
    if (teacher === "eyes" && beat === 3) return "C10";

    if (beat === 10) {
      if (noteIn(state) && sprayed(state)) return "C21";
      if (noteIn(state)) return "C20";
      return "C19";
    }
    if (beat === 9) return "C18";
    if (beat === 8) return "C17";
    if (beat === 7) return "C16";
    if (beat === 6) return "C15";
    if (beat === 5 && (state.claimed || state.blastDone || teacher === "standing")) return "C14";
    if (beat === 5) return "C13";
    if (beat === 4) return "C12";
    if (beat === 3) return "C10";
    if (beat === 2) return "C06";
    if (beat === 1) return "C05";
    return beforeId(state);
  }

  function branchMatches(row, state) {
    var activity;
    var blast;
    var spray;
    if (!row.branch) return true;
    activity = activityOf(state);
    blast = blastOf(state);
    spray = sprayOf(state);
    if (row.branch === "popper") return blast === "popper" || blast == null;
    if (row.branch === "confetti") return blast === "confetti" || blast == null;
    if (row.branch === "board") return activity === "board" || activity == null;
    if (row.branch === "typing") return activity === "typing" || activity == null;
    if (row.branch === "reading") return activity === "reading" || activity == null;
    if (row.branch === "other") return activity === "typing" || activity === "reading" || activity == null;
    if (row.branch === "desk") return spray === "desk" || spray == null;
    if (row.branch === "shoes") return spray === "shoes" || spray == null;
    return true;
  }

  function speak(row, state) {
    var picked = picksOf(state);
    var noise;
    var shadow;
    var parts;
    var text;
    var i;
    if (row.fill === "noise") {
      noise = normNoise(picked.noise || picked.underfoot || picked.feet);
      if (!noise) return row.script;
      return row.script.replace("[the squeaky dog toy / the bubble wrap]", NOISE_SPOKEN[noise]);
    }
    if (row.fill === "choices") {
      shadow = picked.shadow || picked.drawing || (state && state.drawing);
      parts = [
        lookup(PRIZE, picked.prize),
        lookup(NOISE, picked.noise || picked.underfoot || picked.feet),
        lookup(BLAST, picked.blast),
        lookup(ACTIVITY, picked.activity),
        lookup(SHADOW, shadow),
        lookup(SPRAY, picked.string || picked.spray || picked.target)
      ];
      text = row.script;
      for (i = 0; i < parts.length; i += 1) text = text.replace("[one]", parts[i] || "[one]");
      return text;
    }
    return row.script;
  }

  function copyLine(row, state) {
    var copy = {
      tag: row.tag,
      text: speak(row, state),
      script: row.script
    };
    if (row.decisions) copy.decisions = row.decisions.slice();
    if (row.reqs) copy.reqs = row.reqs.slice();
    if (row.recommendation) copy.recommendation = row.recommendation;
    if (row.branch) copy.branch = row.branch;
    return copy;
  }

  function presentCue(source, state) {
    var lines = [];
    var i;
    for (i = 0; i < source.lines.length; i += 1) {
      if (branchMatches(source.lines[i], state)) lines.push(copyLine(source.lines[i], state));
    }
    if (!lines.length) {
      for (i = 0; i < source.lines.length; i += 1) lines.push(copyLine(source.lines[i], state));
    }
    return { id: source.id, title: source.title, lines: lines };
  }

  function catalog() {
    var out = [];
    var i;
    var j;
    var source;
    var lines;
    for (i = 0; i < CUES.length; i += 1) {
      source = CUES[i];
      lines = [];
      for (j = 0; j < source.lines.length; j += 1) lines.push(copyLine(source.lines[j], {}));
      out.push({ id: source.id, title: source.title, lines: lines });
    }
    return out;
  }

  function viewModel(state) {
    var id = selectId(state || {});
    return {
      cue: presentCue(BY_ID[id], state || {}),
      cues: catalog()
    };
  }

  function reduce(state, action) {
    var base = state || {};
    var shown = viewModel(base).cue.id;
    var prev = Object.prototype.toString.call(base.log) === "[object Array]" ? base.log : [];
    var next = {};
    var key;
    for (key in base) {
      if (Object.prototype.hasOwnProperty.call(base, key)) next[key] = base[key];
    }
    next.log = prev.concat([shown]);
    return next;
  }

  var api = {
    viewModel: viewModel,
    reduce: reduce
  };

  root.CLASSROOM = root.CLASSROOM || {};
  root.CLASSROOM.modules = root.CLASSROOM.modules || {};
  root.CLASSROOM.modules.cues = api;

  if (typeof module !== "undefined" && module.exports) module.exports = api;

  function fail(message) {
    throw new Error(message);
  }

  function runTests() {
    var vm;
    var i;
    var j;
    var row;
    var tagsOk;
    var shown;
    var state;
    var next;
    var again;
    var picks;
    var text;

    if (!root.CLASSROOM || !root.CLASSROOM.modules || root.CLASSROOM.modules.cues !== api) {
      fail("CLASSROOM.modules.cues is missing");
    }

    vm = viewModel({});
    if (!vm.cue || !vm.cues) fail("viewModel must return cue and cues");
    if (vm.cues.length !== 21) fail("expected 21 cues, got " + vm.cues.length);
    if (vm.cue.id !== "C01") fail("empty state shows C01");

    for (i = 0; i < vm.cues.length; i += 1) {
      if (vm.cues[i].id !== "C" + (i < 9 ? "0" : "") + String(i + 1)) fail("cue order " + vm.cues[i].id);
      if (!vm.cues[i].lines.length) fail("cue has no lines " + vm.cues[i].id);
      for (j = 0; j < vm.cues[i].lines.length; j += 1) {
        row = vm.cues[i].lines[j];
        tagsOk = false;
        for (tagsOk = 0; tagsOk < TAGS.length; tagsOk += 1) {
          if (row.tag === TAGS[tagsOk]) break;
        }
        if (row.tag !== "REQUIREMENT" && row.tag !== "DESIGN-DECISION" && row.tag !== "RECOMMENDATION") {
          fail("bad tag on " + vm.cues[i].id);
        }
        if (row.text !== row.script) fail("catalog text drifted " + vm.cues[i].id);
        if (!row.text) fail("empty speech " + vm.cues[i].id);
        if (row.tag === "DESIGN-DECISION" && (!row.decisions || !row.decisions.length)) {
          fail("decision line needs a number " + vm.cues[i].id);
        }
      }
    }

    function expectId(sample, id) {
      shown = viewModel(sample).cue;
      if (shown.id !== id) fail("state beat " + sample.beat + " teacher " + sample.teacher + " showed " + shown.id + " instead of " + id);
    }

    expectId({ beat: 0 }, "C01");
    expectId({ beat: 0, teacher: "asleep" }, "C02");
    expectId({ beat: 0, teacher: "choices" }, "C03");
    expectId({ beat: 0, setup: "calls", teacher: "asleep" }, "C04");
    expectId({ beat: 1, teacher: "asleep" }, "C05");
    expectId({ beat: 1, teacher: "awake" }, "C09");
    expectId({ beat: 2, teacher: "asleep" }, "C06");
    expectId({ beat: 2, teacher: "stirring" }, "C07");
    expectId({ beat: 2, teacher: "laughing" }, "C08");
    expectId({ beat: 2, teacher: "awake" }, "C09");
    expectId({ beat: 3, teacher: "asleep" }, "C10");
    expectId({ beat: 3, teacher: "eyes" }, "C10");
    expectId({ beat: 3, teacher: "eyes", caughtLaugh: true }, "C11");
    expectId({ beat: 3, teacher: "eyes", kids: { a: { caught: true, didSteps: true } } }, "C11");
    expectId({ beat: 4, teacher: "asleep" }, "C12");
    expectId({ beat: 5, teacher: "asleep" }, "C13");
    expectId({ beat: 5, teacher: "asleep", claimed: true }, "C14");
    expectId({ beat: 5, teacher: "awake" }, "C09");
    expectId({ beat: 6, teacher: "activity" }, "C15");
    expectId({ beat: 7, teacher: "typing" }, "C16");
    expectId({ beat: 8, teacher: "board" }, "C17");
    expectId({ beat: 9, teacher: "turned" }, "C18");
    expectId({ beat: 10, teacher: "activity" }, "C19");
    expectId({ beat: 10, teacher: "activity", noteInBox: true }, "C20");
    expectId({ beat: 10, teacher: "string", noteInBox: true }, "C21");
    expectId({ beat: 6, teacher: "awake" }, "C15");
    expectId({ beat: 2, teacher: "laughing" }, "C08");

    picks = {
      prize: "trophy",
      noise: "toy",
      blast: "popper",
      activity: "board",
      shadow: "hat",
      string: "desk"
    };
    text = viewModel({ beat: 0, teacher: "choices", picks: picks }).cue.lines[0].text;
    if (text !== "Prize, a golden trophy. Under your feet, a squeaky dog toy. Blast, pop a safe party popper. Strict activity, facing the whiteboard. On the shadow, a hat. Silly string hits the teacher\u2019s desk.") {
      fail("choice fill changed the speech: " + text);
    }
    if (viewModel({ beat: 0, teacher: "choices" }).cue.lines[0].text.indexOf("[one]") === -1) {
      fail("open choices must keep the script blanks");
    }

    text = viewModel({ beat: 1, teacher: "asleep", picks: { noise: "wrap" } }).cue.lines[0].text;
    if (text !== "Beat 1, Squeaky Toy Shoes. Walk across the room with the bubble wrap under your feet. Silent sneaking is impossible. The prize is still ahead.") {
      fail("noise fill: " + text);
    }

    shown = viewModel({ beat: 5, teacher: "asleep", picks: { blast: "confetti" } }).cue;
    if (shown.lines.length !== 1 || shown.lines[0].text.indexOf("paper confetti over the teacher\u2019s head") === -1) {
      fail("confetti branch");
    }
    shown = viewModel({ beat: 8, picks: { activity: "reading" } }).cue;
    if (shown.lines.length !== 1 || shown.lines[0].text.indexOf("turn to face the whiteboard") === -1) {
      fail("reading doodle branch");
    }
    shown = viewModel({ beat: 8, teacher: "turned", picks: { activity: "board" } }).cue;
    if (shown.lines[0].text.indexOf("turn away from the whiteboard, then turn back") === -1) fail("facing doodle branch");
    shown = viewModel({ beat: 10, noteInBox: true, sprayed: true, picks: { string: "shoes" } }).cue;
    if (shown.id !== "C21" || shown.lines[0].text.indexOf("teacher\u2019s shoes") === -1) fail("shoes finale");

    shown = viewModel({ beat: 2, teacher: "laughing" }).cue;
    if (shown.lines.length !== 2 || shown.lines[0].tag !== "DESIGN-DECISION" || shown.lines[1].tag !== "RECOMMENDATION") {
      fail("laugh cue lines");
    }
    if (shown.lines[0].text.indexOf("Five. Four. Three. Two. One.") === -1) fail("laugh count missing");

    state = { beat: 4, teacher: "asleep", log: ["earlier"], picks: { blast: "popper" } };
    next = reduce(state, { type: "ignored", id: "C99" });
    if (next === state) fail("reduce must return a new state");
    if (state.log.length !== 1 || state.log[0] !== "earlier") fail("reduce mutated the previous log");
    if (next.log.length !== 2 || next.log[0] !== "earlier" || next.log[1] !== "C12") fail("reduce log " + next.log.join(","));
    if (next.beat !== 4 || next.teacher !== "asleep") fail("reduce changed beat or teacher");
    if (next.picks !== state.picks) fail("reduce replaced picks");
    again = reduce(next);
    if (again.log.join(",") !== "earlier,C12,C12") fail("second reduce " + again.log.join(","));
    if (viewModel(state).cue.id !== "C12") fail("viewModel mutated state");

    shown = viewModel({ beat: 1, teacher: "asleep" }).cues;
    if (shown.length !== 21) fail("current call dropped the catalog");
  }

  if (typeof module !== "undefined" && require.main === module) {
    try {
      runTests();
    } catch (err) {
      if (typeof console !== "undefined") console.error(err && err.message ? err.message : err);
      if (typeof process !== "undefined" && process.exit) process.exit(1);
      throw err;
    }
  }
})(typeof globalThis !== "undefined" ? globalThis : this);
