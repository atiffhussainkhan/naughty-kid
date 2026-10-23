/* Optional Node/browser helper: ensure the Phase A slice is registered,
   then expose CLASSROOM.phaseA from game-v2/js/phase-a.js.
   Integrator wires scripts in this order:
     1) game-slices/02-phase-a/module.js
     2) game-v2/js/phase-a.js
     3) this file (optional)
*/

(function (root) {
  "use strict";

  if (typeof require === "function") {
    try { require("../../game-slices/02-phase-a/module.js"); } catch (err) {}
    try { require("./phase-a.js"); } catch (err) {}
  }

  var CLASSROOM = root.CLASSROOM || (root.CLASSROOM = {});
  if (!CLASSROOM.phaseA && CLASSROOM.modules && CLASSROOM.modules.phaseA) {
    CLASSROOM.phaseA = CLASSROOM.modules.phaseA;
  }
})(typeof globalThis !== "undefined" ? globalThis : this);
