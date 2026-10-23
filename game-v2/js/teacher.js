/* game-v2 teacher. Loads CLASSROOM.modules.teacher from the 04-teacher slice.
   Exposes CLASSROOM.teacher.reduce / poseFor / viewModel for the page fold. */
(function (root) {
  "use strict";

  var CLASSROOM = root.CLASSROOM || (root.CLASSROOM = {});
  CLASSROOM.modules = CLASSROOM.modules || {};

  function loadSlice() {
    if (CLASSROOM.modules.teacher && typeof CLASSROOM.modules.teacher.reduce === "function") {
      return CLASSROOM.modules.teacher;
    }
    if (typeof require === "function") {
      try {
        return require("../../game-slices/04-teacher/module.js");
      } catch (err) {
        return null;
      }
    }
    return null;
  }

  var slice = loadSlice();
  if (slice) {
    CLASSROOM.teacher = {
      reduce: slice.reduce,
      poseFor: slice.poseFor,
      viewModel: slice.viewModel,
      states: slice.states
    };
  } else {
    CLASSROOM.teacher = CLASSROOM.teacher || null;
  }

  if (typeof module !== "undefined" && module.exports) {
    if (!CLASSROOM.teacher) {
      throw new Error("game-v2 teacher needs game-slices/04-teacher/module.js");
    }
    module.exports = CLASSROOM.teacher;
  }
})(typeof globalThis !== "undefined" ? globalThis : this);
