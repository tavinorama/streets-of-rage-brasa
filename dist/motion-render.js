import {attackMotion} from './combat-animation.js';
// Lightweight 2D skinning: independently deform legs, chest, face, hair and fabric.
import {isDefeated} from './physics.js';
import {preferences,reducedMotion} from './preferences.js';
const cache=new WeakMap();
const mobile=matchMedia('(pointer: coarse)').matches;
const xs=mobile?[0,.3,.5,.7,1]:[0,.2,.35,.45,.55,.65,.8,1],ys=mobile?[0,.08,.13,.19,.28,.4,.55,.7,.85,1]:[0,.04,.08,.12,.16,.2,.24,.3,.4,.5,.6,.7,.8,.9,1];
const gauss=(v,r)=>Math.exp(-v*v/(r*r));
function frames(image){if(cache.has(image))return cache.get(image);const w=Math.floor(image.naturalWidth/3),h=image.naturalHeight;const out=Array.from({length:3},(_,i)=>{const c=document.createElement('canvas');c.width=w;c.height=h;c.getContext('2d').drawImage(image,i*w,0,w,h,0,0,w,h);return c});cache.set(image,out);return out}
function point(u,v,w,h,anchor,bottom,top,f,t,feet=[],choreography=attackMotion(f)){const m=f.motion||{},minimal=reducedMotion(),walk=minimal?0:m.walk||0,phase=m.gait||0,side=u<anchor?-1:1,step=Math.sin(phase+(side>0?Math.PI:0));let x=(u-anchor)*w,y=(v-bottom)*h;
 const leg=Math.max(0,(v-.53)/.47),foot=feet.reduce((best,a)=>Math.abs(a.x-(u-anchor)*w/h)<Math.abs((best?.x??99)-(u-anchor)*w/h)?a:best,null);y+=leg*(foot?.gap||0)*h;
 // A defeated sprite is a rigid pose; its whole-body fall is applied by the caller.
 if(isDefeated(f))return {x,y};
 x-=(m.body||0)*Math.max(0,bottom-v)*h;if(!f.attackTime&&f.y===0){x+=step*leg*31*walk;y-=Math.max(0,Math.cos(phase+(side>0?Math.PI:0)))*leg*22*walk}
 // Separate action cycles, with fixed grounded feet and gradual wind-up/recovery.
 const bodyV=(v-top)/Math.max(.1,bottom-top),upper=gauss(bodyV-.36,.2),lower=Math.max(0,(bodyV-.52)/.48),attack=choreography.impact;
 if(!minimal){x+=upper*choreography.shift;y+=upper*choreography.windup*3;if(m.action==='guard'){x-=upper*7;y+=upper*9}else if(m.action==='hurt'){x-=upper*8;y+=gauss(bodyV-.25,.25)*4}else if(m.action==='jump'){x+=side*lower*8;y-=lower*9}else if(m.action==='punch'||m.action==='special'||m.action==='super'){x+=upper*attack*9;y-=upper*attack*2}else if(m.action==='kick'){x+=lower*attack*side*8;y-=lower*attack*8}if(!f.attackTime){x-=Math.sin(phase)*walk*gauss(bodyV-.38,.12)*side*6;y+=Math.abs(Math.sin(phase))*walk*gauss(bodyV-.45,.2)*2}}
 const torso=gauss(v-.38,.24);x+=Math.sin(phase)*2*walk*torso;y+=Math.sin(phase*2)*1.7*walk*torso;
 const breath=(minimal?0:Math.sin(m.breath||t*3))*(f.hp<30?1.5:.8);x+=(u-anchor)*breath*torso;y-=breath*torso;
 const landing=m.landing||0;y+=gauss(v-.45,.3)*landing*7;x+=(u-anchor)*landing*4;
 const outer=Math.min(1,Math.abs(u-anchor)*5);const robe=['moraes','mendonca','dino'].includes(f.data.id),cloth=gauss(v-(robe?.59:.48),robe?.3:.2)*outer;x+=(m.cloth||0)*cloth*32;y+=Math.sin(t*9+u*8)*(m.cloth||0)*cloth*7;
 const long=['janja','daniella','roberta'].includes(f.data.id),hair=gauss(v-(top+.07),long?.13:.055)*outer;x+=(m.hair||0)*hair*(long?55:12);y+=Math.abs(m.hair||0)*hair*12;
 const face=gauss(u-anchor-.025,.09),eye=top+.052,jaw=top+.097;const blink=m.blink>0?Math.sin((.14-m.blink)/.14*Math.PI):0;
 y-=(v-eye)*h*face*gauss(v-eye,.026)*blink*.55;
 if(m.expression==='pain'){x-=face*gauss(v-eye,.06)*2;y+=face*gauss(v-jaw,.027)*2.4}
 else if(m.expression==='strain'||m.expression==='guard'){y+=face*gauss(v-eye,.024)*1.4;y-=face*gauss(v-jaw,.023)*.5}
 else if(m.expression==='exhausted'){y+=face*gauss(v-jaw,.025)*1.6}
 return {x,y};}
