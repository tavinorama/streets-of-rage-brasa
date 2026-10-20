export const clamp=(v,a,b)=>Math.max(a,Math.min(v,b));
export const approach=(value,target,rate,dt)=>target+(value-target)*Math.exp(-rate*dt);
export function spring(position,velocity,target,stiffness,damping,dt){const acceleration=(target-position)*stiffness-velocity*damping;velocity+=acceleration*dt;position+=velocity*dt;return [position,velocity]}
export function createMotion(index=0){return {hair:0,hairV:0,cloth:0,clothV:0,body:0,bodyV:0,gait:0,walk:0,breath:index*1.5,blink:0,blinkClock:2.7+index*.7,pose:0,oldPose:0,blend:1,lastVx:0,action:'idle',actionTime:0,attackPhase:0,landing:0,fall:0,expression:'neutral'}}
// Vertical motion keeps running when combat input stops or an actor is defeated.
export function stepVertical(f,dt,gravity=1500,onLand=()=>{}){
 if(f.y<=0&&f.vy<=0){f.y=0;f.vy=0;return false}
 f.y+=f.vy*dt;f.vy-=gravity*dt;
 if(f.y>0)return false;
 const speed=Math.abs(f.vy);f.y=0;f.vy=0;
 if(f.motion){f.motion.landing=Math.min(1,speed/700);f.motion.hairV-=speed*.002;f.motion.clothV-=speed*.001}
 onLand(speed);return true;
}
export function stepMotion(f,dt,state='fight'){
 const m=f.motion??=createMotion(f.index),defeated=f.dead||f.hp<=0,accel=clamp((f.vx-m.lastVx)/Math.max(dt,.001),-2400,2400);m.lastVx=f.vx;const dx=Number.isFinite(f.x)?f.x-(m.lastX??f.x):0,dl=Number.isFinite(f.lane)?f.lane-(m.lastLane??f.lane):0; m.lastX=f.x;m.lastLane=f.lane;const travel=Math.hypot(dx,dl*.8),distance=travel<60?travel:0,groundSpeed=f.y===0?distance/Math.max(dt,.001):0;
 // Defeat keeps gravity and the contact rotation, but stops all living action cycles.
 if(defeated){m.walk=0;m.action='fall';m.actionTime=0;m.attackPhase=0;m.pose=0;m.oldPose=0;m.blend=1;m.body=m.bodyV=m.hair=m.hairV=m.cloth=m.clothV=m.landing=m.blink=0;m.expression='exhausted';m.fall=approach(m.fall,1,5,dt);if(1-m.fall<.001)m.fall=1;return}
 m.breath+=dt*(f.hp<35?4.5:2.9);m.walk=approach(m.walk,!f.dead&&groundSpeed>18?Math.min(1,groundSpeed/230):0,10,dt);if(f.y===0&&!f.dead)m.gait+=distance*.045;
 const action=f.dead?'fall':f.stun>0?'hurt':f.block?'guard':f.attackTime>0?f.attackKind:f.y>0?'jump':m.walk>.75?'run':m.walk>.1?'walk':'idle';if(action!==m.action){m.action=action;m.actionTime=0}else m.actionTime+=dt;m.attackPhase=f.attackTime>0?clamp(1-f.attackTime/(f.attackDuration||.6),0,1):0;
 const hurt=f.stun>0,desiredBody=hurt?-.12*f.facing:clamp(f.vx/4500,-.055,.055);[m.body,m.bodyV]=spring(m.body,m.bodyV,desiredBody,145,18,dt);
 [m.hair,m.hairV]=spring(m.hair,m.hairV,-accel*.000055-f.vx*.00012,65,9,dt);m.hair=clamp(m.hair,-.32,.32);
 [m.cloth,m.clothV]=spring(m.cloth,m.clothV,-accel*.00004-f.vx*.0001,85,10,dt);m.cloth=clamp(m.cloth,-.28,.28);
 m.landing=approach(m.landing,0,12,dt);m.blinkClock-=dt;m.blink=Math.max(0,m.blink-dt);if(m.blinkClock<=0){m.blink=.14;m.blinkClock=3.1+Math.sin(m.breath)*.8}
 const pose=f.attackTime>0?(f.attackKind==='kick'?2:1):0;if(pose!==m.pose){m.oldPose=m.pose;m.pose=pose;m.blend=0}m.blend=Math.min(1,m.blend+dt*13);
 m.expression=state==='result'?(f.hp>0?'victory':'exhausted'):hurt?'pain':f.block?'guard':f.attackTime>0?'strain':f.hp<30?'exhausted':'neutral';
 const fallTarget=f.dead||f.hp<=0?1:0;m.fall=approach(m.fall,fallTarget,5,dt);
}
export function addInjury(f,amount,random=Math.random){const side=random()<.5?-1:1;f.injuries??=[];f.injuries.push({x:side*(5+random()*7),y:18+random()*15,r:3+Math.min(5,amount*.16),kind:amount>15?'bruise':f.injuries.length%3===2?'cut':'redness',rotation:(random()-.5)*1.2});if(f.injuries.length>14)f.injuries.shift()}
export function resolveBodies(a,b){const gap=Math.abs(a.x-b.x);if(gap>=82||Math.abs(a.y-b.y)>=120)return;const sign=a.x<=b.x?1:-1,overlap=82-gap,total=a.mass+b.mass;
 a.x=clamp(a.x-sign*overlap*b.mass/total,120,1160);b.x=clamp(b.x+sign*overlap*a.mass/total,120,1160);
 const closing=(a.vx-b.vx)*sign;if(closing>0){const impulse=closing/(1/a.mass+1/b.mass)*.3;a.vx-=sign*impulse/a.mass;b.vx+=sign*impulse/b.mass}
}
