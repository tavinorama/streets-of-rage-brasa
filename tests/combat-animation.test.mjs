import test from 'node:test';
import assert from 'node:assert/strict';
import {fallProgress,attackMotion,impactPause} from '../dist/combat-animation.js';
import {fallContact} from '../dist/asset-budget.js';
import {createMotion,stepMotion} from '../dist/physics.js';
test('zero is a valid first fall frame and every later contact advances continuously',()=>{
 const actor={dead:true,hp:0,vx:0,y:0,motion:createMotion()};const meta={anchor:.5,top:.05,bottom:.95};let previous=0;
 assert.equal(fallProgress(actor),0);assert.ok(fallContact(meta,300,fallProgress(actor)).angle===0);
 for(let i=0;i<120;i++){stepMotion(actor,1/60);const next=fallProgress(actor);assert.ok(next>=previous&&next-previous<.09);previous=next}assert.equal(previous,1);
 assert.equal(fallProgress({dead:true}),1);assert.equal(fallProgress({hp:100}),0);
});
test('attack pose waits for contact preparation and returns to neutral during recovery',()=>{
 for(const kind of ['punch','kick','special']){const f={hp:100,attackKind:kind,attackTime:.4,attackDuration:.4,attackWindup:.1};
 assert.equal(attackMotion(f).frame,0);f.attackTime=.35;assert.equal(attackMotion(f).phase,'windup');assert.ok(attackMotion(f).shift<0);
 f.attackTime=.28;assert.equal(attackMotion(f).frame,kind==='kick'?2:1);assert.ok(attackMotion(f).impact>0);
 f.attackTime=.03;assert.equal(attackMotion(f).frame,0);assert.equal(attackMotion(f).phase,'recovery');
 f.dead=true;assert.equal(attackMotion(f).frame,0)}
});
