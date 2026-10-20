export const clamp=(v,a,b)=>Math.max(a,Math.min(v,b));
export const approach=(value,target,rate,dt)=>target+(value-target)*Math.exp(-rate*dt);
export function spring(position,velocity,target,stiffness,damping,dt){const acceleration=(target-position)*stiffness-velocity*damping;velocity+=acceleration*dt;position+=velocity*dt;return [position,velocity]}
export function createMotion(index=0){return {hair:0,hairV:0,cloth:0,clothV:0,body:0,bodyV:0,gait:0,walk:0,breath:index*1.5,blink:0,blinkClock:2.7+index*.7,pose:0,oldPose:0,blend:1,lastVx:0,landing:0,fall:0,expression:'neutral'}}
export function stepMotion(f,dt,state='fight'){
 const m=f.motion??=createMotion(f.index),accel=clamp((f.vx-m.lastVx)/Math.max(dt,.001),-2400,2400);m.lastVx=f.vx;m.breath+=dt*(f.hp<35?4.5:2.9);m.walk=approach(m.walk,Math.abs(f.vx)>18&&f.y===0?Math.min(1,Math.abs(f.vx)/230):0,10,dt);m.gait+=Math.abs(f.vx)*dt*.045;
 const hurt=f.stun>0,desiredBody=hurt?-.12*f.facing:clamp(f.vx/4500,-.055,.055);[m.body,m.bodyV]=spring(m.body,m.bodyV,desiredBody,145,18,dt);
 [m.hair,m.hairV]=spring(m.hair,m.hairV,-accel*.000055-f.vx*.00012,65,9,dt);m.hair=clamp(m.hair,-.32,.32);
 [m.cloth,m.clothV]=spring(m.cloth,m.clothV,-accel*.00004-f.vx*.0001,85,10,dt);m.cloth=clamp(m.cloth,-.28,.28);
 m.landing=approach(m.landing,0,12,dt);m.blinkClock-=dt;m.blink=Math.max(0,m.blink-dt);if(m.blinkClock<=0){m.blink=.14;m.blinkClock=3.1+Math.sin(m.breath)*.8}
 const pose=f.attackTime>0?(f.attackKind==='kick'?2:1):0;if(pose!==m.pose){m.oldPose=m.pose;m.pose=pose;m.blend=0}m.blend=Math.min(1,m.blend+dt*13);
 m.expression=state==='result'?(f.hp>0?'victory':'exhausted'):hurt?'pain':f.block?'guard':f.attackTime>0?'strain':f.hp<30?'exhausted':'neutral';
 const fallTarget=state==='roundover'&&f.hp===0?1:0;m.fall=approach(m.fall,fallTarget,5,dt);
}
export function addInjury(f,amount,random=Math.random){const side=random()<.5?-1:1;f.injuries??=[];f.injuries.push({x:side*(5+random()*7),y:18+random()*15,r:3+Math.min(5,amount*.16),kind:amount>15?'bruise':f.injuries.length%3===2?'cut':'redness',rotation:(random()-.5)*1.2});if(f.injuries.length>14)f.injuries.shift()}
export function resolveBodies(a,b){const gap=Math.abs(a.x-b.x);if(gap>=82||Math.abs(a.y-b.y)>=120)return;const sign=a.x<=b.x?1:-1,overlap=82-gap,total=a.mass+b.mass;
 a.x=clamp(a.x-sign*overlap*b.mass/total,120,1160);b.x=clamp(b.x+sign*overlap*a.mass/total,120,1160);
 const closing=(a.vx-b.vx)*sign;if(closing>0){const impulse=closing/(1/a.mass+1/b.mass)*.3;a.vx-=sign*impulse/a.mass;b.vx+=sign*impulse/b.mass}
}
