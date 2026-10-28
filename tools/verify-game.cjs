#!/usr/bin/env node
'use strict';
// Real shipped dispatch and existing regressions. GPU rendering is tested separately.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const ROOT = path.resolve(process.env.NAUTIKID_ROOT || path.join(__dirname, '..'));
const ENTRY = path.join(ROOT, 'game-v2/index.html');
const html = fs.readFileSync(ENTRY, 'utf8');
function attr(source, key) { return (source.match(new RegExp('\\b' + key + '\\s*=\\s*(["\'])(.*?)\\1', 'i')) || [])[2]; }
const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)].map(m => ({ src: attr(m[1], 'src'), type: attr(m[1], 'type'), code: m[2] }));
let checks = 0;
const failures = [];
function ok(value, label) { checks++; assert.ok(value, label); }
function eq(value, expected, label) { checks++; assert.equal(value, expected, label); }
function rel(file) { return path.relative(ROOT, file).split(path.sep).join('/'); }
function local(base, uri) {
  const file = path.resolve(base, decodeURIComponent(uri.split(/[?#]/)[0]));
  ok(file.startsWith(ROOT + path.sep), 'resource escapes repository: ' + uri);
  ok(fs.existsSync(file) && fs.statSync(file).isFile(), 'missing resource: ' + rel(file));
  ok(fs.statSync(file).size > 0, 'empty resource: ' + rel(file));
  return file;
}
function walk(dir) { return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]); }
async function section(name, run) {
  try { console.log('PASS ' + name + ': ' + await run()); }
  catch (error) { failures.push({ name, error }); console.error('FAIL ' + name + ': ' + error.message); }
}
function existingTests() {
  const names = ['session', 'phase-a', 'phase-b', 'teacher', 'movement', 'space', 'options', 'cues', 'edges', 'audit'];
  const files = names.map((name, i) => `game-slices/${String(i + 1).padStart(2, '0')}-${name}/module.js`).concat(
    ['session', 'edges', 'session-edges', 'phase-a', 'phase-b', 'teacher-move-bind'].map(name => `game-v2/js/${name}.js`),
    ['dev/07-props/self-test.js', 'dev/08-host-ui/self-check.js']);
  const errors = [];
  for (const file of files) {
    const result = spawnSync(process.execPath, [path.join(ROOT, file)], { cwd: ROOT, encoding: 'utf8', timeout: 30000 });
    checks++;
    if (result.error || result.status !== 0) errors.push(file + ': ' + (result.error || (result.stdout + result.stderr).trim()));
  }
  assert.equal(errors.length, 0, errors.join('\n'));
  return `${files.length}/${files.length} documented self-tests`;
}
function audit() {
  const resources = new Set(), parsed = new Set(), external = new Set();
  function reference(base, uri) {
    if (/^(?:data:|blob:|#|mailto:)/i.test(uri)) return null;
    if (/^(?:https?:)?\/\//i.test(uri)) { external.add(uri); return null; }
    const file = local(base, uri); resources.add(file); return file;
  }
  function js(file) {
    if (parsed.has(file)) return;
    parsed.add(file);
    const source = fs.readFileSync(file, 'utf8');
    if (/^\s*(?:import\s|export\s)/m.test(source)) {
      const result = spawnSync(process.execPath, ['--check', '--input-type=module'], { input: source, encoding: 'utf8' });
      eq(result.status, 0, 'module syntax: ' + rel(file) + ' ' + result.stderr);
    } else { new vm.Script(source, { filename: rel(file) }); checks++; }
    for (const m of source.matchAll(/\b(?:from|import)\s*(?:\(\s*)?["']([^"']+)["']/g)) {
      if (m[1] === 'three') reference(path.dirname(ENTRY), 'vendor/three/build/three.min.js');
      else if (m[1].startsWith('.')) js(reference(path.dirname(file), m[1]));
    }
  }
  for (const script of scripts) {
    if (script.src) { const file = reference(path.dirname(ENTRY), script.src); if (file) js(file); }
    else if (script.type === 'importmap') { JSON.parse(script.code); checks++; }
    else if (!script.type || script.type === 'text/javascript') { new vm.Script(script.code); checks++; }
  }
  for (const m of html.matchAll(/<(?:link|img|source)\b([^>]*)>/gi)) {
    const uri = attr(m[1], 'href') || attr(m[1], 'src'); if (!uri) continue;
    const file = reference(path.dirname(ENTRY), uri);
    if (file && file.endsWith('.css')) for (const u of fs.readFileSync(file, 'utf8').matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)) reference(path.dirname(file), u[1]);
  }
  for (const m of html.matchAll(/\b(?:LOADER_URL|UTILS_URL)\s*=\s*["']([^"']+)["']/g)) {
    const file = reference(path.dirname(ENTRY), m[1]); if (file) js(file);
  }
  let models = 0;
  for (const file of walk(path.join(ROOT, 'game-v2/assets'))) {
    if (!/\.(?:gltf|glb)$/i.test(file)) continue;
    const bytes = fs.readFileSync(file); let data, binary = 0;
    if (file.endsWith('.glb')) {
      eq(bytes.toString('ascii', 0, 4), 'glTF', 'GLB magic: ' + rel(file));
      eq(bytes.readUInt32LE(4), 2, 'GLB version: ' + rel(file));
      eq(bytes.readUInt32LE(8), bytes.length, 'GLB length: ' + rel(file));
      for (let at = 12; at < bytes.length;) {
        const size = bytes.readUInt32LE(at), kind = bytes.readUInt32LE(at + 4); at += 8;
        ok(size % 4 === 0 && at + size <= bytes.length, 'GLB chunk bounds: ' + rel(file));
        if (kind === 0x4E4F534A) data = JSON.parse(bytes.toString('utf8', at, at + size));
        if (kind === 0x004E4942) binary = size;
        at += size;
      }
    } else data = JSON.parse(bytes.toString('utf8'));
    eq(data.asset.version, '2.0', 'glTF version: ' + rel(file));
    for (const buffer of data.buffers || []) {
      let length = binary;
      if (buffer.uri && buffer.uri.startsWith('data:')) length = Buffer.from(buffer.uri.split(',')[1], 'base64').length;
      else if (buffer.uri) { const dep = reference(path.dirname(file), buffer.uri); ok(dep, 'model buffer must be local'); length = fs.statSync(dep).size; }
      ok(length >= buffer.byteLength, 'truncated model buffer: ' + rel(file));
    }
    for (const image of data.images || []) if (image.uri) reference(path.dirname(file), image.uri);
    models++;
  }
  eq(external.size, 0, 'remote entry dependencies: ' + [...external].join(', '));
  return `${resources.size} local resources, ${parsed.size} JS files, ${models} model headers/buffers/dependencies; no remote entry requirements`;
}
const compiled = new Map();
function element(id) {
  const classes = new Set(), events = {};
  return { id, style: {}, dataset: {}, children: [], textContent: '', innerHTML: '', value: '',
    classList: { add: n => classes.add(n), remove: n => classes.delete(n), contains: n => classes.has(n), toggle(n, on) { if (on === undefined ? !classes.has(n) : on) classes.add(n); else classes.delete(n); } },
    appendChild(child) { this.children.push(child); return child; }, append(...kids) { this.children.push(...kids); }, remove() {}, setAttribute() {}, getAttribute() { return null; },
    addEventListener(type, fn) { (events[type] || (events[type] = [])).push(fn); }, dispatchEvent(e) { (events[e.type] || []).forEach(fn => fn(e)); },
    querySelector() { return element('query'); }, querySelectorAll() { return []; }, getBoundingClientRect() { return { left: 0, top: 0, width: 800, height: 600 }; } };
}
async function boot() {
  const elements = new Map(), get = id => { if (!elements.has(id)) elements.set(id, element(id)); return elements.get(id); };
  const context = vm.createContext({ console, URL, Blob, Promise, setTimeout, clearTimeout, performance: { now: () => 0 }, location: { href: 'http://classroom.test/game-v2/index.html' },
    document: { currentScript: null, body: element('body'), getElementById: get, createElement: element, querySelector: () => element('query'), querySelectorAll: () => [] },
    addEventListener() {}, removeEventListener() {}, requestAnimationFrame() { return 1; }, fetch() { return Promise.reject(Error('Node harness does not use network')); } });
  context.window = context;
  for (const [i, script] of scripts.entries()) {
    // Load actual game modules in HTML order; GPU/vendor execution is browser QA.
    if (script.src) {
      if (/^(?:https?:)?\/\//.test(script.src) || script.src.includes('vendor/three/')) continue;
      const file = local(path.dirname(ENTRY), script.src);
      context.document.currentScript = { src: 'http://classroom.test/' + rel(file) };
      if (!compiled.has(file)) compiled.set(file, new vm.Script(fs.readFileSync(file, 'utf8'), { filename: rel(file) }));
      compiled.get(file).runInContext(context);
    } else if (!script.type || script.type === 'text/javascript') {
      context.document.currentScript = null; new vm.Script(script.code, { filename: `entry inline ${i + 1}` }).runInContext(context);
    }
  }
  await new Promise(resolve => setImmediate(resolve));
  ok(context.CLASSROOM && typeof context.CLASSROOM.dispatch === 'function', 'entry must expose actual dispatch');
  return { api: context.CLASSROOM, elements };
}
function send(app, type, payload = {}) {
  app.api.dispatch({ type, payload }); ok(app.api.state && typeof app.api.state === 'object', type + ' publishes state'); return app.api.state;
}
function beat(state, phase, index, label) { eq(state.phase, phase, label + ' phase'); eq(state.beat, index, label + ' beat'); }
function setup(app, picks, kids = 2) {
  send(app, 'lockPicks', picks); const state = send(app, 'startPhaseA', { kids }); beat(state, 'A', 1, 'setup'); eq(state.kids.length, kids, 'cast count'); return state;
}
async function round(picks, index) {
  const app = await boot(); let state = setup(app, picks, index % 2 ? 3 : 2);
  send(app, 'beat10Spray', { target: 'desk', gentle: true, dance: true }); ok(!app.api.state.finals.b && !app.api.state.sessionWon, 'cannot skip first finale');
  state = send(app, 'beat1Step', { underFoot: picks.noisemaker === 'bubble wrap' ? 'bubble wrap' : 'squeaky', backSideOfLine: true }); beat(state, 'A', 2, 'noisy walk');
  send(app, 'hostStir'); state = send(app, 'beat2Throw', { onMat: true }); eq(state.laughing, true, 'plush starts laugh'); eq(state.laughSeconds, 5, 'five-second laugh');
  state = send(app, 'beat2LaughEnd'); beat(state, 'A', 3, 'laugh ends'); send(app, 'beat3Eyes', { moving: false, laughed: false }); state = send(app, 'hostSleep'); beat(state, 'A', 4, 'sleep after eyes');
  state = send(app, 'beat4Note', { noticed: false }); beat(state, 'A', 5, 'unnoticed note');
  state = send(app, 'beat5Prize', { caught: false, blast: picks.victory.includes('confetti') ? 'confetti' : 'popper', overHead: true });
  ok(state.finals.a && !state.finals.b && !state.sessionWon, 'first finale is not session win');
  state = send(app, 'beginPhaseB', { kidsAtRear: false, activity: picks.activity }); eq(state.phase, 'A', 'handoff requires return to rear');
  state = send(app, 'beginPhaseB', { kidsAtRear: true, activity: picks.activity }); beat(state, 'B', 6, 'handoff');
  const spots = JSON.stringify(state.kids.map(k => k.spot)); state = send(app, 'beat6Step', { wrong: true, kid: state.kids[0].id });
  eq(state.phaseB.whoopeeCount, 3, 'exactly three whoopees'); eq(JSON.stringify(state.kids.map(k => k.spot)), spots, 'noise never sends kids back');
  state = send(app, 'beat6Step', { allOffMailboxSide: true }); beat(state, 'B', 7, 'path ends'); state = send(app, 'beat7Pass', { dropped: true }); eq(state.beat, 7, 'drop stays on beat');
  state = send(app, 'beat7Pass', { feet: true, dropped: false }); beat(state, 'B', 8, 'feet pass'); state = send(app, 'beat8Draw', index % 2 ? { picture: 'hat' } : { quiet: true }); beat(state, 'B', 9, 'drawing or pause');
  state = send(app, 'beat9Yell', { voice: 'monster', phrase: 'The broccoli has landed!', crawl: index % 2 === 1 }); beat(state, 'B', 10, 'yell ends');
  state = send(app, 'beat10Mailbox'); ok(state.phaseB.mailbox && !state.sessionWon, 'mailbox does not win');
  const target = picks.stringTarget.includes('shoes') ? 'shoes' : 'desk';
  state = send(app, 'beat10Spray', { target, gentle: true, dance: false }); ok(!state.sessionWon && !state.finals.b, 'dance required');
  state = send(app, 'beat10Spray', { target: target === 'desk' ? 'shoes' : 'desk', gentle: true, dance: true }); ok(!state.sessionWon && !state.finals.b, 'locked target required');
  state = send(app, 'beat10Spray', { target, gentle: true, dance: true }); ok(state.finals.a && state.finals.b && state.sessionWon, 'both finales win'); eq(state.phase, 'won', 'won phase');
  ok(app.elements.get('win').classList.contains('on'), 'win overlay appears');
  state = send(app, 'restartSession'); ok(!state.phase && state.beat === 0 && !state.finals.a && !state.finals.b, 'restart clears beat/phase/finales');
  ok(!state.sessionWon && !state.phaseAEnded && !state.phaseBWon, 'restart clears terminal flags'); ok(!state.phaseB || !state.phaseB.mailbox, 'restart clears note');
  ok(state.kids.every(k => k.spot === 0 && !k.frozen && !k.statue), 'restart resets every kid'); ok(!app.elements.get('win').classList.contains('on'), 'restart hides win');
  const changed = { ...picks, prize: picks.prize === 'a toy' ? 'a golden trophy' : 'a toy' }; setup(app, changed); eq(app.api.state.picks.prize, changed.prize, 'replay accepts different pick');
}
async function outcomes() {
  const lists = { prize: ['a golden trophy', 'a toy', 'a bucket of treats'], noisemaker: ['a squeaky dog toy', 'bubble wrap'], victory: ['pop a safe party popper', "throw a handful of paper confetti over the teacher's head"], activity: ['standing facing a whiteboard', 'typing on a computer', 'reading a big book'], stringTarget: ["the teacher's desk", "the teacher's shoes"] };
  const keys = Object.keys(lists), cases = [];
  function combine(i, picks) { if (i === keys.length) { cases.push({ ...picks }); return; } for (const value of lists[keys[i]]) { picks[keys[i]] = value; combine(i + 1, picks); } }
  combine(0, {});
  for (const [index, picks] of cases.entries()) try { await round(picks, index); } catch (error) { error.message = `setup ${index + 1}/${cases.length} ${JSON.stringify(picks)}: ` + error.message; throw error; }
  return cases.length + ' setup combinations through ten beats, both finales and replay';
}
(async () => {
  await section('existing tests', existingTests); await section('static entry/model audit', audit); await section('actual entry dispatch outcomes/replay', outcomes);
  if (failures.length) { for (const f of failures) console.error('\n' + f.name + '\n' + f.error.stack); console.error(`\nRESULT: FAIL (${failures.length} section(s), ${checks} assertions reached)`); process.exitCode = 1; }
  else console.log(`\nRESULT: PASS (${checks} assertions; browser/WebGL checks separate)`);
})();
