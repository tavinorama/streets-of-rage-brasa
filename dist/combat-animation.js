// Shared choreography follows the same contact clock as damage, in both games.
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const smooth=v=>{v=clamp(v);return v*v*(3-2*v)};
export function fallProgress(actor){
 const value=actor.motion?.fall;
 return Number.isFinite(value)?clamp(value):actor.dead||actor.defeated||actor.hp<=0?1:0;
}
export function attackMotion(actor){
 if(!(actor.attackTime>0)||actor.dead||actor.defeated||actor.hp<=0||actor.stun>0)return {frame:0,windup:0,impact:0,recover:0,shift:0,phase:'idle'};
 const duration=actor.attackDuration||.6,elapsed=clamp(duration-actor.attackTime,0,duration);
 const contact=clamp(actor.attackWindup??(actor.enemy?duration*.7:actor.attackKind==='kick'?.1:.065),.01,duration*.8);
 const windup=elapsed<contact?Math.sin(Math.PI*elapsed/contact):0;
 const impact=elapsed<contact?0:1-smooth((elapsed-contact)/Math.max(.045,duration*.55));
 const recover=smooth((elapsed-duration*.64)/(duration*.36));
 const extended=elapsed>=Math.max(.01,contact-.025)&&elapsed<duration*.78;
 return {frame:extended?(actor.attackKind==='kick'?2:1):0,windup,impact,recover,shift:-windup*5+impact*(actor.attackKind==='kick'?8:13),phase:elapsed<contact?'windup':elapsed<duration*.64?'contact':'recovery'};
}
export const impactPause=damage=>clamp(.025+damage*.0012,.03,.065);
