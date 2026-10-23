/* Phase B beats 6–10. Classic script. CLASSROOM.modules.phaseB.
   Authority: mega-requirements, then design/game-design.md, then design/03-phase-b.md.
   DESIGN-DECISION 3 (whiteboard turn) and DESIGN-DECISION 4 (beat 10 wins Phase B only).
   Exactly three hidden whoopee cushions. No Phase A send-back. No solo line pass or solo other-kids crawl.
   Beat 10: note in mailbox starts the finale; gentle spray on the named target plus victory dance wins Phase B. */

(function (root) {
  "use strict";

  var SAMPLE = "The broccoli has landed!";
  var LINE_GAP = "one-kid-line-pass";
  var CRAWL_GAP = "one-kid-other-crawl";

  function pack(state, events, gaps) {
    return { state: state, events: events || [], gaps: gaps || [] };
  }

  function copyFinals(src) {
    var finals = src && src.finals && typeof src.finals === "object" ? src.finals : {};
    var a = finals.a === true || finals.confetti === true;
    var b = finals.b === true || finals.sillyString === true;
    return {
      a: a,
      b: b,
      confetti: a,
      sillyString: b,
      sessionWon: false
    };
  }

  function copyPhaseB(src) {
    var pb = src && typeof src === "object" ? src : {};
    return {
      whoopeeCount: 3,
      cushionCount: typeof pb.cushionCount === "number" ? pb.cushionCount : 0,
      whoopees: pb.whoopees ? pb.whoopees.slice() : [],
      sounded: pb.sounded ? pb.sounded.slice() : [],
      off: Object.assign({}, pb.off || {}),
      index: Object.assign({}, pb.index || {}),
      allOff: pb.allOff === true,
      line: pb.line ? pb.line.slice() : null,
      glassesHolder: pb.glassesHolder || null,
      lastFeet: pb.lastFeet || null,
      note: pb.note === "mailbox" ? "mailbox" : "carrier",
      mailbox: pb.mailbox === true,
      picture: pb.picture || null,
      doodleWindowOpen: pb.doodleWindowOpen === true,
      yelled: pb.yelled === true,
      yeller: pb.yeller || null,
      crawls: pb.crawls ? pb.crawls.slice() : [],
      landings: (pb.landings || []).map(function (row) {
        return Object.assign({}, row);
      }),
      sprayTarget: pb.sprayTarget || null,
      phaseBWon: pb.phaseBWon === true,
      lastNoise: pb.lastNoise === true,
      sendBack: false,
      recorded: pb.recorded ? pb.recorded.slice() : []
    };
  }

  function base(state) {
    var src = state && typeof state === "object" ? state : {};
    var next = {};
    var keys = Object.keys(src);
    var i;
    for (i = 0; i < keys.length; i++) next[keys[i]] = src[keys[i]];
    next.finals = copyFinals(src);
    next.phaseB = copyPhaseB(src.phaseB);
    next.gaps = Array.isArray(src.gaps) ? src.gaps.slice() : [];
    next.events = [];
    next.phaseBWon = next.phaseB.phaseBWon === true;
    if (next.phaseBWon) {
      next.finals.b = true;
      next.finals.sillyString = true;
    }
    next.sessionWon = next.phaseBWon === true && next.finals.a === true;
    next.finals.sessionWon = next.sessionWon;
    next.phaseB.sendBack = false;
    return next;
  }

  function say(next, type, text) {
    next.events = [{ type: type, text: text }];
    return pack(next, next.events, next.gaps);
  }

  function record(next, id, text) {
    var i;
    for (i = 0; i < next.gaps.length; i++) {
      if (next.gaps[i].id === id) break;
    }
    if (i === next.gaps.length) next.gaps.push({ id: id, text: text });
    if (next.phaseB.recorded.indexOf(id) === -1) next.phaseB.recorded.push(id);
  }

  function payloadOf(action) {
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

  function kidCount(state, payload) {
    if (Array.isArray(state.kids)) return state.kids.length;
    if (typeof state.kids === "number") return state.kids;
    if (typeof state.kidCount === "number") return state.kidCount;
    if (payload && Array.isArray(payload.kids)) return payload.kids.length;
    if (payload && typeof payload.kids === "number") return payload.kids;
    if (state.phaseB && Array.isArray(state.phaseB.line)) return state.phaseB.line.length;
    return null;
  }

  function kidIds(state, payload) {
    var source = null;
    if (Array.isArray(state.kids)) source = state.kids;
    else if (payload && Array.isArray(payload.kids)) source = payload.kids;
    else if (state.phaseB && Array.isArray(state.phaseB.line)) source = state.phaseB.line;
    if (source) {
      return source.map(function (kid) {
        if (typeof kid === "string") return kid;
        if (kid && kid.id) return kid.id;
        return String(kid);
      });
    }
    var count = kidCount(state, payload);
    if (typeof count !== "number" || count < 1) return null;
    var ids = [];
    var n;
    for (n = 0; n < count; n++) ids.push("kid-" + (n + 1));
    return ids;
  }

  function readWhoopees(state) {
    var spots = state.props && state.props.items && state.props.items.cushions && state.props.items.cushions.spots;
    if (!Array.isArray(spots)) return null;
    var whoopees = [];
    var i;
    for (i = 0; i < spots.length; i++) {
      if (spots[i] && spots[i].whoopee === true) whoopees.push(i);
    }
    return { count: spots.length, whoopees: whoopees };
  }

  function ensureWhoopees(next) {
    var found = readWhoopees(next);
    if (found && found.whoopees.length === 3) {
      next.phaseB.cushionCount = found.count;
      next.phaseB.whoopees = found.whoopees.slice();
      next.phaseB.whoopeeCount = 3;
      return;
    }
    if (next.phaseB.whoopees.length !== 3) {
      next.phaseB.cushionCount = 6;
      next.phaseB.whoopees = [0, 2, 4];
    }
    next.phaseB.whoopeeCount = 3;
  }

  function onBeat(next, beat) {
    return next.phase === "B" && next.beat === beat;
  }

  function norm(value) {
    return String(value || "").replace(/[\u2019\u2018]/g, "'").replace(/\s+/g, " ").trim().toLowerCase();
  }

  function targetOf(value) {
    var text = norm(value);
    if (!text) return null;
    if (text.indexOf("shoe") !== -1) return "shoes";
    if (text.indexOf("desk") !== -1) return "desk";
    return null;
  }

  function lockedTarget(state) {
    var picks = state.picks && typeof state.picks === "object" ? state.picks : {};
    return targetOf(picks.stringTarget || picks.string || state.stringTarget || state.sprayTarget);
  }

  function doodleWindow(activity) {
    var named = norm(activity);
    if (named.indexOf("whiteboard") !== -1 || named.indexOf("board") !== -1) {
      return "turn away and then turn back";
    }
    if (named.indexOf("typ") !== -1 || named.indexOf("read") !== -1) {
      return "turn to face the whiteboard";
    }
    if (activity === "whiteboard") return "turn away and then turn back";
    if (activity === "typing" || activity === "reading") return "turn to face the whiteboard";
    return null;
  }

  function phraseOf(state, payload) {
    var said = payload.phrase;
    var sample = norm(SAMPLE);
    var host = state.samples && state.samples.phrase;
    if (host && typeof host === "object") host = host.value || host.text;
    if (said == null || said === "") return host || SAMPLE;
    if (norm(said) === sample) return SAMPLE;
    if (host && norm(said) === norm(host)) return host;
    return null;
  }

  function voiceOk(payload) {
    if (payload.deepMonster === true) return true;
    var voice = norm(payload.voice);
    return voice === "monster" || voice === "deep" || voice === "deep monster" || voice === "deep-monster";
  }

  function pictureOf(payload) {
    var named = norm(payload.picture || payload.drawing);
    if (named === "hat") return "hat";
    if (named === "ears" || named === "giant ears" || named === "giant-ears") return "ears";
    return null;
  }

  function others(ids, yeller) {
    return ids.filter(function (id) {
      return id !== yeller;
    });
  }

  function enterBeat7(next) {
    next.beat = 7;
    next.phaseB.note = "carrier";
    next.phaseB.mailbox = false;
    var ids = kidIds(next);
    if (ids && ids.length >= 2) {
      next.phaseB.line = ids.slice();
      next.phaseB.glassesHolder = ids[0];
      next.phaseB.lastFeet = ids[0];
    }
  }

  function beat6Step(next, payload) {
    if (!onBeat(next, 6)) return say(next, "refused", "Beat 6 is the whoopee path.");
    ensureWhoopees(next);
    next.phaseB.sendBack = false;
    next.phaseB.note = "carrier";
    next.phaseB.mailbox = false;

    if (payload.allOffMailboxSide === true) {
      var ids = kidIds(next);
      var i;
      if (ids) {
        for (i = 0; i < ids.length; i++) next.phaseB.off[ids[i]] = true;
      }
      next.phaseB.allOff = true;
      enterBeat7(next);
      return say(
        next,
        "beat-6-ended",
        "Every kid is off the path on the mailbox side. The note stays with the carrier. The mailbox is empty."
      );
    }

    if (payload.wrong === true) {
      var cushion = next.phaseB.whoopees[0];
      next.phaseB.sounded.push(cushion);
      next.phaseB.lastNoise = true;
      if (payload.kid) next.phaseB.index[payload.kid] = cushion;
      return say(
        next,
        "whoopee",
        "That step makes a loud noise. The kid stays on the cushion. It is not a send-back."
      );
    }

    var kid = payload.kid;
    var index = payload.cushion != null ? payload.cushion : payload.index;
    if (kid && index != null) {
      var current = next.phaseB.index[kid];
      var expected = current == null ? 0 : current + 1;
      if (index !== expected && index !== next.phaseB.cushionCount) {
        return say(next, "refused", "The next step is the next cushion, or off the path.");
      }
      if (index >= next.phaseB.cushionCount) {
        next.phaseB.off[kid] = true;
      } else {
        next.phaseB.index[kid] = index;
        next.phaseB.off[kid] = false;
        if (next.phaseB.whoopees.indexOf(index) !== -1) {
          next.phaseB.sounded.push(index);
          next.phaseB.lastNoise = true;
        } else {
          next.phaseB.lastNoise = false;
        }
      }
      var group = kidIds(next);
      var done = group && group.every(function (id) {
        return next.phaseB.off[id] === true;
      });
      if (done) {
        enterBeat7(next);
        return say(
          next,
          "beat-6-ended",
          "Every kid is off the path on the mailbox side. The note stays with the carrier. The mailbox is empty."
        );
      }
      if (next.phaseB.lastNoise) {
        return say(
          next,
          "whoopee",
          "That step makes a loud noise. The kid stays on the cushion. It is not a send-back."
        );
      }
      return say(next, "step", "The kid steps onward. The teacher stays in the chosen activity.");
    }

    return say(next, "refused", "Beat 6 needs a step, a wrong step, or the whole group off the mailbox side.");
  }

  function beat7Pass(next, payload) {
    if (!onBeat(next, 7)) return say(next, "refused", "Beat 7 is the sunglasses pass.");
    var count = kidCount(next, payload);
    next.phaseB.sendBack = false;
    next.phaseB.note = "carrier";
    next.phaseB.mailbox = false;
    if (count == null || count < 2) {
      record(next, LINE_GAP, "One kid cannot do the line pass.");
      return say(next, "recorded", "One kid cannot do the line pass. No solo pass is added.");
    }

    var dropped = payload.dropped === true || payload.how === "drop" || payload.how === "hand" || payload.feet === false;
    if (dropped) {
      if (next.phaseB.lastFeet) next.phaseB.glassesHolder = next.phaseB.lastFeet;
      return say(next, "pass-returned", "The sunglasses go back to the last feet that held them. Nobody is sent back.");
    }

    if (payload.feet === true && payload.dropped === false) {
      var line = next.phaseB.line || kidIds(next, payload);
      next.phaseB.line = line.slice();
      next.phaseB.glassesHolder = line[line.length - 1];
      next.phaseB.lastFeet = line[line.length - 1];
      next.beat = 8;
      return say(
        next,
        "beat-7-ended",
        "The kid at the mailbox end has the sunglasses. Every pass that got them there used feet."
      );
    }

    if (payload.how === "foot" && payload.to) {
      var order = next.phaseB.line || kidIds(next, payload);
      var from = payload.from || next.phaseB.glassesHolder || order[0];
      var at = order.indexOf(from);
      if (at < 0 || order[at + 1] !== payload.to) {
        return say(next, "refused", "The pass goes to the next kid down the line.");
      }
      next.phaseB.line = order.slice();
      next.phaseB.glassesHolder = payload.to;
      next.phaseB.lastFeet = payload.to;
      if (at + 1 === order.length - 1) {
        next.beat = 8;
        return say(
          next,
          "beat-7-ended",
          "The kid at the mailbox end has the sunglasses. Every pass that got them there used feet."
        );
      }
      return say(next, "pass", "The sunglasses move one kid down the line, by feet.");
    }

    return say(next, "refused", "Beat 7 is a feet pass down the line, or a drop that returns to the last feet.");
  }

  function beat8Draw(next, payload) {
    if (!onBeat(next, 8)) return say(next, "refused", "Beat 8 is the doodle.");
    next.phaseB.sendBack = false;
    next.phaseB.note = "carrier";
    next.phaseB.mailbox = false;

    if (payload.openWindow === true || payload.faceBoard === true) {
      next.phaseB.doodleWindowOpen = true;
      return say(next, "doodle-window", "The teacher faces the whiteboard. The doodle window is open.");
    }

    if (payload.quiet === true) {
      next.phaseB.picture = null;
      next.phaseB.doodleWindowOpen = false;
      next.beat = 9;
      return say(next, "beat-8-ended", "The teacher never makes the turn. One quiet pause ends the beat with no drawing.");
    }

    var picture = pictureOf(payload);
    if (!picture) return say(next, "refused", "The drawing is a hat, or giant ears.");
    if (payload.onShadow === false || payload.miss === true) {
      next.phaseB.doodleWindowOpen = false;
      return say(next, "miss", "The beam missed the shadow. Wait for the same whiteboard turn again. Nobody is sent back.");
    }
    next.phaseB.picture = picture;
    next.phaseB.doodleWindowOpen = false;
    next.beat = 9;
    return say(next, "beat-8-ended", "The drawing is on the shadow. The note stays with the carrier.");
  }

  function beat9Yell(next, payload) {
    if (!onBeat(next, 9)) return say(next, "refused", "Beat 9 is the monster yell.");
    next.phaseB.sendBack = false;
    next.phaseB.note = "carrier";
    next.phaseB.mailbox = false;
    if (!voiceOk(payload) || !phraseOf(next, payload)) {
      return say(next, "refused", "One kid yells the phrase in a deep monster voice.");
    }
    var ids = kidIds(next, payload);
    var yeller = payload.kid || (ids && ids[0]) || null;
    next.phaseB.yelled = true;
    next.phaseB.yeller = yeller;

    if (payload.crawl != null && payload.crawl !== false) {
      var count = kidCount(next, payload);
      if (count === 1 || (ids && ids.length < 2)) {
        record(next, CRAWL_GAP, "One kid cannot do the other kids crawl.");
        next.phaseB.crawls = [];
      } else if (ids && ids.length >= 2) {
        var asked = Array.isArray(payload.crawl) ? payload.crawl : others(ids, yeller);
        next.phaseB.crawls = asked.filter(function (id) {
          return id !== yeller && ids.indexOf(id) !== -1;
        });
      }
    }

    next.beat = 10;
    return say(
      next,
      "beat-9-ended",
      "The teacher turns to investigate, then turns back. The mailbox stays empty. Nobody is sent back."
    );
  }

  function beat10Mailbox(next) {
    if (next.phase !== "B") return say(next, "refused", "Beat 10 does not skip Phase A.");
    if (next.beat !== 10) {
      next.phaseB.note = "carrier";
      next.phaseB.mailbox = false;
      return say(next, "refused", "The finale waits until beat 10. The note stays with the carrier.");
    }
    next.phaseB.note = "mailbox";
    next.phaseB.mailbox = true;
    next.phaseBWon = false;
    next.phaseB.phaseBWon = false;
    next.sessionWon = false;
    next.finals.b = false;
    next.finals.sillyString = false;
    next.finals.sessionWon = false;
    return say(next, "finale-started", "The note is in the mailbox. That starts the finale. It does not win Phase B.");
  }

  function winPhaseB(next) {
    next.phase = "B";
    next.beat = 10;
    next.phaseB.phaseBWon = true;
    next.phaseBWon = true;
    next.finals.b = true;
    next.finals.sillyString = true;
    next.sessionWon = next.finals.a === true;
    next.finals.sessionWon = next.sessionWon;
    if (next.sessionWon) {
      return say(next, "phase-b-won", "Phase B is won. The session is won.");
    }
    return say(next, "phase-b-won", "Phase B is won. The session is not won.");
  }

  function beat10Spray(next, payload) {
    if (next.phase !== "B") return say(next, "refused", "Beat 10 does not skip Phase A.");
    if (next.beat !== 10 || next.phaseB.mailbox !== true) {
      return say(next, "refused", "The finale starts once the secret note reaches the mailbox.");
    }
    var target = targetOf(payload.target);
    var locked = lockedTarget(next);
    var onTarget = !!target && (locked ? target === locked : true);
    var gentle = payload.gentle === true;
    var dance = payload.dance === true;
    next.phaseB.landings.push({ target: target, gentle: gentle, dance: dance });
    next.phaseB.sprayTarget = target;
    next.phaseB.sendBack = false;
    if (gentle && dance && onTarget) return winPhaseB(next);
    if (next.phaseB.phaseBWon === true) {
      next.phaseBWon = true;
      next.sessionWon = next.finals.a === true;
      next.finals.sessionWon = next.sessionWon;
      return say(next, "phase-b-won", "Phase B stays won.");
    }
    next.phaseBWon = false;
    next.phaseB.phaseBWon = false;
    next.sessionWon = false;
    next.finals.b = false;
    next.finals.sillyString = false;
    next.finals.sessionWon = false;
    if (!dance) return say(next, "spray", "A spray without the dance does not win Phase B.");
    return say(next, "spray", "The finale stays unfinished. Nobody goes back to an earlier beat.");
  }

  function reduce(state, action) {
    var act = action;
    if (typeof act === "string") act = { type: act };
    var next = base(state);
    if (!act || typeof act !== "object" || !act.type) {
      return say(next, "refused", "No action.");
    }
    var payload = payloadOf(act);
    if (act.type === "beat6Step") return beat6Step(next, payload);
    if (act.type === "beat7Pass") return beat7Pass(next, payload);
    if (act.type === "beat8Draw") return beat8Draw(next, payload);
    if (act.type === "beat9Yell") return beat9Yell(next, payload);
    if (act.type === "beat10Mailbox") return beat10Mailbox(next);
    if (act.type === "beat10Spray") return beat10Spray(next, payload);
    return say(next, "refused", "That action is not one of beats 6 through 10.");
  }

  function viewModel(state) {
    var current = base(state);
    var pb = current.phaseB;
    var activity = current.activity || (current.picks && current.picks.activity) || null;
    var hostLine = null;
    if (current.phase === "B") {
      if (current.beat === 6) {
        hostLine = "Beat 6. Guess the cushions. Exactly three hide whoopees. Noise is not a send-back.";
      } else if (current.beat === 7) {
        hostLine = "Beat 7. Foot-pass the clown sunglasses down the line toward the mailbox.";
      } else if (current.beat === 8) {
        hostLine = "Beat 8. Whiteboard turn, then flashlight-draw a hat or giant ears on the shadow.";
      } else if (current.beat === 9) {
        hostLine = "Beat 9. One kid yells “The broccoli has landed!” in a deep monster voice. Others may crawl.";
      } else if (current.beat === 10 && pb.mailbox !== true) {
        hostLine = "Beat 10. Put the note in the mailbox. That starts the finale.";
      } else if (current.beat === 10 && pb.phaseBWon !== true) {
        hostLine = "Finale. Gentle spray on the named target while the kids dance.";
      } else if (pb.phaseBWon === true && current.sessionWon === true) {
        hostLine = "Phase B is won. The session is won.";
      } else if (pb.phaseBWon === true) {
        hostLine = "Phase B is won. The session is not won.";
      }
    }
    return {
      phase: current.phase,
      beat: current.beat,
      phaseBWon: pb.phaseBWon === true,
      sessionWon: current.sessionWon === true,
      whoopeeCount: 3,
      whoopees: pb.whoopees.slice(),
      lastNoise: pb.lastNoise === true,
      sendBack: false,
      note: pb.note,
      mailbox: pb.mailbox === true,
      glassesHolder: pb.glassesHolder,
      picture: pb.picture,
      doodleWindow: doodleWindow(activity),
      yelled: pb.yelled === true,
      crawls: pb.crawls.slice(),
      sprayTarget: pb.sprayTarget || lockedTarget(current),
      landings: pb.landings.slice(),
      hostLine: hostLine
    };
  }

  var api = { reduce: reduce, viewModel: viewModel };
  var classroom = root.CLASSROOM || (root.CLASSROOM = {});
  classroom.modules = classroom.modules || {};
  classroom.modules.phaseB = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof globalThis !== "undefined" ? globalThis : this);

if (typeof require !== "undefined" && require.main === module) {
  var phaseB = globalThis.CLASSROOM.modules.phaseB;
  var failures = 0;

  function check(cond, text) {
    if (!cond) {
      failures += 1;
      console.error("FAIL " + text);
    }
  }

  function start(extra) {
    var state = {
      phase: "B",
      beat: 6,
      kids: 2,
      activity: "standing facing a whiteboard",
      finals: { a: true, b: false },
      room: "classroom"
    };
    if (extra) {
      Object.keys(extra).forEach(function (key) {
        state[key] = extra[key];
      });
    }
    return state;
  }

  function st(packet) {
    return packet.state;
  }

  var opened = start();
  var wrong = st(phaseB.reduce(opened, { type: "beat6Step", wrong: true }));
  check(opened.beat === 6 && !opened.phaseB, "input state stays untouched");
  check(wrong.beat === 6 && wrong.phaseB.lastNoise === true && wrong.phaseB.sendBack === false, "a wrong step is noise and not a send-back");
  check(wrong.phaseB.whoopeeCount === 3 && wrong.phaseB.whoopees.length === 3, "exactly 3 hidden whoopees");
  check(wrong.phaseBWon !== true && wrong.sessionWon !== true, "a whoopee does not win");

  var spots = [
    { whoopee: true, revealed: false },
    { whoopee: false, revealed: false },
    { whoopee: true, revealed: false },
    { whoopee: false, revealed: false },
    { whoopee: true, revealed: false },
    { whoopee: false, revealed: false }
  ];
  var propped = st(phaseB.reduce(start({
    props: { items: { cushions: { spots: spots } } }
  }), { type: "beat6Step", payload: { kid: "a", cushion: 0 } }));
  check(spots[0].revealed === false, "a step does not rewrite the room props");
  check(propped.phaseB.whoopees.join(",") === "0,2,4" && propped.phaseB.lastNoise === true, "the three prop whoopees are the hidden ones");

  var beat7 = st(phaseB.reduce(wrong, { type: "beat6Step", allOffMailboxSide: true }));
  check(beat7.beat === 7 && beat7.phaseB.mailbox === false && beat7.phaseB.note === "carrier", "beat 6 ends off the path");
  check(beat7.phaseB.whoopeeCount === 3, "ending the path keeps exactly 3 whoopees");

  var dropped = st(phaseB.reduce(beat7, { type: "beat7Pass", dropped: true }));
  check(dropped.beat === 7 && dropped.phaseB.sendBack === false, "a drop stays on beat 7");
  var passed = st(phaseB.reduce(dropped, { type: "beat7Pass", feet: true, dropped: false }));
  check(passed.beat === 8 && passed.phaseB.glassesHolder === "kid-2", "a feet pass reaches the mailbox end");

  var solo = st(phaseB.reduce(start({ kids: 1, beat: 7 }), { type: "beat7Pass", feet: true, dropped: false }));
  check(solo.beat === 7 && solo.phaseB.recorded.indexOf("one-kid-line-pass") !== -1, "one kid cannot do the line pass");

  var drawn = st(phaseB.reduce(passed, { type: "beat8Draw", picture: "hat" }));
  check(drawn.beat === 9 && drawn.phaseB.picture === "hat" && drawn.phaseB.mailbox === false, "a hat ends beat 8");
  var quiet = st(phaseB.reduce(passed, { type: "beat8Draw", quiet: true }));
  check(quiet.beat === 9 && quiet.phaseB.picture == null, "a quiet pause ends beat 8 with no drawing");

  var yelled = st(phaseB.reduce(drawn, {
    type: "beat9Yell",
    voice: "monster",
    phrase: "The broccoli has landed!"
  }));
  check(yelled.beat === 10 && yelled.phaseB.mailbox === false && yelled.phaseB.crawls.length === 0, "the yell ends beat 9 with zero crawls");
  check(yelled.phaseBWon !== true, "the yell does not win phase B");

  var soloCrawl = st(phaseB.reduce(start({ kids: 1, beat: 9 }), {
    type: "beat9Yell",
    voice: "monster",
    phrase: "The broccoli has landed!",
    crawl: true
  }));
  check(soloCrawl.phaseB.recorded.indexOf("one-kid-other-crawl") !== -1, "one kid cannot do the other kids crawl");
  check(soloCrawl.phaseB.crawls.length === 0 && soloCrawl.beat === 10, "the missing crawl is recorded and not replaced");

  var mailed = st(phaseB.reduce(yelled, { type: "beat10Mailbox" }));
  check(mailed.phaseB.mailbox === true && mailed.phaseBWon !== true && mailed.sessionWon !== true, "the mailbox starts the finale and does not win");
  check(mailed.phase === "B" && mailed.beat === 10, "beat 10 stays phase B");

  var noDance = st(phaseB.reduce(mailed, { type: "beat10Spray", target: "desk", gentle: true, dance: false }));
  check(noDance.phaseBWon !== true && noDance.sessionWon !== true && noDance.finals.b !== true, "a spray without the dance does not win");
  check(noDance.beat === 10 && noDance.phaseB.landings.length === 1, "the spray stays where it landed");

  var won = st(phaseB.reduce(noDance, { type: "beat10Spray", target: "desk", gentle: true, dance: true }));
  check(won.phaseBWon === true && won.phase === "B" && won.beat === 10, "beat 10 wins phase B only");
  check(won.sessionWon === true && won.finals.a === true && won.finals.b === true, "the session win still needs the phase A finale");
  check(phaseB.viewModel(won).phaseBWon === true && phaseB.viewModel(won).sessionWon === true, "viewModel agrees");

  var phaseOnly = st(phaseB.reduce(start({
    beat: 10,
    finals: { a: false, b: false },
    phaseB: { mailbox: true, note: "mailbox", whoopees: [0, 2, 4], whoopeeCount: 3 }
  }), { type: "beat10Spray", payload: { target: "shoes", gentle: true, dance: true } }));
  check(phaseOnly.phaseBWon === true && phaseOnly.sessionWon !== true && phaseOnly.phase === "B", "without the blast, beat 10 wins phase B and not the session");

  var skipped = st(phaseB.reduce({ phase: "A", beat: 5, finals: { a: false, b: false }, kids: 2 }, {
    type: "beat10Spray",
    dance: true,
    gentle: true,
    target: "desk"
  }));
  check(skipped.phase === "A" && skipped.phaseBWon !== true && skipped.finals.b !== true, "beat 10 does not skip phase A");

  var early = st(phaseB.reduce(wrong, { type: "beat10Mailbox" }));
  check(early.beat === 6 && early.phaseB.mailbox !== true, "the note does not reach the mailbox early");

  if (failures) {
    console.error(failures + " failed");
    process.exit(1);
  }
  console.log("ok");
}
