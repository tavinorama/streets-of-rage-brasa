// Source artwork is kept untouched; each pose uses its own silhouette and bounds.
const cache=new WeakMap();
export const spriteFrames=fetch('assets/sprite-frames.json?v=20261020-3').then(r=>{if(!r.ok)throw Error('Sprite geometry unavailable');return r.json()});
export function isolatedFrame(image,frame,geometry){
 let poses=cache.get(image);if(!poses){poses=new Map();cache.set(image,poses)}if(poses.has(frame))return poses.get(frame);
 const meta=geometry[frame],c=document.createElement('canvas'),[sx,sy,w,h]=meta.source;c.width=w;c.height=h;const ctx=c.getContext('2d');
 ctx.beginPath();for(let i=0;i<meta.outline.length;i++){const [x,y]=meta.outline[i];if(i)ctx.lineTo(x,y);else ctx.moveTo(x,y)}ctx.closePath();ctx.clip();ctx.drawImage(image,sx,sy,w,h,0,0,w,h);poses.set(frame,c);return c;
}
const atlasCache=new WeakMap();
export function atlasPose(image,columns,rows,column,row){
 let poses=atlasCache.get(image);if(!poses){poses=new Map();atlasCache.set(image,poses)}const key=`${columns}:${rows}:${column}:${row}`;if(poses.has(key))return poses.get(key);
 const canvas=document.createElement('canvas');canvas.width=Math.floor(image.naturalWidth/columns);canvas.height=Math.floor(image.naturalHeight/rows);const c=canvas.getContext('2d',{willReadFrequently:true});c.drawImage(image,column*canvas.width,row*canvas.height,canvas.width,canvas.height,0,0,canvas.width,canvas.height);
 const pixels=c.getImageData(0,0,canvas.width,canvas.height).data;let top=canvas.height,bottom=0;for(let y=0;y<canvas.height;y++){let count=0;for(let x=0;x<canvas.width;x++)if(pixels[(y*canvas.width+x)*4+3]>96)count++;if(count>2){top=Math.min(top,y);bottom=Math.max(bottom,y+1)}}
 const meta={anchor:.48,top:top/canvas.height,bottom:(bottom||canvas.height)/canvas.height,feet:[{x:-.07,gap:0},{x:.07,gap:0}]};const value={canvas,meta};poses.set(key,value);return value;
}
