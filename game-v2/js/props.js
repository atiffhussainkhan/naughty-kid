/* Named classroom props — 3D placement. Classic script.
   CLASSROOM.props.load(scene, anchors). Exactly 22 named props.
   Meshes only from game-v2/assets/props/ (Image library packs).
   Missing art = labeled placeholder. No cardboard-as-mailbox.
   Phase A props stay for Phase B (root.userData.staysForPhaseB). */
(function (root) {
  "use strict";

  var SCRIPT_SRC = "";
  if (typeof document !== "undefined" && document.currentScript && document.currentScript.src) {
    SCRIPT_SRC = document.currentScript.src;
  }

  function assetUrl(file) {
    if (SCRIPT_SRC) {
      try {
        return new URL("../assets/props/" + file, SCRIPT_SRC).href;
      } catch (err) { /* fall through */ }
    }
    return "assets/props/" + file;
  }

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

  /* Honest file map. Prefer Kenney primary GLBs; KayKit/Mastjie as alts.
     Mailbox / squeaky / wrap / popper / confetti / sticky / secret / silly /
     shoes / shadow stay labels — no invented stand-ins (cardboard ≠ mailbox). */
  var FILES = {
    desk: ["desk.glb", "table_medium.gltf"],
    trophy: ["trophy.glb", "chest_gold.glb"],
    toy: ["bear.glb", "plush-bear.glb"],
    treats: ["bucket.glb"],
    plush: ["plush-bear.glb", "bear.glb", "pillow_B.gltf"],
    mat: ["rug-rectangle.glb", "rugRectangle.glb", "rug_rectangle_A.gltf"],
    book: ["books.glb", "book_set.gltf"],
    bookOpen: ["book_single.gltf", "spellbook_open.gltf"],
    laptop: ["laptop.glb", "laptop_01.glb", "computer-screen.glb"],
    cushion: ["pillow.glb", "pillow_A.gltf"],
    cushionAlt: ["pillow-blue.glb", "pillowBlue.glb", "pillow_B.gltf"],
    whoopee: ["pillow-long.glb", "pillowLong.glb", "pillow_B.gltf"],
    sunglasses: ["sunglasses.glb", "aid-sunglasses.glb"],
    flashlight: ["torch_lit.gltf.glb", "lamp-table.glb", "lampSquareTable.glb"],
    board: ["pictureframe_large_A.gltf"]
  };

  var WHOOPEE_FILES = ["pillow-long.glb", "pillow_B.gltf", "pillow-long.glb"];

  var placed = null;
  var templates = {};

  function three() {
    return root.THREE;
  }

  function vec(x, y, z) {
    return new (three().Vector3)(x, y, z);
  }

  function point(value, fallback) {
    var T = three();
    if (!value) return fallback.clone();
    if (value.isVector3) return value.clone();
    if (value.position && value.position.isVector3) {
      var world = new T.Vector3();
      value.getWorldPosition(world);
      return world;
    }
    if (typeof value.x === "number") {
      return new T.Vector3(value.x, typeof value.y === "number" ? value.y : 0, typeof value.z === "number" ? value.z : 0);
    }
    return fallback.clone();
  }

  function worldOf(node, fallback) {
    var T = three();
    if (!node) return fallback.clone();
    if (node.isVector3) return node.clone();
    if (node.position && typeof node.getWorldPosition === "function") {
      var out = new T.Vector3();
      node.updateWorldMatrix(true, false);
      node.getWorldPosition(out);
      return out;
    }
    return point(node, fallback);
  }

  function norm(value) {
    return String(value == null ? "" : value)
      .replace(/[\u2019\u2018]/g, "'")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  }

  function picksFrom(anchors) {
    var raw = anchors && anchors.picks;
    if (!raw) {
      var options = root.CLASSROOM && root.CLASSROOM.modules && root.CLASSROOM.modules.options;
      if (options && options.picks) raw = options.picks;
    }
    if (!raw && root.CLASSROOM && root.CLASSROOM.modules && root.CLASSROOM.modules.space && root.CLASSROOM.modules.space.props) {
      raw = root.CLASSROOM.modules.space.props.picks;
    }
    if (!raw) {
      raw = {
        prize: "trophy",
        noise: "squeaky",
        blast: "popper",
        activity: "board",
        string: "desk"
      };
    }
    var prize = norm(raw.prize);
    var noise = norm(raw.noise || raw.noisemaker);
    var blast = norm(raw.blast || raw.victory);
    var activity = norm(raw.activity);
    var stringTarget = norm(raw.string || raw.stringTarget);
    var prizeKind = prize.indexOf("toy") !== -1
      ? "toy"
      : (prize.indexOf("bucket") !== -1 || prize.indexOf("treat") !== -1 ? "treats" : "trophy");
    var noiseKind = noise.indexOf("bubble") !== -1 || noise.indexOf("wrap") !== -1 ? "bubble" : "squeaky";
    var blastKind = blast.indexOf("confetti") !== -1 ? "confetti" : "popper";
    var activityKind = activity.indexOf("typ") !== -1
      ? "typing"
      : (activity.indexOf("read") !== -1 || activity.indexOf("book") !== -1 ? "reading" : "board");
    var stringKind = stringTarget.indexOf("shoe") !== -1 ? "shoes" : "desk";
    return {
      prize: prizeKind,
      noise: noiseKind,
      blast: blastKind,
      activity: activityKind,
      string: stringKind
    };
  }

  function prizeName(kind) {
    if (kind === "toy") return "A toy";
    if (kind === "treats") return "A bucket of treats";
    return "A golden trophy";
  }

  function prizeFiles(kind) {
    if (kind === "toy") return FILES.toy;
    if (kind === "treats") return FILES.treats;
    return FILES.trophy;
  }

  function cushionCountOf(anchors) {
    var count = anchors && anchors.cushionCount;
    if (typeof count === "number" && count === (count | 0) && count > 3) return count;
    return 6;
  }

  function whoopeeIndexes(count, anchors) {
    var picked = anchors && (anchors.whoopeeIndexes || anchors.whoopees);
    var seen = {};
    var ok = Array.isArray(picked) && picked.length === 3;
    var i;
    if (ok) {
      for (i = 0; i < picked.length; i += 1) {
        var index = picked[i];
        if (typeof index !== "number" || index !== (index | 0) || index < 0 || index >= count || seen[index]) {
          ok = false;
          break;
        }
        seen[index] = true;
      }
    }
    if (ok) return picked.slice();
    var first = 0;
    var mid = Math.floor((count - 1) / 2);
    var last = count - 1;
    if (mid === first) mid = 1;
    if (mid === last) mid = last - 1;
    return [first, mid, last];
  }

  function along(start, end, count, index) {
    var t = count === 1 ? 0 : index / (count - 1);
    return vec(
      start.x + (end.x - start.x) * t,
      start.y + (end.y - start.y) * t,
      start.z + (end.z - start.z) * t
    );
  }

  function labeledMesh(text, size) {
    var T = three();
    var canvas = root.document && root.document.createElement("canvas");
    var material;
    if (canvas && canvas.getContext) {
      canvas.width = 256;
      canvas.height = 128;
      var ctx = canvas.getContext("2d");
      ctx.fillStyle = "#f3efe6";
      ctx.fillRect(0, 0, 256, 128);
      ctx.strokeStyle = "#2a241c";
      ctx.lineWidth = 8;
      ctx.strokeRect(6, 6, 244, 116);
      ctx.fillStyle = "#2a241c";
      ctx.font = "22px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      var words = String(text).split(" ");
      var line = "";
      var lines = [];
      var w;
      for (w = 0; w < words.length; w += 1) {
        var next = line ? line + " " + words[w] : words[w];
        if (ctx.measureText(next).width > 220 && line) {
          lines.push(line);
          line = words[w];
        } else {
          line = next;
        }
      }
      if (line) lines.push(line);
      var y0 = 64 - (lines.length - 1) * 16;
      var n;
      for (n = 0; n < lines.length; n += 1) ctx.fillText(lines[n], 128, y0 + n * 32);
      var texture = new T.CanvasTexture(canvas);
      texture.colorSpace = T.SRGBColorSpace;
      material = new T.MeshStandardMaterial({ map: texture, roughness: 0.85, metalness: 0 });
    } else {
      material = new T.MeshStandardMaterial({ color: 0xf3efe6, roughness: 0.85, metalness: 0 });
    }
    var mesh = new T.Mesh(new T.BoxGeometry(size[0], size[1], size[2]), material);
    mesh.name = text;
    mesh.userData.kind = "label";
    mesh.userData.label = text;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }

  function fit(object, target) {
    var T = three();
    var box = new T.Box3().setFromObject(object);
    var size = new T.Vector3();
    box.getSize(size);
    var maxDim = Math.max(size.x, size.y, size.z);
    if (!maxDim) return;
    object.scale.multiplyScalar(target / maxDim);
  }

  function sit(object) {
    var box = new (three().Box3)().setFromObject(object);
    object.position.y -= box.min.y;
  }

  function enableShadows(object) {
    object.traverse(function (node) {
      if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });
  }

  function loadTemplate(file) {
    if (templates[file]) return templates[file];
    templates[file] = new Promise(function (resolve) {
      var T = three();
      if (!T || !T.GLTFLoader) {
        resolve(null);
        return;
      }
      var loader = new T.GLTFLoader();
      loader.load(assetUrl(file), function (gltf) {
        resolve(gltf.scene || null);
      }, undefined, function () {
        resolve(null);
      });
    });
    return templates[file];
  }

  function useModel(group, files, target, visible) {
    var list = Array.isArray(files) ? files : [files];
    var i = 0;
    function tryNext() {
      if (i >= list.length) return Promise.resolve(false);
      var file = list[i];
      i += 1;
      return loadTemplate(file).then(function (template) {
        if (!template || !group.parent) return tryNext();
        var model = template.clone(true);
        fit(model, target);
        sit(model);
        enableShadows(model);
        model.name = file;
        model.visible = visible !== false;
        model.userData.file = assetUrl(file);
        var c;
        for (c = group.children.length - 1; c >= 0; c -= 1) {
          if (group.children[c].userData && group.children[c].userData.kind === "label") {
            group.remove(group.children[c]);
          }
        }
        group.add(model);
        group.userData.model = file;
        return true;
      });
    }
    return tryNext();
  }

  function addProp(parent, spec) {
    var group = new (three().Group)();
    group.name = spec.id;
    group.position.copy(spec.at);
    group.visible = spec.visible !== false;
    group.userData = {
      id: spec.id,
      name: spec.name,
      inRoom: spec.inRoom !== false,
      fromPhaseA: true,
      staysForPhaseB: true,
      model: spec.skipModel ? "room-owned" : "label"
    };
    if (spec.extra) {
      var key;
      for (key in spec.extra) {
        if (Object.prototype.hasOwnProperty.call(spec.extra, key)) group.userData[key] = spec.extra[key];
      }
    }
    if (spec.label && !spec.skipLabel) {
      group.add(labeledMesh(spec.label, spec.size || [0.4, 0.25, 0.4]));
    }
    parent.add(group);
    return group;
  }

  function layout(anchors) {
    var cushionFrom = anchors && anchors.cushionLine && anchors.cushionLine.userData && anchors.cushionLine.userData.from;
    var cushionTo = anchors && anchors.cushionLine && anchors.cushionLine.userData && anchors.cushionLine.userData.to;
    var base = {
      desk: worldOf(anchors && anchors.desk, vec(0, 0, -1.1)),
      prize: vec(-0.22, 0.78, -1.02),
      computer: vec(0.38, 0.78, -1.12),
      book: vec(0.02, 0.78, -0.82),
      mat: worldOf(anchors && anchors.shieldMat, vec(-1.2, 0, -0.45)),
      whiteboard: worldOf(anchors && (anchors.whiteboard || anchors.board), vec(1.2, 0.85, -1.48)),
      mailbox: worldOf(anchors && anchors.mailbox, vec(1.75, 0, -1.05)),
      checkpoint: worldOf(anchors && anchors.checkpoint, vec(-0.2, 0.01, 0.75)),
      cluster: worldOf(anchors && anchors.holding, vec(-1.35, 0, 2.15)),
      shadow: worldOf(anchors && anchors.shadow, vec(1.2, 0.7, -1.4)),
      shoes: vec(0.2, 0, -0.62),
      cushionStart: cushionFrom
        ? vec(cushionFrom.x, 0, cushionFrom.z)
        : vec(1.2, 0, 2.05),
      cushionEnd: cushionTo
        ? vec(cushionTo.x, 0, cushionTo.z)
        : vec(1.2, 0, -0.85)
    };

    /* Desktop seats relative to desk world position. */
    base.prize = vec(base.desk.x - 0.22, base.desk.y + 0.78, base.desk.z + 0.08);
    base.computer = vec(base.desk.x + 0.38, base.desk.y + 0.78, base.desk.z - 0.02);
    base.book = vec(base.desk.x + 0.02, base.desk.y + 0.78, base.desk.z + 0.28);
    base.shoes = vec(base.desk.x + 0.25, 0, base.desk.z + 0.48);

    var cluster = base.cluster;
    base.plush = vec(cluster.x - 0.2, 0.12, cluster.z - 0.2);
    base.sticky = vec(cluster.x + 0.2, 0.1, cluster.z + 0.15);
    base.note = vec(cluster.x - 0.05, 0.08, cluster.z + 0.25);
    base.flashlight = vec(cluster.x + 0.3, 0.12, cluster.z - 0.3);
    base.string = vec(cluster.x - 0.25, 0.12, cluster.z + 0.2);
    base.sunglasses = vec(cluster.x + 0.4, 0.1, cluster.z);
    base.noise = vec(cluster.x, 0.08, cluster.z - 0.45);
    base.blast = vec(cluster.x - 0.15, 0.1, cluster.z - 0.55);

    return base;
  }

  function load(scene, anchors) {
    var T = three();
    if (!T || !scene || typeof scene.add !== "function") {
      return Promise.resolve({ ok: false, gap: "scene" });
    }
    if (placed && placed.root && placed.root.parent) placed.root.parent.remove(placed.root);
    templates = {};

    var here = layout(anchors || {});
    var picks = picksFrom(anchors || {});
    var count = cushionCountOf(anchors || {});
    var hidden = whoopeeIndexes(count, anchors || {});
    var rootGroup = new T.Group();
    rootGroup.name = "props";
    rootGroup.userData.staysForPhaseB = true;
    rootGroup.userData.count = PROP_IDS.length;
    rootGroup.userData.whoopees = 3;
    scene.add(rootGroup);

    var items = {};
    var jobs = [];
    var roomOwnsDesk = !!(anchors && anchors.desk && anchors.desk.children && anchors.desk.children.length);
    var roomOwnsBoard = !!(anchors && (anchors.whiteboard || anchors.board) &&
      ((anchors.whiteboard && anchors.whiteboard.children && anchors.whiteboard.children.length) ||
        (anchors.board && anchors.board.children && anchors.board.children.length)));

    function hold(id, name, at, label, size, extra) {
      var group = addProp(rootGroup, {
        id: id,
        name: name,
        at: at,
        label: label,
        size: size,
        extra: extra,
        skipModel: extra && extra.skipModel,
        skipLabel: extra && extra.skipLabel
      });
      items[id] = group;
      return group;
    }

    /* 1 Desk — room may already own table_medium. */
    var desk = hold("desk", "Teacher's desk", here.desk, "Teacher's desk", [1.4, 0.75, 0.7], {
      skipModel: roomOwnsDesk,
      skipLabel: roomOwnsDesk
    });
    if (!roomOwnsDesk) jobs.push(useModel(desk, FILES.desk, 1.4));

    /* 2 Prize */
    var prize = hold("prize", prizeName(picks.prize), here.prize, prizeName(picks.prize), [0.35, 0.3, 0.35], {
      kind: picks.prize
    });
    jobs.push(useModel(prize, prizeFiles(picks.prize), 0.42));

    /* 3–4 Under-foot (one locked) */
    var squeaky = hold("squeaky-dog-toy", "Squeaky dog toy", here.noise, "Squeaky toy", [0.28, 0.16, 0.28]);
    squeaky.visible = picks.noise === "squeaky";
    squeaky.userData.inRoom = picks.noise === "squeaky";
    var wrap = hold("bubble-wrap", "Bubble wrap", here.noise, "Bubble wrap", [0.32, 0.12, 0.32]);
    wrap.visible = picks.noise === "bubble";
    wrap.userData.inRoom = picks.noise === "bubble";

    /* 5 Plush */
    var plush = hold("plush", "Soft plush toy", here.plush, "Soft plush", [0.32, 0.32, 0.32]);
    jobs.push(useModel(plush, FILES.plush, 0.38));

    /* 6 Shield mat */
    var mat = hold("shield-mat", "Designated shield mat", here.mat, "Shield mat", [0.9, 0.04, 0.6]);
    jobs.push(useModel(mat, FILES.mat, 1.15));

    /* 7 Checkpoint — labeled tape only */
    hold("checkpoint-line", "Mid-way checkpoint line", here.checkpoint, "Checkpoint line", [1.3, 0.02, 0.08]);

    /* 8 Sticky note — label */
    hold("sticky-note", "Sticky note", here.sticky, "Sticky note", [0.18, 0.02, 0.18]);

    /* 9–10 Blast (one locked) */
    var popper = hold("party-popper", "Safe party popper", here.blast, "Party popper", [0.12, 0.28, 0.12]);
    popper.visible = picks.blast === "popper";
    popper.userData.inRoom = picks.blast === "popper";
    var confetti = hold("confetti", "Paper confetti", here.blast, "Paper confetti", [0.22, 0.08, 0.22]);
    confetti.visible = picks.blast === "confetti";
    confetti.userData.inRoom = picks.blast === "confetti";

    /* 11 Whiteboard — room owns picture frame as board */
    var board = hold("whiteboard", "Whiteboard", here.whiteboard, "Whiteboard", [1.15, 0.8, 0.06], {
      isBoard: true,
      skipModel: roomOwnsBoard,
      skipLabel: roomOwnsBoard
    });
    board.userData.isBoard = true;
    if (!roomOwnsBoard) jobs.push(useModel(board, FILES.board, 1.1));

    /* 12 Computer */
    var computer = hold("computer", "Computer", here.computer, "Computer", [0.42, 0.28, 0.32]);
    jobs.push(useModel(computer, FILES.laptop, 0.45));

    /* 13 Big book */
    var book = hold("big-book", "Big book", here.book, "Big book", [0.34, 0.12, 0.26]);
    jobs.push(useModel(book, FILES.book, 0.4));
    jobs.push(loadTemplate(FILES.bookOpen[0]).then(function (template) {
      if (!template || !book.parent) return false;
      var single = template.clone(true);
      fit(single, 0.28);
      sit(single);
      enableShadows(single);
      single.name = FILES.bookOpen[0];
      single.visible = picks.activity === "reading";
      single.userData.file = assetUrl(FILES.bookOpen[0]);
      single.userData.sameProp = "big-book";
      book.add(single);
      return true;
    }));

    /* 14 Secret note — label */
    hold("secret-note", "Secret note", here.note, "Secret note", [0.2, 0.02, 0.16]);

    /* 15 Mailbox — no mailbox mesh in packs; labeled placeholder (not a cardboard box). */
    hold("mailbox", "Target mailbox", here.mailbox, "Mailbox", [0.4, 0.55, 0.28]);

    /* 16–17 Cushions + exactly 3 hidden whoopees */
    var spots = [];
    var cushionRoot = hold("cushions", "Cushions", vec(0, 0, 0), null, null, { count: count, skipLabel: true });
    cushionRoot.position.set(0, 0, 0);
    var c;
    for (c = 0; c < count; c += 1) {
      var at = anchors && Array.isArray(anchors.cushions) && anchors.cushions[c]
        ? point(anchors.cushions[c], along(here.cushionStart, here.cushionEnd, count, c))
        : along(here.cushionStart, here.cushionEnd, count, c);
      var cushion = new T.Group();
      cushion.name = "cushion-" + c;
      cushion.position.copy(at);
      cushion.userData.index = c;
      cushion.userData.whoopee = false;
      cushion.userData.kind = "cushion";
      cushion.add(labeledMesh("Cushion", [0.55, 0.12, 0.55]));
      cushionRoot.add(cushion);
      spots.push({ index: c, whoopee: false, revealed: false, cushion: cushion, mesh: null });
      jobs.push(useModel(cushion, c % 2 === 0 ? FILES.cushion : FILES.cushionAlt, 0.55));
    }

    var whoopeeRoot = hold("whoopee-cushions", "Whoopee cushions", vec(0, 0, 0), null, null, {
      count: 3,
      skipLabel: true
    });
    whoopeeRoot.position.set(0, 0, 0);
    whoopeeRoot.userData.hiddenUntilReveal = true;
    var under = [];
    var w;
    for (w = 0; w < hidden.length; w += 1) {
      var cushionIndex = hidden[w];
      var spot = spots[cushionIndex];
      spot.whoopee = true;
      spot.cushion.userData.whoopee = true;
      var pillow = new T.Group();
      pillow.name = "whoopee-" + cushionIndex;
      pillow.position.copy(spot.cushion.position);
      pillow.position.y += 0.02;
      pillow.visible = false;
      pillow.userData.cushion = cushionIndex;
      pillow.userData.hidden = true;
      pillow.userData.kind = "whoopee";
      pillow.userData.file = assetUrl(WHOOPEE_FILES[w]);
      pillow.add(labeledMesh("Whoopee", [0.4, 0.08, 0.4]));
      whoopeeRoot.add(pillow);
      spot.mesh = pillow;
      under.push({ cushion: cushionIndex, revealed: false, file: WHOOPEE_FILES[w] });
      jobs.push(useModel(pillow, WHOOPEE_FILES[w], 0.42));
    }

    /* 18 Sunglasses */
    var shades = hold("sunglasses", "Giant oversized pair of clown sunglasses", here.sunglasses, "Sunglasses", [0.42, 0.16, 0.16]);
    jobs.push(useModel(shades, FILES.sunglasses, 0.4));

    /* 19 Shadow — labeled plane; visible when board activity */
    var shadow = hold("shadow", "Teacher's shadow on the wall", here.shadow, "Teacher's shadow", [0.7, 1.1, 0.04]);
    shadow.visible = picks.activity === "board";

    /* 20 Flashlight — torch stand-in */
    var torch = hold("flashlight", "Flashlight", here.flashlight, "Flashlight", [0.1, 0.1, 0.34]);
    jobs.push(useModel(torch, FILES.flashlight, 0.38));

    /* 21 Silly string — label */
    var stringProp = hold("silly-string", "Silly string", here.string, "Silly string", [0.14, 0.28, 0.14], {
      target: picks.string
    });
    stringProp.userData.target = picks.string;

    /* 22 Shoes — label (boots are on the character mesh, not a loose shoe) */
    hold("shoes", "Teacher's shoes", here.shoes, "Teacher's shoes", [0.28, 0.12, 0.16]);

    placed = {
      root: rootGroup,
      items: items,
      spots: spots,
      under: under,
      picks: picks,
      ids: PROP_IDS.slice()
    };

    /* Sync state module when present. */
    var space = root.CLASSROOM && root.CLASSROOM.modules && root.CLASSROOM.modules.space;
    if (space && space.actions && typeof space.actions.placeRoom === "function") {
      try {
        space.actions.placeRoom({}, {
          prize: picks.prize,
          noise: picks.noise,
          blast: picks.blast,
          activity: picks.activity,
          string: picks.string
        }, { cushionCount: count, whoopeeIndexes: hidden });
      } catch (err) { /* state sync is optional at load */ }
    }

    return Promise.all(jobs).then(function () {
      return {
        ok: true,
        count: PROP_IDS.length,
        whoopees: 3,
        hiddenWhoopees: hidden.slice(),
        ids: PROP_IDS.slice(),
        staysForPhaseB: true,
        picks: picks,
        items: items,
        root: rootGroup
      };
    });
  }

  function revealWhoopee(index) {
    if (!placed) return { noise: false, revealed: false, gap: "load" };
    var spots = placed.spots;
    if (typeof index !== "number" || index !== (index | 0) || index < 0 || index >= spots.length) {
      return { noise: false, revealed: false };
    }
    var spot = spots[index];
    if (!spot.whoopee || !spot.mesh) return { noise: false, revealed: false };
    if (spot.revealed) {
      return { noise: false, revealed: true, already: true, index: index };
    }
    spot.revealed = true;
    spot.mesh.visible = true;
    spot.mesh.userData.hidden = false;
    var entry = null;
    var i;
    for (i = 0; i < placed.under.length; i += 1) {
      if (placed.under[i].cushion === index) {
        placed.under[i].revealed = true;
        entry = placed.under[i];
      }
    }
    var shown = 0;
    for (i = 0; i < placed.under.length; i += 1) {
      if (placed.under[i].revealed) shown += 1;
    }
    var space = root.CLASSROOM && root.CLASSROOM.modules && root.CLASSROOM.modules.space;
    if (space && space.props) {
      try { space.actions.revealWhoopee({ props: space.props }, index); } catch (err) { /* ignore */ }
    }
    return {
      noise: true,
      revealed: true,
      index: index,
      whoopees: placed.under.length,
      shown: shown,
      file: entry ? entry.file : null
    };
  }

  function markProp(id, mark) {
    if (!placed || !placed.items[id]) return null;
    var group = placed.items[id];
    mark = mark || {};
    if (mark.place && mark.place.isVector3) group.position.copy(mark.place);
    else if (mark.place && typeof mark.place.x === "number") {
      group.position.set(mark.place.x, mark.place.y || 0, mark.place.z || 0);
    }
    if (typeof mark.visible === "boolean") group.visible = mark.visible;
    if (mark.holder) group.userData.holder = mark.holder;
    if (id === "shadow" && mark.drawing) {
      group.visible = true;
      group.userData.drawing = mark.drawing;
      var label = group.children.filter(function (c) { return c.userData && c.userData.kind === "label"; })[0];
      if (label) {
        group.remove(label);
        group.add(labeledMesh(mark.drawing === "ears" || mark.drawing === "giant-ears" ? "Giant ears" : "Hat", [0.7, 1.1, 0.04]));
      }
    }
    group.userData.staysForPhaseB = true;
    return group;
  }

  function applyPhaseA(flags, state) {
    if (!placed) return;
    var src = flags || state || {};
    var nested = state && state.phaseA ? state.phaseA : {};
    if (src.plushOnMat || nested.plushOnMat) {
      placed.items.plush.position.copy(placed.items["shield-mat"].position);
      placed.items.plush.position.y += 0.12;
      placed.items.plush.userData.holder = "mat";
    }
    if (src.stickyOnBack || nested.stickyOnBack) {
      placed.items["sticky-note"].userData.holder = "teacher";
    }
    if (src.prizeClaimed || nested.prizeClaimed || src.phaseAEnded || nested.phaseAEnded) {
      placed.items.prize.userData.holder = "kid";
    }
  }

  function applyPhaseB(flags, state) {
    if (!placed) return;
    /* Nothing from Phase A is removed. */
    placed.root.userData.staysForPhaseB = true;
    PROP_IDS.forEach(function (id) {
      if (placed.items[id]) placed.items[id].userData.staysForPhaseB = true;
    });
    var src = flags || state || {};
    if (src.shadowDrawing) {
      markProp("shadow", { drawing: src.shadowDrawing, visible: true });
    }
  }

  function viewModel() {
    if (!placed) return { kind: "props", ready: false, count: 0 };
    var list = PROP_IDS.map(function (id) {
      var g = placed.items[id];
      return {
        id: id,
        name: g.userData.name,
        inRoom: g.userData.inRoom !== false && g.visible !== false,
        model: g.userData.model,
        staysForPhaseB: true,
        position: { x: g.position.x, y: g.position.y, z: g.position.z }
      };
    });
    return {
      kind: "props",
      ready: true,
      count: PROP_IDS.length,
      whoopees: 3,
      hidden: placed.under.map(function (e) { return e.cushion; }),
      staysForPhaseB: true,
      props: list
    };
  }

  var api = {
    load: load,
    revealWhoopee: revealWhoopee,
    markProp: markProp,
    applyPhaseA: applyPhaseA,
    applyPhaseB: applyPhaseB,
    viewModel: viewModel,
    ids: PROP_IDS.slice(),
    files: FILES
  };

  var classroom = root.CLASSROOM || (root.CLASSROOM = {});
  classroom.props = api;
  classroom.modules = classroom.modules || {};
  classroom.modules.props = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
