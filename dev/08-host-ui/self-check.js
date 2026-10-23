/* Node checks for host-ui module wiring. Speeches stay in 08-cues. */
"use strict";

var path = require("path");
var store = path.resolve(__dirname, "../..");

require(path.join(store, "game-slices/07-options/module.js"));
require(path.join(store, "game-slices/08-cues/module.js"));
require(path.join(__dirname, "js/host-ui.js"));

var failed = [];
function assert(cond, message) {
  if (!cond) failed.push(message);
}

var hostUi = global.CLASSROOM.modules.hostUi;
var options = global.CLASSROOM.modules.options;
var cues = global.CLASSROOM.modules.cues;

assert(hostUi && typeof hostUi.mount === "function", "hostUi.mount");
assert(hostUi.beats && hostUi.beats.length === 10, "ten beat titles");
assert(hostUi.beats[0] === "The Squeaky Toy Shoes", "beat 1 title from host script");
assert(hostUi.beats[9] === "Silly String Finale", "beat 10 title from host script");

var lists = hostUi.lists();
assert(lists.prize.length === 3 && lists.noisemaker.length === 2, "closed pick counts");
assert(lists.victory.length === 2 && lists.activity.length === 3 && lists.stringTarget.length === 2, "closed pick counts 2");
assert(JSON.stringify(lists.prize) === JSON.stringify(options.lists.prize), "lists match options");

var unlocked = hostUi.viewModel({ beat: 0, phase: null });
assert(unlocked.locked === false, "starts unlocked");
assert(unlocked.beat === 0, "no beat before lock");

var lock = options.lockPicks({
  prize: "a golden trophy",
  noisemaker: "bubble wrap",
  victory: "pop a safe party popper",
  activity: "typing on a computer",
  stringTarget: "the teacher's shoes"
});
assert(lock.ok === true && options.picksLocked === true, "options lock");

var afterLock = hostUi.viewModel({ beat: 0, phase: null, picks: options.picks, picksLocked: true });
assert(afterLock.locked === true, "UI sees lock");
assert(afterLock.beat === 0, "lock does not start Phase A");
assert(afterLock.picks.noisemaker === "bubble wrap", "locked noisemaker");
assert(afterLock.cue && afterLock.cue.id, "setup cue present");
assert(afterLock.controls.some(function (c) { return c.type === "startPhaseA"; }), "Start Phase A control");

var phaseA = hostUi.viewModel({
  beat: 1,
  phase: "A",
  teacher: "asleep",
  picks: options.picks,
  picksLocked: true
});
assert(phaseA.cue && phaseA.cue.id === "C05", "beat 1 cue C05");
assert(phaseA.cue.lines[0].text.indexOf("bubble wrap") !== -1, "cue fills noisemaker from picks");
assert(!/medal|favorite|default prize/i.test(JSON.stringify(phaseA.cue)), "no invented prize words");

var laugh = hostUi.viewModel({
  beat: 2,
  phase: "A",
  teacher: "laughing",
  picks: options.picks,
  picksLocked: true
});
assert(laugh.cue.id === "C08", "laugh cue");
assert(laugh.cue.lines[0].text.indexOf("Five. Four. Three. Two. One.") !== -1, "laugh speech from script");

var confetti = hostUi.viewModel({
  beat: 5,
  phase: "A",
  teacher: "asleep",
  picks: {
    prize: "a toy",
    noisemaker: "a squeaky dog toy",
    victory: "throw a handful of paper confetti over the teacher's head",
    activity: "standing facing a whiteboard",
    stringTarget: "the teacher's desk"
  },
  picksLocked: true
});
assert(confetti.cue.id === "C13", "claim cue");
assert(confetti.cue.lines[0].text.indexOf("paper confetti") !== -1, "confetti branch speech");

var catalog = cues.viewModel({}).cues;
assert(catalog.length === 21, "cues catalog still 21");

if (failed.length) {
  console.error(failed.join("\n"));
  process.exit(1);
}
console.log("host-ui self-check ok");
process.exit(0);
