import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import {STREET_BODY_HEIGHT,streetScale,spriteHeight,enemySize} from '../dist/street-presentation.js';
import {StreetRun,stages} from '../dist/streets.js';
import {roster} from '../dist/roster.js';

test('all campaign waves mix regional and light-skinned opponents in solo and co-op',()=>{
 for(const mode of ['solo','local'])for(let stage=0;stage<stages.length;stage++){
  const run=new StreetRun(roster[0],roster[1],mode,()=>{},()=>.5,null,'left',stage);
  for(let wave=0;wave<3;wave++){
   run.enemies=[];run.spawnWave();
   assert.deepEqual(new Set(run.enemies.filter(e=>!e.bossIdentity).map(e=>e.appearance)),new Set(['light','regional']));
  }
 }
});

test('different sprite padding cannot make enemies tower over players',async()=>{
 const geometry=JSON.parse(await fs.readFile(new URL('../dist/assets/sprite-frames.json',import.meta.url)));
 for(const meta of [...Object.values(geometry).flat(),{top:.02,bottom:.99},{top:.22,bottom:.84}])for(const lane of [422,500,565]){
  const height=spriteHeight(meta)*(meta.bottom-meta.top)*streetScale(lane);
  assert.ok(Math.abs(height-STREET_BODY_HEIGHT*streetScale(lane))<1e-8);
  assert.ok(height*enemySize('heavy')/height<=1.08);
  assert.ok(height*enemySize('boss')/height<=1.08+1e-10);
 }
});
