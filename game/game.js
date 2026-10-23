/* Classroom party — one session, beats 1–10.
   Kids, teacher, and the desk are colorful classroom cartoons.
   Missing pictures stay labeled placeholders. */

function pose(src, w, h) {
  const frame = { src, frames: 1, fps: 8, w, h, cols: 1 };
  return { idle: frame, walk: frame, dance: frame };
}

const SPRITES = {
  kidA: pose("assets/kids/bookworm-boy.png", 274, 720),
  kidB: pose("assets/kids/bookworm-girl.png", 398, 720)
};

const ART = {
  asleep: "assets/teacher-asleep.png",
  stir: "assets/teacher-stir.png",
  awake: "assets/teacher-awake.png",
  board: "assets/teacher-board.png",
  typing: "assets/teacher-typing.png",
  reading: "assets/teacher-reading.png",
  laugh: "assets/teacher-laugh.png",
  desk: "assets/desk.png",
  shoe: "assets/shoe.png",
  plush: "assets/plush.png",
  mat: "assets/mat.png",
  sticky: "assets/sticky.png",
  mustache: "assets/mustache.png",
  goofy: "assets/goofy.png",
  trophy: "assets/trophy.png",
  doll: "assets/doll.png",
  candy: "assets/candy.png",
  bucket: "assets/bucket.png",
  mailbox: "assets/mailbox.png",
  cushion: "assets/cushion.png",
  flashlight: "assets/flashlight.png",
  sunglasses: "assets/sunglasses.png",
  confetti: "assets/confetti.png",
  laptop: "assets/laptop.png",
  book: "assets/book.png",
  note: "assets/note.png"
};

const LINE = 430;
const BACK = 36;
const PATH_Y = 400;
const DESK_SIDE = 560;
const DESK_X = 760;

const state = {
  screen: "setup",
  beat: 0,
  picks: null,
  samples: {
    pose: "Balancing on one foot with a finger on the nose",
    note: "mustache",
    noteCustom: "",
    yell: "The broccoli has landed!"
  },
  teacher: "asleep",
  laughLeft: 0,
  laughTimer: null,
  kids: {
    a: kid("a", "Kid A", "kidA", 70),
    b: kid("b", "Kid B", "kidB", 180)
  },
  walked: false,
  plushOnMat: false,
  throwOpen: false,
  eyesUsed: false,
  noteOnBack: false,
  linePassed: false,
  claimed: false,
  blastDone: false,
  carrier: "a",
  noteInBox: false,
  glasses: "floor",
  lastFeet: "b",
  drawing: "",
  doodle: "",
  turn: 0,
  cushions: [],
  progress: { a: -1, b: -1 },
  sprayed: false,
  dancedDuring: false,
  stringOn: false,
  log: [],
  noises: []
};

function kid(id, name, who, x) {
  return { id, name, who, x, y: PATH_Y, facing: 1, anim: "idle", frame: 0, acc: 0, moving: false, token: 0, caught: false, statue: false, crawling: false };
}

const $ = (sel) => document.querySelector(sel);

function log(text) {
  state.log.unshift(text);
  state.log = state.log.slice(0, 6);
  const box = $("#log");
  if (box) box.innerHTML = state.log.map((line) => `<div>${line}</div>`).join("");
}

function prizeSrc() {
  if (state.picks.prize === "trophy") return ART.trophy;
  if (state.picks.prize === "toy") return ART.doll;
  return ART.candy;
}

function prizeName() {
  if (state.picks.prize === "trophy") return "a golden trophy";
  if (state.picks.prize === "toy") return "the doll";
  return "a bucket of treats";
}

function activityKey() {
  return state.picks.activity;
}

function teacherSrc() {
  const map = {
    asleep: ART.asleep,
    stirring: ART.stir,
    laughing: ART.laugh,
    awake: ART.awake,
    eyes: ART.awake,
    board: ART.board,
    typing: ART.typing,
    reading: ART.reading,
    turned: ART[activityKey()] || ART.board
  };
  if (state.teacher === "activity" || state.teacher === "string") return ART[activityKey()];
  return map[state.teacher] || ART.asleep;
}

function teacherLabel() {
  const labels = {
    asleep: "Asleep",
    stirring: "Starting to wake",
    laughing: "Laughing",
    awake: "Wakes up",
    eyes: "Eyes open",
    board: "Facing the whiteboard",
    typing: "Typing",
    reading: "Reading",
    activity: activityName(),
    turned: "Investigating",
    string: activityName()
  };
  return labels[state.teacher] || state.teacher;
}

function activityName() {
  return { board: "Facing the whiteboard", typing: "Typing on the computer", reading: "Reading a big book" }[state.picks.activity];
}

