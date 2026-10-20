import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {StreetRun,stages} from '../dist/streets.js';
import {roster} from '../dist/roster.js';
import {enemyWardrobe,regionalLightWardrobes} from '../dist/enemy-wardrobes.js';

test('light-skinned enemies use the current neighborhood wardrobe in every campaign wave',()=>{
 for(const mode of ['solo','local'])for(const stage of stages){
  const run=new StreetRun(roster[0],roster[1],mode,()=>{},()=>.5,null,'left',stage.index);
  for(let wave=0;wave<3;wave++){
   run.enemies=[];run.spawnWave();
   for(const enemy of run.enemies.filter(e=>!e.bossIdentity)){
    const wardrobe=enemyWardrobe(enemy.neighborhoodId,enemy.appearance);
    assert.ok(wardrobe.src.includes(`/neighborhoods/${stage.id}-`));
    if(enemy.appearance==='light'){
     assert.equal(wardrobe.neighborhoodId,stage.id);
     assert.ok(wardrobe.src.endsWith('-adversarios-brancos.png'));
    }else assert.equal(wardrobe.src,stage.enemyImage);
   }
  }
 }
});

test('all seven regional light-skinned atlases exist and have independent artwork and complete crop metadata',async()=>{
 assert.equal(Object.keys(regionalLightWardrobes).length,7);const hashes=new Set();
 for(const stage of stages){
  const wardrobe=enemyWardrobe(stage.id,'light');
  const image=await fs.readFile(new URL('../dist/'+wardrobe.src,import.meta.url));
  assert.equal(image.toString('hex',0,8),'89504e470d0a1a0a');
  assert.equal(image[25],6,'transparent RGBA artwork expected');
  hashes.add(createHash('sha256').update(image).digest('hex'));
  assert.equal(wardrobe.layout.columns.length,5);assert.equal(wardrobe.layout.rows.length,3);
  for(const axis of ['columns','rows']){const cuts=wardrobe.layout[axis];assert.equal(cuts[0],0);assert.equal(cuts.at(-1),1);for(let i=1;i<cuts.length;i++)assert.ok(cuts[i]>cuts[i-1])}
  assert.ok(wardrobe.wardrobe.length>40);
 }
 assert.equal(hashes.size,7,'each neighborhood needs its own wardrobe sheet');
 assert.match(enemyWardrobe('restinga','light').wardrobe,/hoodie|jacket/);
 assert.match(enemyWardrobe('alemao','light').wardrobe,/BARE FEET/);
});

test('generic light-skinned wardrobe is limited to indoor missions',()=>{
 assert.equal(enemyWardrobe(null,'light').src,'assets/inimigos-diversos.png');
 assert.equal(enemyWardrobe(null,'regional').src,'assets/inimigos-rua.png');
 for(const stage of stages)assert.notEqual(enemyWardrobe(stage.id,'light').src,enemyWardrobe(null,'light').src);
});
