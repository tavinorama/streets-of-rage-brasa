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
export function startStreetFinisher(run,index){const enemy=streetFinisherTarget(run,index);if(!enemy)return false;const player=run.players[index];run.finisher={player:index,enemy:enemy.index,time:2.6,duration:2.6};player.attackTime=0;player.invincible=0;player.vx=enemy.vx=0;player.block=false;enemy.attackTime=0;enemy.shield=0;enemy.finishWindow=0;run.projectiles=[];run.dangers=[];run.emit('fatal',{index,enemy:enemy.index,name:player.data.fatal});return true;}
export function stepStreetFinisher(run,dt){if(!run.finisher)return false;const scene=run.finisher,player=run.players[scene.player],enemy=run.enemies.find(e=>e.index===scene.enemy);if(!player||player.dead||!enemy||enemy.dead){run.finisher=null;return false}
 scene.time=Math.max(0,scene.time-dt);
 // AI and attacks pause during the scene; gravity and secondary motion continue.
 for(const actor of [...run.players,...run.enemies]){actor.vx=0;actor.attackTime=0;run.tickBody(actor,dt)}
 if(scene.time===0){run.finisher=null;enemy.shield=0;player.attackKind='special';run.damageEnemy(enemy,enemy.maxHp*2,player,true);player.invincible=Math.max(player.invincible,1.5);run.score+=500;run.announce(player.data.fatal.toUpperCase()+' · +500 PONTOS');run.emit('finisher-complete',{index:player.index,enemy:enemy.index})}
 return true;
}
export function drawStreetFinisher(c,run,reduced=false){const scene=run?.finisher;if(!scene)return;const p=run.players[scene.player],enemy=run.enemies.find(e=>e.index===scene.enemy);if(!p||!enemy)return;const progress=1-scene.time/scene.duration,x=enemy.x-run.camera,y=enemy.lane-110,rotation=reduced?0:progress*4;
 c.save();c.fillStyle='#07141c99';c.fillRect(0,0,1280,620);c.translate(x,y);c.strokeStyle=p.data.color;c.fillStyle=p.data.color;c.lineWidth=4;const radius=55+Math.sin(progress*Math.PI)*75;
 drawMotif(c,p.data,progress,reduced);
 c.globalAlpha=.6;c.beginPath();c.ellipse(0,0,radius,radius*.7,rotation,0,Math.PI*2);c.stroke();c.globalAlpha=1;
 for(let i=0;i<7;i++){const angle=i*Math.PI*2/7+rotation;c.save();c.translate(Math.cos(angle)*radius,Math.sin(angle)*radius*.7);c.rotate(angle);c.fillRect(-12,-5,24,10);c.restore()}
 c.font='700 62px Arial';c.textAlign='center';c.fillStyle='#fff1ce';c.fillText(p.data.symbol,0,20);c.restore();
 c.save();c.textAlign='center';c.fillStyle='#ffca83';c.strokeStyle='#07131e';c.lineWidth=7;c.font='900 italic 44px Arial';c.strokeText(p.data.fatal.toUpperCase(),640,200,1120);c.fillText(p.data.fatal.toUpperCase(),640,200,1120);c.font='700 16px Arial';c.fillStyle='#fff0d5';c.fillText('FINALIZAÇÃO FICTÍCIA · VIOLÊNCIA ESTILIZADA',640,230);c.restore();
}
function drawMotif(c,data,progress,reduced){
 const id=data.id,p=reduced?.65:progress;c.save();c.globalAlpha=.85;c.lineWidth=3;c.strokeStyle='#f5dfb3';c.fillStyle=data.color;
 if(['lula','tarcisio','marcal'].includes(id)){const lift=Math.sin(Math.min(1,p*1.6)*Math.PI/2)*115;c.fillRect(-115,85-lift,230,28);c.strokeRect(-115,85-lift,230,28);for(const side of [-95,85]){c.fillRect(side,113-lift,10,lift+12);c.beginPath();c.moveTo(side,115);c.lineTo(-side,115-lift);c.stroke()}c.fillStyle='#fff1ce';c.font='700 19px Arial';c.textAlign='center';c.fillText(id==='lula'?'PALANQUE':id==='tarcisio'?'OBRA CONCLUÍDA':'PRÓXIMO NÍVEL',0,105-lift)}
 else if(['flavio','jair'].includes(id)){c.fillRect(-105,-165,8,270);c.beginPath();c.moveTo(-97,-165);c.quadraticCurveTo(20,-140+Math.sin(p*12)*14,95,-155);c.lineTo(95,-45);c.quadraticCurveTo(0,-30,-97,-55);c.closePath();c.fill();c.stroke();c.fillStyle='#f4d76e';c.beginPath();c.moveTo(0,-145);c.lineTo(65,-100);c.lineTo(0,-58);c.lineTo(-65,-100);c.closePath();c.fill()}
 else if(['dino','moraes','mendonca'].includes(id)){c.translate(0,-p*35);c.rotate(reduced?-.08:Math.sin(p*8)*.08);c.fillRect(-120,-80,240,115);c.strokeRect(-120,-80,240,115);c.fillRect(-24,-140,48,60);c.fillStyle='#102930';c.font='800 25px Arial';c.textAlign='center';c.fillText(id==='dino'?'ARQUIVADO':id==='moraes'?'ENCERRADO':'FIM DA SESSÃO',0,-15)}
 else if(['vorcaro','daniella'].includes(id)){for(let i=0;i<5;i++){const height=(45+i*22)*Math.min(1,p*3);c.fillRect(i*48-113,80-height,32,height);c.strokeRect(i*48-113,80-height,32,height)}c.fillStyle='#fff1ce';c.font='800 44px Arial';c.textAlign='center';c.fillText(id==='vorcaro'?'$':'%',0,-110)}
 else if(['nikolas','ana','lulinha','janones'].includes(id)){c.fillStyle='#152b35';c.fillRect(-68,-150,136,245);c.strokeRect(-68,-150,136,245);c.fillStyle=data.color;c.fillRect(-55,-125,110,180);c.fillStyle='#122831';c.font='700 22px Arial';c.textAlign='center';c.fillText(id==='lulinha'?'GAME':id==='janones'?'TRENDING':'OFFLINE',0,-35);c.fillText(id==='lulinha'?'OVER':id==='janones'?'K.O.':'⌁',0,0);for(let i=0;i<8;i++){const angle=i*Math.PI/4+p*2;c.fillStyle=data.color;c.fillRect(Math.cos(angle)*115,Math.sin(angle)*100-30,12,12)}}
 else if(id==='janja'){c.globalAlpha=.55;for(const side of [-1,1]){c.beginPath();c.moveTo(side*155,-180);c.lineTo(side*30,90);c.lineTo(side*150,90);c.closePath();c.fill()}c.globalAlpha=.9;c.fillRect(-160,-170,320,15);c.fillRect(-160,-155,40+Math.min(70,p*95),230);c.fillRect(120-Math.min(70,p*95),-155,40+Math.min(70,p*95),230)}
 else{for(let i=0;i<7;i++){const angle=i*Math.PI*2/7+p*2,nx=Math.cos(angle)*115,ny=Math.sin(angle)*90-20;c.beginPath();c.moveTo(0,-20);c.quadraticCurveTo(nx*.4,ny-45,nx,ny);c.stroke();c.beginPath();c.arc(nx,ny,12,0,Math.PI*2);c.fill()}}
 c.restore();
}
