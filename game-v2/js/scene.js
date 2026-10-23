/* View mount and classroom lighting. Classic script.
   CLASSROOM.scene.mount(canvas) → { renderer, scene, camera, clock, lights }.
   Ordinary room light faces the front wall so a standing teacher can cast a
   shadow beside the board (design/06, beat 8). No measured room size. */

(function (root) {
  "use strict";

  var CLASSROOM = root.CLASSROOM || (root.CLASSROOM = {});
  CLASSROOM.modules = CLASSROOM.modules || {};

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
    scene.fog = new THREE.Fog(0xb8c4ce, 18, 42);

    /* Camera stands inside near the back and looks toward the front desk.
       Room shell is Kenney tiles × roomScale (~1.75); depth ~±8.75 after scale. */
    var camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 80);
    camera.position.set(0.5, 7.2, 7.4);
    camera.lookAt(0.3, 1.1, -4.5);

    var lights = addLighting(scene, THREE);

    return {
      renderer: renderer,
      scene: scene,
      camera: camera,
      clock: new THREE.Clock(),
      lights: lights,
      resize: function () {
        var w = canvas.clientWidth || canvas.width || 1;
        var h = canvas.clientHeight || canvas.height || 1;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
      }
    };
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

  CLASSROOM.scene = { mount: mount, addLighting: addLighting };
  CLASSROOM.modules.scene = {
    mount: mount,
    viewModel: function () {
      return { kind: "scene", hasLighting: true };
    }
  };
})(typeof globalThis !== "undefined" ? globalThis : this);
