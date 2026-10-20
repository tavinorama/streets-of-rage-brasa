import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
const source=(await fs.readFile(new URL('../dist/soundscape.js',import.meta.url),'utf8')).replaceAll('export ','');
function load(saved={}){
 let stored;const context={Audio:class{addEventListener(){}pause(){}play(){return Promise.resolve()}},Event:class{},window:{addEventListener(){},dispatchEvent(){}},document:{addEventListener(){}},localStorage:{getItem:()=>JSON.stringify(saved),setItem:(_,value)=>stored=JSON.parse(value)}};
 const audio=vm.runInNewContext(source+';soundscape',context);return {audio,stored};
}
test('music starts quieter and faster while retaining pitch',()=>{const {audio,stored}=load();assert.equal(audio.audio.volume,.1);assert.equal(audio.audio.playbackRate,1.25);assert.equal(audio.audio.preservesPitch,true);assert.equal(stored.mixRevision,1)});
test('previous defaults migrate, custom and revised preferences survive',()=>{
 const {audio}=load({musicVolume:.15,tempo:1.18});assert.equal(audio.musicVolume,.1);assert.equal(audio.tempo,1.25);
 const custom=load({musicVolume:.07,tempo:1.1}).audio;assert.equal(custom.musicVolume,.07);assert.equal(custom.tempo,1.1);
 const revised=load({mixRevision:1,musicVolume:.15,tempo:1.18}).audio;assert.equal(revised.musicVolume,.15);assert.equal(revised.tempo,1.18);
});
test('music mute persists across game starts and reloads and uses the native muted property',()=>{const {audio}=load();audio.unlocked=audio.running=true;audio.setMusic(false);assert.equal(audio.audio.muted,true);assert.equal(audio.musicMuted,true);audio.unlock(true);audio.setRunning(false);audio.setRunning(true);assert.equal(audio.musicOn,false);assert.equal(audio.audio.muted,true);const reloaded=load({musicOn:false}).audio;reloaded.unlocked=reloaded.running=true;reloaded.apply();assert.equal(reloaded.audio.muted,true);assert.equal(reloaded.musicOn,false);audio.setMusic(true);assert.equal(audio.audio.muted,false);assert.equal(audio.fxOn,true)});
test('zero volume and master silence also set explicit music mute',()=>{const {audio}=load({musicVolume:0});assert.equal(audio.audio.muted,true);audio.setMusic(true);assert.ok(audio.musicVolume>0);assert.equal(audio.audio.muted,false);audio.master={gain:{value:.6}};audio.enabled=false;audio.apply();assert.equal(audio.audio.muted,true);assert.equal(audio.master.gain.value,0)});
