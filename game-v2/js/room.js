/* Classroom shell. Classic script. CLASSROOM.room.load(scene).
   Primary art: Kenney Furniture Kit under assets/room/ + desk/chair/board under
   assets/props/ (see docs/classroom-game/asset-selection-3d.md).
   Layout follows docs/classroom-game/design/06-space-and-props.md:
   back wall = kids start; front wall = desk; shield side = −X; cushion side = +X.
   Room is scaled so Quaternius humanoids fit under the wall height.
   Positions fit the modules and the camera. They are not a measured room.
   Does not invent beats or prop rules. */

(function (root) {
  "use strict";

  var CLASSROOM = root.CLASSROOM || (root.CLASSROOM = {});
  CLASSROOM.modules = CLASSROOM.modules || {};

  var SCRIPT_SRC = "";
  if (typeof document !== "undefined" && document.currentScript && document.currentScript.src) {
    SCRIPT_SRC = document.currentScript.src;
  }

  /* Kenney floorFull is 1×1. Tile count is the shot, not a measured room. */
  var TILE = 1;
  var COLS = 8;
  var ROWS = 10;
  var LEFT = -COLS / 2;
  var RIGHT = COLS / 2;
  var FRONT = -ROWS / 2;
  var BACK = ROWS / 2;
  /* Walls are ~1.29 tall; teacher mesh is ~1.6. Scale the shell to clear heads. */
  var ROOM_SCALE = 1.75;

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

  function enableShadows(rootObj) {
    rootObj.traverse(function (node) {
      if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });
  }

  function bounds(model) {
    var probe = clone(model);
    probe.updateMatrixWorld(true);
    return new root.THREE.Box3().setFromObject(probe);
  }

  function add(parent, model, x, y, z, rotY) {
    var piece = clone(model);
    enableShadows(piece);
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

  /* floorFull covers [0,1]×[−1,0] in local XZ when placed at origin.
     Place at (cx, 0, cz+1) so the tile fills cell [cx,cx+1]×[cz,cz+1]. */
  function placeFloor(parent, floor, cx, cz) {
    return add(parent, floor, cx, 0, cz + 1);
  }

  function load(scene) {
    var THREE = root.THREE;
    if (!THREE) return Promise.reject(new Error("THREE is not on the page"));
    if (!scene || typeof scene.add !== "function") {
      return Promise.reject(new Error("room.load needs a scene"));
    }

    return Promise.all([
      loadModel("room/floor-full.glb"),
      loadModel("room/wall.glb"),
      loadModel("room/wall-window.glb"),
      loadModel("room/wall-doorway.glb"),
      loadModel("room/wall-corner.glb"),
      loadModel("room/bookcase-open.glb"),
      loadModel("props/desk.glb"),
      loadModel("props/chair-desk.glb"),
      loadModel("props/whiteboard-panel.glb"),
      loadModel("props/books.glb"),
      loadModel("props/lamp-table.glb")
    ]).then(function (models) {
      var floor = models[0];
      var wall = models[1];
      var windowWall = models[2];
      var doorwayWall = models[3];
      var corner = models[4];
      var bookcase = models[5];
      var deskModel = models[6];
      var chairModel = models[7];
      var boardModel = models[8];

      var deskBox = bounds(deskModel);
      var chairBox = bounds(chairModel);
      var boardBox = bounds(boardModel);
      var bookBox = bounds(bookcase);

      var room = new THREE.Group();
      room.name = "classroom";
      room.scale.set(ROOM_SCALE, ROOM_SCALE, ROOM_SCALE);
      scene.add(room);

      var floorGroup = new THREE.Group();
      floorGroup.name = "floor";
      room.add(floorGroup);

      var wallsGroup = new THREE.Group();
      wallsGroup.name = "walls";
      room.add(wallsGroup);

      var x;
      var z;
      var midDoor = Math.floor(COLS / 2) - 1;

      for (x = LEFT; x < RIGHT; x += TILE) {
        for (z = FRONT; z < BACK; z += TILE) {
          placeFloor(floorGroup, floor, x, z).name = "floor-tile";
        }
      }

      /* Front wall (−Z): desk sits against this end. Interior faces +Z. */
      for (x = LEFT; x < RIGHT; x += TILE) {
        add(wallsGroup, wall, x + 1, 0, FRONT, Math.PI).name = "wall-front";
      }

      /* Back wall (+Z): kids start here. Doorway on the center tile. */
      for (x = LEFT; x < RIGHT; x += TILE) {
        if (x === LEFT + midDoor) {
          add(wallsGroup, doorwayWall, x, 0, BACK).name = "wall-back-doorway";
        } else {
          add(wallsGroup, wall, x, 0, BACK).name = "wall-back";
        }
      }

      /* Side walls with windows. */
      for (z = FRONT; z < BACK; z += TILE) {
        add(wallsGroup, windowWall, LEFT, 0, z + 1, -Math.PI / 2).name = "wall-window-shield";
        add(wallsGroup, windowWall, RIGHT, 0, z, Math.PI / 2).name = "wall-window-cushion";
      }

      add(wallsGroup, corner, LEFT, 0, FRONT, -Math.PI / 2).name = "corner";
      add(wallsGroup, corner, RIGHT, 0, FRONT, Math.PI).name = "corner";
      add(wallsGroup, corner, LEFT, 0, BACK, 0).name = "corner";
      add(wallsGroup, corner, RIGHT, 0, BACK, Math.PI / 2).name = "corner";

      var deskZone = new THREE.Group();
      deskZone.name = "deskZone";
      room.add(deskZone);

      var shieldMat = anchor(deskZone, "shield-mat");
      shieldMat.position.set(LEFT + 1.2, 0, FRONT + 1.4);
      shieldMat.userData.offPaths = true;

      var desk = anchor(deskZone, "desk");
      /* Chair on the teacher side of the desk (toward the front wall). */
      var chairX = -chairBox.min.x - chairBox.max.x / 2;
      var chairNode = add(
        deskZone,
        chairModel,
        chairX,
        0,
        FRONT + 0.55 - chairBox.min.z
      );
      chairNode.name = "chair";
      chairNode.rotation.y = Math.PI;

      var deskX = -deskBox.min.x - deskBox.max.x / 2;
      desk.position.set(deskX, 0, FRONT + 1.15 - deskBox.min.z);
      var tableNode = add(desk, deskModel, 0, 0, 0);
      tableNode.name = "table";
      desk.updateMatrixWorld(true);

      var deskWorld = new THREE.Box3().setFromObject(desk);
      var frontEdge = deskWorld.max.z;

      /* Whiteboard on the front wall beside the desk (DESIGN-DECISION 3). */
      var whiteboard = anchor(deskZone, "whiteboard");
      whiteboard.userData.isBoard = true;
      whiteboard.userData.role = "whiteboard";
      whiteboard.position.set(
        deskWorld.max.x + boardBox.max.x * 0.55 + 0.35,
        0.35 - boardBox.min.y,
        FRONT + 0.12 - boardBox.min.z
      );
      var boardMesh = add(whiteboard, boardModel, 0, 0, 0);
      boardMesh.name = "board-panel";
      boardMesh.rotation.y = Math.PI;

      var board = whiteboard;
      var boardAlias = anchor(deskZone, "board");
      boardAlias.position.copy(whiteboard.position);
      boardAlias.userData.isBoard = true;
      boardAlias.userData.aliasOf = "whiteboard";

      var shadowSeat = anchor(deskZone, "shadow");
      shadowSeat.position.set(
        whiteboard.position.x + 0.55,
        0.9,
        FRONT + 0.15
      );
      shadowSeat.userData.castBy = "ordinary-room-light";

      var mailbox = anchor(deskZone, "mailbox");
      mailbox.position.set(RIGHT - 0.7, 0.55, FRONT + 0.85);
      mailbox.userData.cushionLineEnd = true;

      var backNode = anchor(room, "back");
      backNode.position.set(0, 0, BACK - 0.8);
      backNode.userData.openPathStart = true;

      /* Bookcase on the back wall, shield side — room shell only, not a named prop. */
      add(
        room,
        bookcase,
        LEFT + 0.3 - bookBox.min.x,
        0,
        BACK - 0.05 - bookBox.max.z
      ).name = "bookcase";

      // Side study area leaves the shared path and cushion lane unobstructed.
      var studyArea = new THREE.Group();
      studyArea.name = "side-study-area";
      room.add(studyArea);
      function furnish(model, name, cx, cz, width, elevation, angle) {
        var item = clone(model);
        item.rotation.y = angle || 0;
        var box = new THREE.Box3().setFromObject(item);
        var size = box.getSize(new THREE.Vector3());
        var scale = Math.min(width / Math.max(size.x, 0.01), 1.2 / Math.max(size.y, 0.01));
        item.scale.multiplyScalar(scale);
        box.setFromObject(item);
        var center = box.getCenter(new THREE.Vector3());
        item.position.set(cx - center.x, (elevation || 0) - box.min.y, cz - center.z);
        item.name = name;
        enableShadows(item);
        studyArea.add(item);
        item.updateMatrixWorld(true);
        return item;
      }
      [-1.8, 0, 1.8].forEach(function (row, index) {
        var studyDesk = furnish(deskModel, "side-study-desk-" + index, -2.6, row, 1.2);
        furnish(chairModel, "side-study-chair-" + index, -2.6, row + 0.65, 0.55, 0, Math.PI);
        var tableTop = new THREE.Box3().setFromObject(studyDesk).max.y / ROOM_SCALE;
        furnish(models[9], "study-books-" + index, -2.85, row, 0.3, tableTop + 0.01);
        if (index === 0) furnish(models[10], "study-lamp", -2.35, row - 0.1, 0.22, tableTop + 0.01);
      });
      furnish(bookcase, "class-library", 2.2, 4.35, 1.5, 0, Math.PI);

      var holding = anchor(room, "holding-cluster");
      holding.position.set(LEFT + 1.4, 0, BACK - 1.2);
      holding.userData.offOpenPath = true;
      holding.userData.shieldSide = true;

      var checkpoint = anchor(room, "checkpoint");
      checkpoint.position.set(0, 0.01, (BACK - 0.8 + frontEdge) / 2);
      checkpoint.userData.phaseBGate = false;
      checkpoint.userData.openPathOnly = true;

      var openPath = anchor(room, "open-path");
      openPath.userData.from = { x: 0, z: BACK - 0.8 };
      openPath.userData.to = { x: 0, z: frontEdge };

      var cushionLine = anchor(room, "cushion-line");
      cushionLine.position.set(RIGHT - 1.1, 0, 0);
      cushionLine.userData.from = { x: RIGHT - 1.1, z: BACK - 0.9 };
      cushionLine.userData.to = { x: mailbox.position.x, z: mailbox.position.z };

      room.userData.layout = {
        front: FRONT,
        back: BACK,
        left: LEFT,
        right: RIGHT,
        shieldSide: "left",
        cushionSide: "right",
        tile: TILE,
        roomScale: ROOM_SCALE,
        pack: "kenney-furniture"
      };

      return {
        room: room,
        floor: floorGroup,
        walls: wallsGroup,
        deskZone: deskZone,
        back: backNode,
        holding: holding,
        checkpoint: checkpoint,
        desk: desk,
        chair: chairNode,
        whiteboard: whiteboard,
        board: board,
        shadow: shadowSeat,
        mailbox: mailbox,
        shieldMat: shieldMat,
        openPath: openPath,
        cushionLine: cushionLine,
        layout: room.userData.layout
      };
    });
  }

  CLASSROOM.room = { load: load };
  CLASSROOM.modules.room = {
    load: load,
    viewModel: function (anchors) {
      if (!anchors) return { kind: "room", ready: false };
      return {
        kind: "room",
        ready: true,
        pack: "kenney-furniture",
        hasFloor: !!anchors.floor,
        hasWalls: !!anchors.walls,
        hasDeskZone: !!anchors.deskZone,
        hasBack: !!anchors.back,
        hasWhiteboard: !!anchors.whiteboard
      };
    }
  };
})(typeof globalThis !== "undefined" ? globalThis : this);
