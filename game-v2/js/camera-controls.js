(function (root) {
  "use strict";
  var CLASSROOM = root.CLASSROOM || (root.CLASSROOM = {});

  function mount(view, canvas) {
    var document = root.document;
    if (!document || !document.body || !view || typeof view.setViewMode !== "function") return null;
    if (canvas && canvas.__cameraControls) canvas.__cameraControls.destroy();
    var button = document.createElement("button");
    button.type = "button";
    button.className = "camera-view-toggle";
    button.style.cssText = "position:fixed;top:calc(12px + env(safe-area-inset-top,0px));right:calc(12px + env(safe-area-inset-right,0px));z-index:6;min-height:44px;padding:10px 16px;border:2px solid #f4efe4;border-radius:12px;background:#172638;color:#fff;font:600 14px/1.2 system-ui,sans-serif;cursor:pointer;box-shadow:0 3px 12px #0006";
    function update() {
      var overview = view.getViewMode() === "overview";
      button.textContent = overview ? "Play view" : "Overview";
      button.setAttribute("aria-pressed", String(overview));
      button.setAttribute("aria-label", overview ? "Return to the closer play-area view" : "Show the whole classroom overview");
      button.title = overview ? "Closer view of the shared play area" : "Fit the whole classroom on screen";
    }
    function toggle() {
      view.setViewMode(view.getViewMode() === "overview" ? "play" : "overview");
      update();
    }
    button.addEventListener("click", toggle);
    document.body.appendChild(button);
    update();
    var api = { update: update, destroy: function () {
      button.removeEventListener("click", toggle);
      if (button.parentNode) button.parentNode.removeChild(button);
      if (canvas && canvas.__cameraControls === api) canvas.__cameraControls = null;
    } };
    if (canvas) canvas.__cameraControls = api;
    return api;
  }

  CLASSROOM.cameraControls = { mount: mount };
  if (typeof module !== "undefined" && module.exports) module.exports = CLASSROOM.cameraControls;
})(typeof globalThis !== "undefined" ? globalThis : this);
