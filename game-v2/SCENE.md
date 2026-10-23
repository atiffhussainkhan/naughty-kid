# Classroom scene (Agent 02)

Integrators: load Three r160, attach `THREE.GLTFLoader`, then:

```js
var view = CLASSROOM.scene.mount(canvas);
CLASSROOM.room.load(view.scene).then(function (anchors) {
  // anchors.desk, .whiteboard, .back, .checkpoint, .mailbox, .holding, …
});
```

Scripts: `js/scene.js`, `js/room.js`. Preview: `scene-preview.html`.

Primary meshes: Kenney under `assets/room/` + `assets/props/desk.glb`, `chair-desk.glb`, `whiteboard-panel.glb` (`asset-selection-3d.md`).

Details: `dev/02-scene/README.md`.
