/* Movement and failure.
   Classic script. CLASSROOM.modules.movement.
   Spot 0 is the back. Higher spots are toward the front.
   The only send-back is three footfalls toward the back
   when a caught-moving kid laughs. A kid already still is not caught.
   No other action moves a kid backward. */
(function (root) {
  var CLASSROOM = root.CLASSROOM || (root.CLASSROOM = {});
  CLASSROOM.modules = CLASSROOM.modules || {};

  var kids = [];
  var laughOpen = false;
  var standing = false;
  var sentBack = {};

  function find(id) {
    for (var i = 0; i < kids.length; i++) {
      if (kids[i].id === id) return kids[i];
    }
    return null;
  }

  function spotOf(value) {
    var n = Number(value);
    if (!isFinite(n) || n < 0) return 0;
    return Math.floor(n);
  }

  function view(kid, extra) {
    var out = {
      id: kid.id,
      spot: kid.spot,
      moving: kid.moving,
      frozen: kid.frozen,
      statue: kid.statue
    };
    if (extra) {
      for (var key in extra) out[key] = extra[key];
    }
    return out;
  }

  function held(kid) {
    return kid.frozen || kid.statue;
  }

  function addKid(id, spot) {
    var existing = find(id);
    if (existing) return view(existing);
    var kid = {
      id: id,
      spot: spotOf(spot),
      moving: false,
      frozen: false,
      statue: false
    };
    kids.push(kid);
    return view(kid);
  }

  function placeKid(id, spot) {
    var kid = find(id);
    if (!kid) return { ok: false, reason: "missing" };
    kid.spot = spotOf(spot);
    return view(kid, { ok: true, placed: true });
  }

  function kidStep(id) {
    var kid = find(id);
    if (!kid) return { ok: false, reason: "missing" };
    if (!laughOpen && held(kid)) {
      return view(kid, { ok: true, moved: false });
    }
    kid.spot += 1;
    kid.moving = true;
    return view(kid, { ok: true, moved: true });
  }

  function kidStill(id) {
    var kid = find(id);
    if (!kid) return { ok: false, reason: "missing" };
    kid.moving = false;
    return view(kid, { ok: true });
  }

  function freezeAll() {
    if (laughOpen || standing) return { ok: true, skipped: true };
    for (var i = 0; i < kids.length; i++) {
      kids[i].frozen = true;
      kids[i].moving = false;
    }
    return { ok: true, skipped: false };
  }

  function catchMovers() {
    var caught = [];
    if (laughOpen || standing) return { ok: true, skipped: true, caught: caught };
    for (var i = 0; i < kids.length; i++) {
      var kid = kids[i];
      if (kid.moving) {
        kid.statue = true;
        kid.moving = false;
        sentBack[kid.id] = false;
        caught.push(kid.id);
      }
    }
    return { ok: true, skipped: false, caught: caught };
  }

  function kidLaugh(id) {
    var kid = find(id);
    if (!kid) return { ok: false, reason: "missing" };
    if (standing || laughOpen || kid.frozen || !kid.statue || sentBack[kid.id]) {
      return view(kid, { ok: true, steps: 0, footfalls: [] });
    }
    var footfalls = [];
    for (var n = 0; n < 3; n++) {
      if (kid.spot > 0) kid.spot -= 1;
      footfalls.push(kid.spot);
    }
    sentBack[kid.id] = true;
    kid.moving = false;
    return view(kid, { ok: true, steps: 3, footfalls: footfalls });
  }

  function laughWindow(open) {
    laughOpen = !!open;
    return { ok: true, open: laughOpen };
  }

  function asleep() {
    for (var i = 0; i < kids.length; i++) kids[i].frozen = false;
    return { ok: true };
  }

  function eyesShut() {
    sentBack = {};
    for (var i = 0; i < kids.length; i++) kids[i].statue = false;
    return { ok: true };
  }

  function standUp() {
    standing = true;
    laughOpen = false;
    sentBack = {};
    for (var i = 0; i < kids.length; i++) {
      kids[i].frozen = false;
      kids[i].statue = false;
    }
    return { ok: true };
  }

  function reset() {
    kids.length = 0;
    laughOpen = false;
    standing = false;
    sentBack = {};
    return { ok: true };
  }

  CLASSROOM.modules.movement = {
    kids: kids,
    addKid: addKid,
    placeKid: placeKid,
    kidStep: kidStep,
    kidStill: kidStill,
    freezeAll: freezeAll,
    catchMovers: catchMovers,
    kidLaugh: kidLaugh,
    laughWindow: laughWindow,
    asleep: asleep,
    eyesShut: eyesShut,
    standUp: standUp,
    reset: reset
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = CLASSROOM.modules.movement;
  }
})(typeof globalThis !== "undefined" ? globalThis : this);

