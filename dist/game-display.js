// Presentation only: combat coordinates and hitboxes stay in the 1280 x 620 world.
export function fitGameView(width,height,points=[]){
 const xs=points.filter(Number.isFinite).map(x=>Math.max(0,Math.min(1280,x)));
 const close=width<height&&xs.length>0;
 const lo=xs.length?Math.min(...xs):0,hi=xs.length?Math.max(...xs):1280;
 const view=close?Math.min(1280,Math.max(540,hi-lo+300)):1280;
 const scale=Math.min(width/view,height/620),w=1280*scale,h=620*scale;
 const left=w<=width+1e-6?Math.max(0,(width-w)/2):Math.max(width-w,Math.min(0,width/2-(lo+hi)/2*scale));
 return {width:w,height:h,left,top:Math.max(0,(height-h)/2),scale};
}
let display;
export function updateGameView(points){display?.focus(points)}
export function installGameDisplay(){
 const shell=document.querySelector('.game-shell'),arena=document.getElementById('arena'),canvas=document.getElementById('game'),button=document.getElementById('fullscreen');
 if(!shell||!arena||!canvas||!button)return;
 let expanded=false,native=false,scrollY=0,previousFocus=null,points=[],size={width:0,height:0},locked=false;
 const bar=document.createElement('div');bar.className='expanded-bar';bar.innerHTML='<span>BRASA ARCADE <small>Gire para paisagem para ampliar o combate</small></span><button type="button" class="expanded-pause" aria-label="Pausar ou continuar o jogo">Ⅱ PAUSA</button><button type="button" class="expanded-exit" aria-label="Sair do jogo expandido">✕ SAIR</button>';shell.append(bar);
 const compact=()=>matchMedia('(pointer:coarse),(max-width:900px)').matches;
 let lastView='';function paint(){if(!expanded)return;const v=fitGameView(size.width,size.height,points),key=[v.width,v.height,v.left,v.top].map(n=>n.toFixed(2)).join(':');if(key===lastView)return;lastView=key;Object.assign(canvas.style,{position:'absolute',width:v.width+'px',height:v.height+'px',left:v.left+'px',top:v.top+'px',objectFit:'fill'});}
 function measure(){if(!expanded)return;const viewport=window.visualViewport,w=viewport?.width||innerWidth,h=viewport?.height||innerHeight,rotated=compact()&&h>w;shell.dataset.rotated=String(rotated);shell.classList.toggle('game-landscape',rotated||w>=h);shell.style.setProperty('--display-height',h+'px');shell.style.setProperty('--display-width',w+'px');const pad=shell.querySelector('.mobile-gamepad');shell.style.setProperty('--controller-height',(pad&&getComputedStyle(pad).display!=='none'?pad.offsetHeight:0)+'px');size={width:arena.clientWidth,height:arena.clientHeight};paint()}

 function labels(){button.setAttribute('aria-expanded',String(expanded));button.setAttribute('aria-label',expanded?'Sair do jogo expandido':'Expandir jogo para tela cheia');button.textContent=expanded?'⛶ RECOLHER':'⛶ EXPANDIR';document.dispatchEvent(new Event('brasa:displaychange'))}
 function cleanup(){if(!expanded)return;expanded=false;native=false;lastView='';shell.classList.remove('game-expanded','game-landscape');delete shell.dataset.rotated;document.body.classList.remove('game-expanded-active');canvas.style.cssText='';shell.style.removeProperty('--display-height');shell.style.removeProperty('--display-width');shell.style.removeProperty('--controller-height');if(locked){try{screen.orientation?.unlock()}catch{}locked=false}labels();window.scrollTo({top:scrollY,behavior:'instant'});previousFocus?.focus?.({preventScroll:true})}
 async function exit(){const active=document.fullscreenElement===shell;cleanup();if(active)try{await document.exitFullscreen()}catch{}}
 async function enter(){if(expanded)return;scrollY=window.scrollY;previousFocus=document.activeElement;expanded=true;shell.classList.add('game-expanded');document.body.classList.add('game-expanded-active');labels();measure();canvas.focus({preventScroll:true});
  try{if(shell.requestFullscreen&&document.fullscreenEnabled){await shell.requestFullscreen({navigationUI:'hide'});if(!expanded){if(document.fullscreenElement===shell)await document.exitFullscreen();return}native=document.fullscreenElement===shell;if(native&&compact()&&screen.orientation?.lock)try{await screen.orientation.lock('landscape');locked=true;if(!expanded){screen.orientation.unlock();locked=false}}catch{}}}catch{/* The fixed viewport mode remains usable when native fullscreen is unavailable. */}measure();
 }
 button.onclick=()=>expanded?exit():enter();bar.querySelector('.expanded-exit').onclick=exit;bar.querySelector('.expanded-pause').onclick=()=>{canvas.focus({preventScroll:true});for(const type of ['keydown','keyup'])canvas.dispatchEvent(new KeyboardEvent(type,{code:'Escape',key:'Escape',bubbles:true,cancelable:true}))};
 document.addEventListener('fullscreenchange',()=>{if(native&&document.fullscreenElement!==shell)cleanup();else{native=document.fullscreenElement===shell;measure()}});
 document.addEventListener('keydown',e=>{if(e.isTrusted&&e.key==='Escape'&&expanded&&!document.fullscreenElement){e.preventDefault();exit()}});
 document.addEventListener('click',e=>{if(e.target.closest('#start')&&compact())enter();if(e.target.closest('[data-action="menu"]')&&expanded)exit()},true);
 window.addEventListener('resize',measure);window.visualViewport?.addEventListener('resize',measure);window.addEventListener('orientationchange',()=>requestAnimationFrame(measure));new ResizeObserver(()=>{if(expanded){size={width:arena.clientWidth,height:arena.clientHeight};paint()}}).observe(arena);
 display={focus(value){points=value||[];paint()}};labels();
}
