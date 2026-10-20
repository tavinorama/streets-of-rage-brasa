// Deterministic playthroughs use only normal controls/attacks: no HP or damage cheats.
import {writeFile,mkdir} from 'node:fs/promises';
import {StreetRun} from '../dist/streets.js';
import {roster} from '../dist/roster.js';
let seed=12345;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
const configs=roster.map((f,i)=>({fighter:f.id,side:i%2?'right':'left',difficulty:'standard',mode:'solo'}));
for(const side of ['left','right'])for(const difficulty of ['story','standard','arcade'])for(const mode of ['solo','local'])configs.push({fighter:side==='left'?'lula':'flavio',side,difficulty,mode});
const results=[];
for(const config of configs){seed=12345;const fighter=roster.find(f=>f.id===config.fighter),partner=roster.find(f=>f.id===(config.side==='left'?'janja':'jair'));let hits=0,downs=0,clears=0;
 const run=new StreetRun(fighter,partner,config.mode,type=>{if(type==='hurt')hits++;if(type==='down')downs++;if(type==='stageclear')clears++},random,null,config.side,0,{difficulty:config.difficulty});
 let frames=0;
 for(;frames<60*1800&&!['victory','gameover'].includes(run.state);frames++){
  if(run.state==='stageclear'){run.nextStage();continue}
  const inputs=run.players.map(p=>{if(p.dead)return {};const enemies=run.livingEnemies,target=enemies.reduce((best,e)=>!best||Math.abs(e.x-p.x)+Math.abs(e.lane-p.lane)*2<Math.abs(best.x-p.x)+Math.abs(best.lane-p.lane)*2?e:best,null);
   if(!target)return {right:true};const dx=target.x-p.x,dy=target.lane-p.lane;const input={left:dx<-90,right:dx>90,up:dy<-8,down:dy>8};
   if(Math.abs(dx)<170&&Math.abs(dy)<35){// A direction press changes facing through the normal input handler.
    input.left=dx<0;input.right=dx>0;
    if(target.finishWindow>0)run.attack(p.index,'fatal');
    else run.attack(p.index,p.meter>=100?'super':p.meter>=25?'special':'kick');
   }
   const danger=run.dangers.some(d=>Math.abs(d.x-p.x)<d.radius&&Math.abs(d.lane-p.lane)<40&&d.delay<.4);
   if(danger)input.jump=true;return input});
  run.update(1/60,inputs);
  for(const a of [...run.players,...run.enemies])for(const key of ['x','lane','y','hp','meter'])if(!Number.isFinite(a[key]))throw Error(config.fighter+': invalid '+key);
 }
 results.push({...config,result:run.state,stage:run.stageIndex+1,seconds:Math.round(frames/60),score:run.score,kills:run.kills,hits,downs,clears,lives:run.players.map(p=>p.lives)});
 console.log(JSON.stringify(results.at(-1)));
}
await mkdir('validation',{recursive:true});await writeFile('validation/campaign-balance.json',JSON.stringify({method:'Scripted controls at 60 Hz, fixed seed 12345, no direct damage or HP modification. Not human playtesting.',results},null,2));
