/* Space and props. Classic script. Owns state.props.
   Missing pictures are labels. No new props. No art files. */
(function (root) {
  "use strict";

  var CLASSROOM = root.CLASSROOM || (root.CLASSROOM = {});
  CLASSROOM.modules = CLASSROOM.modules || {};

  var PROP_IDS = [
    "desk",
    "prize",
    "squeaky-dog-toy",
    "bubble-wrap",
    "plush",
    "shield-mat",
    "checkpoint-line",
    "sticky-note",
    "party-popper",
    "confetti",
    "whiteboard",
    "computer",
    "big-book",
    "secret-note",
    "mailbox",
    "cushions",
    "whoopee-cushions",
    "sunglasses",
    "shadow",
    "flashlight",
    "silly-string",
    "shoes"
  ];

  var IMAGES = {
    desk: "assets/desk.png",
    trophy: "assets/trophy.png",
    doll: "assets/doll.png",
    bucket: "assets/bucket.png",
    candy: "assets/candy.png",
    plush: "assets/plush.png",
    mat: "assets/mat.png",
    sticky: "assets/sticky.png",
    mustache: "assets/mustache.png",
    goofy: "assets/goofy.png",
    confetti: "assets/confetti.png",
    laptop: "assets/laptop.png",
    book: "assets/book.png",
    note: "assets/note.png",
    mailbox: "assets/mailbox.png",
    cushion: "assets/cushion.png",
    sunglasses: "assets/sunglasses.png",
    flashlight: "assets/flashlight.png",
    shoe: "assets/shoe.png"
  };

  function image(src, alt, extra) {
    var picture = { kind: "image", src: src, alt: alt };
    if (extra) picture.with = extra;
    return picture;
  }

  function label(text) {
    return { kind: "label", text: text };
  }

  function assert(cond, message) {
    if (!cond) throw new Error(message);
  }

  function oneOf(value, allowed, name) {
    assert(allowed.indexOf(value) !== -1, name + " must be one of: " + allowed.join(", "));
    return value;
  }

  function normalizePicks(picks) {
    assert(picks && typeof picks === "object", "placeRoom needs the five host picks");
    var noise = picks.noise;
    if (noise === "toy" || noise === "squeaky") noise = "squeaky";
    if (noise === "wrap" || noise === "bubble") noise = "bubble";
    var activity = picks.activity;
    if (activity === "whiteboard") activity = "board";
    var prize = picks.prize;
    if (prize === "golden-trophy") prize = "trophy";
    if (prize === "treats" || prize === "bucket") prize = "treats";
    if (prize === "toy" || prize === "doll") prize = "toy";
    return {
      prize: oneOf(prize, ["trophy", "toy", "treats"], "prize"),
      noise: oneOf(noise, ["squeaky", "bubble"], "noise"),
      blast: oneOf(picks.blast, ["popper", "confetti"], "blast"),
      activity: oneOf(activity, ["board", "typing", "reading"], "activity"),
      string: oneOf(picks.string, ["desk", "shoes"], "string"),
      notePicture: picks.notePicture || picks.note || "mustache"
    };
  }

  function defaultWhoopees(count) {
    var first = 0;
    var mid = Math.floor((count - 1) / 2);
    var last = count - 1;
    if (mid === first) mid = 1;
    if (mid === last) mid = last - 1;
    assert(first !== mid && mid !== last && first !== last, "the cushion line needs room for exactly 3 hidden whoopees");
    return [first, mid, last];
  }

  function whoopeeIndexes(count, options) {
    var picked = options && options.whoopeeIndexes;
    if (!picked) return defaultWhoopees(count);
    assert(Array.isArray(picked), "whoopeeIndexes must be a list");
    assert(picked.length === 3, "exactly 3 whoopee cushions");
    var seen = {};
    picked.forEach(function (index) {
      assert(typeof index === "number" && index === (index | 0), "whoopee index must be an integer");
      assert(index >= 0 && index < count, "whoopee index is off the cushion line");
      assert(!seen[index], "each whoopee hides under its own cushion");
      seen[index] = true;
    });
    return picked.slice();
  }

  function cushionCountOf(options) {
    var count = options && options.cushionCount != null ? options.cushionCount : 6;
    assert(typeof count === "number" && count === (count | 0), "cushionCount must be a whole number");
    assert(count > 3, "the line has more cushions than the 3 whoopees");
    return count;
  }

  function noteDrawing(notePicture) {
    if (notePicture === "goofy") return image(IMAGES.goofy, "A goofy face");
    if (notePicture === "mustache" || notePicture == null || notePicture === "") {
      return image(IMAGES.mustache, "A mustache");
    }
    return label(String(notePicture));
  }

  function prizePicture(kind) {
    if (kind === "trophy") return image(IMAGES.trophy, "A golden trophy");
    if (kind === "toy") return image(IMAGES.doll, "A toy");
    return image(IMAGES.bucket, "A bucket of treats", IMAGES.candy);
  }

  function prizeName(kind) {
    if (kind === "trophy") return "A golden trophy";
    if (kind === "toy") return "A toy";
    return "A bucket of treats";
  }

  function place(zone, detail) {
    return { zone: zone, detail: detail };
  }

  function prop(spec) {
    return {
      id: spec.id,
      name: spec.name,
      place: spec.place,
      holder: spec.holder || "room",
      inRoom: spec.inRoom !== false,
      inPlay: Boolean(spec.inPlay),
      fromPhaseA: spec.inRoom !== false,
      staysForPhaseB: spec.inRoom !== false,
      picture: spec.picture,
      shown: spec.shown !== false,
      visible: spec.visible !== false
    };
  }

  function build(picks, options) {
    var noiseIn = picks.noise === "squeaky";
    var popperIn = picks.blast === "popper";
    var count = cushionCountOf(options);
    var hiddenAt = whoopeeIndexes(count, options);
    var spots = [];
    var i;
    for (i = 0; i < count; i += 1) {
      spots.push({
        index: i,
        whoopee: hiddenAt.indexOf(i) !== -1,
        revealed: false
      });
    }
    var under = hiddenAt.map(function (index) {
      return { cushion: index, revealed: false, shown: false };
    });
    var items = {};

    items.desk = prop({
      id: "desk",
      name: "Teacher's desk",
      place: place("front", "Against the front wall, between the shield mat and the whiteboard."),
      inPlay: true,
      picture: image(IMAGES.desk, "Teacher's desk")
    });
    items.prize = prop({
      id: "prize",
      name: prizeName(picks.prize),
      place: place("desktop", "On the desktop nearest the class. The sleeping teacher guards it."),
      holder: "desk",
      inPlay: true,
      picture: prizePicture(picks.prize)
    });
    items.prize.kind = picks.prize;
    items["squeaky-dog-toy"] = prop({
      id: "squeaky-dog-toy",
      name: "Squeaky dog toy",
      place: noiseIn
        ? place("back-cluster", "With the Phase A hand props, off the open path, until it goes under the feet on beat 1.")
        : place("not-set-out", "Bubble wrap is the locked noisemaker. The squeaky dog toy is not in the room."),
      holder: noiseIn ? "kids" : "none",
      inRoom: noiseIn,
      inPlay: noiseIn,
      shown: noiseIn,
      picture: label("Squeaky toy")
    });
    items["bubble-wrap"] = prop({
      id: "bubble-wrap",
      name: "Bubble wrap",
      place: noiseIn
        ? place("not-set-out", "The squeaky dog toy is the locked noisemaker. The bubble wrap is not in the room.")
        : place("back-cluster", "With the Phase A hand props, off the open path, until it goes under the feet on beat 1."),
      holder: noiseIn ? "none" : "kids",
      inRoom: !noiseIn,
      inPlay: !noiseIn,
      shown: !noiseIn,
      picture: label("Bubble wrap")
    });
    items.plush = prop({
      id: "plush",
      name: "Soft plush toy",
      place: place("back-cluster", "Off the open path, with the kids, until a throw lands on the shield mat."),
      holder: "kids",
      inPlay: true,
      picture: image(IMAGES.plush, "Soft plush toy")
    });
    items["shield-mat"] = prop({
      id: "shield-mat",
      name: "Designated shield mat",
      place: place("shield-side", "On the floor beside the desk, off the open path and off the cushion line."),
      inPlay: true,
      picture: image(IMAGES.mat, "Shield mat")
    });
    items["checkpoint-line"] = prop({
      id: "checkpoint-line",
      name: "Mid-way checkpoint line",
      place: place("open-path", "Tape across the open path, between the back and the front edge of the desk. Beat 1 stops on the back side. Beat 4 crosses it. It does not gate Phase B."),
      inPlay: true,
      picture: label("Checkpoint line")
    });
    items["sticky-note"] = prop({
      id: "sticky-note",
      name: "Sticky note",
      place: place("back-cluster", "In the back cluster until a kid sticks it on the teacher's back."),
      holder: "kids",
      inPlay: true,
      picture: image(IMAGES.sticky, "Sticky note")
    });
    items["sticky-note"].drawing = noteDrawing(picks.notePicture);
    items["party-popper"] = prop({
      id: "party-popper",
      name: "Safe party popper",
      place: popperIn
        ? place("back-cluster", "With the kids until the claim. After the pop, it sits on the desk.")
        : place("not-set-out", "Confetti is the locked blast. The party popper is not in the room."),
      holder: popperIn ? "kids" : "none",
      inRoom: popperIn,
      inPlay: popperIn,
      shown: popperIn,
      picture: label("Party popper")
    });
    items.confetti = prop({
      id: "confetti",
      name: "Paper confetti",
      place: popperIn
        ? place("not-set-out", "The party popper is the locked blast. The confetti is not in the room.")
        : place("back-cluster", "One handful with the kids until it is thrown over the teacher's head."),
      holder: popperIn ? "none" : "kids",
      inRoom: !popperIn,
      inPlay: !popperIn,
      shown: !popperIn,
      picture: image(IMAGES.confetti, "Paper confetti")
    });
    items.whiteboard = prop({
      id: "whiteboard",
      name: "Whiteboard",
      place: place("front-wall", "On the front wall beside the desk. This is the board."),
      inPlay: true,
      picture: label("Whiteboard")
    });
    items.whiteboard.isBoard = true;
    items.computer = prop({
      id: "computer",
      name: "Computer",
      place: place("desktop", "On the desk. Kids leave it there."),
      holder: "desk",
      inPlay: picks.activity === "typing",
      picture: image(IMAGES.laptop, "Computer")
    });
    items["big-book"] = prop({
      id: "big-book",
      name: "Big book",
      place: place("desktop", picks.activity === "reading"
        ? "Open in the teacher's hands when reading is the activity. Otherwise shut on the desk."
        : "Shut on the desk."),
      holder: "desk",
      inPlay: picks.activity === "reading",
      picture: image(IMAGES.book, "Big book")
    });
    items["secret-note"] = prop({
      id: "secret-note",
      name: "Secret note",
      place: place("back-cluster", "Face down in the back cluster through Phase A. It is not the target prize."),
      inPlay: false,
      picture: image(IMAGES.note, "Secret note")
    });
    items.mailbox = prop({
      id: "mailbox",
      name: "Target mailbox",
      place: place("front-corner", "On the cushion-line side of the front, off the desk, where the cushion line ends."),
      inPlay: true,
      picture: image(IMAGES.mailbox, "Target mailbox")
    });
    items.cushions = prop({
      id: "cushions",
      name: "Cushions",
      place: place("cushion-line", "One file on the floor from the back wall to the mailbox, clear of the tape and the mat."),
      inPlay: false,
      picture: image(IMAGES.cushion, "Cushion")
    });
    items.cushions.count = count;
    items.cushions.spots = spots;
    items["whoopee-cushions"] = prop({
      id: "whoopee-cushions",
      name: "Whoopee cushions",
      place: place("cushion-line", "One each, hidden under three of the lining cushions."),
      inPlay: false,
      shown: false,
      picture: label("Whoopee")
    });
    items["whoopee-cushions"].count = 3;
    items["whoopee-cushions"].under = under;
    items.sunglasses = prop({
      id: "sunglasses",
      name: "Giant oversized pair of clown sunglasses",
      place: place("back-cluster", "In the back cluster until beat 7, then on the floor at the kid row."),
      inPlay: false,
      picture: image(IMAGES.sunglasses, "Clown sunglasses")
    });
    items.shadow = prop({
      id: "shadow",
      name: "Teacher's shadow on the wall",
      place: place("front-wall", "On the front wall beside the whiteboard while the teacher faces the whiteboard."),
      inPlay: false,
      visible: false,
      shown: false,
      picture: label("Shadow")
    });
    items.shadow.drawing = null;
    items.flashlight = prop({
      id: "flashlight",
      name: "Flashlight",
      place: place("back-cluster", "In the back cluster through Phase A. A kid carries it for the beat 8 drawing."),
      inPlay: false,
      picture: image(IMAGES.flashlight, "Flashlight")
    });
    items["silly-string"] = prop({
      id: "silly-string",
      name: "Silly string",
      place: place("back-cluster", "In the back cluster until the secret note is in the mailbox."),
      inPlay: false,
      picture: label("Silly string")
    });
    items["silly-string"].target = picks.string;
    items.shoes = prop({
      id: "shoes",
      name: "Teacher's shoes",
      place: place("teacher-feet", "On the teacher's feet for the whole session."),
      holder: "teacher",
      inPlay: true,
      picture: image(IMAGES.shoe, "Teacher's shoes")
    });

    var props = {
      phase: "A",
      board: "whiteboard",
      picks: picks,
      room: {
        back: "The wall the kids start against.",
        front: "The wall the desk sits against.",
        openPath: "Clear floor from the back to the front edge of the desk.",
        cushionLine: "A file of cushions from the back to the mailbox, beside the open path.",
        shieldSide: "Beside the desk, off both paths."
      },
      items: items
    };
    PROP_IDS.forEach(function (id) {
      assert(items[id], "missing prop " + id);
    });
    assert(Object.keys(items).length === PROP_IDS.length, "prop count must stay 22");
    assert(hiddenAt.length === 3, "exactly 3 whoopees");
    return props;
  }

  function requireProps(state) {
    var props = state && state.props;
    assert(props && props.items, "placeRoom first");
    return props;
  }

  function viewOf(item) {
    var copy = {
      id: item.id,
      name: item.name,
      place: { zone: item.place.zone, detail: item.place.detail },
      holder: item.holder,
      inRoom: item.inRoom,
      inPlay: item.inPlay,
      fromPhaseA: item.fromPhaseA,
      staysForPhaseB: item.staysForPhaseB,
      picture: item.picture,
      shown: item.shown,
      visible: item.visible
    };
    if (item.isBoard) copy.isBoard = true;
    if (item.kind) copy.kind = item.kind;
    if (item.drawing !== undefined) copy.drawing = item.drawing;
    if (item.count != null) copy.count = item.count;
    if (item.spots) copy.spots = item.spots.map(function (spot) {
      return { index: spot.index, whoopee: spot.whoopee, revealed: spot.revealed };
    });
    if (item.under) copy.under = item.under.map(function (entry) {
      return { cushion: entry.cushion, revealed: entry.revealed, shown: entry.shown };
    });
    if (item.target) copy.target = item.target;
    if (item.spent) copy.spent = true;
    return copy;
  }

  function viewModel(state) {
    var props = requireProps(state);
    return {
      phase: props.phase,
      board: props.board,
      count: PROP_IDS.length,
      room: props.room,
      props: PROP_IDS.map(function (id) { return viewOf(props.items[id]); })
    };
  }

  function drawingPicture(drawing) {
    if (drawing === "hat") return label("Hat");
    if (drawing === "ears" || drawing === "giant-ears") return label("Giant ears");
    assert(false, "the shadow drawing is a hat or giant ears");
  }

  var space = {
    id: "space",
    owns: "props",
    propIds: PROP_IDS.slice(),
    props: null,
    actions: {
      placeRoom: function (state, picks, options) {
        assert(state && typeof state === "object", "placeRoom needs a state");
        var props = build(normalizePicks(picks), options || {});
        state.props = props;
        space.props = props;
        return viewModel(state);
      },
      revealWhoopee: function (state, index) {
        var props = requireProps(state);
        var cushions = props.items.cushions;
        var whoopees = props.items["whoopee-cushions"];
        assert(typeof index === "number", "revealWhoopee needs a cushion index");
        assert(index >= 0 && index < cushions.spots.length, "cushion index is off the line");
        var spot = cushions.spots[index];
        if (!spot.whoopee) return { noise: false, revealed: false, place: viewOf(whoopees).place };
        var entry = whoopees.under.filter(function (item) { return item.cushion === index; })[0];
        if (spot.revealed) {
          return { noise: false, revealed: true, already: true, picture: whoopees.picture, place: viewOf(whoopees).place };
        }
        spot.revealed = true;
        entry.revealed = true;
        entry.shown = true;
        whoopees.shown = true;
        whoopees.inPlay = true;
        whoopees.inRoom = true;
        whoopees.staysForPhaseB = true;
        return {
          noise: true,
          revealed: true,
          picture: whoopees.picture,
          place: viewOf(whoopees).place,
          cushion: index
        };
      },
      markProp: function (state, id, mark) {
        var props = requireProps(state);
        assert(PROP_IDS.indexOf(id) !== -1, "unknown prop " + id);
        assert(mark && typeof mark === "object", "markProp needs a mark");
        var item = props.items[id];
        if (Object.prototype.hasOwnProperty.call(mark, "inRoom") && mark.inRoom !== item.inRoom) {
          throw new Error(item.name + " stays " + (item.inRoom ? "in the room" : "out of the room"));
        }
        if (mark.place) {
          if (typeof mark.place === "string") item.place = place(mark.place, item.place.detail);
          else {
            item.place = place(mark.place.zone || item.place.zone, mark.place.detail || item.place.detail);
          }
        }
        if (mark.holder) item.holder = mark.holder;
        if (typeof mark.inPlay === "boolean") item.inPlay = mark.inPlay;
        if (typeof mark.visible === "boolean") item.visible = mark.visible;
        if (typeof mark.shown === "boolean") item.shown = mark.shown;
        if (mark.phase === "B") props.phase = "B";
        if (mark.drawing != null) {
          assert(id === "shadow", "a drawing belongs on the shadow");
          item.drawing = drawingPicture(mark.drawing);
          item.visible = true;
          item.shown = true;
          item.inPlay = true;
        }
        if (mark.spent === true) item.spent = true;
        if (id === "silly-string" && mark.place && (mark.place === "desk" || mark.place === "shoes" || mark.place.zone === "desk" || mark.place.zone === "shoes")) {
          var zone = typeof mark.place === "string" ? mark.place : mark.place.zone;
          assert(zone === item.target, "silly string sprays the locked target");
        }
        return viewOf(item);
      }
    },
    viewModel: function (state) {
      return viewModel(state || { props: space.props });
    }
  };

  CLASSROOM.modules.space = space;
  if (typeof module !== "undefined" && module.exports) module.exports = space;
})(typeof globalThis !== "undefined" ? globalThis : this);

