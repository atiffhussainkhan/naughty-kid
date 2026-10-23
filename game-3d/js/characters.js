/* Teacher and two kids. Classic script.
   Loads only the staged files: assets/Mage.glb, assets/Rogue.glb, assets/Rogue_Hooded.glb.
   From a page under js/, those paths are ../assets/. No other pack is fetched.
   GLTFLoader is the CDN loader already attached to THREE, or the same CDN module.
   Poses are idle, walk, and freeze. Clips Idle and Walking_A are inside each GLB. */

(function (root) {
  "use strict";

  var CLASSROOM = root.CLASSROOM || (root.CLASSROOM = {});
  var TEACHER_FILE = "Mage.glb";
  var KID_FILES = ["Rogue.glb", "Rogue_Hooded.glb"];
  var BACK_Z = 2.4;
  var DESK_Z = -0.6;
  var STEP = 0.45;
  var LOADER_URL = "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js";

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
    if (/\/js\/$/.test(dir)) return "../assets/" + file;
    return "assets/" + file;
  }

  function canon(pose) {
    var name = String(pose || "").replace(/\s+/g, " ").trim().toLowerCase();
    if (name === "idle" || name === "walk" || name === "freeze") return name;
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

  function poseFromKid(kid) {
    if (!kid) return "idle";
    if (kid.frozen === true || kid.statue === true) return "freeze";
    if (kid.moving === true || kid.walking === true) return "walk";
    return "idle";
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

  function clipFor(pose) {
    if (pose === "walk") return ["Walking_A", "Walking_B"];
    return ["Idle", "Unarmed_Idle"];
  }

  function applyPose(rig, pose) {
    var THREE = root.THREE;
    var clip;
    var action;
    if (!rig || !THREE) return;
    if (rig.pose === pose && rig.action) return;
    clip = findClip(rig.clips, clipFor(pose));
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
    model.rotation.y = Math.PI;
    model.updateMatrixWorld(true);
    box = new THREE.Box3().setFromObject(model);
    minY = box.min.y;
    if (isFinite(minY)) model.position.y -= minY;
  }

  function ensureLoader() {
    var THREE = root.THREE;
    if (THREE && typeof THREE.GLTFLoader === "function") {
      return Promise.resolve(new THREE.GLTFLoader());
    }
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
          pose: ""
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
        spawn(loader, scene, asset(KID_FILES[0]), "kid", ids[0]),
        spawn(loader, scene, asset(KID_FILES[1]), "kid", ids[1])
      ]);
    }).then(function (rigs) {
      teacherRig = rigs[0];
      kidRigs[rigs[1].id] = rigs[1];
      kidRigs[rigs[2].id] = rigs[2];
      placeTeacher(teacherRig);
      placeKid(rigs[1], kidRecord(state, rigs[1].id), 0);
      placeKid(rigs[2], kidRecord(state, rigs[2].id), 1);
      applyPose(teacherRig, pendingTeacher);
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

  var api = {
    load: load,
    setTeacherPose: setTeacherPose,
    setKidPose: setKidPose
  };

  CLASSROOM.characters = api;
  CLASSROOM.modules = CLASSROOM.modules || {};
  CLASSROOM.modules.characters = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
