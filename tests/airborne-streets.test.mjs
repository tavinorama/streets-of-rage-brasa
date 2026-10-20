import test from 'node:test';
import assert from 'node:assert/strict';
import {roster} from '../dist/roster.js';
const tick=(g,t)=>{for(let n=0;n<Math.ceil(t*60);n++)g.update(1/60,[{},{}])};
import {StreetRun} from '../dist/streets.js';
test('defeated airborne enemies land and fade during combat and after victory',()=>{
 for(const lastWave of [false,true]){const m=new StreetRun(roster[0],roster[1],'solo',()=>{},()=>.5,'stf');tick(m,2.1);if(lastWave)m.wave=3;const e=m.enemies[0];e.y=100;e.vy=30;m.damageEnemy(e,1000,m.players[0]);if(lastWave)for(const other of m.livingEnemies)m.damageEnemy(other,1000,m.players[0]);tick(m,1);assert.equal(e.y,0);assert.equal(e.deathTime,0);assert.equal(m.state,lastWave?'victory':'fight')}
});
test('defeated airborne players fall while awaiting respawn or on game over',()=>{
 for(const finalLife of [false,true]){const m=new StreetRun(roster[0],roster[1],'solo',()=>{},()=>.5,'stf');tick(m,2.1);const p=m.players[0];p.y=120;p.vy=0;p.invincible=0;if(finalLife)p.lives=1;m.damagePlayer(p,1000,m.enemies[0]);tick(m,1);assert.equal(p.y,0);assert.equal(p.vy,0);assert.ok(p.dead);if(finalLife)assert.equal(m.state,'gameover')}
});
