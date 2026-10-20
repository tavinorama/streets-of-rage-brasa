import {preferences} from './preferences.js';
const streets=document.body.dataset.game==='streets'||location.pathname.endsWith('streets.html'),canvas=document.getElementById('game');
document.querySelector('.touch-controls')?.remove();
const touch=document.createElement('div');touch.className='touch-controls mobile-gamepad';touch.setAttribute('aria-label','Controles de toque');
const action=(code,label,cls='')=>`<button class="${cls}" data-code="${code}" aria-label="${label}">${label}</button>`;
touch.innerHTML=`<div class="touch-toolbar"><button data-ui="pause" aria-label="Pausar ou continuar">Ⅱ PAUSA</button><button data-ui="fullscreen" aria-label="Expandir jogo com controles">⛶ EXPANDIR</button></div><div class="touch-pad">${action('KeyW','↑','up')}${action('KeyA','←','left')}${action('KeyS','↓','down')}${action('KeyD','→','right')}</div><div class="touch-actions">${action(streets?'Space':'KeyW','PULAR')}${action(streets?'ShiftLeft':'KeyS','DEFESA')}${action('KeyF','SOCO')}${action('KeyG','CHUTE')}${action('KeyH','ESPECIAL','special')}${action('KeyR','SUPER','special')}${action('KeyT','FINALIZAR','fatal')}</div>`;
document.querySelector('.quick-controls').after(touch);
touch.querySelector('[data-ui=pause]').onclick=()=>{canvas.focus({preventScroll:true});send('Escape','keydown');send('Escape','keyup')};touch.querySelector('[data-ui=fullscreen]').onclick=()=>document.getElementById('fullscreen').click();
const held=new Map();function send(code,type){const event=new KeyboardEvent(type,{code,key:code,bubbles:true,cancelable:true});Object.defineProperty(event,'brasaCanonical',{value:true});canvas.dispatchEvent(event)}function release(id){const code=held.get(id);if(!code)return;held.delete(id);if(![...held.values()].includes(code))send(code,'keyup')}
touch.addEventListener('pointerdown',e=>{const b=e.target.closest('[data-code]');if(!b)return;e.preventDefault();canvas.focus({preventScroll:true});b.setPointerCapture(e.pointerId);const code=b.dataset.code,already=[...held.values()].includes(code);held.set(e.pointerId,code);b.classList.add('pressed');if(!already)send(code,'keydown')});
for(const type of ['pointerup','pointercancel','lostpointercapture'])touch.addEventListener(type,e=>{release(e.pointerId);e.target.closest('button')?.classList.remove('pressed')});
function releaseAll(){for(const id of [...held.keys()])release(id);touch.querySelectorAll('.pressed').forEach(e=>e.classList.remove('pressed'))}
document.addEventListener('brasa:displaychange',releaseAll);document.addEventListener('visibilitychange',()=>{if(document.hidden)releaseAll()});window.addEventListener('brasa:modal',releaseAll);window.addEventListener('orientationchange',releaseAll);
touch.addEventListener('contextmenu',e=>e.preventDefault());window.addEventListener('blur',releaseAll);
const hint=document.createElement('p');hint.className='landscape-hint';hint.textContent='No celular, gire para paisagem para ampliar a arena. Toque com os dois polegares para mover e atacar ao mesmo tempo.';touch.after(hint);

function applyQuality(){const scale=preferences.quality==='low'?.6:preferences.quality==='high'?1:matchMedia('(pointer: coarse)').matches?.75:1;canvas.width=Math.round(1280*scale);canvas.height=Math.round(620*scale);canvas.getContext('2d').setTransform(scale,0,0,scale,0,0)}applyQuality();window.addEventListener('brasa:settings',applyQuality);
