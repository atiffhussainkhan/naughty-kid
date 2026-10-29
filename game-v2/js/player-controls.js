(function (root) {
  'use strict';
  var C = root.CLASSROOM || (root.CLASSROOM = {});
  var objectives = [
    'Walk with your noisy shoes. Stop before the checkpoint.',
    'When the teacher stirs, throw the plush onto the shield mat.',
    'Freeze when the eyes open. Keep a straight face!',
    'Sneak up and stick a note on the teacher without being noticed.',
    'Reach the desk, claim your prize and use your chosen celebration.',
    'Choose your way across the cushions. A wrong step makes a noise.',
    'Pass the giant sunglasses down the line using only your feet.',
    'When the teacher faces the board, draw on the shadow with the flashlight.',
    'Make a monster yell while the other kids crawl toward the mailbox.',
    'Deliver the note, then gently spray silly string and dance!'
  ];
  function model(state) {
    state = state || {};
    var beat = Number(state.beat) || 0;
    var teacher = state.teacher;
    if (teacher && typeof teacher === 'object') teacher = teacher.posture || teacher.state || teacher.activity;
    if (state.laughing) teacher = 'Laughing — movement allowed';
    else if (state.phase === 'B') teacher = state.phaseB && state.phaseB.doodleWindowOpen ? 'Facing the whiteboard' : 'Strict teacher · ' + ((state.picks && state.picks.activity) || 'standing');
    else if (state.phase === 'won') teacher = 'Finale complete';
    else if (beat === 3 && teacher === 'Starting to wake') teacher = 'Asleep';
    var active = state.phase === 'A' || state.phase === 'B';
    var transition = state.phase === 'A' && state.finals && state.finals.a;
    var vm = C.ui && C.ui.viewModel ? C.ui.viewModel(state) : {controls: []};
    return {
      beat: beat, active: active, won: state.phase === 'won',
      title: state.phase === 'won' ? 'Mischief accomplished!' : beat ? 'Mission ' + beat + ' / 10' : 'Welcome to NautiKid',
      objective: transition ? 'Phase A complete! Return to the back and start Phase B.' : state.phase === 'won' ? 'Both finales complete. Ready for another round?' : objectives[beat - 1] || 'Sneak past the teacher, play ten classroom pranks, and celebrate together. Start a classic game or open Class setup.',
      teacher: teacher ? String(teacher).replace(/([a-z])([A-Z])/g, '$1 $2') : 'Waiting for class',
      kids: Array.isArray(state.kids) ? state.kids : [],
      actions: (vm.controls || []).filter(function (a) { return ['hostSetup','kidStep','kidStill','restartSession'].indexOf(a.type) === -1 && !a.off && !(a.type === 'startPhaseA' && !state.picks); })
    };
  }
  function isTeacherCue(action) {
    return !!(action.host || /^host/.test(action.type) || action.type === 'beat3Eyes' || action.type === 'beat2LaughEnd' || (action.type === 'beat8Draw' && action.payload && (action.payload.openWindow || action.payload.quiet)));
  }
  function keyAction(event, kid, active) {
    var target = event.target || {};
    if (event.repeat || event.ctrlKey || event.metaKey || event.altKey || target.isContentEditable || /^(INPUT|TEXTAREA|SELECT|BUTTON)$/.test(target.tagName || '')) return null;
    if (!active || !kid) return null;
    if (event.code === 'KeyW' || event.code === 'ArrowUp') return {type: 'kidStep', id: kid.id};
    if (event.code === 'Space' || event.code === 'KeyS' || event.code === 'ArrowDown') return {type: 'kidStill', id: kid.id};
    return null;
  }
  function mount(parent, getState, dispatch) {
    var box = document.createElement('section');
    box.className = 'player-hud'; box.setAttribute('aria-label', 'Player controls');
    parent.appendChild(box);
    var selected = 0, last = '', alive = true, frame;
    function node(tag, text, cls) { var e = document.createElement(tag); e.textContent = text; if (cls) e.className = cls; return e; }
    function button(text, fn, cls) { var b = node('button', text, cls); b.type = 'button'; b.addEventListener('click', fn); return b; }
    function send(action) { dispatch(action); draw(true); }
    function draw(force) {
      var state = getState() || {}, vm = model(state);
      selected = vm.kids.length ? selected % vm.kids.length : 0;
      C.selectedKidId = vm.active && vm.kids[selected] ? String(vm.kids[selected].id) : null;
      var key = JSON.stringify([vm, selected]);
      if (!force && key === last) return;
      var focus = box.contains(document.activeElement) ? document.activeElement.textContent : null;
      last = key; box.replaceChildren();
      var head = node('div', '', 'player-heading');
      head.appendChild(node('strong', vm.title));
      head.appendChild(node('span', 'Teacher: ' + vm.teacher, 'teacher-state'));
      var setup = button('Class setup', function () {
        var open = parent.classList.toggle('host-panel-open');
        setup.setAttribute('aria-expanded', String(open));
        root.dispatchEvent(new Event('resize'));
      });
      setup.setAttribute('aria-expanded', String(parent.classList.contains('host-panel-open')));
      head.appendChild(setup);
      box.appendChild(head); box.appendChild(node('p', vm.objective, 'player-objective'));
      var meter = document.createElement('progress'); meter.max = 10; meter.value = vm.won ? 10 : Math.max(0, vm.beat - 1); meter.setAttribute('aria-label', 'Completed missions'); box.appendChild(meter);
      var row = node('div', '', 'player-buttons');
      if (!vm.active && !vm.won && !state.picks) {
        row.appendChild(button('Play classic setup', function () {
          var lists = C.modules.hostUi.lists(), picks = {};
          Object.keys(lists).forEach(function (k) { picks[k] = lists[k][0]; });
          var result = C.modules.options.lockPicks(picks);
          if (!result || result.ok !== true) return;
          send({type:'lockPicks', payload:picks}); send({type:'startPhaseA'});
        }, 'player-start'));
      }
      if (vm.active) {
        var kid = vm.kids[selected];
        row.appendChild(button('Player ' + (selected + 1) + ' · switch', function () { selected++; draw(true); }));
        var move = button('↑ Step · W', function () { if (kid) send({type:'kidStep', id:kid.id}); }); move.disabled = !kid || kid.frozen; row.appendChild(move);
        row.appendChild(button('Freeze · Space', function () { if (kid) send({type:'kidStill', id:kid.id}); }));
        if (kid && kid.frozen) row.appendChild(node('span', 'Frozen — wait for the teacher to sleep', 'player-frozen'));
      }
      box.appendChild(row);
      var actions = node('div', '', 'player-mission-actions');
      var cues = node('details', '', 'teacher-cues');
      cues.appendChild(node('summary', 'Teacher cues · host controls'));
      var teacherButtons = node('div', '', 'player-buttons');
      vm.actions.forEach(function (a) {
        var control = button(a.label, function () { var payload = Object.assign({}, a.payload || {}); if (vm.kids[selected]) payload.id = vm.kids[selected].id; send({type:a.type, payload:payload}); }, isTeacherCue(a) ? 'teacher-action' : '');
        (isTeacherCue(a) ? teacherButtons : actions).appendChild(control);
      });
      box.appendChild(actions);
      if (teacherButtons.childElementCount) { cues.appendChild(teacherButtons); box.appendChild(cues); }
      if (focus) Array.from(box.querySelectorAll('button')).some(function (b) { if (b.textContent !== focus) return false; if (b.closest('details')) b.closest('details').open = true; b.focus({preventScroll:true}); return true; });
      if (vm.active) box.appendChild(node('small', 'Teacher cues remain host-controlled. W / ↑ step · Space / S freeze. Use mission buttons to interact.'));
    }
    function keydown(e) { var vm = model(getState()), action = keyAction(e, vm.kids[selected], vm.active); if (action) { e.preventDefault(); send(action); } }
    function tick() { if (!alive) return; draw(false); frame = root.requestAnimationFrame(tick); }
    root.addEventListener('keydown', keydown); draw(true); frame = root.requestAnimationFrame(tick);
    return {destroy:function () { alive = false; root.cancelAnimationFrame(frame); root.removeEventListener('keydown', keydown); box.remove(); }};
  }
  C.playerControls = {mount:mount, model:model, keyAction:keyAction, isTeacherCue:isTeacherCue};
  if (typeof module !== 'undefined' && module.exports) module.exports = C.playerControls;
})(typeof globalThis !== 'undefined' ? globalThis : this);
