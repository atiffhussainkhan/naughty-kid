/* game-v2 movement. Functional reduce over game-slices/05-movement.
   Spot 0 is the back. The only send-back is three footfalls when a
   caught-moving kid laughs. No other penalty walks a kid backward. */
(function (root) {
  "use strict";

  var CLASSROOM = root.CLASSROOM || (root.CLASSROOM = {});
  CLASSROOM.modules = CLASSROOM.modules || {};

  function spotOf(value) {
    var n = Number(value);
    if (!isFinite(n) || n < 0) return 0;
    return Math.floor(n);
  }

  function isArray(value) {
    return Object.prototype.toString.call(value) === "[object Array]";
  }

  function copyKid(kid) {
    var next = {
      id: kid.id,
      spot: spotOf(kid.spot),
      moving: !!kid.moving,
      frozen: !!kid.frozen,
      statue: !!kid.statue
    };
    /* Preserve Phase A catch / three-step fields (docs: only send-back). */
    if (kid.caught != null) next.caught = kid.caught === true;
    if (kid.laughed != null) next.laughed = kid.laughed === true;
    if (kid.statuePose) next.statuePose = kid.statuePose;
    if (kid.sendBack && typeof kid.sendBack === "object") {
      next.sendBack = { steps: kid.sendBack.steps, direction: kid.sendBack.direction };
    }
    if (kid.zone) next.zone = kid.zone;
    if (kid.underFoot != null) next.underFoot = kid.underFoot;
    if (kid.walked != null) next.walked = kid.walked;
    if (kid.walking != null) next.walking = kid.walking;
    return next;
  }

  function copySent(sent) {
    var next = {};
    var id;
    if (!sent) return next;
    for (id in sent) {
      if (sent[id]) next[id] = true;
    }
    return next;
  }

  function normalize(state) {
    var next = {};
    var key;
    var i;
    if (state && typeof state === "object") {
      for (key in state) {
        if (key !== "kids" && key !== "sentBack") next[key] = state[key];
      }
    }
    next.kids = [];
    if (state && isArray(state.kids)) {
      for (i = 0; i < state.kids.length; i++) next.kids.push(copyKid(state.kids[i]));
    }
    next.laughOpen = !!(state && state.laughOpen);
    next.standing = !!(state && state.standing);
    next.sentBack = copySent(state && state.sentBack);
    return next;
  }

  function findKid(kids, id) {
    var i;
    for (i = 0; i < kids.length; i++) {
      if (kids[i].id === id) return kids[i];
    }
    return null;
  }

  function loadCore() {
    var live = CLASSROOM.modules && CLASSROOM.modules.movement;
    if (live && typeof live.kidStep === "function") return live;
    if (typeof require === "function") {
      try {
        return require("../../game-slices/05-movement/module.js");
      } catch (err) {
        return null;
      }
    }
    return null;
  }

  function snapshotKids(core) {
    var saved = [];
    var i;
    var kid;
    for (i = 0; i < core.kids.length; i++) {
      kid = core.kids[i];
      saved.push({
        id: kid.id,
        spot: kid.spot,
        moving: kid.moving,
        frozen: kid.frozen,
        statue: kid.statue
      });
    }
    return saved;
  }

  function restoreKids(core, saved) {
    var i;
    var live;
    core.reset();
    for (i = 0; i < saved.length; i++) {
      core.addKid(saved[i].id, saved[i].spot);
      live = core.kids[core.kids.length - 1];
      live.spot = saved[i].spot;
      live.moving = saved[i].moving;
      live.frozen = saved[i].frozen;
      live.statue = saved[i].statue;
    }
  }

  function hydrate(core, state) {
    var i;
    var kid;
    var live;
    var spot;
    core.reset();
    for (i = 0; i < state.kids.length; i++) {
      kid = state.kids[i];
      core.addKid(kid.id, kid.spot);
      live = core.kids[core.kids.length - 1];
      live.spot = kid.spot;
      live.moving = kid.moving;
      live.frozen = kid.frozen;
      live.statue = kid.statue;
    }
    for (i = 0; i < state.kids.length; i++) {
      if (!state.sentBack[state.kids[i].id]) continue;
      spot = state.kids[i].spot;
      core.kidLaugh(state.kids[i].id);
      core.placeKid(state.kids[i].id, spot);
    }
    if (state.laughOpen) core.laughWindow(true);
    if (state.standing) {
      core.standUp();
      for (i = 0; i < state.kids.length; i++) {
        live = findKid(core.kids, state.kids[i].id);
        if (!live) continue;
        live.spot = state.kids[i].spot;
        live.moving = state.kids[i].moving;
        live.frozen = state.kids[i].frozen;
        live.statue = state.kids[i].statue;
      }
    }
  }

  function actionOf(action) {
    var act = action;
    if (typeof act === "string") act = { type: act };
    if (!act || typeof act !== "object" || !act.type) return null;
    if (act.type === "laugh") return { type: "kidLaugh", id: act.id };
    if (act.type === "laughWindow") return { type: "laughWindow", open: act.open === true };
    if (act.type === "standUp" || act.type === "asleep" || act.type === "eyesShut") {
      return { type: act.type };
    }
    if (act.type === "kidStep" || act.type === "kidStill" || act.type === "freezeAll" || act.type === "catchMovers" || act.type === "kidLaugh") {
      return { type: act.type, id: act.id };
    }
    return null;
  }

  function dispatch(core, act) {
    if (act.type === "kidStep") return { kind: "step", value: core.kidStep(act.id) };
    if (act.type === "kidStill") return { kind: "still", value: core.kidStill(act.id) };
    if (act.type === "freezeAll") return { kind: "freeze", value: core.freezeAll() };
    if (act.type === "catchMovers") return { kind: "catch", value: core.catchMovers() };
    if (act.type === "laughWindow") return { kind: "window", value: core.laughWindow(act.open === true) };
    if (act.type === "standUp") return { kind: "stand", value: core.standUp() };
    if (act.type === "asleep") return { kind: "asleep", value: core.asleep() };
    if (act.type === "eyesShut") return { kind: "eyesShut", value: core.eyesShut() };
    return { kind: "laugh", value: core.kidLaugh(act.id) };
  }

  function applyOutcome(state, act, kids, outcome) {
    var next = normalize(state);
    var i;
    var kid;
    var live;
    next.kids = [];
    for (i = 0; i < state.kids.length; i++) {
      kid = copyKid(state.kids[i]);
      live = findKid(kids, kid.id);
      if (live) {
        kid.spot = live.spot;
        kid.moving = live.moving;
        kid.frozen = live.frozen;
        kid.statue = live.statue;
      }
      next.kids.push(kid);
    }
    next.sentBack = copySent(state.sentBack);
    if (outcome && outcome.kind === "window") {
      next.laughOpen = !!(outcome.value && outcome.value.open);
    }
    if (outcome && outcome.kind === "stand") {
      next.standing = true;
      next.laughOpen = false;
      next.sentBack = {};
    }
    if (outcome && outcome.kind === "laugh" && outcome.value && outcome.value.steps === 3) {
      next.sentBack[act.id] = true;
    }
    if (outcome && outcome.kind === "catch" && outcome.value && outcome.value.caught) {
      for (i = 0; i < outcome.value.caught.length; i++) next.sentBack[outcome.value.caught[i]] = false;
    }
    return next;
  }

  function reduceWithCore(core, state, act) {
    var saved = snapshotKids(core);
    var kids = null;
    var outcome = null;
    try {
      hydrate(core, state);
      outcome = dispatch(core, act);
      kids = snapshotKids(core);
    } finally {
      restoreKids(core, saved);
    }
    return applyOutcome(state, act, kids || [], outcome);
  }

  function reduce(state, action) {
    var current = normalize(state);
    var act = actionOf(action);
    var core;
    if (!act) return current;
    core = loadCore();
    if (!core) throw new Error("game-v2 movement needs game-slices/05-movement/module.js");
    return reduceWithCore(core, current, act);
  }

  function positions(state) {
    var kids = state && isArray(state.kids) ? state.kids : [];
    var out = [];
    var i;
    for (i = 0; i < kids.length; i++) {
      out.push({ id: kids[i].id, offset: spotOf(kids[i].spot) });
    }
    return out;
  }

  CLASSROOM.movement = { reduce: reduce, positions: positions };
  if (typeof module !== "undefined" && module.exports) module.exports = CLASSROOM.movement;
})(typeof globalThis !== "undefined" ? globalThis : this);
