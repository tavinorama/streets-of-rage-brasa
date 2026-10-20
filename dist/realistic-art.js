import {spriteFrames,isolatedFrame} from './sprite-frames.js';
import {arenaImage,arenaInfo,getArena} from './arenas.js';
import {skinnedSprite,faceDamage} from './motion-render.js';
// Photos in the selection screen are original source photographs.
// Combat sheets are fictional reconstructions generated from those references.

let geometry={};spriteFrames.then(v=>geometry=v).catch(()=>{});
let metrics={};fetch('assets/sprite-metrics.json').then(r=>r.json()).then(m=>{metrics=m}).catch(()=>{});
const positions={lula:'50% 23%',flavio:'55% 22%',jair:'50% 20%',tarcisio:'50% 20%',nikolas:'50% 20%',janja:'50% 20%',dino:'50% 20%',moraes:'50% 20%',mendonca:'50% 20%',daniella:'50% 20%',janones:'49% 35%',ana:'54% 22%',roberta:'58% 25%',lulinha:'65% 20%',marcal:'49% 25%',vorcaro:'50% 25%'};
export function portrait(f){return `<img src="assets/portraits/${f.id}.jpg" alt="Fotografia de ${f.name}" loading="lazy" style="object-position:${positions[f.id]||'50% 25%'}">`}
export function drawStage(c,t,id=getArena()){const stage=arenaImage(id);c.fillStyle='#07111e';c.fillRect(0,0,1280,620);if(stage?.complete&&stage.naturalWidth){let sw=stage.naturalWidth,sh=stage.naturalHeight,sx=0,sy=0;const ratio=1280/620;if(sw/sh>ratio){sx=(sw-sh*ratio)/2;sw=sh*ratio}else{sy=(sh-sw/ratio)*.45;sh=sw/ratio}c.drawImage(stage,sx,sy,sw,sh,0,0,1280,620)}const shade=c.createLinearGradient(0,0,0,620);shade.addColorStop(0,'#03081788');shade.addColorStop(.32,'#06102000');shade.addColorStop(1,'#030b1310');c.fillStyle=shade;c.fillRect(0,0,1280,620);}
export function drawFighter(c,f,image,t){
 const ground=510,d=f.data,bob=0;const real=!!(image?.complete&&image.naturalWidth&&geometry[d.id]);const frame=f.attackTime>0?(f.attackKind==='kick'?2:1):0;
 const m=geometry[d.id]?.[frame]||metrics[d.id]?.[frame]||{anchor:.49,bottom:.93};const h=348,sw=(image?.naturalWidth||1536)/3,sh=image?.naturalHeight||1024,w=h*sw/sh;
 c.save();c.translate(f.x,ground);c.scale(f.facing,1);c.globalCompositeOperation='multiply';
 const airborne=Math.min(1,f.y/180);c.globalAlpha=1-airborne*.55;const shadow=c.createRadialGradient(0,0,2,0,0,65+airborne*20);shadow.addColorStop(0,'#17201870');shadow.addColorStop(1,'#17201800');c.save();c.scale(1,.17);c.fillStyle=shadow;c.beginPath();c.arc(0,0,65+airborne*20,0,7);c.fill();c.restore();
 if(f.y===0&&!f.dead&&!(f.motion?.fall>.1)){const phase=f.motion?.gait||0,walk=f.motion?.walk||0;for(const foot of m.feet||[{x:-.09},{x:.09}]){const side=foot.x<0?-1:1,step=Math.sin(phase+(side>0?Math.PI:0)),lift=!f.attackTime?Math.max(0,Math.cos(phase+(side>0?Math.PI:0)))*walk:0;const x=foot.x*h+(!f.attackTime?step*31*walk:0),r=17-lift*3;c.save();c.translate(x,0);c.scale(1,.23);c.globalAlpha=(1-lift*.8)*.9;const g=c.createRadialGradient(0,0,1,0,0,r);g.addColorStop(0,'#152014d9');g.addColorStop(.45,'#23301c80');g.addColorStop(1,'#23301c00');c.fillStyle=g;c.beginPath();c.arc(0,0,r,0,7);c.fill();c.restore()}}
 c.restore();
 c.save();c.translate(f.x,ground-f.y+bob);c.scale(f.facing,1);
 if(f.dead){c.rotate(-1.35);c.translate(100,35)}else if(f.motion?.fall>.01){c.translate(0,-f.motion.fall*55);c.rotate(-f.motion.fall*1.45)};
 if(f.block){c.scale(1,.93)}
 if(real){
  const x=-w*m.anchor,y=-h*m.bottom;
  const pose=geometry[d.id]?isolatedFrame(image,frame,geometry[d.id]):null;
  skinnedSprite(c,image,frame,m,f,t,h,pose);faceDamage(c,f,m,h);
 }else{c.fillStyle='#b6b9b333';c.beginPath();c.ellipse(0,-205,24,27,0,0,7);c.fill();c.fillRect(-32,-175,64,100);c.fillRect(-25,-78,19,70);c.fillRect(8,-78,19,70);c.fillStyle='#e0e7e0';c.font='10px Arial';c.textAlign='center';c.fillText('CARREGANDO',0,-250)}
 if(f.block||f.shield>0){c.save();c.strokeStyle=f.shield>0?d.color:'#a6d2ef';c.shadowColor=d.color;c.shadowBlur=15;c.lineWidth=f.shield>0?4:2;c.globalAlpha=.7;c.beginPath();c.ellipse(38,-145,60,135,0,-1.5,1.5);c.stroke();c.restore()}
 if(f.stun){c.save();c.globalCompositeOperation='lighter';c.fillStyle='#ffd7a440';c.beginPath();c.ellipse(35,-154,35,20,.2,0,7);c.fill();c.restore()}
 c.restore();
}
