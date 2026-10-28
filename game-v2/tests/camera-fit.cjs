const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const THREE = require('../vendor/three/build/three.min.js');
const context = { THREE };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../js/scene.js'), 'utf8'), context);
let checks = 0;
for (const aspect of [0.35, 0.6, 1, 1.5, 2.4, 3.5]) {
  for (const scale of [0.5, 1, 3]) {
    const bounds = new THREE.Box3(new THREE.Vector3(-8, 0, -10).multiplyScalar(scale), new THREE.Vector3(8, 3, 10).multiplyScalar(scale));
    const camera = new THREE.PerspectiveCamera(42, aspect, 0.1, 80);
    context.CLASSROOM.scene.fitCamera(camera, bounds);
    for (const x of [bounds.min.x, bounds.max.x]) for (const y of [bounds.min.y, bounds.max.y]) for (const z of [bounds.min.z, bounds.max.z]) {
      const projected = new THREE.Vector3(x, y, z).project(camera);
      assert.ok(Math.abs(projected.x) <= 0.901 && Math.abs(projected.y) <= 0.901, `Clipped corner at aspect ${aspect}`);
      assert.ok(projected.z > -1 && projected.z < 1, 'Depth clipping');
      checks++;
    }
  }
}
console.log(`PASS: ${checks} room corners fit across 6 screen ratios and 3 room scales`);
