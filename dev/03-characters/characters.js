/* Teacher + Kid A + Kid B as Quaternius 3D people (GLB).
   Loads staged files under assets/characters/:
     teacher.glb  = Suit_Female.glb
     kid-a.glb    = Casual_Male.glb
     kid-b.glb    = Casual2_Female.glb
   Pack: quaternius-ultimate-animated-character.zip (CC0), Image catalog-completion-2026-10-06.
   Poses from clips in each GLB: idle → Idle, walk → Walk, dance → Victory.
   Freeze (statue) pauses Idle — design copycat / wake freeze, not a new clip.
   Attaches CLASSROOM.characters and CLASSROOM.modules.characters. */

(function (root) {
  "use strict";

  var CLASSROOM = root.CLASSROOM || (root.CLASSROOM = {});
  var TEACHER_FILE = "teacher.glb";
  var KID_FILES = { a: "kid-a.glb", b: "kid-b.glb" };
  var BACK_Z = 2.4;
  var DESK_Z = -0.6;
  var STEP = 0.45;
  var THREE_MODULE_URL = "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
  var LOADER_URL = "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js";

  var CLIP_NAMES = {
    idle: ["Idle"],
    walk: ["Walk", "Walk_Carry"],
    dance: ["Victory", "Dance", "Cheer"],
    freeze: ["Idle"]
  };

  var teacherRig = null;
  var kidRigs = {};
  var pendingTeacher = "idle";
  var pendingKids = {};
  var loadPromise = null;
  var loopOn = false;
  var lastTick = 0;

  function asset(file) {
    var path = "";
    try { path = String(root.location && root.location.pathname || ""); } catch (err) { path = ""; }
    var dir = path.replace(/[^/]*$/, "");
    if (/\/js\/$/.test(dir)) return "../assets/characters/" + file;
    return "assets/characters/" + file;
  }

  function canon(pose) {
    var name = String(pose || "").replace(/\s+/g, " ").trim().toLowerCase();
    if (name === "idle" || name === "walk" || name === "dance" || name === "freeze") return name;
    if (name === "victory" || name === "cheer") return "dance";
    if (name === "statue" || name === "frozen") return "freeze";
    if (name === "walking" || name === "moving") return "walk";
    return "";
  }

  function isArray(value) {
    return Object.prototype.toString.call(value) === "[object Array]";
  }

  function kidIds(state) {
    var kids = state && state.kids;
    var ids = [];
    var i;
    if (isArray(kids)) {
      for (i = 0; i < kids.length && ids.length < 2; i += 1) {
        if (kids[i] && kids[i].id != null) ids.push(String(kids[i].id));
      }
    } else if (kids && typeof kids === "object") {
      var keys = Object.keys(kids);
      for (i = 0; i < keys.length && ids.length < 2; i += 1) ids.push(String(keys[i]));
    }
    if (!ids.length) return ["a", "b"];
    if (ids.length === 1) ids.push(ids[0] === "a" ? "b" : "a");
    return ids;
  }

  function kidRecord(state, id) {
    var kids = state && state.kids;
    var i;
    if (!kids) return null;
    if (isArray(kids)) {
      for (i = 0; i < kids.length; i += 1) {
        if (kids[i] && String(kids[i].id) === String(id)) return kids[i];
      }
      return null;
    }
    return kids[id] || null;
  }

  function kidFileFor(id, index) {
    var key = String(id).toLowerCase();
    if (KID_FILES[key]) return KID_FILES[key];
    return index === 0 ? KID_FILES.a : KID_FILES.b;
  }

  function poseFromKid(kid) {
    if (!kid) return "idle";
    if (kid.frozen === true || kid.statue === true) return "freeze";
    if (kid.dancing === true || kid.dance === true) return "dance";
    if (kid.moving === true || kid.walking === true) return "walk";
    return "idle";
  }

  function poseFromTeacher(state) {
    var teacher = state && state.teacher;
    var pose;
    if (state && state.teacherPose) {
      pose = canon(state.teacherPose);
      if (pose) return pose;
    }
    if (typeof teacher === "string") {
      var lower = teacher.toLowerCase();
      if (lower.indexOf("laugh") >= 0) return "dance";
      if (lower.indexOf("asleep") >= 0) return "idle";
    }
    return pendingTeacher || "idle";
  }

  function spotOf(kid) {
    var n = Number(kid && kid.spot);
    if (!isFinite(n) || n < 0) return 0;
    return Math.floor(n);
  }

  function findClip(clips, names) {
    var i;
    var j;
    for (i = 0; i < names.length; i += 1) {
      for (j = 0; j < clips.length; j += 1) {
        if (clips[j] && clips[j].name === names[i]) return clips[j];
      }
    }
    return null;
  }

  function applyPose(rig, pose) {
    var THREE = root.THREE;
    var clip;
    var action;
    var names;
    if (!rig || !THREE) return;
    pose = canon(pose) || "idle";
    if (rig.pose === pose && rig.action) return;
    names = CLIP_NAMES[pose] || CLIP_NAMES.idle;
    clip = findClip(rig.clips, names);
    if (!clip) return;
    if (rig.action) rig.action.fadeOut(0.12);
    action = rig.mixer.clipAction(clip);
    action.reset();
    action.fadeIn(0.12);
    action.enabled = true;
    if (pose === "freeze") {
      action.setLoop(THREE.LoopOnce, 1);
      action.clampWhenFinished = true;
      action.play();
      action.paused = true;
      action.time = Math.min(0.2, clip.duration || 0);
    } else {
      action.setLoop(THREE.LoopRepeat, Infinity);
      action.clampWhenFinished = false;
      action.paused = false;
      action.play();
    }
    rig.action = action;
    rig.pose = pose;
  }

  function placeTeacher(rig) {
    rig.group.position.set(0.85, 0, DESK_Z);
    rig.group.lookAt(0, 0, BACK_Z);
  }

  function placeKid(rig, record, index) {
    var x = index === 0 ? -0.55 : 0.55;
    rig.group.position.set(x, 0, BACK_Z - spotOf(record) * STEP);
    rig.group.lookAt(0, 0, DESK_Z);
  }

  function plant(model) {
    var THREE = root.THREE;
    var box;
    var minY;
    var size;
    var scale;
    model.rotation.y = Math.PI;
    model.updateMatrixWorld(true);
    box = new THREE.Box3().setFromObject(model);
    size = new THREE.Vector3();
    box.getSize(size);
    if (isFinite(size.y) && size.y > 0.01) {
      scale = 1.35 / size.y;
      model.scale.multiplyScalar(scale);
      model.updateMatrixWorld(true);
      box = new THREE.Box3().setFromObject(model);
    }
    minY = box.min.y;
    if (isFinite(minY)) model.position.y -= minY;
  }

  function ensureImportMap() {
    var doc = root.document;
    if (!doc || !doc.head) return;
    var maps = doc.querySelectorAll('script[type="importmap"]');
    var i;
    var text;
    for (i = 0; i < maps.length; i += 1) {
      text = maps[i].textContent || "";
      if (text.indexOf('"three"') >= 0 || text.indexOf("'three'") >= 0) return;
    }
    var script = doc.createElement("script");
    script.type = "importmap";
    script.textContent = JSON.stringify({
      imports: { three: THREE_MODULE_URL }
    });
    doc.head.appendChild(script);
  }

  function ensureLoader() {
    var THREE = root.THREE;
    if (THREE && typeof THREE.GLTFLoader === "function") {
      return Promise.resolve(new THREE.GLTFLoader());
    }
    ensureImportMap();
    return import(LOADER_URL).then(function (mod) {
      if (THREE) THREE.GLTFLoader = mod.GLTFLoader;
      return new mod.GLTFLoader();
    });
  }

  function spawn(loader, scene, url, role, id) {
    var THREE = root.THREE;
    return new Promise(function (resolve, reject) {
      loader.load(url, function (gltf) {
        var pivot = new THREE.Group();
        var model = gltf.scene;
        pivot.name = role === "teacher" ? "teacher" : "kid-" + id;
        pivot.userData.role = role;
        pivot.userData.id = id;
        plant(model);
        pivot.add(model);
        scene.add(pivot);
        resolve({
          role: role,
          id: id,
          group: pivot,
          mixer: new THREE.AnimationMixer(model),
          clips: gltf.animations || [],
          action: null,
          pose: "",
          file: url
        });
      }, undefined, function (err) { reject(err); });
    });
  }

  function startLoop() {
    if (loopOn || typeof root.requestAnimationFrame !== "function") return;
    loopOn = true;
    lastTick = 0;
    root.requestAnimationFrame(tick);
  }

  function tick(now) {
    var dt;
    var ids;
    var i;
    if (!loopOn) return;
    root.requestAnimationFrame(tick);
    if (!lastTick) lastTick = now;
    dt = Math.min(0.05, (now - lastTick) / 1000);
    lastTick = now;
    if (teacherRig && teacherRig.mixer) teacherRig.mixer.update(dt);
    ids = Object.keys(kidRigs);
    for (i = 0; i < ids.length; i += 1) {
      if (kidRigs[ids[i]].mixer) kidRigs[ids[i]].mixer.update(dt);
    }
  }

  function load(scene, state) {
    var ids;
    if (!scene || !root.THREE) return Promise.reject(new Error("THREE scene is not ready"));
    if (loadPromise) return loadPromise;
    ids = kidIds(state);
    loadPromise = ensureLoader().then(function (loader) {
      return Promise.all([
        spawn(loader, scene, asset(TEACHER_FILE), "teacher", null),
        spawn(loader, scene, asset(kidFileFor(ids[0], 0)), "kid", ids[0]),
        spawn(loader, scene, asset(kidFileFor(ids[1], 1)), "kid", ids[1])
      ]);
    }).then(function (rigs) {
      teacherRig = rigs[0];
      kidRigs[rigs[1].id] = rigs[1];
      kidRigs[rigs[2].id] = rigs[2];
      placeTeacher(teacherRig);
      placeKid(rigs[1], kidRecord(state, rigs[1].id), 0);
      placeKid(rigs[2], kidRecord(state, rigs[2].id), 1);
      applyPose(teacherRig, pendingTeacher || poseFromTeacher(state));
      applyPose(rigs[1], pendingKids[rigs[1].id] || poseFromKid(kidRecord(state, rigs[1].id)));
      applyPose(rigs[2], pendingKids[rigs[2].id] || poseFromKid(kidRecord(state, rigs[2].id)));
      startLoop();
      return { teacher: teacherRig.group, kids: kidRigs };
    }).catch(function (err) {
      loadPromise = null;
      throw err;
    });
    return loadPromise;
  }

  function setTeacherPose(name) {
    var pose = canon(name);
    if (!pose) return false;
    pendingTeacher = pose;
    if (teacherRig) applyPose(teacherRig, pose);
    return true;
  }

  function setKidPose(id, pose) {
    var next = canon(pose);
    var key = id == null ? "" : String(id);
    if (!next || !key) return false;
    pendingKids[key] = next;
    if (kidRigs[key]) applyPose(kidRigs[key], next);
    return true;
  }

  function sync(state) {
    var ids;
    var i;
    var record;
    if (!state) return;
    setTeacherPose(poseFromTeacher(state));
    ids = kidIds(state);
    for (i = 0; i < ids.length; i += 1) {
      record = kidRecord(state, ids[i]);
      setKidPose(ids[i], poseFromKid(record));
      if (kidRigs[ids[i]]) placeKid(kidRigs[ids[i]], record, i);
    }
  }

  function viewModel(state) {
    var ids = kidIds(state);
    var kids = [];
    var i;
    for (i = 0; i < ids.length; i += 1) {
      kids.push({
        id: ids[i],
        pose: pendingKids[ids[i]] || poseFromKid(kidRecord(state, ids[i])),
        file: kidFileFor(ids[i], i),
        loaded: !!kidRigs[ids[i]]
      });
    }
    return {
      teacher: {
        pose: pendingTeacher || poseFromTeacher(state),
        file: TEACHER_FILE,
        loaded: !!teacherRig,
        source: "Suit_Female.glb"
      },
      kids: kids,
      clips: { idle: "Idle", walk: "Walk", dance: "Victory" },
      pack: "quaternius-ultimate-animated-character"
    };
  }

  var api = {
    load: load,
    setTeacherPose: setTeacherPose,
    setKidPose: setKidPose,
    sync: sync,
    viewModel: viewModel,
    clips: CLIP_NAMES
  };

  CLASSROOM.characters = api;
  CLASSROOM.modules = CLASSROOM.modules || {};
  CLASSROOM.modules.characters = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