if (typeof module !== "undefined" && module.exports && require.main === module) {
  var movement = CLASSROOM.modules.movement;
  var passed = 0;

  function check(name, cond) {
    if (!cond) throw new Error(name);
    passed += 1;
  }

  function kid(id) {
    var list = movement.kids;
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) return list[i];
    }
    return null;
  }

  function fields(row) {
    var keys = [];
    for (var key in row) keys.push(key);
    keys.sort();
    return keys.join(",");
  }

  movement.reset();
  movement.addKid("a", 0);
  movement.addKid("b", 0);
  check("owns-five-fields", fields(kid("a")) === "frozen,id,moving,spot,statue");
  check("back-is-zero", kid("a").spot === 0 && kid("b").spot === 0);
  check("starts-still", kid("a").moving === false && kid("a").frozen === false && kid("a").statue === false);

  var stepped = movement.kidStep("a");
  check("step-leaves-back", stepped.spot === 1 && stepped.moved === true && kid("a").moving === true);
  check("step-does-not-catch", kid("a").statue === false && kid("a").frozen === false);
  check("other-kid-stays", kid("b").spot === 0 && kid("b").moving === false);

  movement.kidStill("a");
  check("still-clears-moving", kid("a").moving === false && kid("a").spot === 1);
  var none = movement.catchMovers();
  check("already-still-not-caught", none.caught.length === 0 && kid("a").statue === false && kid("b").statue === false);

  movement.kidStep("b");
  var caught = movement.catchMovers();
  check("catch-only-mover", caught.caught.length === 1 && caught.caught[0] === "b" && kid("b").statue === true);
  check("still-kid-not-in-catch", kid("a").statue === false);
  check("catch-does-not-move", kid("b").spot === 1 && kid("a").spot === 1);
  check("catch-stops-moving", kid("b").moving === false);

  var ignored = movement.kidLaugh("a");
  check("laugh-without-catch-stays", ignored.steps === 0 && kid("a").spot === 1 && kid("b").spot === 1);
  var back = movement.kidLaugh("b");
  check("three-footfalls", back.steps === 3 && back.footfalls.join(",") === "0,0,0" && kid("b").spot === 0);
  check("laugh-leaves-the-other", kid("a").spot === 1 && kid("a").statue === false);
  var again = movement.kidLaugh("b");
  check("second-laugh-does-not-move", again.steps === 0 && kid("b").spot === 0);

  movement.placeKid("b", 5);
  kid("b").statue = true;
  movement.eyesShut();
  check("eyes-shut-clears-statue", kid("b").statue === false && kid("b").spot === 5);
  movement.kidStep("b");
  movement.catchMovers();
  var fromFive = movement.kidLaugh("b");
  check("three-from-five", fromFive.footfalls.join(",") === "5,4,3" && kid("b").spot === 3);
  check("neighbor-unmoved", kid("a").spot === 1);

  movement.reset();
  movement.addKid("a", 4);
  movement.addKid("b", 2);
  movement.kidStep("a");
  movement.freezeAll();
  check("wake-freezes-all", kid("a").frozen === true && kid("b").frozen === true);
  check("wake-stops-moving", kid("a").moving === false && kid("b").moving === false);
  check("wake-is-not-a-statue", kid("a").statue === false && kid("b").statue === false);
  check("wake-does-not-move", kid("a").spot === 5 && kid("b").spot === 2);
  var wakeStep = movement.kidStep("a");
  check("frozen-step-stays", wakeStep.moved === false && kid("a").spot === 5);
  var wakeLaugh = movement.kidLaugh("a");
  check("wake-laugh-is-not-send-back", wakeLaugh.steps === 0 && kid("a").spot === 5);
  var afterWake = movement.catchMovers();
  check("wake-then-eyes-catches-nobody", afterWake.caught.length === 0 && kid("a").statue === false);
  movement.asleep();
  check("asleep-clears-freeze", kid("a").frozen === false && kid("b").frozen === false);
  var resumed = movement.kidStep("a");
  check("step-after-asleep", resumed.moved === true && kid("a").spot === 6);

  movement.reset();
  movement.addKid("a", 3);
  movement.laughWindow(true);
  var during = movement.kidStep("a");
  check("laugh-window-may-move", during.moved === true && kid("a").spot === 4 && kid("a").moving === true);
  var skippedFreeze = movement.freezeAll();
  check("wake-skipped-during-laugh", skippedFreeze.skipped === true && kid("a").frozen === false && kid("a").moving === true);
  var skippedCatch = movement.catchMovers();
  check("eyes-skipped-during-laugh", skippedCatch.skipped === true && kid("a").statue === false);
  movement.kidStill("a");
  movement.kidStep("a");
  movement.laughWindow(false);
  movement.catchMovers();
  var spotBefore = kid("a").spot;
  movement.laughWindow(true);
  var laughDuring = movement.kidLaugh("a");
  check("laugh-during-window-stays", laughDuring.steps === 0 && kid("a").spot === spotBefore && kid("a").statue === true);
  movement.laughWindow(false);
  var afterWindow = movement.kidLaugh("a");
  check("send-back-after-window", afterWindow.steps === 3 && kid("a").spot === spotBefore - 3);

  movement.reset();
  movement.addKid("a", 0);
  kid("a").moving = true;
  movement.catchMovers();
  var inPlace = movement.kidLaugh("a");
  check("back-wall-steps-in-place", inPlace.steps === 3 && inPlace.footfalls.join(",") === "0,0,0" && kid("a").spot === 0);

  movement.reset();
  movement.addKid("a", 2);
  movement.addKid("b", 2);
  movement.kidStep("a");
  movement.catchMovers();
  movement.standUp();
  check("stand-clears-holds", kid("a").statue === false && kid("a").frozen === false && kid("a").spot === 3);
  movement.kidStep("b");
  var phaseFreeze = movement.freezeAll();
  var phaseCatch = movement.catchMovers();
  var phaseLaugh = movement.kidLaugh("a");
  check("phase-b-has-no-pose", phaseFreeze.skipped === true && kid("b").frozen === false);
  check("phase-b-has-no-statue", phaseCatch.skipped === true && kid("b").statue === false);
  check("phase-b-has-no-send-back", phaseLaugh.steps === 0 && kid("a").spot === 3 && kid("b").spot === 3);

  movement.reset();
  movement.addKid("a", 1);
  movement.placeKid("a", 0);
  check("place-is-not-three-steps", kid("a").spot === 0 && kid("a").statue === false);
  movement.placeKid("a", 4);
  check("place-can-set-the-back-again", movement.placeKid("a", 0).spot === 0);

  console.log("movement: " + passed + " checks passed");
  process.exit(0);
}
