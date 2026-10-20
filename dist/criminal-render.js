// Animated equipment is a code-native layer, sharing the sprite's mesh coordinates.
// These are fictional game costumes, not real-world signs for identifying criminals.
import {spriteVertex} from './motion-render.js';
import {factions} from './faction-context.js';
export function drawCriminalGear(c,e,meta,t,height,canvas){
 if(!e.criminal||!e.equipment)return;
 const size=meta.bottom-(meta.top||0),visible=height*size,w=height*canvas.width/canvas.height,anchor=meta.anchor,top=meta.top||0;
 // The waist anchor is measured from each isolated figure. Upper-body offsets follow the same mesh.
 const vertex=(x,y)=>spriteVertex(anchor+x*visible/w,top+y*size,w,height,anchor,meta.bottom,top,e,t,meta.feet||[]);
 const polygon=(points,fill,stroke='#5f6867')=>{c.beginPath();points.forEach(([x,y],i)=>{const p=vertex(x,y);i?c.lineTo(p.x,p.y):c.moveTo(p.x,p.y)});c.closePath();c.fillStyle=fill;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=.7;c.stroke()}};
 c.save();
 // Torso carrier or light cross-body straps leave the regional clothing and skin visible.
 if(e.equipment.vest){const g=c.createLinearGradient(-visible*.15,0,visible*.12,0);g.addColorStop(0,'#111b1c');g.addColorStop(.55,'#354442');g.addColorStop(1,'#142021');polygon([[-.12,.21],[.07,.21],[.12,.48],[-.13,.5]],g);for(const y of [.31,.39]){polygon([[-.105,y],[-.025,y],[.005,y+.065],[-.1,y+.065]],'#182728');polygon([[.015,y],[.08,y],[.09,y+.065],[.02,y+.065]],'#20302e')}}
 else{polygon([[-.13,.21],[-.1,.2],[.1,.48],[.075,.49]],'#192322');polygon([[.06,.22],[.085,.23],[-.105,.49],[-.13,.48]],'#27312e')}
 const faction=factions[e.factionId]||factions.fictional,patch=vertex(-.015,.3);c.save();c.translate(patch.x,patch.y);c.scale(e.facing<0?-1:1,1);c.fillStyle='#101b1c';c.fillRect(-13,-5,26,11);c.strokeStyle=faction.color;c.lineWidth=.6;c.strokeRect(-13,-5,26,11);c.font='700 '+(faction.short.length>3?4.7:7)+'px Arial';c.textAlign='center';c.fillStyle=faction.color;c.fillText(faction.short,0,3);c.restore();
 // Radio and a visibly holstered prop distinguish the attacking NPCs from residents.
 polygon([[-.13,.27],[-.085,.27],[-.08,.36],[-.13,.36]],'#0c171b');const antA=vertex(-.11,.27),antB=vertex(-.11,.2);c.strokeStyle='#151e20';c.lineWidth=1.3;c.beginPath();c.moveTo(antA.x,antA.y);c.lineTo(antB.x,antB.y);c.stroke();
 polygon([[-.14,.48],[.1,.48],[.1,.505],[-.14,.505]],'#101819');polygon([[.055,.49],[.125,.49],[.14,.61],[.095,.63],[.06,.56]],'#362f28');polygon([[.06,.475],[.15,.475],[.15,.5],[.105,.5],[.11,.555],[.08,.555]],'#111b20');
 if(e.equipment.sling){polygon([[-.14,.29],[-.12,.28],[.1,.64],[.08,.65]],'#0b1519');polygon([[-.135,.43],[-.08,.41],[-.055,.52],[.015,.68],[.0,.69],[-.075,.54],[-.105,.56]],'#243033')}
 // A half-face covering keeps eyes/skin/hair visible across every skin-tone variant.
 const faceX=meta.faceX??.065;polygon([[faceX-.05,.1],[faceX+.055,.105],[faceX+.045,.18],[faceX-.04,.17]],'#26302f');const a=vertex(faceX-.035,.138),b=vertex(faceX+.04,.144);c.strokeStyle='#68706a';c.lineWidth=.6;c.beginPath();c.moveTo(a.x,a.y);c.lineTo(b.x,b.y);c.stroke();
 c.restore();
}
export function drawCrimeLabel(c,e,camera,bodyHeight,scale){if(e.dead||!e.criminal)return;const faction=factions[e.factionId]||factions.fictional,text=faction.short+' · '+(e.enemyType==='boss'?'CHEFE':e.enemyType==='runner'?'OLHEIRO':e.enemyType==='heavy'?'COBRADOR':'CAPANGA'),x=e.x-camera,y=e.lane-(bodyHeight+28)*scale;c.save();c.font='700 10px Arial';c.textAlign='center';const width=Math.max(78,c.measureText(text).width+12);c.fillStyle='#091719e8';c.fillRect(x-width/2,y-11,width,17);c.fillStyle=faction.color;c.fillText(text,x,y+1);c.restore()}
