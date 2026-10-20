import {drawFinisherScene,FINISHER_DURATION,finisherBeat} from './finisher-scenes.js';
// Optional boss finishers. Their state uses actor IDs so checkpoints and remote
// snapshots do not need to serialize references to live actors.
export function offerStreetFinisher(run,enemy){
 if(enemy.dead||enemy.enemyType!=='boss'||enemy.hp<=0||enemy.hp>enemy.maxHp*.2||enemy.finisherOffered)return false;
 enemy.finisherOffered=true;enemy.finishWindow=4;enemy.stun=Math.max(enemy.stun,4);enemy.cooldown=Math.max(enemy.cooldown,4);enemy.vx=0;
 run.announce('CHEFE VULNERÁVEL · APROXIME E FINALIZE · T / I');run.emit('finisher-ready',{enemy:enemy.index});return true;
}
export function streetFinisherTarget(run,index){const p=run.players[index];if(!p||p.dead||p.y>4||p.stun>0||run.state!=='fight'||run.finisher)return null;
 return run.enemies.find(e=>!e.dead&&e.finishWindow>0&&e.y<10&&Math.abs(e.x-p.x)<155&&Math.abs(e.lane-p.lane)<44&&(e.x-p.x)*p.facing>=-15)||null;
}
export function startStreetFinisher(run,index){const enemy=streetFinisherTarget(run,index);if(!enemy)return false;const player=run.players[index];run.finisher={player:index,enemy:enemy.index,time:FINISHER_DURATION,duration:FINISHER_DURATION};player.attackTime=0;player.invincible=0;player.vx=enemy.vx=0;player.block=false;enemy.attackTime=0;enemy.shield=0;enemy.finishWindow=0;run.projectiles=[];run.dangers=[];run.emit('fatal',{index,enemy:enemy.index,name:player.data.fatal});return true;}
export function stepStreetFinisher(run,dt){if(!run.finisher)return false;const scene=run.finisher,player=run.players[scene.player],enemy=run.enemies.find(e=>e.index===scene.enemy);if(!player||player.dead||!enemy||enemy.dead){run.finisher=null;return false}
 scene.time=Math.max(0,scene.time-dt);const beat=finisherBeat(1-scene.time/scene.duration);if(beat!==scene.beat){scene.beat=beat;run.emit('finisher-cue',{phase:beat})}
 // AI and attacks pause during the scene; gravity and secondary motion continue.
 for(const actor of [...run.players,...run.enemies]){actor.vx=0;actor.attackTime=0;run.tickBody(actor,dt)}
 if(scene.time===0){run.finisher=null;enemy.shield=0;player.attackKind='special';run.damageEnemy(enemy,enemy.maxHp*2,player,true);player.invincible=Math.max(player.invincible,1.5);run.score+=500;run.announce(player.data.fatal.toUpperCase()+' · +500 PONTOS');run.emit('finisher-complete',{index:player.index,enemy:enemy.index})}
 return true;
}
export function drawStreetFinisher(c,run,reduced=false,actors={}){const scene=run?.finisher;if(!scene)return;const winner=run.players[scene.player],loser=run.enemies.find(e=>e.index===scene.enemy);if(!winner||!loser)return;drawFinisherScene(c,{winner,loser,progress:1-scene.time/scene.duration,reduced,drawWinner:actors.winner||(()=>{}),drawLoser:actors.loser||(()=>{})})}
