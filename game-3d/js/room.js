/* Classroom shell. Classic script. CLASSROOM.room.load(scene).
   Models come from assets/ next to this page. Nothing else is fetched.
   Floor and walls are the KayKit dungeon modules. The desk is table_medium.
   The chair sits at that desk. The picture frame is the board.
   The mailbox is an anchor only: these assets have no mailbox mesh.
   Positions fit the modules and the camera. They are not a measured room. */

(function (root) {
  "use strict";

  var CLASSROOM = root.CLASSROOM || (root.CLASSROOM = {});
  var SCRIPT_SRC = "";
  if (typeof document !== "undefined" && document.currentScript && document.currentScript.src) {
    SCRIPT_SRC = document.currentScript.src;
  }

  var TILE = 4;
  var FRONT = -4;
  var BACK = 4;
  var LEFT = -6;
  var RIGHT = 6;
  var WALL = 0.5;

  function asset(file) {
    if (SCRIPT_SRC) return new URL("../assets/" + file, SCRIPT_SRC).href;
    return "assets/" + file;
  }

  function loadModel(file) {
    var Loader = root.THREE && root.THREE.GLTFLoader;
    if (!Loader) return Promise.reject(new Error("THREE.GLTFLoader is not on the page"));
    var loader = new Loader();
    return new Promise(function (resolve, reject) {
      loader.load(asset(file), function (gltf) {
        resolve(gltf.scene);
      }, undefined, reject);
    });
  }

  function clone(model) {
    var copy = model.clone(true);
    copy.position.set(0, 0, 0);
    copy.rotation.set(0, 0, 0);
    copy.scale.set(1, 1, 1);
    return copy;
  }

  function bounds(model) {
    var probe = clone(model);
    probe.updateMatrixWorld(true);
    return new root.THREE.Box3().setFromObject(probe);
  }

  function add(parent, model, x, y, z, rotY) {
    var piece = clone(model);
    piece.position.set(x, y, z);
    if (rotY) piece.rotation.y = rotY;
    piece.updateMatrixWorld(true);
    parent.add(piece);
    return piece;
  }

  function anchor(parent, name) {
    var node = new root.THREE.Object3D();
    node.name = name;
    node.userData.role = name;
    parent.add(node);
    return node;
  }

  function load(scene) {
    var THREE = root.THREE;
    if (!THREE) return Promise.reject(new Error("THREE is not on the page"));
    if (!scene || typeof scene.add !== "function") return Promise.reject(new Error("room.load needs a scene"));

    return Promise.all([
      loadModel("floor_wood_large.gltf.glb"),
      loadModel("wall.gltf.glb"),
      loadModel("wall_doorway.glb"),
      loadModel("wall_window_closed.gltf.glb"),
      loadModel("table_medium.gltf"),
      loadModel("chair_A.gltf"),
      loadModel("pictureframe_large_A.gltf")
    ]).then(function (models) {
      var floor = models[0];
      var wall = models[1];
      var doorway = models[2];
      var windowWall = models[3];
      var table = models[4];
      var chair = models[5];
      var frame = models[6];
      var floorBox = bounds(floor);
      var tableBox = bounds(table);
      var chairBox = bounds(chair);
      var frameBox = bounds(frame);
      var floorY = -floorBox.max.y;
      var side = Math.PI / 2;
      var room = new THREE.Group();
      var x;
      var z;

      room.name = "classroom";
      scene.add(room);

      for (x = LEFT + TILE / 2; x < RIGHT; x += TILE) {
        for (z = FRONT + TILE / 2; z < BACK; z += TILE) {
          add(room, floor, x, floorY, z).name = "floor";
        }
      }

      add(room, wall, -TILE, 0, BACK).name = "wall";
      add(room, doorway, 0, 0, BACK).name = "wall-doorway";
      add(room, wall, TILE, 0, BACK).name = "wall";

      add(room, wall, -TILE, 0, FRONT).name = "wall";
      add(room, wall, 0, 0, FRONT).name = "wall";
      add(room, wall, TILE, 0, FRONT).name = "wall";

      for (z = FRONT + TILE / 2; z < BACK; z += TILE) {
        add(room, windowWall, LEFT, 0, z, side).name = "wall-window";
        add(room, windowWall, RIGHT, 0, z, side).name = "wall-window";
      }

      var frontInner = FRONT + WALL;
      var backInner = BACK - WALL;
      var desk = anchor(room, "desk");
      var chairNode = add(room, chair, 0, 0, frontInner - chairBox.min.z);
      chairNode.name = "chair";

      var chairWorld = new THREE.Box3().setFromObject(chairNode);
      desk.position.set(0, 0, chairWorld.max.z - 0.12 - tableBox.min.z);
      var tableNode = add(desk, table, 0, 0, 0);
      tableNode.name = "table";
      desk.updateMatrixWorld(true);

      var deskWorld = new THREE.Box3().setFromObject(desk);
      var frontEdge = deskWorld.max.z;
      var backNode = anchor(room, "back");
      backNode.position.set(desk.position.x, 0, backInner - 0.35);

      var checkpoint = anchor(room, "checkpoint");
      checkpoint.position.set(desk.position.x, 0, (backInner + frontEdge) / 2);
      checkpoint.userData.phaseBGate = false;

      var board = anchor(room, "board");
      board.userData.isBoard = true;
      board.position.set(
        deskWorld.max.x + frameBox.max.x + 0.4,
        1.15 - frameBox.min.y,
        frontInner - frameBox.min.z + 0.02
      );
      add(board, frame, 0, 0, 0).name = "pictureframe";

      var mailbox = anchor(room, "mailbox");
      mailbox.position.set(RIGHT - WALL - 0.55, 1.05, frontInner + 0.45);

      return {
        back: backNode,
        checkpoint: checkpoint,
        desk: desk,
        board: board,
        mailbox: mailbox
      };
    });
  }

  CLASSROOM.room = { load: load };
})(typeof globalThis !== "undefined" ? globalThis : this);