function triangle(c,img,s0,s1,s2,d0,d1,d2){const den=s0.x*(s1.y-s2.y)+s1.x*(s2.y-s0.y)+s2.x*(s0.y-s1.y);if(Math.abs(den)<.00001)return;
 const a=(d0.x*(s1.y-s2.y)+d1.x*(s2.y-s0.y)+d2.x*(s0.y-s1.y))/den,b=(d0.y*(s1.y-s2.y)+d1.y*(s2.y-s0.y)+d2.y*(s0.y-s1.y))/den,cc=(d0.x*(s2.x-s1.x)+d1.x*(s0.x-s2.x)+d2.x*(s1.x-s0.x))/den,d=(d0.y*(s2.x-s1.x)+d1.y*(s0.x-s2.x)+d2.y*(s1.x-s0.x))/den,e=(d0.x*(s1.x*s2.y-s2.x*s1.y)+d1.x*(s2.x*s0.y-s0.x*s2.y)+d2.x*(s0.x*s1.y-s1.x*s0.y))/den,f=(d0.y*(s1.x*s2.y-s2.x*s1.y)+d1.y*(s2.x*s0.y-s0.x*s2.y)+d2.y*(s0.x*s1.y-s1.x*s0.y))/den;
 c.save();const mx=(d0.x+d1.x+d2.x)/3,my=(d0.y+d1.y+d2.y)/3;c.beginPath();for(const [i,p]of[d0,d1,d2].entries()){const x=mx+(p.x-mx)*1.006,y=my+(p.y-my)*1.006;if(i)c.lineTo(x,y);else c.moveTo(x,y)}c.closePath();c.clip();c.transform(a,b,cc,d,e,f);c.drawImage(img,0,0);c.restore();}
export function skinnedSprite(c,image,frame,meta,f,t,height=348,isolated=null){const img=isolated||frames(image)[frame],w=height*img.width/img.height,h=height;const anchor=meta.anchor,bottom=meta.bottom,top=meta.top??.07;const gridYs=preferences.quality==='low'?[0,.13,.28,.4,.55,.7,.85,1]:ys,gridXs=preferences.quality==='low'?[0,.3,.5,.7,1]:xs;const choreography=attackMotion(f);const grid=gridYs.map(v=>gridXs.map(u=>({s:{x:u*img.width,y:v*img.height},d:point(u,v,w,h,anchor,bottom,top,f,t,meta.feet||[],choreography)})));
 for(let y=0;y<gridYs.length-1;y++)for(let x=0;x<gridXs.length-1;x++){const a=grid[y][x],b=grid[y][x+1],cc=grid[y+1][x+1],d=grid[y+1][x];triangle(c,img,a.s,b.s,cc.s,a.d,b.d,cc.d);triangle(c,img,a.s,cc.s,d.s,a.d,cc.d,d.d)}
}
export function faceDamage(c,f,meta,height=348){if(!f.injuries?.length)return;const top=height*((meta.top??.07)-meta.bottom);c.save();c.globalCompositeOperation='multiply';
 for(const injury of f.injuries){const x=injury.x+(meta.faceX||0)*height,y=top+injury.y,r=injury.r;const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,injury.kind==='bruise'?'#613e71bb':'#ab554d8c');g.addColorStop(.6,injury.kind==='bruise'?'#8e4d6a70':'#c8705a50');g.addColorStop(1,'#a2686000');c.fillStyle=g;c.beginPath();c.ellipse(x,y,r,r*.7,injury.rotation,0,7);c.fill();if(injury.kind==='cut'){c.strokeStyle='#93453e';c.lineWidth=.9;c.beginPath();c.moveTo(x-2,y-1);c.lineTo(x+3,y+2);c.stroke()}}
 c.restore();}

export function drawFootContacts(c,f,meta,h){if(isDefeated(f)||f.y>0)return;const phase=f.motion?.gait||0,walk=f.motion?.walk||0;c.save();c.globalCompositeOperation='multiply';for(const foot of meta.feet||[]){const side=foot.x<0?-1:1,cycle=phase+(side>0?Math.PI:0),lift=!f.attackTime?Math.max(0,Math.cos(cycle))*walk:0,x=foot.x*h+(!f.attackTime?Math.sin(cycle)*31*walk:0);c.save();c.translate(x,0);c.scale(1,.22);c.globalAlpha=.8*(1-lift*.8);const g=c.createRadialGradient(0,0,1,0,0,16);g.addColorStop(0,'#142010b0');g.addColorStop(1,'#14201000');c.fillStyle=g;c.beginPath();c.arc(0,0,16,0,7);c.fill();c.restore()}c.restore()}

// Equipment layers share the existing body mesh; no second body silhouette is drawn.
export {point as spriteVertex};
