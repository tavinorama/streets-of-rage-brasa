const streets=document.body.dataset.game==='streets'||location.pathname.endsWith('streets.html'),canvas=document.getElementById('game');
document.querySelector('.touch-controls')?.remove();
const touch=document.createElement('div');touch.className='touch-controls mobile-gamepad';touch.setAttribute('aria-label','Controles de toque');
const action=(code,label,cls='')=>`<button class="${cls}" data-code="${code}" aria-label="${label}">${label}</button>`;
touch.innerHTML=`<div class="touch-toolbar"><button data-ui="pause" aria-label="Pausar ou continuar">Ⅱ PAUSA</button><button data-ui="fullscreen" aria-label="Expandir jogo com controles">⛶ EXPANDIR</button></div><div class="touch-pad">${action('KeyW','↑','up')}${action('KeyA','←','left')}${action('KeyS','↓','down')}${action('KeyD','→','right')}</div><div class="touch-actions">${action(streets?'Space':'KeyW','PULAR')}${action(streets?'ShiftLeft':'KeyS','DEFESA')}${action('KeyF','SOCO')}${action('KeyG','CHUTE')}${action('KeyH','ESPECIAL','special')}${action('KeyR','SUPER','special')}${streets?'':action('KeyT','FINALIZAR','fatal')}</div>`;
document.querySelector('.quick-controls').after(touch);
touch.querySelector('[data-ui=pause]').onclick=()=>{canvas.focus({preventScroll:true});send('Escape','keydown');send('Escape','keyup')};touch.querySelector('[data-ui=fullscreen]').onclick=()=>document.getElementById('fullscreen').click();
const held=new Map();function send(code,type){canvas.dispatchEvent(new KeyboardEvent(type,{code,key:code,bubbles:true,cancelable:true}))}function release(id){const code=held.get(id);if(!code)return;held.delete(id);if(![...held.values()].includes(code))send(code,'keyup')}
touch.addEventListener('pointerdown',e=>{const b=e.target.closest('[data-code]');if(!b)return;e.preventDefault();canvas.focus({preventScroll:true});b.setPointerCapture(e.pointerId);const code=b.dataset.code,already=[...held.values()].includes(code);held.set(e.pointerId,code);b.classList.add('pressed');if(!already)send(code,'keydown')});
for(const type of ['pointerup','pointercancel','lostpointercapture'])touch.addEventListener(type,e=>{release(e.pointerId);e.target.closest('button')?.classList.remove('pressed')});
document.addEventListener('brasa:displaychange',()=>{for(const id of [...held.keys()])release(id);touch.querySelectorAll('.pressed').forEach(e=>e.classList.remove('pressed'))});
touch.addEventListener('contextmenu',e=>e.preventDefault());window.addEventListener('blur',()=>{for(const id of [...held.keys()])release(id);touch.querySelectorAll('.pressed').forEach(e=>e.classList.remove('pressed'))});
const hint=document.createElement('p');hint.className='landscape-hint';hint.textContent='No celular, gire para paisagem para ampliar a arena. Toque com os dois polegares para mover e atacar ao mesmo tempo.';touch.after(hint);

if(matchMedia('(pointer: coarse)').matches){canvas.width=960;canvas.height=465;canvas.getContext('2d').setTransform(.75,0,0,.75,0,0)}
