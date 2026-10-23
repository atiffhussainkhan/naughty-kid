/* Named classroom props. Classic script. CLASSROOM.props.load(scene, anchors).
   Models come only from assets/: book_set.gltf, book_single.gltf,
   rug_rectangle_A.gltf, pillow_A.gltf, pillow_B.gltf, chest_gold.glb,
   torch_lit.gltf.glb. Each furniture glTF loads its own .bin and
   furniturebits_texture.png from that same folder. No other pack. */

(function (root) {
  "use strict";

  var ASSETS = "assets/";
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

  var FILES = {
    bookSet: "book_set.gltf",
    bookSingle: "book_single.gltf",
    rug: "rug_rectangle_A.gltf",
    pillowA: "pillow_A.gltf",
    pillowB: "pillow_B.gltf",
    chest: "chest_gold.glb",
    torch: "torch_lit.gltf.glb"
  };

  var WHOOPEE_FILES = [FILES.pillowA, FILES.pillowB, FILES.pillowA];

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
    if (typeof value.x === "number") {
      return new T.Vector3(value.x, typeof value.y === "number" ? value.y : 0, typeof value.z === "number" ? value.z : 0);
    }
    return fallback.clone();
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
    if (!raw) return null;
    var prize = norm(raw.prize);
    var noise = norm(raw.noise || raw.noisemaker);
    var blast = norm(raw.blast || raw.victory);
    var activity = norm(raw.activity);
    var stringTarget = norm(raw.string || raw.stringTarget);
    var prizeKind = prize.indexOf("toy") !== -1 ? "toy" : (prize.indexOf("bucket") !== -1 || prize.indexOf("treat") !== -1 ? "treats" : (prize ? "trophy" : null));
    var noiseKind = noise.indexOf("bubble") !== -1 || noise.indexOf("wrap") !== -1 ? "bubble" : (noise ? "squeaky" : null);
    var blastKind = blast.indexOf("confetti") !== -1 ? "confetti" : (blast ? "popper" : null);
    var activityKind = activity.indexOf("typ") !== -1 ? "typing" : (activity.indexOf("read") !== -1 || activity.indexOf("book") !== -1 ? "reading" : (activity ? "board" : null));
    var stringKind = stringTarget.indexOf("shoe") !== -1 ? "shoes" : (stringTarget ? "desk" : null);
    if (!prizeKind || !noiseKind || !blastKind || !activityKind || !stringKind) return null;
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
      ctx.font = "24px sans-serif";
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
    return mesh;
  }

  function clearGroup(group) {
    var i;
    for (i = group.children.length - 1; i >= 0; i -= 1) group.remove(group.children[i]);
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

  function loadTemplate(file) {
    if (templates[file]) return templates[file];
    templates[file] = new Promise(function (resolve) {
      var T = three();
      if (!T || !T.GLTFLoader) {
        resolve(null);
        return;
      }
      var loader = new T.GLTFLoader();
      loader.load(ASSETS + file, function (gltf) {
        resolve(gltf.scene || null);
      }, undefined, function () {
        resolve(null);
      });
    });
    return templates[file];
  }

  function useModel(group, file, target, visible) {
    return loadTemplate(file).then(function (template) {
      if (!template || !group.parent) return false;
      var model = template.clone(true);
      fit(model, target);
      sit(model);
      model.name = file;
      model.visible = visible !== false;
      model.userData.file = ASSETS + file;
      var i;
      for (i = group.children.length - 1; i >= 0; i -= 1) {
        if (group.children[i].userData && group.children[i].userData.kind === "label") {
          group.remove(group.children[i]);
        }
      }
      group.add(model);
      group.userData.model = file;
      return true;
    });
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
      model: "label"
    };
    if (spec.extra) {
      var key;
      for (key in spec.extra) {
        if (Object.prototype.hasOwnProperty.call(spec.extra, key)) group.userData[key] = spec.extra[key];
      }
    }
    if (spec.label) group.add(labeledMesh(spec.label, spec.size || [0.4, 0.25, 0.4]));
    parent.add(group);
    return group;
  }

  function layout(anchors) {
    var base = {
      desk: vec(0, 0, -1.1),
      prize: vec(-0.22, 0.78, -1.02),
      computer: vec(0.38, 0.78, -1.12),
      book: vec(0.02, 0.78, -0.82),
      mat: vec(-1.2, 0, -0.45),
      whiteboard: vec(1.2, 0.85, -1.48),
      mailbox: vec(1.75, 0, -1.05),
      checkpoint: vec(-0.2, 0.01, 0.75),
      cluster: vec(-1.35, 0, 2.15),
      shadow: vec(1.2, 0.7, -1.4),
      shoes: vec(0.2, 0, -0.62),
      plush: vec(-1.55, 0.12, 1.95),
      sticky: vec(-1.15, 0.1, 2.3),
      note: vec(-1.4, 0.08, 2.4),
      flashlight: vec(-1.05, 0.12, 1.85),
      string: vec(-1.6, 0.12, 2.35),
      sunglasses: vec(-0.95, 0.1, 2.15),
      noise: vec(-1.25, 0.08, 1.7),
      blast: vec(-1.5, 0.1, 1.7),
      cushionStart: vec(1.2, 0, 2.05),
      cushionEnd: vec(1.2, 0, -0.85)
    };
    var key;
    for (key in base) {
      if (Object.prototype.hasOwnProperty.call(base, key)) base[key] = point(anchors && anchors[key], base[key]);
    }
    if (anchors && anchors.shieldMat) base.mat = point(anchors.shieldMat, base.mat);
    if (anchors && anchors.backCluster) base.cluster = point(anchors.backCluster, base.cluster);
    if (anchors && anchors.checkpointLine) base.checkpoint = point(anchors.checkpointLine, base.checkpoint);
    if (anchors && anchors.bigBook) base.book = point(anchors.bigBook, base.book);
    if (anchors && anchors.secretNote) base.note = point(anchors.secretNote, base.note);
    if (anchors && anchors.sillyString) base.string = point(anchors.sillyString, base.string);
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
    scene.add(rootGroup);

    var items = {};
    var jobs = [];

    function hold(id, name, at, label, size, extra) {
      var group = addProp(rootGroup, {
        id: id,
        name: name,
        at: at,
        label: label,
        size: size,
        extra: extra
      });
      items[id] = group;
      return group;
    }

    hold("desk", "Teacher's desk", here.desk, "Teacher's desk", [1.4, 0.75, 0.7]);
    var prize = hold("prize", picks ? prizeName(picks.prize) : "Target prize", here.prize, picks ? prizeName(picks.prize) : "Target prize", [0.35, 0.3, 0.35], {
      kind: picks ? picks.prize : null
    });
    jobs.push(useModel(prize, FILES.chest, 0.42));

    var noiseOn = picks ? picks.noise : null;
    var squeaky = hold("squeaky-dog-toy", "Squeaky dog toy", here.noise, "Squeaky toy", [0.28, 0.16, 0.28]);
    squeaky.visible = noiseOn === "squeaky";
    squeaky.userData.inRoom = noiseOn === "squeaky";
    var wrap = hold("bubble-wrap", "Bubble wrap", here.noise, "Bubble wrap", [0.32, 0.12, 0.32]);
    wrap.visible = noiseOn === "bubble";
    wrap.userData.inRoom = noiseOn === "bubble";

    hold("plush", "Soft plush toy", here.plush, "Soft plush", [0.32, 0.32, 0.32]);
    var mat = hold("shield-mat", "Designated shield mat", here.mat, "Shield mat", [0.9, 0.04, 0.6]);
    jobs.push(useModel(mat, FILES.rug, 1.15));

    hold("checkpoint-line", "Mid-way checkpoint line", here.checkpoint, "Checkpoint line", [1.3, 0.02, 0.08]);
    hold("sticky-note", "Sticky note", here.sticky, "Sticky note", [0.18, 0.02, 0.18]);

    var blastOn = picks ? picks.blast : null;
    var popper = hold("party-popper", "Safe party popper", here.blast, "Party popper", [0.12, 0.28, 0.12]);
    popper.visible = blastOn === "popper";
    popper.userData.inRoom = blastOn === "popper";
    var confetti = hold("confetti", "Paper confetti", here.blast, "Paper confetti", [0.22, 0.08, 0.22]);
    confetti.visible = blastOn === "confetti";
    confetti.userData.inRoom = blastOn === "confetti";

    var board = hold("whiteboard", "Whiteboard", here.whiteboard, "Whiteboard", [1.15, 0.8, 0.06], { isBoard: true });
    board.userData.isBoard = true;
    hold("computer", "Computer", here.computer, "Computer", [0.42, 0.28, 0.32]);

    var book = hold("big-book", "Big book", here.book, "Big book", [0.34, 0.12, 0.26]);
    jobs.push(useModel(book, FILES.bookSet, 0.4));
    jobs.push(loadTemplate(FILES.bookSingle).then(function (template) {
      if (!template || !book.parent) return false;
      var single = template.clone(true);
      fit(single, 0.28);
      sit(single);
      single.name = FILES.bookSingle;
      single.visible = false;
      single.userData.file = ASSETS + FILES.bookSingle;
      single.userData.sameProp = "big-book";
      book.add(single);
      return true;
    }));

    hold("secret-note", "Secret note", here.note, "Secret note", [0.2, 0.02, 0.16]);
    hold("mailbox", "Target mailbox", here.mailbox, "Mailbox", [0.4, 0.55, 0.28]);

    var cushionStart = here.cushionStart;
    var cushionEnd = here.cushionEnd;
    var spots = [];
    var cushionRoot = hold("cushions", "Cushions", vec(0, 0, 0), null, null, { count: count });
    cushionRoot.position.set(0, 0, 0);
    var c;
    for (c = 0; c < count; c += 1) {
      var at = anchors && Array.isArray(anchors.cushions) && anchors.cushions[c]
        ? point(anchors.cushions[c], along(cushionStart, cushionEnd, count, c))
        : along(cushionStart, cushionEnd, count, c);
      var cushion = new T.Group();
      cushion.name = "cushion-" + c;
      cushion.position.copy(at);
      cushion.userData.index = c;
      cushion.userData.whoopee = false;
      cushion.userData.kind = "cushion";
      cushion.add(labeledMesh("Cushion", [0.55, 0.12, 0.55]));
      cushionRoot.add(cushion);
      spots.push({ index: c, whoopee: false, revealed: false, cushion: cushion, mesh: null });
    }

    var whoopeeRoot = hold("whoopee-cushions", "Whoopee cushions", vec(0, 0, 0), null, null, { count: 3 });
    whoopeeRoot.position.set(0, 0, 0);
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
      pillow.userData.file = ASSETS + WHOOPEE_FILES[w];
      pillow.add(labeledMesh("Whoopee", [0.4, 0.08, 0.4]));
      whoopeeRoot.add(pillow);
      spot.mesh = pillow;
      under.push({ cushion: cushionIndex, revealed: false, file: WHOOPEE_FILES[w] });
      jobs.push(useModel(pillow, WHOOPEE_FILES[w], 0.42));
    }

    hold("sunglasses", "Giant oversized pair of clown sunglasses", here.sunglasses, "Sunglasses", [0.42, 0.16, 0.16]);
    var shadow = hold("shadow", "Teacher's shadow on the wall", here.shadow, "Teacher's shadow", [0.7, 1.1, 0.04]);
    shadow.visible = !!(picks && picks.activity === "board");
    var torch = hold("flashlight", "Flashlight", here.flashlight, "Flashlight", [0.1, 0.1, 0.34]);
    jobs.push(useModel(torch, FILES.torch, 0.38));
    var stringProp = hold("silly-string", "Silly string", here.string, "Silly string", [0.14, 0.28, 0.14], {
      target: picks ? picks.string : null
    });
    stringProp.userData.target = picks ? picks.string : null;
    hold("shoes", "Teacher's shoes", here.shoes, "Teacher's shoes", [0.28, 0.12, 0.16]);

    placed = {
      root: rootGroup,
      items: items,
      spots: spots,
      under: under,
      picks: picks,
      ids: PROP_IDS.slice()
    };

    return Promise.all(jobs).then(function () {
      return {
        ok: true,
        count: PROP_IDS.length,
        whoopees: 3,
        ids: PROP_IDS.slice(),
        staysForPhaseB: true
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
    return {
      noise: true,
      revealed: true,
      index: index,
      whoopees: placed.under.length,
      shown: shown,
      file: entry ? entry.file : null
    };
  }

  var api = {
    load: load,
    revealWhoopee: revealWhoopee,
    ids: PROP_IDS.slice()
  };

  var classroom = root.CLASSROOM || (root.CLASSROOM = {});
  classroom.props = api;
  classroom.modules = classroom.modules || {};
  classroom.modules.props = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
