'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const source=process.argv[2]||path.join(__dirname,'../js/characters.js');
const c={}; vm.runInNewContext(fs.readFileSync(source,'utf8'),c);const api=c.CLASSROOM.characters;
let checks=0;function eq(a,b){assert.equal(a,b);checks++;}
for(const [teacher,pose] of [['Asleep','sleep'],['Starting to wake','stir'],['Laughing for 5 seconds','laugh'],['Wakes up','idle'],['Eyes open','idle'],['Typing','typing'],['Reading','reading']])eq(api.presentation({teacher}).teacherPose,pose);
eq(api.presentation({teacher:'Asleep',laughing:true}).teacherPose,'laugh');
eq(api.presentation({phase:'B',teacher:'Standing',picks:{activity:'standing facing a whiteboard'}}).facing,'board');
eq(api.presentation({phase:'B',teacher:'Facing the whiteboard'}).facing,'board');
eq(api.presentation({phase:'B',teacher:'Turned away investigating',picks:{activity:'standing facing a whiteboard'}}).facing,'room');
eq(api.viewModel({phase:'won',kids:[{id:'kid-1',frozen:true},{id:'kid-2'}]}).kids[0].pose,'dance');
eq(api.viewModel({phase:'A',kids:[{id:'kid-1',frozen:true,moving:true}]}).kids[0].pose,'freeze');
eq(api.viewModel({phase:'A',kids:[{id:'kid-1',moving:true}]}).kids[0].pose,'walk');
api.sync({teacher:'Laughing for 5 seconds'});eq(api.viewModel({teacher:'Asleep'}).teacher.pose,'sleep');
eq(api.presentation({}).teacherPose,'sleep');
const repo=path.resolve(__dirname,'../..');
for(const file of ['teacher.glb','kid-a.glb','kid-b.glb']){const b=fs.readFileSync(path.join(repo,'game-v2/assets/characters',file));const j=JSON.parse(b.subarray(20,20+b.readUInt32LE(12)));for(const clip of ['Idle','Walk','Victory','SitDown'])eq(j.animations.some(a=>a.name===clip),true);}
console.log('Character presentation: '+checks+' assertions passed');
