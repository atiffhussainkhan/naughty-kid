/* Options for one classroom session.
   Classic script. Owns the five host picks.
   Authority: mega-requirements.md, design/game-design.md, design/07-setup-and-options.md.
   Replay is UNKNOWN and stays a gap. This file does not touch art. */
(function (root) {
  "use strict";

  var CLASSROOM = root.CLASSROOM = root.CLASSROOM || {};
  CLASSROOM.modules = CLASSROOM.modules || {};

  var PICK_KEYS = ["prize", "noisemaker", "victory", "activity", "stringTarget"];

  var LISTS = {
    prize: ["a golden trophy", "a toy", "a bucket of treats"],
    noisemaker: ["a squeaky dog toy", "bubble wrap"],
    victory: [
      "pop a safe party popper",
      "throw a handful of paper confetti over the teacher's head"
    ],
    activity: [
      "standing facing a whiteboard",
      "typing on a computer",
      "reading a big book"
    ],
    stringTarget: ["the teacher's desk", "the teacher's shoes"]
  };

  var ACTIVITY_SAME = {
    "standing facing the whiteboard": "standing facing a whiteboard"
  };

  var SAMPLES = {
    statue: { beat: 3, text: "Balancing on one foot with a finger on the nose" },
    note: {
      beat: 4,
      choices: ["a drawing of a mustache", "a drawing of a goofy face"]
    },
    phrase: { beat: 9, text: "The broccoli has landed!" }
  };

  function norm(value) {
    return String(value)
      .replace(/[\u2019\u2018]/g, "'")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  }

  function isPlain(value) {
    return !!value && typeof value === "object" && !Array.isArray(value);
  }

  function isBeat(beat) {
    return typeof beat === "number" && beat >= 0 && beat <= 10 && Math.floor(beat) === beat;
  }

  function matchList(key, value) {
    if (typeof value !== "string") return null;
    var named = norm(value);
    if (!named) return null;
    if (key === "activity" && ACTIVITY_SAME[named]) return ACTIVITY_SAME[named];
    var list = LISTS[key];
    var i;
    for (i = 0; i < list.length; i += 1) {
      if (norm(list[i]) === named) return list[i];
    }
    return null;
  }

  function toyBlocked(name) {
    var named = norm(name);
    return named.indexOf("plush") !== -1 ||
      named.indexOf("sunglass") !== -1 ||
      named.indexOf("whoopee") !== -1;
  }

  function copyPicks(picks) {
    if (!picks) return null;
    return {
      prize: picks.prize,
      noisemaker: picks.noisemaker,
      victory: picks.victory,
      activity: picks.activity,
      stringTarget: picks.stringTarget
    };
  }

  function copyLists() {
    return {
      prize: LISTS.prize.slice(),
      noisemaker: LISTS.noisemaker.slice(),
      victory: LISTS.victory.slice(),
      activity: LISTS.activity.slice(),
      stringTarget: LISTS.stringTarget.slice()
    };
  }

  function blankSample(kind) {
    if (kind === "note") {
      return { value: null, source: true, replaced: false, named: false };
    }
    return { value: SAMPLES[kind].text, source: true, replaced: false, named: false };
  }

  function createOptions() {
    var state = {
      picks: null,
      picksLocked: false,
      toyName: null,
      samples: {
        statue: blankSample("statue"),
        note: blankSample("note"),
        phrase: blankSample("phrase")
      }
    };

    function viewSample(kind) {
      var slot = state.samples[kind];
      var view = {
        kind: kind,
        beat: SAMPLES[kind].beat,
        value: slot.value,
        source: slot.source,
        replaced: slot.replaced,
        named: slot.named
      };
      if (kind === "note" && !slot.named) view.choices = SAMPLES.note.choices.slice();
      return view;
    }

    function allSamples() {
      return {
        statue: viewSample("statue"),
        note: viewSample("note"),
        phrase: viewSample("phrase")
      };
    }

    function lockPicks(set) {
      if (state.picksLocked) {
        return { ok: false, reason: "locked", picksLocked: true };
      }
      if (!isPlain(set)) {
        return { ok: false, reason: "incomplete", picksLocked: false };
      }
      var keys = Object.keys(set);
      var i;
      var key;
      for (i = 0; i < keys.length; i += 1) {
        key = keys[i];
        if (PICK_KEYS.indexOf(key) === -1 && key !== "toyName") {
          return { ok: false, reason: "unknown-pick", pick: key, picksLocked: false };
        }
      }
      var next = {};
      for (i = 0; i < PICK_KEYS.length; i += 1) {
        key = PICK_KEYS[i];
        if (!Object.prototype.hasOwnProperty.call(set, key) || !matchList(key, set[key])) {
          return { ok: false, reason: "incomplete", pick: key, picksLocked: false };
        }
        next[key] = matchList(key, set[key]);
      }
      var toyName = null;
      if (Object.prototype.hasOwnProperty.call(set, "toyName") && set.toyName != null && String(set.toyName).trim() !== "") {
        if (next.prize !== "a toy" || typeof set.toyName !== "string" || toyBlocked(set.toyName)) {
          return { ok: false, reason: "toy-name", picksLocked: false };
        }
        toyName = String(set.toyName).replace(/\s+/g, " ").trim();
      }
      state.picks = next;
      state.toyName = toyName;
      state.picksLocked = true;
      return { ok: true, picks: copyPicks(state.picks), picksLocked: true };
    }

    function sourceNote(text) {
      var named = norm(text);
      if (named === "a drawing of a mustache" || named === "a mustache" || named === "mustache") {
        return "a drawing of a mustache";
      }
      if (named === "a drawing of a goofy face" || named === "a goofy face" || named === "goofy face") {
        return "a drawing of a goofy face";
      }
      return null;
    }

    function parseSample(kind, text) {
      if (text == null || String(text).trim() === "") return { empty: true };
      var trimmed = String(text).replace(/^["']|["']$/g, "").replace(/\s+/g, " ").trim();
      if (!trimmed) return { empty: true };
      if (kind === "note") {
        var picture = sourceNote(trimmed);
        if (picture) return { empty: false, value: picture, source: true };
        return { empty: false, value: trimmed, source: false };
      }
      var source = norm(trimmed) === norm(SAMPLES[kind].text);
      return { empty: false, value: source ? SAMPLES[kind].text : trimmed, source: source };
    }

    function sameSample(kind, parsed) {
      var slot = state.samples[kind];
      if (parsed.empty) return !slot.named;
      if (!slot.named && parsed.source && kind !== "note") return true;
      if (slot.named) return norm(parsed.value) === norm(slot.value);
      return false;
    }

    function replaceSample(kind, text, beat) {
      if (!SAMPLES[kind]) return { ok: false, reason: "unknown-sample" };
      if (!isBeat(beat)) return { ok: false, reason: "bad-beat" };
      var parsed = parseSample(kind, text);
      if (sameSample(kind, parsed)) return { ok: true, sample: viewSample(kind) };
      if (beat >= SAMPLES[kind].beat) {
        return { ok: false, reason: "beat-started", sample: kind };
      }
      if (state.samples[kind].named) {
        return { ok: false, reason: "already-named", sample: kind };
      }
      state.samples[kind] = {
        value: parsed.value,
        source: parsed.source,
        replaced: !parsed.source,
        named: true
      };
      return { ok: true, sample: viewSample(kind) };
    }

    function replay() {
      return { ok: false, gap: "replay", reason: "UNKNOWN" };
    }

    function doodleWindow() {
      if (!state.picksLocked) return { ok: false, reason: "unlocked" };
      if (state.picks.activity === "standing facing a whiteboard") {
        return { ok: true, window: "turn away and then turn back" };
      }
      return { ok: true, window: "turn to face the whiteboard" };
    }

    function victoryUse() {
      if (!state.picksLocked) return { ok: false, reason: "unlocked" };
      if (state.picks.victory === "pop a safe party popper") {
        return { ok: true, action: "pop a safe party popper", aim: "UNKNOWN" };
      }
      return {
        ok: true,
        action: "throw a handful of paper confetti",
        aim: "over the teacher's head"
      };
    }

    var api = {
      lockPicks: lockPicks,
      replaceSample: replaceSample,
      replay: replay,
      doodleWindow: doodleWindow,
      victoryUse: victoryUse
    };

    Object.defineProperty(api, "picks", {
      enumerable: true,
      configurable: false,
      get: function () { return copyPicks(state.picks); }
    });
    Object.defineProperty(api, "picksLocked", {
      enumerable: true,
      configurable: false,
      get: function () { return state.picksLocked; }
    });
    Object.defineProperty(api, "toyName", {
      enumerable: true,
      configurable: false,
      get: function () { return state.toyName; }
    });
    Object.defineProperty(api, "samples", {
      enumerable: true,
      configurable: false,
      get: function () { return allSamples(); }
    });
    Object.defineProperty(api, "lists", {
      enumerable: true,
      configurable: false,
      get: function () { return copyLists(); }
    });
    Object.defineProperty(api, "gaps", {
      enumerable: true,
      configurable: false,
      get: function () { return { replay: "UNKNOWN" }; }
    });

    return api;
  }

  CLASSROOM.modules.options = createOptions();

  function selfCheck() {
    var failed = [];
    function assert(cond, message) {
      if (!cond) failed.push(message);
    }
    function fullSet(over) {
      var set = {
        prize: "a golden trophy",
        noisemaker: "a squeaky dog toy",
        victory: "pop a safe party popper",
        activity: "standing facing a whiteboard",
        stringTarget: "the teacher's desk"
      };
      var key;
      if (over) {
        for (key in over) {
          if (Object.prototype.hasOwnProperty.call(over, key)) set[key] = over[key];
        }
      }
      return set;
    }

    var live = CLASSROOM.modules.options;
    assert(live.picks === null && live.picksLocked === false, "session starts unlocked");
    assert(live.gaps.replay === "UNKNOWN", "replay gap");
    assert(live.samples.statue.value === SAMPLES.statue.text && live.samples.statue.named === false, "statue sample");
    assert(live.samples.note.value === null && live.samples.note.choices.length === 2, "note samples");
    assert(live.samples.phrase.value === SAMPLES.phrase.text, "phrase sample");
    assert(live.lists.prize.length === 3 && live.lists.noisemaker.length === 2, "closed lists");
    assert(live.lists.victory.length === 2 && live.lists.activity.length === 3 && live.lists.stringTarget.length === 2, "closed lists 2");

    var box = createOptions();
    assert(box.lockPicks().ok === false && box.lockPicks().reason === "incomplete" && box.picksLocked === false, "missing set");
    var partial = fullSet();
    delete partial.victory;
    var partialResult = box.lockPicks(partial);
    assert(partialResult.ok === false && partialResult.reason === "incomplete" && box.picks === null, "incomplete set");
    var badValue = box.lockPicks(fullSet({ prize: "a medal" }));
    assert(badValue.ok === false && badValue.reason === "incomplete" && box.picksLocked === false, "value outside the list");
    var extra = box.lockPicks(fullSet({ hat: "giant ears" }));
    assert(extra.ok === false && extra.reason === "unknown-pick" && extra.pick === "hat" && box.picks === null, "no sixth pick");

    var blockedNames = ["plush", "soft plush toy", "sunglasses", "whoopee cushion"];
    var b;
    for (b = 0; b < blockedNames.length; b += 1) {
      var blocked = createOptions().lockPicks(fullSet({ prize: "a toy", toyName: blockedNames[b] }));
      assert(blocked.ok === false && blocked.reason === "toy-name", "toy name " + blockedNames[b]);
    }
    var namedOnTrophy = box.lockPicks(fullSet({ toyName: "a doll" }));
    assert(namedOnTrophy.ok === false && namedOnTrophy.reason === "toy-name" && box.picksLocked === false, "toy name on another prize");

    var input = fullSet();
    var locked = box.lockPicks(input);
    assert(locked.ok === true && box.picksLocked === true, "lock");
    assert(box.picks.prize === "a golden trophy" && box.picks.noisemaker === "a squeaky dog toy", "locked prize and noisemaker");
    assert(box.picks.victory === "pop a safe party popper" && box.picks.stringTarget === "the teacher's desk", "locked blast and target");
    input.prize = "a toy";
    assert(box.picks.prize === "a golden trophy", "owned picks ignore later edits");
    var again = box.lockPicks(fullSet({ noisemaker: "bubble wrap" }));
    assert(again.ok === false && again.reason === "locked" && box.picks.noisemaker === "a squeaky dog toy", "no change after lock");
    var wrote = false;
    try { box.picks = fullSet(); } catch (err) { wrote = true; }
    assert(wrote && box.picks.prize === "a golden trophy", "picks stay owned");
    assert(box.doodleWindow().window === "turn away and then turn back", "whiteboard window");
    assert(box.victoryUse().aim === "UNKNOWN", "popper aim stays unknown");

    var pose = box.replaceSample("statue", "Arms out", 2);
    assert(pose.ok === true && pose.sample.replaced === true && pose.sample.value === "Arms out", "replace statue before beat 3");
    var poseAgain = box.replaceSample("statue", "Other", 2);
    assert(poseAgain.ok === false && poseAgain.reason === "already-named" && box.samples.statue.value === "Arms out", "statue once");
    var kept = box.replaceSample("phrase", "The broccoli has landed!", 1);
    assert(kept.ok === true && kept.sample.named === false && kept.sample.replaced === false, "naming the phrase sample keeps it");
    var late = box.replaceSample("phrase", "Peas", 9);
    assert(late.ok === false && late.reason === "beat-started" && box.samples.phrase.value === SAMPLES.phrase.text, "no replace on the beat");
    var yelled = box.replaceSample("phrase", "Peas", 8);
    assert(yelled.ok === true && yelled.sample.replaced === true, "replace phrase before beat 9");
    var yelledSame = box.replaceSample("phrase", "Peas", 9);
    assert(yelledSame.ok === true && box.samples.phrase.value === "Peas", "same phrase still stands");
    var noteBlank = box.replaceSample("note", "", 0);
    assert(noteBlank.ok === true && noteBlank.sample.value === null && noteBlank.sample.choices.length === 2, "unnamed note keeps both samples");
    var noteOne = box.replaceSample("note", "a drawing of a mustache", 3);
    assert(noteOne.ok === true && noteOne.sample.source === true && noteOne.sample.replaced === false, "mustache is a sample");
    var noteTwo = box.replaceSample("note", "a drawing of a goofy face", 3);
    assert(noteTwo.ok === false && noteTwo.reason === "already-named", "note named once");
    assert(box.replaceSample("hat", "x", 1).reason === "unknown-sample", "hat is not a sample");
    assert(box.replaceSample("statue", "z", -1).reason === "bad-beat", "beat is a session beat");

    var before = JSON.stringify({ picks: box.picks, samples: box.samples, locked: box.picksLocked });
    var gap = box.replay();
    var after = JSON.stringify({ picks: box.picks, samples: box.samples, locked: box.picksLocked });
    assert(gap.ok === false && gap.gap === "replay" && gap.reason === "UNKNOWN" && before === after, "replay changes nothing");

    var typing = createOptions();
    var typed = typing.lockPicks(fullSet({
      noisemaker: "bubble wrap",
      victory: "throw a handful of paper confetti over the teacher's head",
      activity: "typing on a computer",
      stringTarget: "the teacher's shoes"
    }));
    assert(typed.ok === true, "typing set locks");
    assert(typing.doodleWindow().window === "turn to face the whiteboard", "typing window");
    assert(typing.victoryUse().aim === "over the teacher's head", "confetti aim");
    assert(typing.picks.stringTarget === "the teacher's shoes" && typing.picks.noisemaker === "bubble wrap", "shoes and wrap");

    var reading = createOptions();
    reading.lockPicks(fullSet({ activity: "reading a big book" }));
    assert(reading.doodleWindow().window === "turn to face the whiteboard", "reading window");

    var toy = createOptions();
    var toyLock = toy.lockPicks(fullSet({ prize: "A toy", toyName: "  a doll  " }));
    assert(toyLock.ok === true && toy.picks.prize === "a toy" && toy.toyName === "a doll", "toy name stored");

    var alias = createOptions();
    alias.lockPicks(fullSet({ activity: "Standing facing the whiteboard", stringTarget: "the teacher\u2019s desk" }));
    assert(alias.picks.activity === "standing facing a whiteboard", "whiteboard wording");
    assert(alias.picks.stringTarget === "the teacher's desk", "apostrophe");
    assert(alias.replay().reason === "UNKNOWN" && alias.picksLocked === true, "alias session still has no replay");

    assert(live.picksLocked === false && live.picks === null, "exported session stays unlocked");
    return failed;
  }

  if (typeof module !== "undefined" && module.exports) module.exports = CLASSROOM.modules.options;

  if (typeof require !== "undefined" && typeof module !== "undefined" && require.main === module) {
    var failed = selfCheck();
    if (failed.length) {
      console.error(failed.join("\n"));
      process.exit(1);
    }
    process.exit(0);
  }
})(typeof globalThis !== "undefined" ? globalThis : Function("return this")());
