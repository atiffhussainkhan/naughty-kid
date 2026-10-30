const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const THREE = require('../vendor/three/build/three.min.js');
const source = fs.readFileSync(path.join(__dirname, '../js/scene.js'), 'utf8');
const context = { THREE };
vm.runInNewContext(source, context);
const api = context.CLASSROOM.scene;
const bounds = new THREE.Box3(new THREE.Vector3(-7, 0, -8.75), new THREE.Vector3(7, 3.4, 8.75));
let corners = 0;
for (const aspect of [0.35, 0.6, 1, 1.5, 2.4, 3.5]) {
  const overview = new THREE.PerspectiveCamera(42, aspect, 0.1, 100);
  const play = overview.clone();
  api.fitCamera(overview, bounds);
  api.fitPlayCamera(play, bounds);
  const projectedHeight = camera => Math.abs(new THREE.Vector3(0, 1.35, 6.3).project(camera).y - new THREE.Vector3(0, 0, 6.3).project(camera).y);
  assert.ok(projectedHeight(play) > projectedHeight(overview) * 1.4, 'Play view must visibly enlarge the characters');
  const area = api.playAreaBounds(bounds);
  for (const x of [area.min.x, area.max.x]) for (const y of [area.min.y, area.max.y]) for (const z of [area.min.z, area.max.z]) {
    const point = new THREE.Vector3(x, y, z).project(play);
    assert.ok(Math.abs(point.x) <= 0.901 && Math.abs(point.y) <= 0.901);
    assert.ok(point.z > -1 && point.z < 1);
    corners++;
  }
  for (const position of [[-.55, 0, 6.3], [.55, 1.35, 6.3], [.85, 0, -5.8], [.85, 1.75, -5.8]]) {
    const point = new THREE.Vector3(...position).project(play);
    assert.ok(Math.abs(point.x) < 1 && Math.abs(point.y) < 1, 'Teacher and kids remain in the play frame');
  }
}
class Renderer {
  constructor(options) { this.domElement = options.canvas; this.shadowMap = {}; }
  setPixelRatio() {}
  setSize(width, height) { this.size = [width, height]; }
}
const mountContext = { THREE: { ...THREE, WebGLRenderer: Renderer } };
vm.runInNewContext(source, mountContext);
const canvas = { clientWidth: 1000, clientHeight: 700, setAttribute(name, value) { this[name] = value; } };
const view = mountContext.CLASSROOM.scene.mount(canvas);
assert.equal(view.getViewMode(), 'play');
assert.equal(canvas['data-camera-view'], 'play');
assert.equal(view.setViewMode('overview'), true);
const room = new THREE.Mesh(new THREE.BoxGeometry(14, 3.4, 17.5));
room.position.y = 1.7;
const rear = new THREE.Object3D(); rear.name = 'wall-back';
const doorway = new THREE.Object3D(); doorway.name = 'wall-back-doorway'; doorway.visible = false;
const front = new THREE.Object3D(); front.name = 'wall-front';
room.add(rear, doorway, front);
view.fitRoom(room);
assert.equal(rear.visible, true);
assert.equal(doorway.visible, false);
canvas.clientWidth = 390; canvas.clientHeight = 600;
view.resize();
assert.equal(view.getViewMode(), 'overview');
assert.equal(view.camera.aspect, 390 / 600);
const expected = new THREE.PerspectiveCamera(42, 390 / 600, .1, 100);
api.fitCamera(expected, new THREE.Box3().setFromObject(room));
assert.ok(view.camera.position.distanceTo(expected.position) < 1e-9, 'Overview retains the existing fitCamera behavior');
assert.equal(view.setViewMode('play'), true);
assert.equal(rear.visible, false, 'Near rear wall must not hide the players in Play view');
assert.equal(doorway.visible, false);
assert.equal(front.visible, true, 'Front wall remains in the classroom');
const beforeInvalid = view.camera.position.clone();
assert.equal(view.setViewMode('invalid'), false);
assert.ok(view.camera.position.equals(beforeInvalid));
view.resize();
assert.equal(view.getViewMode(), 'play');

const button = { style: {}, attributes: {}, addEventListener(type, fn) { this[type] = fn; }, removeEventListener(type) { delete this[type]; }, setAttribute(name, value) { this.attributes[name] = value; } };
const body = { children: [], appendChild(node) { this.children.push(node); node.parentNode = this; }, removeChild(node) { this.children.splice(this.children.indexOf(node), 1); node.parentNode = null; } };
const controlsContext = { document: { body, createElement() { return button; } } };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../js/camera-controls.js'), 'utf8'), controlsContext);
const controls = controlsContext.CLASSROOM.cameraControls.mount(view, canvas);
assert.equal(button.textContent, 'Overview');
assert.equal(button.attributes['aria-pressed'], 'false');
button.click();
assert.equal(view.getViewMode(), 'overview');
assert.equal(rear.visible, true, 'Overview restores the original room');
assert.equal(doorway.visible, false, 'Originally hidden walls remain hidden');
assert.equal(button.textContent, 'Play view');
assert.equal(button.attributes['aria-pressed'], 'true');
button.click();
assert.equal(view.getViewMode(), 'play');
controls.destroy();
assert.equal(body.children.length, 0);
assert.equal(canvas.__cameraControls, null);
console.log(`PASS: ${corners} play-area corners, larger characters, actor framing, mode persistence, Overview parity, rear cutaway restoration and accessible toggle`);
const pupil = new THREE.Group(); pupil.name='kid-test'; pupil.position.set(0,.2,6); view.scene.add(pupil);
mountContext.CLASSROOM.selectedKidId='test';
view.setViewMode('play');
for(let i=0;i<120;i++)view.updateFocus({phase:'A',kids:[{id:'test'}]},1/60);
const foot=pupil.position.clone().project(view.camera);
const head=pupil.position.clone().add(new THREE.Vector3(0,1.35,0)).project(view.camera);
assert.ok(Math.abs(foot.x)<.85 && Math.abs(head.x)<.85 && Math.abs(foot.y)<.85 && Math.abs(head.y)<.85,'selected pupil fits follow view');
assert.ok(Math.abs(head.y-foot.y)>.2,'selected pupil occupies a readable screen height');
view.setViewMode('overview'); const fixed=view.camera.position.clone();
view.updateFocus({phase:'A',kids:[{id:'test'}]},1);
assert.ok(view.camera.position.equals(fixed),'Overview does not follow the pupil');
