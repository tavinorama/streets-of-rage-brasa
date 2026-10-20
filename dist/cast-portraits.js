import {spriteFrames,SPRITE_REVISION} from './sprite-frames.js';

// Selection portraits use the same reconstructed face, light and wardrobe as combat.
// Documentary photographs remain separate in the research panel.
const portraits=new Map();
async function headshot(id){
 if(portraits.has(id))return portraits.get(id);
 const task=(async()=>{
  const geometry=await spriteFrames,meta=geometry[id]?.[0];if(!meta)throw Error('Missing portrait geometry');
  const image=new Image();image.src=`assets/sprites/${id}.png?v=${SPRITE_REVISION}`;await image.decode();
  const [sx,,sw,sh]=meta.source,body=(meta.bottom-meta.top)*sh;
  const height=body*.27,width=height*192/224,cx=sx+meta.anchor*sw+(meta.faceX||0)*sh;
  const x=Math.max(sx,Math.min(sx+sw-width,cx-width/2)),y=Math.max(0,meta.top*sh-body*.018);
  const canvas=document.createElement('canvas');canvas.width=288;canvas.height=336;
  const c=canvas.getContext('2d');c.imageSmoothingEnabled=true;c.imageSmoothingQuality='high';
  const light=c.createLinearGradient(0,0,0,336);light.addColorStop(0,'#354149');light.addColorStop(1,'#142128');c.fillStyle=light;c.fillRect(0,0,288,336);
  c.drawImage(image,x,y,width,height,0,0,288,336);return canvas;
 })();portraits.set(id,task);return task;
}
const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){observer.unobserve(entry.target);entry.target.paint()}},{rootMargin:'200px'});
class CastPortrait extends HTMLElement{
 connectedCallback(){observer.observe(this)}
 disconnectedCallback(){observer.unobserve(this)}
 async paint(){try{const source=await headshot(this.getAttribute('fighter'));if(!this.isConnected)return;const canvas=document.createElement('canvas');canvas.width=source.width;canvas.height=source.height;canvas.setAttribute('aria-hidden','true');canvas.getContext('2d').drawImage(source,0,0);this.replaceChildren(canvas);this.dataset.ready='true'}catch{this.dataset.ready='false'}}
}
customElements.define('cast-portrait',CastPortrait);
