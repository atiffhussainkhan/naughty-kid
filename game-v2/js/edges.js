/* Pacing edges. Classic script. CLASSROOM.modules.edges.
   Authority: mega-requirements, design/game-design.md, design/09-pacing-and-edges.md.
   Owns the five open edges and the one-kid gaps for beats 7 and 9.
   Does not invent a solo line pass or a solo “other kids” crawl.
   Does not own the session frame (see CLASSROOM.modules.session). */

(function (root) {
  "use strict";

  var LINE_GAP = "one-kid-line-pass";
  var CRAWL_GAP = "one-kid-other-crawl";

  function pack(state, events, gaps) {
    return { state: state, events: events || [], gaps: gaps || [] };
  }

  function refused(state, text) {
    return pack(base(state), [{ type: "refused", text: text }], []);
  }

  function base(state) {
    var src = state && typeof state === "object" ? state : {};
    var next = {};
    var keys = Object.keys(src);
    var i;
    for (i = 0; i < keys.length; i++) next[keys[i]] = src[keys[i]];
    var finals = src.finals && typeof src.finals === "object" ? src.finals : {};
    next.finals = { a: finals.a === true, b: finals.b === true };
    next.gaps = Array.isArray(src.gaps) ? src.gaps.slice() : [];
    next.edges = copyEdges(src.edges);
    if (!Object.prototype.hasOwnProperty.call(src, "phase")) next.phase = null;
    if (!Object.prototype.hasOwnProperty.call(src, "beat")) next.beat = 0;
    if (!Object.prototype.hasOwnProperty.call(src, "sendBack")) next.sendBack = false;
    return next;
  }

  function copyEdges(src) {
    var e = src && typeof src === "object" ? src : {};
    return {
      neverStir: e.neverStir === true,
      neverTurn: e.neverTurn === true,
      sunglassesDrop: e.sunglassesDrop === true,
      noteNoticed: e.noteNoticed === true,
      laughDuringFive: e.laughDuringFive === true,
      lastFeet: e.lastFeet || null,
      glassesHolder: e.glassesHolder || null,
      plushOnMat: e.plushOnMat === true,
      throwWindow: e.throwWindow === true,
      laughOpen: e.laughOpen === true,
      noteOnBack: e.noteOnBack === true,
      linePassed: e.linePassed === true,
      drawing: e.drawing || null,
      recorded: Array.isArray(e.recorded) ? e.recorded.slice() : []
    };
  }

  function recordGap(next, id, text) {
    var i;
    for (i = 0; i < next.gaps.length; i++) {
      if (next.gaps[i].id === id) break;
    }
    if (i === next.gaps.length) next.gaps.push({ id: id, text: text });
    if (next.edges.recorded.indexOf(id) === -1) next.edges.recorded.push(id);
  }

  function kidCount(state, action) {
    if (action && typeof action.kids === "number") return action.kids;
    if (typeof state.kids === "number") return state.kids;
    if (Array.isArray(state.kids)) return state.kids.length;
    if (typeof state.kidCount === "number") return state.kidCount;
    if (state.edges && Array.isArray(state.edges.line)) return state.edges.line.length;
    return null;
  }

  function payload(action) {
    var body = action && action.payload && typeof action.payload === "object" ? action.payload : {};
    var out = {};
    var key;
    if (action && typeof action === "object") {
      for (key in action) {
        if (key !== "type" && key !== "payload" && Object.prototype.hasOwnProperty.call(action, key)) {
          out[key] = action[key];
        }
      }
    }
    for (key in body) {
      if (Object.prototype.hasOwnProperty.call(body, key)) out[key] = body[key];
    }
    return out;
  }

  /* Edge: teacher never stirs (beat 2). No forced wake. Kids stay. Host calls beat 3. */
  function neverStir(state, action) {
    var current = base(state);
    var data = payload(action);
    if (current.phase !== "A" || current.beat !== 2) {
      return refused(current, "Never stirs belongs to beat 2.");
    }
    if (data.stirred === true || current.edges.throwWindow === true) {
      return refused(current, "The stir window opened. This is not the never-stirs edge.");
    }
    current.edges.neverStir = true;
    current.edges.throwWindow = false;
    current.edges.plushOnMat = false;
    current.edges.laughOpen = false;
    current.beat = 3;
    current.sendBack = false;
    return pack(current, [{
      type: "edge-never-stir",
      text: "The quiet pause ended. The teacher stayed asleep. No throw. No 5 seconds. Beat 3."
    }], []);
  }

  /* Edge: teacher never turns (beat 8). No replacement signal. Note stays with carrier. */
  function neverTurn(state, action) {
    var current = base(state);
    var data = payload(action);
    if (current.phase !== "B" || current.beat !== 8) {
      return refused(current, "Never turns belongs to beat 8.");
    }
    if (data.turned === true) {
      return refused(current, "The turn happened. This is not the never-turns edge.");
    }
    current.edges.neverTurn = true;
    current.edges.drawing = null;
    current.beat = 9;
    current.sendBack = false;
    return pack(current, [{
      type: "edge-never-turn",
      text: "The quiet pause ended. No doodle window. No drawing. Beat 9. The note is not in the mailbox."
    }], []);
  }

  /* Edge: sunglasses dropped. Return to last feet. No send-back. No solo repair. */
  function sunglassesDrop(state, action) {
    var current = base(state);
    var data = payload(action);
    var count = kidCount(current, data);
    if (current.phase !== "B" || current.beat !== 7) {
      return refused(current, "A sunglasses drop belongs to beat 7.");
    }
    if (count != null && count < 2) {
      recordGap(current, LINE_GAP, "One kid cannot do the line pass.");
      current.sendBack = false;
      return pack(current, [{
        type: "recorded",
        text: "One kid cannot do the line pass. No solo pass is added."
      }], current.gaps.filter(function (g) { return g.id === LINE_GAP; }));
    }
    current.edges.sunglassesDrop = true;
    if (current.edges.lastFeet) current.edges.glassesHolder = current.edges.lastFeet;
    else if (data.lastFeet) {
      current.edges.lastFeet = data.lastFeet;
      current.edges.glassesHolder = data.lastFeet;
    }
    current.sendBack = false;
    return pack(current, [{
      type: "edge-sunglasses-drop",
      text: "The sunglasses return to the last feet that held them. Nobody is sent back. Earlier clean links stay done."
    }], []);
  }

  /* Beat 7 feet pass. One kid stays a gap. Two or more may finish the line. */
  function linePass(state, action) {
    var current = base(state);
    var data = payload(action);
    var count = kidCount(current, data);
    if (current.phase !== "B" || current.beat !== 7) {
      return refused(current, "The line pass belongs to beat 7.");
    }
    if (count == null || count < 2) {
      recordGap(current, LINE_GAP, "One kid cannot do the line pass.");
      current.sendBack = false;
      return pack(current, [{
        type: "recorded",
        text: "One kid cannot do the line pass. No solo pass is added."
      }], current.gaps.filter(function (g) { return g.id === LINE_GAP; }));
    }
    if (data.dropped === true || data.feet === false) {
      return sunglassesDrop(current, action);
    }
    if (data.feet === true && data.dropped === false) {
      current.edges.glassesHolder = data.to || data.mailboxEnd || current.edges.glassesHolder;
      current.edges.lastFeet = current.edges.glassesHolder;
      current.beat = 8;
      current.sendBack = false;
      return pack(current, [{
        type: "beat-7-ended",
        text: "The sunglasses reached the mailbox end by feet. Beat 8."
      }], []);
    }
    return refused(current, "Beat 7 needs a feet pass without a drop, or a drop return.");
  }

  /* Edge: sticky note noticed. Stay on beat 4. No send-back. Not a wake. */
  function noteNoticed(state, action) {
    var current = base(state);
    if (current.phase !== "A" || current.beat !== 4) {
      return refused(current, "A noticed note belongs to beat 4.");
    }
    current.edges.noteNoticed = true;
    current.edges.noteOnBack = false;
    current.edges.linePassed = false;
    current.sendBack = false;
    return pack(current, [{
      type: "edge-note-noticed",
      text: "The teacher noticed. The note comes off. The kids stay. Beat 4 stays open. That is not a wake."
    }], []);
  }

  /* Edge: kid laughs during the 5-second window. Not the three steps. */
  function laughDuringFive(state, action) {
    var current = base(state);
    var data = payload(action);
    if (current.edges.laughOpen !== true && data.laughOpen !== true && data.duringLaugh !== true) {
      return refused(current, "This edge is only during the 5-second laugh.");
    }
    current.edges.laughDuringFive = true;
    current.edges.laughOpen = true;
    current.sendBack = false;
    return pack(current, [{
      type: "edge-laugh-during-five",
      text: "A kid laugh inside the five does not take three steps. The count keeps going."
    }], []);
  }

  /* Beat 9: yell may end the beat. Crawl with one kid is a gap, not a solo form. */
  function otherCrawl(state, action) {
    var current = base(state);
    var data = payload(action);
    var count = kidCount(current, data);
    if (current.phase !== "B" || current.beat !== 9) {
      return refused(current, "The other-kids crawl belongs to beat 9.");
    }
    if (count == null || count < 2) {
      recordGap(current, CRAWL_GAP, "One kid cannot do the other kids crawl.");
      current.sendBack = false;
      if (data.yellDone === true || data.advance === true) current.beat = 10;
      return pack(current, [{
        type: "recorded",
        text: "One kid cannot do the other kids crawl. No solo crawl is added."
      }], current.gaps.filter(function (g) { return g.id === CRAWL_GAP; }));
    }
    current.sendBack = false;
    if (data.yellDone === true || data.advance === true) current.beat = 10;
    return pack(current, [{
      type: "beat-9-crawl",
      text: "The other kids may crawl. Zero crawls still finishes the beat."
    }], []);
  }

  /* First-touch tie break for singular props. No vote. No replay. */
  function firstTouch(state, action) {
    var current = base(state);
    var data = payload(action);
    if (!data.kid) return refused(current, "First touch needs the kid who got there first.");
    current.sendBack = false;
    return pack(current, [{
      type: "first-touch",
      text: "First touch. " + String(data.kid) + " does the singular action. The other kid stays in place.",
      kid: data.kid,
      prop: data.prop || null
    }], []);
  }

  function openThrowWindow(state) {
    var current = base(state);
    if (current.phase !== "A" || current.beat !== 2) {
      return refused(current, "Starts to wake is only beat 2.");
    }
    current.edges.throwWindow = true;
    current.sendBack = false;
    return pack(current, [{
      type: "throw-window",
      text: "Starts to wake. The plush window is open."
    }], []);
  }

  function plushOnMat(state) {
    var current = base(state);
    if (current.edges.throwWindow !== true) {
      return refused(current, "A throw only counts while starts to wake is open.");
    }
    current.edges.plushOnMat = true;
    current.edges.laughOpen = true;
    current.sendBack = false;
    return pack(current, [{
      type: "laugh-window",
      text: "The plush is on the mat. Kids may move for 5 seconds."
    }], []);
  }

  function laughEnd(state) {
    var current = base(state);
    current.edges.laughOpen = false;
    current.sendBack = false;
    if (current.phase === "A" && current.beat === 2) current.beat = 3;
    return pack(current, [{
      type: "laugh-ended",
      text: "The 5 seconds ended. The move window is closed. The teacher sleeps again."
    }], []);
  }

  function reduce(state, action) {
    var act = action;
    if (typeof act === "string") act = { type: act };
    if (!act || typeof act !== "object") return refused(state, "No action.");
    if (act.type === "edgeNeverStir" || act.type === "neverStir") return neverStir(state, act);
    if (act.type === "edgeNeverTurn" || act.type === "neverTurn") return neverTurn(state, act);
    if (act.type === "edgeSunglassesDrop" || act.type === "sunglassesDrop") return sunglassesDrop(state, act);
    if (act.type === "edgeLinePass" || act.type === "beat7Pass") return linePass(state, act);
    if (act.type === "edgeNoteNoticed" || act.type === "noteNoticed") return noteNoticed(state, act);
    if (act.type === "edgeLaughDuringFive" || act.type === "laughDuringFive") return laughDuringFive(state, act);
    if (act.type === "edgeOtherCrawl" || act.type === "beat9Crawl") return otherCrawl(state, act);
    if (act.type === "firstTouch") return firstTouch(state, act);
    if (act.type === "openThrowWindow" || act.type === "hostStir") return openThrowWindow(state);
    if (act.type === "plushOnMat" || act.type === "beat2Throw") return plushOnMat(state);
    if (act.type === "laughEnd" || act.type === "beat2LaughEnd") return laughEnd(state);
    return refused(state, "That action is not an edge this slice owns.");
  }

  function viewModel(state) {
    var current = base(state);
    var count = kidCount(current, {});
    var oneKid = count != null && count < 2;
    return {
      phase: current.phase,
      beat: current.beat,
      sendBack: current.sendBack === true,
      neverStir: current.edges.neverStir === true,
      neverTurn: current.edges.neverTurn === true,
      sunglassesDrop: current.edges.sunglassesDrop === true,
      noteNoticed: current.edges.noteNoticed === true,
      laughDuringFive: current.edges.laughDuringFive === true,
      throwWindow: current.edges.throwWindow === true,
      laughOpen: current.edges.laughOpen === true,
      plushOnMat: current.edges.plushOnMat === true,
      glassesHolder: current.edges.glassesHolder,
      lastFeet: current.edges.lastFeet,
      drawing: current.edges.drawing,
      oneKidLineGap: current.edges.recorded.indexOf(LINE_GAP) !== -1 || oneKid,
      oneKidCrawlGap: current.edges.recorded.indexOf(CRAWL_GAP) !== -1 || oneKid,
      recorded: current.edges.recorded.slice(),
      gaps: current.gaps.slice()
    };
  }

  var api = {
    reduce: reduce,
    viewModel: viewModel,
    LINE_GAP: LINE_GAP,
    CRAWL_GAP: CRAWL_GAP
  };
  var classroom = root.CLASSROOM || (root.CLASSROOM = {});
  classroom.modules = classroom.modules || {};
  classroom.modules.edges = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof globalThis !== "undefined" ? globalThis : this);

if (typeof require !== "undefined" && require.main === module) {
  var edges = globalThis.CLASSROOM.modules.edges;
  var failures = 0;

  function check(cond, text) {
    if (!cond) {
      failures += 1;
      console.error("FAIL " + text);
    }
  }

  var a2 = { phase: "A", beat: 2, kids: 2, finals: { a: false, b: false } };
  var stirred = edges.reduce(a2, { type: "neverStir" });
  check(stirred.state.beat === 3 && stirred.state.edges.neverStir === true, "never stir ends beat 2");
  check(stirred.state.sendBack === false, "never stir is not a send-back");
  check(a2.beat === 2, "input beat 2 stays");

  var midStir = edges.reduce(a2, { type: "openThrowWindow" });
  check(midStir.state.edges.throwWindow === true, "stir opens the throw window");
  var forced = edges.reduce(midStir.state, { type: "neverStir", stirred: true });
  check(forced.state.beat === 2 || forced.events[0].type === "refused", "open window is not never-stirs");

  var land = edges.reduce(midStir.state, { type: "plushOnMat" });
  check(land.state.edges.laughOpen === true && land.state.edges.plushOnMat === true, "plush starts the five");
  var kidLaugh = edges.reduce(land.state, { type: "laughDuringFive" });
  check(kidLaugh.state.sendBack === false && kidLaugh.state.edges.laughDuringFive === true, "laugh in five is not three steps");
  var ended = edges.reduce(land.state, { type: "laughEnd" });
  check(ended.state.edges.laughOpen === false && ended.state.beat === 3, "laugh end closes the window and beat 3");

  var a4 = { phase: "A", beat: 4, kids: 2, finals: { a: false, b: false } };
  var noticed = edges.reduce(a4, { type: "noteNoticed" });
  check(noticed.state.beat === 4 && noticed.state.edges.noteOnBack === false, "noticed note stays on beat 4");
  check(noticed.state.sendBack === false, "noticed note is not a send-back");

  var b8 = { phase: "B", beat: 8, kids: 2, finals: { a: true, b: false } };
  var noTurn = edges.reduce(b8, { type: "neverTurn" });
  check(noTurn.state.beat === 9 && noTurn.state.edges.drawing == null, "never turn skips the doodle");
  check(noTurn.state.sendBack === false, "never turn is not a send-back");

  var b7 = { phase: "B", beat: 7, kids: 2, finals: { a: true, b: false }, edges: { lastFeet: "kid-1" } };
  var dropped = edges.reduce(b7, { type: "sunglassesDrop" });
  check(dropped.state.edges.glassesHolder === "kid-1" && dropped.state.sendBack === false, "drop returns to last feet");
  check(dropped.state.beat === 7, "drop stays on beat 7");

  var solo7 = edges.reduce({ phase: "B", beat: 7, kids: 1, finals: { a: true, b: false } }, {
    type: "beat7Pass",
    feet: true,
    dropped: false
  });
  check(solo7.state.beat === 7, "one kid does not finish beat 7");
  check(solo7.state.edges.recorded.indexOf("one-kid-line-pass") !== -1, "one-kid line gap is recorded");
  check(solo7.gaps.some(function (g) { return g.id === "one-kid-line-pass"; }), "gap list has the line gap");

  var pass = edges.reduce(b7, { type: "beat7Pass", feet: true, dropped: false, to: "kid-2" });
  check(pass.state.beat === 8, "two kids may finish the line pass");

  var solo9 = edges.reduce({ phase: "B", beat: 9, kids: 1, finals: { a: true, b: false } }, {
    type: "beat9Crawl",
    crawl: true,
    yellDone: true
  });
  check(solo9.state.edges.recorded.indexOf("one-kid-other-crawl") !== -1, "one-kid crawl gap is recorded");
  check(solo9.gaps.some(function (g) { return g.id === "one-kid-other-crawl"; }), "gap list has the crawl gap");
  check(solo9.state.beat === 10, "yell may still advance; crawl is not repaired");

  var crawlOk = edges.reduce({ phase: "B", beat: 9, kids: 2, finals: { a: true, b: false } }, {
    type: "beat9Crawl",
    yellDone: true
  });
  check(crawlOk.state.beat === 10 && crawlOk.state.edges.recorded.indexOf("one-kid-other-crawl") === -1, "two kids need no crawl gap");

  var vm = edges.viewModel(solo7.state);
  check(vm.oneKidLineGap === true && vm.sendBack === false, "view shows the line gap");

  if (failures) {
    console.error(failures + " failed");
    process.exit(1);
  }
  console.log("ok");
}