function mountSetup() {
  $("#app").innerHTML = `
    <article class="setup">
      <p class="tag">RECOMMENDATION · The teacher is the host. Two kids share one role. Lock the five picks before Phase A.</p>
      <h1>Classroom party</h1>
      <p>One room. One session. Phase A is beats 1–5. Phase B is beats 6–10. There is no score. The session is won only after both finales.</p>
      <div class="grid">
        <fieldset>
          <legend>Prize type</legend>
          ${choice("prize", "trophy", "A golden trophy", ART.trophy, true)}
          ${choice("prize", "toy", "A toy — the doll", ART.doll)}
          ${choice("prize", "treats", "A bucket of treats", ART.bucket)}
        </fieldset>
        <fieldset>
          <legend>Shoe noisemaker</legend>
          ${choice("noise", "toy", "A squeaky dog toy", "", true, true)}
          ${choice("noise", "wrap", "Bubble wrap", "", false, true)}
        </fieldset>
        <fieldset>
          <legend>Victory effect</legend>
          ${choice("blast", "popper", "Pop a safe party popper", "", true, true)}
          ${choice("blast", "confetti", "A handful of paper confetti", ART.confetti)}
        </fieldset>
        <fieldset>
          <legend>Strict-teacher activity</legend>
          ${choice("activity", "board", "Facing the whiteboard", ART.board, true)}
          ${choice("activity", "typing", "Typing on a computer", ART.typing)}
          ${choice("activity", "reading", "Reading a big book", ART.book)}
        </fieldset>
        <fieldset>
          <legend>Silly-string target</legend>
          ${choice("string", "desk", "The teacher’s desk", ART.desk, true)}
          ${choice("string", "shoes", "The teacher’s shoes", ART.shoe)}
        </fieldset>
        <fieldset class="samples">
          <legend>Samples · name a replacement once, before the beat</legend>
          <label>Statue pose, eyes open
            <input id="pose" type="text" value="${state.samples.pose}">
          </label>
          <label class="choice"><input type="radio" name="noteArt" value="mustache" checked> Mustache on the sticky note</label>
          <label class="choice"><input type="radio" name="noteArt" value="goofy"> A goofy face on the sticky note</label>
          <label>Or name a different drawing
            <input id="noteCustom" type="text" placeholder="Leave blank to use the picture above">
          </label>
          <label>Monster yell
            <input id="yell" type="text" value="${state.samples.yell}">
          </label>
        </fieldset>
      </div>
      <p><button class="primary" id="lock" type="button">Lock the five picks and set the room</button></p>
      <p class="tag">The room uses colorful classroom cartoons from the Image library. A dashed label is a prop that library does not have.</p>
    </article>`;
  $("#lock").onclick = lockPicks;
}

function choice(name, value, label, src, checked, placeholder) {
  const art = placeholder
    ? `<span class="placeholder pick-art">${label.split(" ").slice(-2).join(" ")}</span>`
    : `<img class="pick-art" alt="" src="${src}">`;
  return `<label class="choice">${art}<input type="radio" name="${name}" value="${value}" ${checked ? "checked" : ""}> ${label}</label>`;
}

function lockPicks() {
  const val = (name) => document.querySelector(`input[name="${name}"]:checked`).value;
  state.picks = {
    prize: val("prize"),
    noise: val("noise"),
    blast: val("blast"),
    activity: val("activity"),
    string: val("string")
  };
  state.samples.pose = $("#pose").value.trim() || state.samples.pose;
  state.samples.note = val("noteArt");
  state.samples.noteCustom = $("#noteCustom").value.trim();
  state.samples.yell = $("#yell").value.trim() || state.samples.yell;
  state.screen = "play";
  state.beat = 1;
  state.teacher = "asleep";
  mountPlay();
  log("The five picks are locked. The teacher is asleep at the desk. The kids are at the back.");
}

function mountPlay() {
  $("#app").innerHTML = `
    <header class="top">
      <div>
        <h1>Classroom party</h1>
        <p id="phaseLine"></p>
      </div>
      <div class="beats" id="beatDots"></div>
    </header>
    <div class="layout">
      <div class="stage" id="stage">
        <div class="whiteboard" id="board"><span>Whiteboard<small>the one board</small></span></div>
        <div class="shadow-spot" id="shadow"></div>
        <div class="back-cluster" id="cluster"></div>
        <div class="desk-wrap">
          <img class="desk" alt="Teacher’s desk" src="${ART.desk}">
          <img class="on-desk prize" id="prize" alt="" src="${prizeSrc()}">
          <img class="on-desk laptop" alt="Computer" src="${ART.laptop}">
          <img class="on-desk book" alt="Big book" src="${ART.book}">
          <img class="teacher" id="teacher" alt="Teacher" src="${ART.asleep}">
          <img id="onBack" class="on-back" alt="Sticky note on the teacher’s back" src="${ART.mustache}">
          <img class="shoe" id="shoes" alt="Teacher’s shoes" src="${ART.shoe}">
        </div>
        <div class="mat" id="mat"><img alt="Shield mat" src="${ART.mat}"><div class="zone-label">Shield mat</div><img id="plushOnMat" alt="" src="${ART.plush}" style="display:none;width:54px;position:absolute;left:30px;top:8px"></div>
        <div class="open-path"></div>
        <div class="checkpoint" style="left:${LINE}px"><span>Checkpoint line</span></div>
        <div class="side-path"></div>
        <div class="cushion-row" id="cushions"></div>
        <div class="mailbox"><img alt="Mailbox" src="${ART.mailbox}"><img class="note-in" id="noteIn" alt="" src="${ART.note}"></div>
        <div class="zone-label" style="left:16px;top:478px">Back · kids start</div>
        <div class="zone-label" style="right:24px;top:478px">Front · desk</div>
        <div id="kid-a" class="kid"></div>
        <div id="kid-b" class="kid"></div>
        <img class="confetti-blast" id="confetti" alt="Paper confetti" src="${ART.confetti}">
        <div class="popper-blast placeholder" id="popper">Party popper</div>
        <div class="string-hit" id="stringHit">Silly string</div>
        <div class="laugh-count" id="laughCount"></div>
        <div class="win" id="win"><div><h2>The session is won</h2><p>The confetti victory blast ended Phase A. The silly string finale ended Phase B. Both finales have happened. Play stops.</p></div></div>
      </div>
      <aside class="panel">
        <div class="state-pill" id="teacherPill"></div>
        <h2 id="beatTitle"></h2>
        <div class="rules" id="rules"></div>
        <div class="actions" id="actions"></div>
        <div class="log" id="log"></div>
      </aside>
    </div>
    <footer class="credits">Kid A and Kid B are the bookworm cartoons. The teacher, desk, book, and trophy are classroom cartoons from the Image library. Dashed tokens are props that library does not contain. Licences are unverified.</footer>`;
  buildKids();
  buildCushions();
  sync();
}

