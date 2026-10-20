import test from 'node:test';
import assert from 'node:assert/strict';
import {createMotion,stepMotion,stepVertical} from '../dist/physics.js';
globalThis.matchMedia??=()=>({matches:false,addEventListener(){}});
const {spriteVertex}=await import('../dist/motion-render.js');
const actor=()=>({index:0,data:{id:'lula'},x:100,lane:450,y:0,vy:0,vx:230,hp:100,facing:1,motion:createMotion()});
for(const defeat of [{dead:true,hp:80},{dead:false,hp:0}])test(`defeated actors stop walking and secondary cycles (${JSON.stringify(defeat)})`,()=>{
 const f=actor();for(let i=0;i<20;i++){f.x+=4;stepMotion(f,1/60)}assert.ok(f.motion.walk>.5);const gait=f.motion.gait,breath=f.motion.breath;Object.assign(f,defeat,{y:120,vy:80,attackTime:.4,attackKind:'kick',attackDuration:.6,stun:.3});
 for(let i=0;i<180;i++){f.x+=1;stepVertical(f,1/60);stepMotion(f,1/60)}
 assert.equal(f.y,0);assert.equal(f.vy,0);assert.equal(f.motion.walk,0);assert.equal(f.motion.gait,gait);assert.equal(f.motion.breath,breath);assert.equal(f.motion.pose,0);assert.equal(f.motion.action,'fall');assert.equal(f.motion.fall,1);
 Object.assign(f.motion,{walk:1,gait:2,breath:1,cloth:.2,hair:.2,landing:.8,action:'kick',attackPhase:.4});
 for(const [u,v]of [[.2,.9],[.7,.8],[.45,.4],[.5,.12]])assert.deepEqual(spriteVertex(u,v,200,300,.5,.95,.05,f,1),spriteVertex(u,v,200,300,.5,.95,.05,f,10));
 // Respawning must immediately restore the normal movement cycle.
 const beforeRespawn=f.motion.gait;Object.assign(f,{hp:100,dead:false,attackTime:0,stun:0});f.x+=5;stepMotion(f,1/60);assert.ok(f.motion.gait>beforeRespawn);assert.notEqual(f.motion.action,'fall');
});
test('living actors retain walking and breathing animation',()=>{const f=actor();stepMotion(f,1/60);for(let i=0;i<30;i++){f.x+=4;stepMotion(f,1/60)}assert.ok(f.motion.walk>.8);assert.ok(f.motion.gait>0);assert.ok(f.motion.breath>0);assert.notDeepEqual(spriteVertex(.2,.9,200,300,.5,.95,.05,f,1),spriteVertex(.2,.9,200,300,.5,.95,.05,{...f,motion:{...f.motion,gait:f.motion.gait+1}},2))});
