'use strict';
const assert = require('node:assert/strict');
const controls = require('../js/player-controls.js');
let n=0;
function check(actual, expected){ assert.deepEqual(actual, expected); n++; }
check(controls.model({}).active,false);
for(let beat=1;beat<=10;beat++){
 const m=controls.model({phase:beat<6?'A':'B',beat,kids:[{id:'kid-1'}]});
 check(m.active,true); check(m.title,`Mission ${beat} / 10`); assert.ok(m.objective.length>20); n++;
}
check(controls.model({phase:'won',beat:10}).title,'Mischief accomplished!');
const kid={id:'kid-2'};
check(controls.keyAction({code:'KeyW'},kid,true),{type:'kidStep',id:'kid-2'});
check(controls.keyAction({code:'Space'},kid,true),{type:'kidStill',id:'kid-2'});
for(const tagName of ['INPUT','SELECT','BUTTON','TEXTAREA'])check(controls.keyAction({code:'KeyW',target:{tagName}},kid,true),null);
for(const flag of ['repeat','ctrlKey','metaKey','altKey'])check(controls.keyAction({code:'KeyW',[flag]:true},kid,true),null);
check(controls.keyAction({code:'ArrowUp'},kid,false),null);
check(controls.keyAction({code:'ArrowUp'},null,true),null);
check(controls.keyAction({code:'ArrowDown'},kid,true),{type:'kidStill',id:'kid-2'});
check(controls.keyAction({code:'KeyW',target:{isContentEditable:true}},kid,true),null);
globalThis.CLASSROOM.ui={viewModel:()=>({controls:[{type:'kidStep'},{type:'hostSetup'},{type:'beat4Note'},{type:'hostWake',off:true}]})};
check(controls.model({phase:'A',beat:4}).actions,[{type:'beat4Note'}]);
console.log(`Player controls: ${n} assertions passed`);
