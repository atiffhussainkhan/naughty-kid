/* View mount and classroom lighting. Classic script.
   CLASSROOM.scene.mount(canvas) → { renderer, scene, camera, clock, lights }.
   Ordinary room light faces the front wall so a standing teacher can cast a
   shadow beside the board (design/06, beat 8). No measured room size. */

(function (root) {
  "use strict";

  var CLASSROOM = root.CLASSROOM || (root.CLASSROOM = {});
  CLASSROOM.modules = CLASSROOM.modules || {};

  function fitCamera(camera, bounds) {
    return frameBounds(camera, bounds, new root.THREE.Vector3(12, 19, 20).normalize());
  }

  function frameBounds(camera, bounds, direction) {
    var THREE = root.THREE;
    if (!bounds || bounds.isEmpty()) return;
    var center = bounds.getCenter(new THREE.Vector3());
    camera.position.copy(center).add(direction);
    camera.lookAt(center);
    camera.updateMatrixWorld(true);
    var inverse = camera.quaternion.clone().invert();
    var tanY = Math.tan(camera.fov * Math.PI / 360) * 0.90;
    var tanX = tanY * Math.max(0.1, camera.aspect);
    var distance = 1;
    for (var x = 0; x < 2; x++) for (var y = 0; y < 2; y++) for (var z = 0; z < 2; z++) {
      var point = new THREE.Vector3(x ? bounds.max.x : bounds.min.x,
        y ? bounds.max.y : bounds.min.y, z ? bounds.max.z : bounds.min.z)
        .sub(center).applyQuaternion(inverse);
      distance = Math.max(distance, point.z + Math.abs(point.x) / tanX,
        point.z + Math.abs(point.y) / tanY);
    }
    camera.position.copy(center).addScaledVector(direction, distance);
    camera.near = 0.1;
    camera.far = Math.max(100, distance + bounds.getSize(new THREE.Vector3()).length() * 2);
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld(true);
  }

  function playAreaBounds(bounds) {
    var THREE = root.THREE;
    if (!bounds || bounds.isEmpty()) return null;
    var center = bounds.getCenter(new THREE.Vector3());
    var size = bounds.getSize(new THREE.Vector3());
    return new THREE.Box3(
      new THREE.Vector3(center.x - size.x * 0.20, bounds.min.y, bounds.min.z + size.z * 0.06),
      new THREE.Vector3(center.x + size.x * 0.20, bounds.max.y, bounds.max.z - size.z * 0.06)
    );
  }

  function fitPlayCamera(camera, bounds) {
    var area = playAreaBounds(bounds);
    if (!area) return;
    frameBounds(camera, area, new root.THREE.Vector3(4, 11, 16).normalize());
  }

  function mount(canvas) {
    var THREE = root.THREE;
    if (!THREE) throw new Error("THREE is not on the page");
    if (!canvas) throw new Error("scene.mount needs a canvas");

    var width = canvas.clientWidth || canvas.width || 1;
    var height = canvas.clientHeight || canvas.height || 1;

    var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setPixelRatio(Math.min(root.devicePixelRatio || 1, 2));
    renderer.setSize(width, height, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0xb8c4ce);
    scene.fog = new THREE.Fog(0xb8c4ce, 35, 75);

    var roomBounds = new THREE.Box3(new THREE.Vector3(-8, 0, -10), new THREE.Vector3(8, 3, 10));
    var camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 80);
    var viewMode = "play";
    var cutawayWalls = [];
    camera.position.set(12, 19, 20);
    fitPlayCamera(camera, roomBounds);

    var lights = addLighting(scene, THREE);

    function frameView() {
      for (var i = 0; i < cutawayWalls.length; i++) {
        cutawayWalls[i].node.visible = viewMode === "play" ? false : cutawayWalls[i].visible;
      }
      if (viewMode === "overview") fitCamera(camera, roomBounds);
      else fitPlayCamera(camera, roomBounds);
      scene.fog.near = camera.position.length() + 15;
      scene.fog.far = scene.fog.near + 60;
      if (canvas.setAttribute) canvas.setAttribute("data-camera-view", viewMode);
    }

    var view = {
      renderer: renderer,
      scene: scene,
      camera: camera,
      clock: new THREE.Clock(),
      lights: lights,
      updateFocus: function (state, dt) {
        if (viewMode !== "play" || !state || !state.phase) return;
        var id = CLASSROOM.selectedKidId || (state.kids && state.kids[0] && state.kids[0].id);
        var actor = scene.getObjectByName("kid-" + id);
        if (!actor) return;
        var target = actor.getWorldPosition(new THREE.Vector3()).add(new THREE.Vector3(0, 0.9, -1.2));
        var desired = target.clone().add(new THREE.Vector3(4, 5, 8));
        camera.position.lerp(desired, 1 - Math.exp(-Math.max(0, dt) * 4));
        camera.lookAt(target);
        camera.updateMatrixWorld(true);
      },
      getViewMode: function () { return viewMode; },
      setViewMode: function (mode) {
        if (mode !== "play" && mode !== "overview") return false;
        viewMode = mode;
        frameView();
        if (view.controls && view.controls.update) view.controls.update();
        return true;
      },
      fitRoom: function (room) {
        var bounds = new THREE.Box3().setFromObject(room);
        if (bounds.isEmpty()) return;
        for (var i = 0; i < cutawayWalls.length; i++) cutawayWalls[i].node.visible = cutawayWalls[i].visible;
        cutawayWalls = [];
        room.traverse(function (node) {
          if (node.name === "wall-back" || node.name === "wall-back-doorway") {
            cutawayWalls.push({ node: node, visible: node.visible });
          }
        });
        roomBounds = bounds;
        frameView();
      },
      resize: function () {
        var w = canvas.clientWidth || canvas.width || 1;
        var h = canvas.clientHeight || canvas.height || 1;
        camera.aspect = w / h;
        frameView();
        renderer.setSize(w, h, false);
      }
    };
    frameView();
    if (CLASSROOM.cameraControls && typeof CLASSROOM.cameraControls.mount === "function") {
      view.controls = CLASSROOM.cameraControls.mount(view, canvas);
    }
    return view;
  }

  function addLighting(scene, THREE) {
    var hemi = new THREE.HemisphereLight(0xf2f6ff, 0x6b5a48, 0.85);
    hemi.name = "hemi";
    hemi.position.set(0, 12, 0);
    scene.add(hemi);

    /* Soft fill from the windowed sides. */
    var fill = new THREE.DirectionalLight(0xfff2e0, 0.55);
    fill.name = "fill";
    fill.position.set(-6, 7, 3);
    scene.add(fill);

    /* Key / ordinary room light: from back-ceiling toward the front wall.
       Casts the teacher shadow used when facing the whiteboard. */
    var key = new THREE.DirectionalLight(0xfff8ef, 1.35);
    key.name = "key";
    key.position.set(2.0, 12, 10);
    key.target.position.set(1.5, 1.4, -5.5);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.near = 1;
    key.shadow.camera.far = 40;
    key.shadow.camera.left = -16;
    key.shadow.camera.right = 16;
    key.shadow.camera.top = 16;
    key.shadow.camera.bottom = -16;
    key.shadow.bias = -0.00035;
    scene.add(key);
    scene.add(key.target);

    var rim = new THREE.DirectionalLight(0xdde8ff, 0.35);
    rim.name = "rim";
    rim.position.set(5, 4, -6);
    scene.add(rim);

    var deskLamp = new THREE.PointLight(0xffe6c8, 0.55, 14, 2);
    deskLamp.name = "deskLamp";
    deskLamp.position.set(0, 3.2, -5.5);
    scene.add(deskLamp);

    return { hemi: hemi, fill: fill, key: key, rim: rim, deskLamp: deskLamp };
  }

  CLASSROOM.scene = { mount: mount, addLighting: addLighting, fitCamera: fitCamera,
    fitPlayCamera: fitPlayCamera, playAreaBounds: playAreaBounds };
  CLASSROOM.modules.scene = {
    mount: mount,
    viewModel: function () {
      return { kind: "scene", hasLighting: true };
    }
  };
})(typeof globalThis !== "undefined" ? globalThis : this);
