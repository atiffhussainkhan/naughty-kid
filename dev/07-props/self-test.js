/* Node self-test for space props. Run: node self-test.js */
(function () {
  "use strict";
  require("./space.js");
  var space = globalThis.CLASSROOM.modules.space;
  var failures = [];

  function check(cond, message) {
    if (!cond) failures.push(message);
  }

  function expectThrow(fn, message) {
    try {
      fn();
      failures.push(message);
    } catch (err) {
      check(err instanceof Error, message + " threw a non-error");
    }
  }

  function byId(vm, id) {
    return vm.props.filter(function (item) { return item.id === id; })[0];
  }

  expectThrow(function () { space.actions.placeRoom({}, {}); }, "rejects a room with no picks");
  expectThrow(function () {
    space.actions.placeRoom({ props: null }, {
      prize: "trophy", noise: "squeaky", blast: "popper", activity: "board", string: "desk"
    }, { cushionCount: 3 });
  }, "rejects a cushion line of 3");
  expectThrow(function () {
    space.actions.placeRoom({ props: null }, {
      prize: "trophy", noise: "toy", blast: "popper", activity: "whiteboard", string: "desk"
    }, { whoopeeIndexes: [0, 1, 2, 3] });
  }, "rejects 4 whoopees");

  var state = {};
  var vm = space.actions.placeRoom(state, {
    prize: "trophy",
    noise: "toy",
    blast: "popper",
    activity: "board",
    string: "desk",
    notePicture: "mustache"
  });

  check(vm.count === 22 && vm.props.length === 22, "places 22 props");
  check(vm.board === "whiteboard", "the board is the whiteboard");
  check(byId(vm, "whiteboard").isBoard === true, "whiteboard is the board");
  check(byId(vm, "whoopee-cushions").count === 3, "exactly 3 whoopees");
  check(byId(vm, "whoopee-cushions").under.every(function (e) { return !e.revealed; }), "whoopees start hidden");
  check(byId(vm, "cushions").count > 3, "more cushions than whoopees");
  check(byId(vm, "cushions").spots.filter(function (s) { return s.whoopee; }).length === 3, "one whoopee under each of 3 cushions");
  check(byId(vm, "mailbox").picture.kind === "label", "mailbox is a labeled placeholder");
  check(byId(vm, "squeaky-dog-toy").picture.kind === "label", "squeaky is a label");
  check(byId(vm, "silly-string").picture.kind === "label", "silly string is a label");
  check(byId(vm, "shoes").picture.kind === "label", "shoes are a label");
  check(byId(vm, "plush").picture.kind === "model", "plush uses a model");
  check(byId(vm, "computer").picture.kind === "model", "computer uses a model");
  check(byId(vm, "prize").picture.src.indexOf("trophy") !== -1, "trophy prize art");

  var inRoomBefore = vm.props.filter(function (item) { return item.inRoom; }).map(function (item) { return item.id; }).sort();

  space.actions.markProp(state, "prize", {
    holder: "kid",
    place: { zone: "kid", detail: "In the claiming kid's hands." }
  });
  space.actions.markProp(state, "sticky-note", {
    holder: "teacher",
    place: { zone: "teacher-back", detail: "On the teacher's back." }
  });
  space.actions.openPhaseB(state);
  check(space.viewModel(state).phase === "B", "phase B opens");
  check(byId(space.viewModel(state), "whoopee-cushions").count === 3, "whoopees still 3 in Phase B");

  var after = space.viewModel(state);
  var inRoomAfter = after.props.filter(function (item) { return item.inRoom; }).map(function (item) { return item.id; }).sort();
  check(inRoomBefore.join() === inRoomAfter.join(), "Phase A props stay for Phase B");

  expectThrow(function () {
    space.actions.markProp(state, "desk", { inRoom: false });
  }, "refuses to remove the desk");
  expectThrow(function () {
    space.actions.markProp(state, "feather", { place: "desk" });
  }, "rejects an invented prop");

  var hit = space.actions.revealWhoopee(state, byId(after, "whoopee-cushions").under[0].cushion);
  check(hit.noise === true && hit.picture.text === "Whoopee", "whoopee reveal is the Whoopee label");

  if (failures.length) {
    failures.forEach(function (m) { console.error("FAIL", m); });
    process.exit(1);
  }
  console.log("OK 22 props, 3 whoopees, Phase A stays for B, labels for missing art");
  process.exit(0);
})();
