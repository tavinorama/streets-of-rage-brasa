import test from 'node:test';import assert from 'node:assert/strict';
import {StreetRun} from '../dist/streets.js';import {roster} from '../dist/roster.js';
const create=()=>{const m=new StreetRun(roster[0],roster[1]);for(let i=0;i<130;i++)m.update(1/60);m.wave=2;m.enemies=[];m.spawnWave();return m};
test('bosses can recover from repeated stun without losing the optional finisher window',()=>{const m=create(),e=m.enemies.find(e=>e.enemyType==='boss'),p=m.players[0];
 for(let i=0;i<4;i++)m.damageEnemy(e,1,p,true);assert.ok(e.armor>0);assert.ok(e.stun<=.1);const hp=e.hp;m.damageEnemy(e,10,p,true);assert.equal(e.hp,hp-7);assert.ok(e.stun<.1);
 e.armor=0;e.hp=e.maxHp*.21;m.damageEnemy(e,e.maxHp*.02,p);assert.ok(e.finishWindow>0);assert.ok(e.stun>=4);
});
test('energy and score count actual health lost, with bounded special protection',()=>{const m=create(),p=m.players[0],e=m.enemies.find(e=>e.enemyType==='street');e.hp=1;p.meter=0;const score=m.score;m.damageEnemy(e,99999,p);assert.equal(p.meter,.4);assert.equal(m.score-score,208);p.cooldown=0;p.meter=25;p.invincible=0;assert.ok(m.attack(0,'special'));assert.equal(p.invincible,.2)});
