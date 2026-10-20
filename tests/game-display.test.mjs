import test from 'node:test';
import assert from 'node:assert/strict';
import {fitGameView} from '../dist/game-display.js';
test('landscape fullscreen preserves the whole world and its aspect ratio',()=>{
 for(const [w,h] of [[844,390],[932,430],[1280,720]]){const v=fitGameView(w,h,[280,1000]);assert.ok(v.width<=w+.001&&v.height<=h+.001);assert.ok(Math.abs(v.width/v.height-1280/620)<.0001);assert.ok(v.left>=0&&v.top>=0)}
});
test('portrait camera enlarges nearby combat while retaining both fighters',()=>{
 const full=fitGameView(390,660,[]),near=fitGameView(390,660,[590,680]);assert.ok(near.scale>full.scale*2);for(const x of [590,680]){const screen=near.left+x*near.scale;assert.ok(screen>50&&screen<340)}
 const far=fitGameView(390,660,[110,1170]);for(const x of [110,1170])assert.ok(far.left+x*far.scale>=0&&far.left+x*far.scale<=390);
});