(function () {
  "use strict";
  if (typeof module === "undefined" || require.main !== module) return;

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

  check(state.props === space.props, "the module owns props");
  check(vm.count === 22 && vm.props.length === 22, "places 22 props");
  check(vm.props.every(function (item) { return item.place && item.place.zone && item.place.detail; }), "each prop has a place");
  check(vm.board === "whiteboard", "the board is the whiteboard");
  check(byId(vm, "whiteboard").isBoard === true, "whiteboard is the board");
  check(!vm.props.some(function (item) { return item.id === "board" || item.id === "feather"; }), "no second board and no feather");
  check(byId(vm, "whiteboard").picture.kind === "label" && byId(vm, "whiteboard").picture.text === "Whiteboard", "whiteboard picture is a label");
  check(byId(vm, "squeaky-dog-toy").inRoom === true && byId(vm, "squeaky-dog-toy").picture.kind === "label", "squeaky toy is a label");
  check(byId(vm, "bubble-wrap").inRoom === false && byId(vm, "bubble-wrap").picture.kind === "label", "unlocked bubble wrap stays a labeled prop out of the room");
  check(byId(vm, "party-popper").picture.kind === "label" && byId(vm, "party-popper").picture.text === "Party popper", "popper picture is a label");
  check(byId(vm, "confetti").inRoom === false && byId(vm, "confetti").picture.kind === "image", "confetti keeps its picture when it is not the blast");
  check(byId(vm, "silly-string").picture.kind === "label", "silly string is a label");
  check(byId(vm, "checkpoint-line").picture.kind === "label", "checkpoint line is a label");
  check(byId(vm, "shadow").picture.kind === "label" && byId(vm, "shadow").visible === false, "shadow is a label and hidden until the board is faced");
  check(byId(vm, "whoopee-cushions").picture.kind === "label" && byId(vm, "whoopee-cushions").count === 3, "exactly 3 whoopees, labeled");
  check(byId(vm, "whoopee-cushions").under.every(function (entry) { return entry.revealed === false && entry.shown === false; }), "whoopees start hidden");
  check(byId(vm, "cushions").count > 3, "more cushions than whoopees");
  check(byId(vm, "cushions").spots.filter(function (spot) { return spot.whoopee; }).length === 3, "one whoopee under each of 3 cushions");
  check(byId(vm, "desk").place.zone === "front", "desk is at the front");
  check(byId(vm, "mailbox").place.zone === "front-corner" && byId(vm, "mailbox").place.detail.indexOf("off the desk") !== -1, "mailbox is off the desk");
  check(byId(vm, "prize").picture.src === "assets/trophy.png", "trophy uses the trophy picture");
  check(byId(vm, "shield-mat").place.zone === "shield-side", "shield mat is beside the desk");
  check(byId(vm, "shoes").holder === "teacher", "shoes stay on the teacher");
  check(byId(vm, "computer").inRoom && byId(vm, "big-book").inRoom, "computer and book stay on the desk");

  var inRoomBefore = vm.props.filter(function (item) { return item.inRoom; }).map(function (item) { return item.id; });
  check(inRoomBefore.indexOf("desk") !== -1 && inRoomBefore.indexOf("prize") !== -1, "phase A props are in the room");

  var hiddenIndex = byId(vm, "whoopee-cushions").under[0].cushion;
  var quietIndex = byId(vm, "cushions").spots.filter(function (spot) { return !spot.whoopee; })[0].index;
  var quiet = space.actions.revealWhoopee(state, quietIndex);
  check(quiet.noise === false, "a quiet cushion is not a whoopee");
  var hit = space.actions.revealWhoopee(state, hiddenIndex);
  check(hit.noise === true && hit.picture.kind === "label" && hit.picture.text === "Whoopee", "a whoopee reveal is the Whoopee label");
  var again = space.actions.revealWhoopee(state, hiddenIndex);
  check(again.noise === false && again.revealed === true, "a revealed whoopee stays and does not add another");
  check(byId(space.viewModel(state), "whoopee-cushions").count === 3, "reveal keeps the whoopee count at 3");
  check(byId(space.viewModel(state), "whoopee-cushions").inRoom === true, "a revealed whoopee stays in the room");

  space.actions.markProp(state, "prize", {
    holder: "kid",
    place: { zone: "kid", detail: "In the claiming kid's hands." }
  });
  space.actions.markProp(state, "plush", {
    holder: "mat",
    place: { zone: "shield-mat", detail: "On the shield mat." }
  });
  space.actions.markProp(state, "sticky-note", {
    holder: "teacher",
    place: { zone: "teacher-back", detail: "On the teacher's back." }
  });
  space.actions.markProp(state, "secret-note", {
    holder: "kid",
    inPlay: true,
    place: { zone: "kid", detail: "In one kid's hand." },
    phase: "B"
  });
  space.actions.markProp(state, "shadow", { drawing: "hat", visible: true });
  var sprayed = space.actions.markProp(state, "silly-string", {
    inPlay: true,
    place: "desk"
  });
  check(sprayed.place.zone === "desk", "silly string can mark the locked desk");
  check(space.viewModel(state).props.length === 22, "marks do not add props");
  check(byId(space.viewModel(state), "shadow").drawing.kind === "label" && byId(space.viewModel(state), "shadow").drawing.text === "Hat", "a hat on the shadow is a label");
  check(space.viewModel(state).phase === "B", "phase B uses the same props");

  expectThrow(function () {
    space.actions.markProp(state, "desk", { inRoom: false });
  }, "refuses to remove the desk");
  expectThrow(function () {
    space.actions.markProp(state, "bubble-wrap", { inRoom: true });
  }, "refuses to bring in the unlocked noisemaker");
  expectThrow(function () {
    space.actions.markProp(state, "silly-string", { place: "shoes" });
  }, "refuses a spray on the unlocked target");
  expectThrow(function () {
    space.actions.markProp(state, "feather", { place: "desk" });
  }, "rejects an invented prop");

  var after = space.viewModel(state);
  var inRoomAfter = after.props.filter(function (item) { return item.inRoom; }).map(function (item) { return item.id; }).sort();
  check(inRoomBefore.slice().sort().join() === inRoomAfter.join(), "Phase A props stay for Phase B");
  check(byId(after, "desk").inRoom && byId(after, "shield-mat").inRoom && byId(after, "checkpoint-line").inRoom, "desk, mat, and line stay");
  check(byId(after, "prize").holder === "kid" && byId(after, "prize").inRoom, "the claimed prize stays in the room");
  check(byId(after, "mailbox").inRoom && byId(after, "cushions").inRoom && byId(after, "sunglasses").inRoom && byId(after, "flashlight").inRoom, "named Phase B props stay placed");

  var other = {};
  var treats = space.actions.placeRoom(other, {
    prize: "treats",
    noise: "wrap",
    blast: "confetti",
    activity: "typing",
    string: "shoes",
    notePicture: "a star"
  }, { cushionCount: 5, whoopeeIndexes: [0, 2, 4] });
  check(byId(treats, "prize").picture.kind === "image" && byId(treats, "prize").picture.with === "assets/candy.png", "a bucket of treats uses the bucket and candy pictures");
  check(byId(treats, "sticky-note").drawing.kind === "label" && byId(treats, "sticky-note").drawing.text === "a star", "a picture with no file is a label");
  check(byId(treats, "bubble-wrap").inRoom && byId(treats, "squeaky-dog-toy").inRoom === false, "the locked noisemaker is the one in the room");
  check(byId(treats, "confetti").inRoom && byId(treats, "party-popper").inRoom === false, "the locked blast is the one in the room");
  check(byId(treats, "whoopee-cushions").under.map(function (entry) { return entry.cushion; }).join() === "0,2,4", "host whoopee indexes stay exactly those three");
  check(treats.board === "whiteboard", "typing still uses the whiteboard as the board");
  check(other.props.items.whiteboard.isBoard === true && !other.props.items.board, "there is still one board");

  if (failures.length) {
    failures.forEach(function (message) { console.error("FAIL " + message); });
    process.exit(1);
  }
  process.exit(0);
})();
