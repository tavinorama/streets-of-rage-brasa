import test from 'node:test';
import assert from 'node:assert/strict';
import {spring,createMotion,stepMotion,resolveBodies,stepVertical} from '../dist/physics.js';
import {roster} from '../dist/roster.js';
test('secondary motion reacts to acceleration and settles without unstable springs',()=>{
 let p=1,v=0;for(let i=0;i<300;i++)[p,v]=spring(p,v,0,65,9,1/60);assert.ok(Math.abs(p)<.001);assert.ok(Math.abs(v)<.001);
 const f={data:roster[3],index:0,motion:createMotion(),vx:230,y:0,hp:100,facing:1};stepMotion(f,1/60);assert.ok(f.motion.hair<0);assert.ok(f.motion.cloth<0);f.vx=0;for(let i=0;i<500;i++)stepMotion(f,1/60);assert.ok(Math.abs(f.motion.hair)<.001);assert.ok(Math.abs(f.motion.cloth)<.001);
 f.stun=.3;stepMotion(f,1/60);assert.equal(f.motion.expression,'pain');f.stun=0;f.hp=20;stepMotion(f,1/60);assert.equal(f.motion.expression,'exhausted');
});
test('colliding bodies separate in proportion to mass and reduce closing speed',()=>{
 const a={x:500,y:0,vx:120,mass:60},b={x:550,y:0,vx:-60,mass:120};resolveBodies(a,b);assert.ok(Math.abs(b.x-a.x-82)<1e-9);assert.ok(500-a.x>b.x-550);assert.ok(a.vx-b.vx<180);
});
test('gravity produces a bounded jump, one landing and a stationary ground contact',()=>{const f={y:0,vy:600,motion:createMotion()};let peak=0,landings=0,speed=0;for(let i=0;i<120;i++){stepVertical(f,1/60,1500,v=>{landings++;speed=v});peak=Math.max(peak,f.y)}assert.ok(peak>115&&peak<132);assert.equal(landings,1);assert.ok(speed>500);assert.equal(f.y,0);assert.equal(f.vy,0)});
