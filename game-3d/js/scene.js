/* View mount. Classic script. THREE r160 is already on the page.
   The desk is at the front. This camera stands at the back and looks toward it.
   No room length is stated, so these positions are the shot, not a measurement. */

(function (root) {
  function mount(canvas) {
    var width = canvas.clientWidth || canvas.width || 1;
    var height = canvas.clientHeight || canvas.height || 1;

    var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setPixelRatio(root.devicePixelRatio || 1);
    renderer.setSize(width, height, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;

    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.5, 4);
    camera.lookAt(0, 1, 0);

    var sky = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 3);
    sky.position.set(0, 20, 0);
    scene.add(sky);

    var sun = new THREE.DirectionalLight(0xffffff, 3);
    sun.position.set(0, 10, 6);
    scene.add(sun);

    return {
      renderer: renderer,
      scene: scene,
      camera: camera,
      clock: new THREE.Clock()
    };
  }

  var classroom = root.CLASSROOM || (root.CLASSROOM = {});
  classroom.scene = { mount: mount };
})(typeof globalThis !== "undefined" ? globalThis : this);
