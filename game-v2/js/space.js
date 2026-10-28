/* Space and props state. Classic script. Owns state.props.
   Places all 22 named props. Exactly 3 hidden whoopees.
   Phase A props stay for Phase B. Missing art = labeled placeholder.
   No invented props. Docs win. */
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

  /* 3D / file refs used by the view. Labels when no matching mesh exists. */
  var ART = {
    desk: { kind: "model", src: "assets/props/desk.glb", note: "Kenney desk (room may own the mesh)." },
    trophy: { kind: "model", src: "assets/props/trophy.glb", note: "Kenney trophy." },
    toy: { kind: "model", src: "assets/props/bear.glb", note: "Kenney bear — prize kind \"toy\", not the plush." },
    treats: { kind: "model", src: "assets/props/bucket.glb", note: "Kenney bucket; treats kind has no candy-in-bucket mesh." },
    chest: { kind: "model", src: "assets/props/chest_gold.glb", note: "KayKit gold chest — fallback prize when trophy missing." },
    plush: { kind: "model", src: "assets/props/plush-bear.glb", note: "Kenney bear as soft plush." },
    mat: { kind: "model", src: "assets/props/rug-rectangle.glb", note: "Kenney rug — shield mat." },
    book: { kind: "model", src: "assets/props/books.glb", note: "Kenney books — big book." },
    bookOpen: { kind: "model", src: "assets/props/book_single.gltf", note: "KayKit single book when reading." },
    laptop: { kind: "model", src: "assets/props/laptop.glb", note: "Kenney laptop — computer." },
    cushion: { kind: "model", src: "assets/props/pillow.glb", note: "Kenney pillow — lining cushion." },
    cushionAlt: { kind: "model", src: "assets/props/pillow-blue.glb", note: "Kenney blue pillow — alternate cushion." },
    whoopee: { kind: "model", src: "assets/props/pillow-long.glb", note: "Kenney long pillow — hidden whoopee stand-in (not a whoopee mesh)." },
    sunglasses: { kind: "model", src: "assets/props/sunglasses.glb", note: "Kenney aid sunglasses — oversized novelty glasses." },
    flashlight: { kind: "model", src: "assets/props/flashlight.fbx", note: "CC0Tree SM_Flashlight; inspected library model." },
    board: { kind: "model", src: "assets/props/pictureframe_large_A.gltf", note: "KayKit large picture frame — board stand-in (no whiteboard mesh). Screen panel is not used as a whiteboard." },
    squeaky: { kind: "label", text: "Squeaky toy" },
    bubble: { kind: "label", text: "Bubble wrap" },
    sticky: { kind: "label", text: "Sticky note" },
    popper: { kind: "label", text: "Party popper" },
    confetti: { kind: "label", text: "Paper confetti" },
    secret: { kind: "label", text: "Secret note" },
    mailbox: { kind: "label", text: "Mailbox" },
    checkpoint: { kind: "label", text: "Checkpoint line" },
    shadow: { kind: "label", text: "Teacher's shadow" },
    silly: { kind: "label", text: "Silly string" },
    shoes: { kind: "label", text: "Teacher's shoes" },
    whoopeeLabel: { kind: "label", text: "Whoopee" }
  };

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
    if (notePicture === "goofy") return { kind: "label", text: "Goofy face" };
    if (notePicture === "mustache" || notePicture == null || notePicture === "") {
      return { kind: "label", text: "Mustache" };
    }
    return { kind: "label", text: String(notePicture) };
  }

  function prizeArt(kind) {
    if (kind === "trophy") return ART.trophy;
    if (kind === "toy") return ART.toy;
    return ART.treats;
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
      picture: ART.desk
    });
    items.prize = prop({
      id: "prize",
      name: prizeName(picks.prize),
      place: place("desktop", "On the desktop nearest the class. The sleeping teacher guards it."),
      holder: "desk",
      inPlay: true,
      picture: prizeArt(picks.prize)
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
      picture: ART.squeaky
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
      picture: ART.bubble
    });
    items.plush = prop({
      id: "plush",
      name: "Soft plush toy",
      place: place("back-cluster", "Off the open path, with the kids, until a throw lands on the shield mat."),
      holder: "kids",
      inPlay: true,
      picture: ART.plush
    });
    items["shield-mat"] = prop({
      id: "shield-mat",
      name: "Designated shield mat",
      place: place("shield-side", "On the floor beside the desk, off the open path and off the cushion line."),
      inPlay: true,
      picture: ART.mat
    });
    items["checkpoint-line"] = prop({
      id: "checkpoint-line",
      name: "Mid-way checkpoint line",
      place: place("open-path", "Tape across the open path, between the back and the front edge of the desk. Beat 1 stops on the back side. Beat 4 crosses it. It does not gate Phase B."),
      inPlay: true,
      picture: ART.checkpoint
    });
    items["sticky-note"] = prop({
      id: "sticky-note",
      name: "Sticky note",
      place: place("back-cluster", "In the back cluster until a kid sticks it on the teacher's back."),
      holder: "kids",
      inPlay: true,
      picture: ART.sticky
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
      picture: ART.popper
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
      picture: ART.confetti
    });
    items.whiteboard = prop({
      id: "whiteboard",
      name: "Whiteboard",
      place: place("front-wall", "On the front wall beside the desk. This is the board."),
      inPlay: true,
      picture: ART.board
    });
    items.whiteboard.isBoard = true;
    items.computer = prop({
      id: "computer",
      name: "Computer",
      place: place("desktop", "On the desk. Kids leave it there."),
      holder: "desk",
      inPlay: picks.activity === "typing",
      picture: ART.laptop
    });
    items["big-book"] = prop({
      id: "big-book",
      name: "Big book",
      place: place("desktop", picks.activity === "reading"
        ? "Open in the teacher's hands when reading is the activity. Otherwise shut on the desk."
        : "Shut on the desk."),
      holder: "desk",
      inPlay: picks.activity === "reading",
      picture: ART.book
    });
    items["secret-note"] = prop({
      id: "secret-note",
      name: "Secret note",
      place: place("back-cluster", "Face down in the back cluster through Phase A. It is not the target prize."),
      inPlay: false,
      picture: ART.secret
    });
    items.mailbox = prop({
      id: "mailbox",
      name: "Target mailbox",
      place: place("front-corner", "On the cushion-line side of the front, off the desk, where the cushion line ends."),
      inPlay: true,
      picture: ART.mailbox
    });
    items.cushions = prop({
      id: "cushions",
      name: "Cushions",
      place: place("cushion-line", "One file on the floor from the back wall to the mailbox, clear of the tape and the mat."),
      inPlay: false,
      picture: ART.cushion
    });
    items.cushions.count = count;
    items.cushions.spots = spots;
    items["whoopee-cushions"] = prop({
      id: "whoopee-cushions",
      name: "Whoopee cushions",
      place: place("cushion-line", "One each, hidden under three of the lining cushions."),
      inPlay: false,
      shown: false,
      picture: ART.whoopeeLabel
    });
    items["whoopee-cushions"].count = 3;
    items["whoopee-cushions"].under = under;
    items["whoopee-cushions"].standIn = ART.whoopee;
    items.sunglasses = prop({
      id: "sunglasses",
      name: "Giant oversized pair of clown sunglasses",
      place: place("back-cluster", "In the back cluster until beat 7, then on the floor at the kid row."),
      inPlay: false,
      picture: ART.sunglasses
    });
    items.shadow = prop({
      id: "shadow",
      name: "Teacher's shadow on the wall",
      place: place("front-wall", "On the front wall beside the whiteboard while the teacher faces the whiteboard."),
      inPlay: false,
      visible: picks.activity === "board",
      shown: picks.activity === "board",
      picture: ART.shadow
    });
    items.shadow.drawing = null;
    items.flashlight = prop({
      id: "flashlight",
      name: "Flashlight",
      place: place("back-cluster", "In the back cluster through Phase A. A kid carries it for the beat 8 drawing."),
      inPlay: false,
      picture: ART.flashlight
    });
    items["silly-string"] = prop({
      id: "silly-string",
      name: "Silly string",
      place: place("back-cluster", "In the back cluster until the secret note is in the mailbox."),
      inPlay: false,
      picture: ART.silly
    });
    items["silly-string"].target = picks.string;
    items.shoes = prop({
      id: "shoes",
      name: "Teacher's shoes",
      place: place("teacher-feet", "On the teacher's feet for the whole session."),
      holder: "teacher",
      inPlay: true,
      picture: ART.shoes
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
      items: items,
      art: ART
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
    if (item.spots) {
      copy.spots = item.spots.map(function (spot) {
        return { index: spot.index, whoopee: spot.whoopee, revealed: spot.revealed };
      });
    }
    if (item.under) {
      copy.under = item.under.map(function (entry) {
        return { cushion: entry.cushion, revealed: entry.revealed, shown: entry.shown };
      });
    }
    if (item.target) copy.target = item.target;
    if (item.spent) copy.spent = true;
    if (item.standIn) copy.standIn = item.standIn;
    return copy;
  }

  function viewModel(state) {
    var props = requireProps(state);
    return {
      phase: props.phase,
      board: props.board,
      count: PROP_IDS.length,
      room: props.room,
      picks: props.picks,
      props: PROP_IDS.map(function (id) { return viewOf(props.items[id]); })
    };
  }

  function drawingPicture(drawing) {
    if (drawing === "hat") return { kind: "label", text: "Hat" };
    if (drawing === "ears" || drawing === "giant-ears") return { kind: "label", text: "Giant ears" };
    assert(false, "the shadow drawing is a hat or giant ears");
  }

  var space = {
    id: "space",
    owns: "props",
    propIds: PROP_IDS.slice(),
    art: ART,
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
      },
      openPhaseB: function (state) {
        var props = requireProps(state);
        props.phase = "B";
        var sticky = props.items["sticky-note"];
        var prize = props.items.prize;
        var secret = props.items["secret-note"];
        var flashlight = props.items.flashlight;
        var silly = props.items["silly-string"];
        var sunglasses = props.items.sunglasses;
        var cushions = props.items.cushions;
        var whoopees = props.items["whoopee-cushions"];
        assert(sticky.inRoom && prize.inRoom && cushions.inRoom, "Phase A props stay for Phase B");
        assert(whoopees.count === 3, "exactly 3 whoopees stay hidden into Phase B");
        secret.holder = "kid";
        secret.inPlay = true;
        secret.place = place("kid", "Picked up from the holding cluster at the Phase B open.");
        flashlight.holder = "kid";
        flashlight.inPlay = true;
        silly.holder = "kid";
        silly.inPlay = false;
        sunglasses.inPlay = false;
        if (props.picks.activity === "board") {
          props.items.shadow.visible = true;
          props.items.shadow.shown = true;
        }
        return viewModel(state);
      }
    },
    viewModel: function (state) {
      return viewModel(state || { props: space.props });
    },
    reduce: function (state, action) {
      if (!action || !action.type) return state;
      var next = state || {};
      if (action.type === "placeRoom") {
        space.actions.placeRoom(next, action.picks, action.options);
        return next;
      }
      if (action.type === "revealWhoopee") {
        space.actions.revealWhoopee(next, action.index);
        return next;
      }
      if (action.type === "markProp") {
        space.actions.markProp(next, action.id, action.mark || {});
        return next;
      }
      if (action.type === "openPhaseB") {
        space.actions.openPhaseB(next);
        return next;
      }
      return next;
    }
  };

  CLASSROOM.modules.space = space;
  if (typeof module !== "undefined" && module.exports) module.exports = space;
})(typeof globalThis !== "undefined" ? globalThis : this);