function buildKids() {
  for (const id of ["a", "b"]) {
    const k = state.kids[id];
    $(`#kid-${id}`).innerHTML = `<div class="pose"></div><div class="sprite"></div><div class="name">${k.name}</div><div class="underfoot"></div>`;
  }
}

function buildCushions() {
  const order = [0, 1, 2, 3, 4, 5];
  for (let i = order.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  const hidden = new Set(order.slice(0, 3));
  state.cushions = Array.from({ length: 6 }, (_, i) => ({ whoopee: hidden.has(i), revealed: false }));
  $("#cushions").innerHTML = state.cushions.map((_, i) => `
    <button class="cushion" type="button" data-cushion="${i}" disabled>
      <img alt="Cushion ${i + 1}" src="${ART.cushion}">
      <span class="whoopee-tag placeholder">Whoopee</span>
    </button>`).join("");
}

function token(src, alt, placeholderText) {
  if (placeholderText) return `<span class="placeholder" title="${alt}">${placeholderText}</span>`;
  return `<img class="token" alt="${alt}" src="${src}">`;
}

function syncCluster() {
  const b = state.beat;
  const bits = [];
  if (b < 2) bits.push(token(ART.plush, "Soft plush"));
  if (b < 4) bits.push(token(ART.sticky, "Sticky note"));
  if (b === 1) bits.push(state.picks.noise === "toy" ? token("", "Squeaky dog toy", "Squeaky toy") : token("", "Bubble wrap", "Bubble wrap"));
  if (b < 5) bits.push(state.picks.blast === "popper" ? token("", "Party popper", "Popper") : token(ART.confetti, "Confetti"));
  if (b >= 1 && b < 10 && !state.noteInBox) bits.push(token(ART.note, "Secret note"));
  if (state.glasses !== "a") bits.push(token(ART.sunglasses, "Clown sunglasses"));
  if (!state.doodle) bits.push(token(ART.flashlight, "Flashlight"));
  bits.push(token("", "Silly string", "Silly string"));
  $("#cluster").innerHTML = bits.join("");
}

function syncKids() {
  for (const id of ["a", "b"]) {
    const k = state.kids[id];
    const el = $(`#kid-${id}`);
    const sheet = SPRITES[k.who][k.anim] || SPRITES[k.who].idle;
    const scale = 0.26;
    const dw = sheet.w * scale;
    const dh = sheet.h * scale;
    el.style.left = `${k.x}px`;
    el.style.top = `${k.y + 58 - dh - (k.crawling ? 26 : 0)}px`;
    el.style.width = `${dw}px`;
    el.style.height = `${dh}px`;
    el.classList.toggle("statue", k.statue);
    el.classList.toggle("walk", k.anim === "walk");
    el.classList.toggle("dance", k.anim === "dance");
    const sprite = el.querySelector(".sprite");
    sprite.style.height = `${dh}px`;
    sprite.style.backgroundImage = `url("${sheet.src}")`;
    sprite.style.backgroundSize = `${dw}px ${dh}px`;
    sprite.style.backgroundPosition = "center bottom";
    el.querySelector(".pose").textContent = k.statue ? state.samples.pose : "";
    const tags = [];
    if (k.statue) tags.push("statue");
    if (state.beat >= 6 && state.carrier === id && !state.noteInBox) tags.push("note");
    if (state.glasses === id) tags.push("sunglasses");
    if (state.claimed && id === "a") tags.push("prize");
    el.querySelector(".name").textContent = tags.length ? `${k.name} · ${tags.join(" · ")}` : k.name;
    const foot = el.querySelector(".underfoot");
    if (state.beat === 1 && !state.walked) {
      foot.innerHTML = state.picks.noise === "toy"
        ? `<span class="placeholder">Squeak</span>`
        : `<span class="placeholder">Pop</span>`;
    } else foot.innerHTML = "";
  }
}

function syncTeacher() {
  const img = $("#teacher");
  img.src = teacherSrc();
  img.className = "teacher";
  if (state.teacher === "stirring") img.classList.add("stir");
  if (state.teacher === "laughing") img.classList.add("laugh");
  if (state.teacher === "turned") img.classList.add("turned");
  $("#teacherPill").textContent = `Teacher · ${teacherLabel()}`;
  $("#laughCount").classList.toggle("on", state.teacher === "laughing");
  $("#laughCount").textContent = state.teacher === "laughing" ? `Laughing · ${state.laughLeft}s · kids may move` : "";
  const onBack = $("#onBack");
  if (state.noteOnBack) {
    onBack.style.display = "block";
    if (state.samples.noteCustom) {
      onBack.removeAttribute("src");
      onBack.style.display = "none";
    } else onBack.src = state.samples.note === "goofy" ? ART.goofy : ART.mustache;
  } else onBack.style.display = "none";
  $("#plushOnMat").style.display = state.plushOnMat ? "block" : "none";
  $("#prize").style.visibility = state.claimed ? "hidden" : "visible";
  $("#confetti").classList.toggle("on", state.blastDone && state.picks.blast === "confetti");
  $("#popper").classList.toggle("on", state.blastDone && state.picks.blast === "popper");
  $("#stringHit").className = `string-hit${state.stringOn ? " on " + state.picks.string : ""}`;
  $("#noteIn").classList.toggle("on", state.noteInBox);
  $("#shoes").style.outline = state.stringOn && state.picks.string === "shoes" ? "3px dashed #c43b8c" : "";
  const shadow = $("#shadow");
  const facingBoard = state.teacher === "board" || ((state.teacher === "activity" || state.teacher === "string") && state.picks.activity === "board");
  shadow.classList.toggle("show", state.beat >= 8 && (facingBoard || Boolean(state.doodle)));
  if (state.doodle === "hat") shadow.innerHTML = `<div class="draw-hat"></div>`;
  else if (state.doodle === "ears") shadow.innerHTML = `<div class="draw-ears"><i></i><i></i></div>`;
  else shadow.innerHTML = "";
}

function syncCushions() {
  document.querySelectorAll(".cushion").forEach((btn, i) => {
    const c = state.cushions[i];
    btn.classList.toggle("revealed", c.revealed);
    btn.disabled = state.beat !== 6;
  });
}

function syncChrome() {
  const titles = {
    1: "Beat 1 — The Squeaky Toy Shoes",
    2: "Beat 2 — The Feather Tickle Trigger",
    3: "Beat 3 — The Copycat Pose",
    4: "Beat 4 — The Sticky Note Sabotage",
    5: "Beat 5 — The Confetti Victory Blast",
    6: "Beat 6 — The Whoopee Cushion Pathway",
    7: "Beat 7 — The Reverse Homework Trick",
    8: "Beat 8 — The Doodle Attack",
    9: "Beat 9 — The Monster Talk Distraction",
    10: "Beat 10 — The Silly String Finale"
  };
  $("#phaseLine").textContent = state.beat <= 5 ? "Phase A · sneak for the prize" : "Phase B · deliver the secret note";
  $("#beatTitle").textContent = titles[state.beat] || "";
  $("#beatDots").innerHTML = Array.from({ length: 10 }, (_, i) => {
    const n = i + 1;
    const cls = n === state.beat ? "on" : n < state.beat ? "done" : "";
    return `<span class="${cls}">${n}</span>`;
  }).join("");
  $("#rules").innerHTML = rulesFor(state.beat);
  $("#actions").innerHTML = "";
  $("#actions").append(...buttonsFor(state.beat));
  $("#win").classList.toggle("on", state.screen === "won");
}

function btn(label, act, className, disabled) {
  const b = document.createElement("button");
  b.type = "button";
  b.textContent = label;
  b.dataset.act = act;
  if (className) b.className = className;
  b.disabled = Boolean(disabled);
  b.onclick = () => run(act);
  return b;
}

function rulesFor(beat) {
  const pose = state.samples.pose;
  const yell = state.samples.yell;
  const noise = state.picks.noise === "toy" ? "the squeaky dog toy" : "the bubble wrap";
  const blast = state.picks.blast === "popper" ? "pop the party popper at the desk" : "throw the confetti over the teacher’s head";
  const target = state.picks.string === "desk" ? "the teacher’s desk" : "the teacher’s shoes";
  const blocks = {
    1: `<p><strong>REQUIREMENT.</strong> The kids walk from the back with ${noise} under their feet. Silent sneaking is impossible. Finishing the walk does not claim the prize.</p><p><strong>RECOMMENDATION.</strong> The walk ends on the back side of the checkpoint line. Then the objects come out from under the feet. If the teacher wakes up, every kid freezes until the teacher is asleep again.</p>`,
    2: `<p><strong>REQUIREMENT.</strong> If the teacher starts to wake, a kid can throw the soft plush onto the mat. A plush on the mat forces a 5-second laugh, and the kids may move for those 5 seconds.</p><p><strong>DESIGN-DECISION.</strong> “Starts to wake” is only this beat. During the laugh the kids may move. Outside a laugh, a wake freezes them.</p><p><strong>RECOMMENDATION.</strong> A miss can be thrown again during the stir. If the teacher never starts to wake, one quiet pause ends the beat. Nobody takes steps back.</p>`,
    3: `<p><strong>REQUIREMENT.</strong> The teacher opens their eyes. Anyone caught moving freezes and imitates a statue. If a kid who was caught moving laughs, that kid takes three steps back. This is the only send-back.</p><p><strong>DESIGN-DECISION.</strong> Eyes open is separate from “starts to wake” and from “wakes up.”</p><p><strong>RECOMMENDATION.</strong> The statue is: ${pose}. A kid who was already still is not caught. A laugh during the 5-second window is not this laugh.</p>`,
    4: `<p><strong>REQUIREMENT.</strong> Passing the line takes one kid sneaking to the teacher, a sticky note on the teacher’s back, and the teacher not noticing. The pass counts when the note is on the back and the teacher has not noticed it.</p><p><strong>RECOMMENDATION.</strong> That one note lets the whole group cross. If the teacher notices, the kids stay where they are and a kid may try again. Nobody takes steps back.</p>`,
    5: `<p><strong>REQUIREMENT.</strong> A kid who reaches the desk without getting caught claims ${prizeName()} and does the blast: ${blast}. Phase A ends when that kid claims the prize with the blast. The session stays open.</p><p><strong>RECOMMENDATION.</strong> On this approach, caught means eyes open while that kid is moving, before the claim. A wake pose pauses everyone until the teacher is asleep. Nobody takes steps back for a miss.</p>`,
    6: `<p><strong>REQUIREMENT.</strong> The kids guess which cushions are safe. A wrong step makes a loud noise. The noise is the result. It is not a send-back.</p><p><strong>RECOMMENDATION.</strong> The beat ends when every kid has stepped off the path onto the floor on the mailbox side. The teacher stays in the chosen activity. The note stays with the carrier.</p>`,
    7: `<p><strong>REQUIREMENT.</strong> The kids pass the giant clown sunglasses down the line, using only their feet, without dropping them.</p><p><strong>RECOMMENDATION.</strong> Hands stay off the pair. If the pair drops, or a pass uses something other than a foot, it goes back to the feet of the last kid who held it with their feet.</p>`,
    8: `<p><strong>DESIGN-DECISION.</strong> The board is the whiteboard. ${state.picks.activity === "board" ? "The teacher is already facing it, so the doodle window opens when they turn away and then turn back." : "The teacher is not facing it, so the window opens when they turn to face the whiteboard."}</p><p><strong>REQUIREMENT.</strong> The kids race to the teacher’s shadow and draw with the flashlight. The drawing is a hat, or giant ears.</p><p><strong>RECOMMENDATION.</strong> If the teacher never makes the turn, one quiet pause ends the beat with no drawing.</p>`,
    9: `<p><strong>REQUIREMENT.</strong> One kid yells a phrase in a deep monster voice. On that yell, the teacher turns to investigate. While the teacher is turned, the other kids can crawl forward.</p><p><strong>RECOMMENDATION.</strong> The yell is “${yell}”. Zero crawls still ends the beat. The note stays with the carrier. The mailbox stays empty.</p>`,
    10: `<p><strong>REQUIREMENT.</strong> The finale starts once the secret note reaches the mailbox. The kids gently spray silly string on ${target}, and they do a victory dance while they spray.</p><p><strong>DESIGN-DECISION.</strong> Beat 10 wins Phase B. The session is won only after both finales.</p><p><strong>RECOMMENDATION.</strong> The carrier puts the note in now. If the spray misses, or the dance does not happen during it, they spray that target once more and dance while that spray happens.</p>`
  };
  return blocks[beat] || "";
}

function anyMoving() {
  return state.kids.a.moving || state.kids.b.moving;
}

function buttonsFor(beat) {
  const frozen = state.teacher === "awake" || state.teacher === "eyes";
  const laughing = state.teacher === "laughing";
  const list = [];
  if (beat === 1) {
    list.push(btn("Step forward with the noisemaker", "b1-step", "primary", frozen || laughing || state.walked));
    list.push(btn("Host: Wakes up", "wake", "host", state.teacher !== "asleep"));
    list.push(btn("Host: Asleep", "sleep", "host", state.teacher !== "awake"));
    list.push(btn("Take the noisemakers out", "b1-end", "", !state.walked));
  }
  if (beat === 2) {
    list.push(btn("Host: Starts to wake", "stir", "host", state.teacher !== "asleep"));
    list.push(btn("Throw the plush onto the mat", "throw-hit", "primary", !state.throwOpen || state.plushOnMat));
    list.push(btn("Throw a miss", "throw-miss", "", !state.throwOpen || state.plushOnMat));
    list.push(btn("Host: Wakes up fully", "wake-full", "host", state.teacher !== "stirring" || state.plushOnMat));
    list.push(btn("Host: Asleep", "sleep", "host", state.teacher !== "awake"));
    list.push(btn("Quiet pause — end with no throw", "b2-quiet", "", state.teacher !== "asleep" || state.plushOnMat));
    if (laughing) list.push(btn("Move along the back", "b2-move", "primary"));
  }
  if (beat === 3) {
    list.push(btn("Kid A fidgets", "fidget-a", "", state.eyesUsed));
    list.push(btn("Kid B fidgets", "fidget-b", "", state.eyesUsed));
    list.push(btn("Both hold still", "still", "", state.eyesUsed));
    list.push(btn("Host: Eyes open", "eyes", "host primary", state.eyesUsed || state.teacher !== "asleep"));
    if (state.kids.a.caught && !state.kids.a.didSteps) list.push(btn("Kid A laughs", "laugh-a", "warn"));
    if (state.kids.b.caught && !state.kids.b.didSteps) list.push(btn("Kid B laughs", "laugh-b", "warn"));
    list.push(btn("Eyes close. Beat 3 ends", "b3-end", "", !state.eyesUsed || state.kids.a.stepping || state.kids.b.stepping));
  }
  if (beat === 4) {
    list.push(btn("Kid B sneaks the note to the teacher", "b4-sneak", "primary", state.noteOnBack || state.kids.b.moving));
    list.push(btn("The teacher does not notice", "b4-ok", "", !state.kids.b.atTeacher || state.noteOnBack));
    list.push(btn("The teacher notices this note", "b4-notice", "warn", !state.kids.b.atTeacher || state.noteOnBack));
  }
  if (beat === 5) {
    list.push(btn("Kid A sneaks to the desk", "b5-sneak", "primary", state.claimed || state.kids.a.moving || state.kids.a.atDesk || state.teacher === "awake" || state.teacher === "eyes"));
    list.push(btn("Host: Wakes up", "wake", "host", state.teacher !== "asleep" || state.claimed));
    list.push(btn("Host: Eyes open", "eyes-5", "host", state.teacher !== "asleep" || state.claimed));
    list.push(btn("Host: Asleep", "sleep", "host", state.teacher !== "awake" && state.teacher !== "eyes"));
    list.push(btn("Claim the prize and do the blast", "b5-claim", "primary", !state.kids.a.atDesk || state.claimed || state.kids.a.moving || state.teacher === "awake" || state.kids.a.caughtThisApproach));
  }
  if (beat === 5 && state.claimed) list.push(btn("Teacher stands. Kids walk to the back", "join", "primary"));
  if (beat === 6) {
    list.push(btn("Step Kid A", "step-a", "primary"));
    list.push(btn("Step Kid B", "step-b", ""));
  }
  if (beat === 7) {
    list.push(btn("Pass the sunglasses with a foot", "pass-foot", "primary", state.glasses === "a"));
    list.push(btn("Drop the sunglasses", "pass-drop", "warn", state.glasses === "a"));
    list.push(btn("Pass with a hand", "pass-hand", "warn", state.glasses === "a"));
  }
  if (beat === 8) {
    if (!state.drawing) {
      list.push(btn("Name the drawing: a hat", "draw-hat", "primary"));
      list.push(btn("Name the drawing: giant ears", "draw-ears", ""));
    }
    if (state.picks.activity === "board") {
      list.push(btn("Teacher turns away from the whiteboard", "turn-away", "host", state.turn !== 0));
      list.push(btn("Teacher turns back", "turn-back", "host", state.turn !== 1));
    } else {
      list.push(btn("Teacher turns to face the whiteboard", "turn-face", "host primary", state.turn !== 0));
    }
    list.push(btn("Race to the shadow and draw", "doodle", "primary", !canDoodle()));
    list.push(btn("Quiet pause — no turn, no drawing", "b8-quiet", "", state.doodle));
  }
  if (beat === 9) {
    list.push(btn("Kid B yells", "yell", "primary", state.yelled));
    list.push(btn("Kid A crawls toward the mailbox", "crawl", "", state.teacher !== "turned"));
    list.push(btn("Teacher turns back", "turn-return", "host", state.teacher !== "turned"));
  }
  if (beat === 10) {
    list.push(btn("Put the secret note in the mailbox", "mailbox", "primary", state.noteInBox));
    list.push(btn("Spray the target and dance", "spray-dance", "primary", !state.noteInBox || state.sprayed));
    list.push(btn("Spray and forget to dance", "spray-miss", "warn", !state.noteInBox || state.sprayed));
  }
  return list;
}

function canDoodle() {
  if (!state.drawing || state.doodle) return false;
  if (state.picks.activity === "board") return state.turn === 2;
  return state.turn === 1;
}

function run(act) {
  const A = state.kids.a;
  const B = state.kids.b;
  if (act === "b1-step") {
    if (state.teacher !== "asleep" || A.moving || B.moving) return;
    const next = Math.max(A.x, B.x) + 70;
    if (next >= LINE - 70) {
      state.walked = true;
      log("They are still on the back side of the line. The walk can end.");
      sync();
      return;
    }
    tween(A, A.x + 70, PATH_Y, "walk", 500);
    tween(B, B.x + 70, PATH_Y, "walk", 500);
    burst(A.x, PATH_Y, state.picks.noise === "toy" ? "SQUEAK!" : "POP!");
    log(state.picks.noise === "toy" ? "The squeaky toy sounds under their feet." : "The bubble wrap pops under their feet.");
  }
  if (act === "b1-end") {
    state.walked = true;
    A.anim = "idle"; B.anim = "idle";
    go(2);
    log("The noisemakers come out from under the feet. Beat 2 starts. Nobody takes steps back.");
  }
  if (act === "wake") {
    if (state.teacher === "laughing") return;
    state.teacher = "awake";
    A.moving = false; B.moving = false;
    A.anim = "idle"; B.anim = "idle";
    log("The teacher wakes up. Every kid freezes in a still pose. It lasts until the teacher is asleep.");
  }
  if (act === "sleep") {
    state.teacher = "asleep";
    if (state.beat === 2 && state.beat2Closed) {
      go(3);
      log("The throw window had closed. The teacher is asleep. Beat 3 starts from where the kids are.");
      return;
    }
    log("The teacher is asleep again. The beat continues.");
  }
  if (act === "stir") {
    state.teacher = "stirring";
    state.throwOpen = true;
    log("The teacher starts to wake, eyes closed. This is the throw window. Nobody freezes.");
  }
  if (act === "throw-hit") {
    state.plushOnMat = true;
    state.throwOpen = false;
    startLaugh();
    log("The plush lands on the mat. The teacher laughs for 5 seconds. The kids may move. The prize stays unclaimed.");
  }
  if (act === "throw-miss") {
    log("The throw misses the mat. The laugh does not start. During this same stir, a kid may throw again.");
  }
  if (act === "wake-full") {
    state.teacher = "awake";
    state.throwOpen = false;
    state.beat2Closed = true;
    A.anim = "idle"; B.anim = "idle";
    log("The teacher wakes fully before the plush is on the mat. The throw window closes. The kids freeze. No laugh.");
  }
  if (act === "b2-quiet") {
    go(3);
    log("The teacher never started to wake. One quiet pause ends the beat with no throw and no laugh.");
  }
  if (act === "b2-move") {
    if (state.teacher !== "laughing") return;
    const nx = Math.min(LINE - 90, A.x + 40);
    tween(A, nx, PATH_Y, "walk", 350);
    tween(B, Math.min(LINE - 40, B.x + 40), PATH_Y, "walk", 350);
    log("The kids move during the laugh. They stay on the back side of the line.");
  }
  if (act === "fidget-a") { A.moving = true; A.anim = "walk"; B.moving = false; B.anim = "idle"; log("Kid A is moving. Kid B is still."); }
  if (act === "fidget-b") { B.moving = true; B.anim = "walk"; A.moving = false; A.anim = "idle"; log("Kid B is moving. Kid A is still."); }
  if (act === "still") { A.moving = false; B.moving = false; A.anim = "idle"; B.anim = "idle"; log("Both kids hold still."); }
  if (act === "eyes") {
    state.eyesUsed = true;
    state.teacher = "eyes";
    for (const k of [A, B]) {
      if (k.moving) {
        k.caught = true;
        k.statue = true;
        k.moving = false;
        k.anim = "idle";
        log(`${k.name} was caught moving and freezes into the statue.`);
      } else {
        log(`${k.name} was already still and is not caught.`);
      }
    }
  }
  if (act === "laugh-a") doLaugh(A);
  if (act === "laugh-b") doLaugh(B);
  if (act === "b3-end") {
    state.teacher = "asleep";
    A.statue = false; B.statue = false;
    go(4);
    log("The eyes have opened once. The teacher is asleep again. Beat 4 starts.");
  }
  if (act === "b4-sneak") {
    tween(B, 690, PATH_Y, "walk", 900, () => { B.atTeacher = true; sync(); });
    log("Kid B sneaks toward the teacher. The other kid stays on the back side.");
  }
  if (act === "b4-ok") {
    state.noteOnBack = true;
    state.linePassed = true;
    A.x = DESK_SIDE; B.x = DESK_SIDE + 80; A.y = PATH_Y; B.y = PATH_Y;
    go(5);
    log("The note is on the teacher’s back and the teacher has not noticed it. The whole group crosses. Beat 5 starts.");
  }
  if (act === "b4-notice") {
    log("The teacher notices that note. It does not pass the line. The kids stay where they are. A kid may try again.");
  }
  if (act === "b5-sneak") {
    if (state.teacher === "awake" || state.teacher === "eyes") return;
    A.atDesk = false;
    A.caughtThisApproach = false;
    tween(A, DESK_X, PATH_Y, "walk", 1400, () => {
      if (!A.caughtThisApproach) { A.atDesk = true; log("Kid A reaches the desk."); sync(); }
    });
    log("Kid A moves toward the desk. Eyes open while this kid is moving is a catch, before the claim.");
  }
  if (act === "eyes-5") {
    if (A.moving) {
      state.teacher = "eyes";
      A.token += 1;
      A.moving = false;
      A.anim = "idle";
      A.caughtThisApproach = true;
      A.atDesk = false;
      log("Eyes open catch Kid A moving. The prize stays on the desk. The blast stays unused. Nobody takes steps back.");
    } else {
      log("Kid A was not moving. Eyes open does not catch them. The prize is still unclaimed.");
    }
  }
  if (act === "b5-claim") {
    state.claimed = true;
    state.blastDone = true;
    A.anim = state.picks.blast === "confetti" ? "dance" : "idle";
    burst(DESK_X, 300, state.picks.blast === "popper" ? "POP!" : "CONFETTI!");
    log(state.picks.blast === "popper"
      ? "Kid A claims the prize and pops the party popper at the desk. Phase A ends. The session is still open."
      : "Kid A claims the prize and throws the confetti over the teacher’s head. Phase A ends. The session is still open.");
    sync();
    return;
  }
  if (act === "join") {
    state.teacher = "activity";
    A.anim = "walk"; B.anim = "walk";
    tween(A, 80, PATH_Y, "walk", 1000);
    tween(B, 190, PATH_Y, "walk", 1000, () => {
      state.glasses = "b";
      state.lastFeet = "b";
      go(6);
      log("The kids are at the back. The teacher is standing in the chosen activity. Kid A carries the secret note. Beat 6 starts.");
    });
    log("The teacher stands and becomes the strict teacher. The kids walk the open path to the back. No freeze and no send-back.");
    return;
  }
  if (act === "step-a") stepKid("a");
  if (act === "step-b") stepKid("b");
  if (act === "pass-foot") {
    state.glasses = "a";
    state.lastFeet = "a";
    go(8);
    log("Kid A, at the mailbox end, has the sunglasses. Every pass was made with feet. Beat 8 starts. The note is still with Kid A.");
    return;
  }
  if (act === "pass-drop" || act === "pass-hand") {
    state.glasses = state.lastFeet;
    log(act === "pass-drop"
      ? "The sunglasses drop. They go back to the feet of the last kid who held them with their feet."
      : "That pass did not use a foot. The sunglasses go back to the last kid who held them with their feet.");
  }
  if (act === "draw-hat") { state.drawing = "hat"; log("The kids name a hat, before the flashlight touches the shadow."); }
  if (act === "draw-ears") { state.drawing = "ears"; log("The kids name giant ears, before the flashlight touches the shadow."); }
  if (act === "turn-away") { state.turn = 1; state.teacher = "turned"; log("The teacher turns away from the whiteboard. The doodle window is not open yet."); }
  if (act === "turn-back") { state.turn = 2; state.teacher = "board"; log("The teacher turns back to the whiteboard. The doodle window is open."); }
  if (act === "turn-face") { state.turn = 1; state.teacher = "board"; log("The teacher turns to face the whiteboard. The doodle window is open."); }
  if (act === "doodle") {
    tween(A, 620, 300, "walk", 700);
    tween(B, 700, 300, "walk", 700, () => {
      state.doodle = state.drawing;
      log(`The drawing — ${state.drawing === "hat" ? "a hat" : "giant ears"} — is on the shadow. Beat 9 starts. The note is still with Kid A.`);
      go(9);
    });
    log("The kids race to the shadow. Kid B draws with the flashlight.");
    return;
  }
  if (act === "b8-quiet") {
    go(9);
    log("The teacher never makes the turn. One quiet pause ends the beat with no drawing. Beat 9 starts.");
    return;
  }
  if (act === "yell") {
    state.yelled = true;
    state.teacher = "turned";
    burst(B.x, B.y - 20, state.samples.yell);
    log(`Kid B yells “${state.samples.yell}” in a deep monster voice. The teacher turns to investigate.`);
  }
  if (act === "crawl") {
    A.crawling = true;
    tween(A, Math.min(640, A.x + 160), 470, "walk", 800, () => { A.crawling = true; A.anim = "idle"; });
    log("Kid A, the carrier, crawls toward the mailbox with the note. The crawl is allowed. It is not required.");
  }
  if (act === "turn-return") {
    state.teacher = "activity";
    go(10);
    log("The teacher turns back. The mailbox is still empty. The note is still with Kid A. Beat 10 starts. Nobody takes steps back.");
    return;
  }
  if (act === "mailbox") {
    state.noteInBox = true;
    log("The carrier puts the note into the mailbox. That starts the finale. It does not, by itself, win the phase.");
  }
  if (act === "spray-dance") {
    state.sprayed = true;
    state.stringOn = true;
    state.teacher = "string";
    A.anim = "dance"; B.anim = "dance";
    state.screen = "won";
    log("The spray is on the one target, and the kids dance while they spray. Phase B is won. The session is won.");
  }
  if (act === "spray-miss") {
    log("The dance did not happen during the spray. Spray that target once more, and dance while that spray happens.");
  }
  sync();
}

function doLaugh(k) {
  if (!k.caught || state.beat !== 3 || k.didSteps) return;
  k.didSteps = true;
  k.stepping = true;
  let left = 3;
  const step = () => {
    left -= 1;
    const atWall = k.x <= BACK + 8;
    if (!atWall) k.x = Math.max(BACK, k.x - 48);
    k.facing = -1;
    k.anim = "walk";
    burst(k.x, k.y, atWall ? "step in place" : "step back");
    if (left > 0) setTimeout(step, 280);
    else {
      k.anim = "idle";
      k.facing = 1;
      k.stepping = false;
      log(`${k.name} laughed and took three steps back. The session continues from that spot.`);
      sync();
    }
  };
  log(`${k.name} was caught moving, and laughs. Three steps back.`);
  step();
}

function startLaugh() {
  state.teacher = "laughing";
  state.laughLeft = 5;
  clearInterval(state.laughTimer);
  state.laughTimer = setInterval(() => {
    state.laughLeft -= 1;
    if (state.laughLeft <= 0) {
      clearInterval(state.laughTimer);
      state.teacher = "asleep";
      go(3);
      log("The 5 seconds end. The teacher is asleep again, still guarding the prize. Beat 3 starts. Nobody takes steps back.");
    }
    sync();
  }, 1000);
}

function stepKid(id) {
  const k = state.kids[id];
  const next = k.cushionIndex == null ? 0 : k.cushionIndex + 1;
  if (next >= state.cushions.length) {
    k.offPath = true;
    k.x = 470 + (id === "a" ? 0 : 70);
    k.y = 520;
    k.anim = "idle";
    log(`${k.name} steps off the cushion path onto the floor on the mailbox side.`);
    if (state.kids.a.offPath && state.kids.b.offPath) {
      state.kids.b.x = 280;
      state.kids.a.x = 390;
      state.kids.a.y = 520;
      state.kids.b.y = 520;
      state.glasses = "b";
      state.lastFeet = "b";
      go(7);
      log("Every kid is off the path. The note is still with Kid A. The mailbox is still empty. Beat 7 starts.");
    }
    sync();
    return;
  }
  const c = state.cushions[next];
  k.cushionIndex = next;
  k.x = 16 + next * 72;
  k.y = 500;
  k.anim = "walk";
  if (c.whoopee && !c.revealed) {
    c.revealed = true;
    burst(k.x, k.y, "HONK!");
    log(`${k.name} steps on a whoopee cushion. A loud noise. ${k.name} stays on it and may step onward. It is not a send-back.`);
  } else {
    log(`${k.name} takes a quiet step. The teacher stays in the activity. The note stays with Kid A.`);
  }
  setTimeout(() => { k.anim = "idle"; sync(); }, 280);
}

function tween(k, toX, toY, anim, ms, done) {
  k.token += 1;
  const token = k.token;
  const fromX = k.x;
  const fromY = k.y;
  const t0 = performance.now();
  let paused = 0;
  let pauseStarted = 0;
  k.anim = anim;
  k.moving = true;
  k.facing = toX >= fromX ? 1 : -1;
  const frame = (now) => {
    if (k.token !== token) { k.moving = false; return; }
    const hold = state.teacher === "awake" || (state.teacher === "eyes" && state.beat !== 3);
    if (hold) {
      k.anim = "idle";
      k.moving = false;
      if (!pauseStarted) pauseStarted = now;
      requestAnimationFrame(frame);
      return;
    }
    if (pauseStarted) { paused += now - pauseStarted; pauseStarted = 0; k.anim = anim; k.moving = true; }
    const p = Math.min(1, (now - t0 - paused) / ms);
    k.x = fromX + (toX - fromX) * p;
    k.y = fromY + (toY - fromY) * p;
    if (p < 1) requestAnimationFrame(frame);
    else { k.moving = false; k.anim = "idle"; if (done) done(); sync(); }
  };
  requestAnimationFrame(frame);
}

function go(beat) {
  state.beat = beat;
  if (beat === 6) {
    state.teacher = "activity";
    state.kids.a.x = 70; state.kids.b.x = 170;
    state.kids.a.y = PATH_Y; state.kids.b.y = PATH_Y;
  }
  if (beat === 8) state.turn = 0;
  sync();
}

function burst(x, y, text) {
  const el = document.createElement("div");
  el.className = "noise";
  el.style.left = `${x}px`;
  el.style.top = `${y - 30}px`;
  el.textContent = text;
  $("#stage").appendChild(el);
  setTimeout(() => el.remove(), 900);
}

function sync() {
  if (state.screen === "setup") return;
  syncChrome();
  syncCluster();
  syncKids();
  syncTeacher();
  syncCushions();
  const box = $("#log");
  if (box && !box.childElementCount) box.innerHTML = state.log.map((line) => `<div>${line}</div>`).join("");
}

function tick(now) {
  for (const k of [state.kids.a, state.kids.b]) {
    const sheet = SPRITES[k.who][k.anim] || SPRITES[k.who].idle;
    if (!k.acc) k.acc = now;
    const dt = now - k.acc;
    if (dt > 1000 / sheet.fps) {
      k.acc = now;
      if (k.anim === "idle" || k.anim === "walk" || k.anim === "dance") k.frame = (k.frame + 1) % sheet.frames;
    }
  }
  if (state.screen === "play") syncKids();
  requestAnimationFrame(tick);
}

mountSetup();
requestAnimationFrame(tick);
