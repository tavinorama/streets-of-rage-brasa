// Source artwork is kept untouched; each pose uses its own silhouette and bounds.
const cache=new WeakMap();
export const SPRITE_REVISION='20261020-6';
export const spriteFrames=fetch(`assets/sprite-frames.json?v=${SPRITE_REVISION}`).then(r=>{if(!r.ok)throw Error('Sprite geometry unavailable');return r.json()});
export function isolatedFrame(image,frame,geometry){
 let poses=cache.get(image);if(!poses){poses=new Map();cache.set(image,poses)}if(poses.has(frame))return poses.get(frame);
 const meta=geometry[frame],c=document.createElement('canvas'),[sx,sy,w,h]=meta.source;c.width=w;c.height=h;const ctx=c.getContext('2d');
 ctx.beginPath();for(let i=0;i<meta.outline.length;i++){const [x,y]=meta.outline[i];if(i)ctx.lineTo(x,y);else ctx.moveTo(x,y)}ctx.closePath();ctx.clip();ctx.drawImage(image,sx,sy,w,h,0,0,w,h);poses.set(frame,c);return c;
}
const atlasCache=new WeakMap();
export function atlasPose(image,columns,rows,column,row,layout=null){
 let poses=atlasCache.get(image);if(!poses){poses=new Map();atlasCache.set(image,poses)}const key=`${columns}:${rows}:${column}:${row}:${layout?.id??(layout?JSON.stringify(layout):'grid')}`;if(poses.has(key))return poses.get(key);
 const region=layout?.frames?.[row*columns+column];
 const sx=region?region.source[0]:layout?Math.round(layout.columns[column]*image.naturalWidth):column*Math.floor(image.naturalWidth/columns),sy=region?region.source[1]:layout?Math.round(layout.rows[row]*image.naturalHeight):row*Math.floor(image.naturalHeight/rows),sw=region?region.source[2]:layout?Math.round(layout.columns[column+1]*image.naturalWidth)-sx:Math.floor(image.naturalWidth/columns),sh=region?region.source[3]:layout?Math.round(layout.rows[row+1]*image.naturalHeight)-sy:Math.floor(image.naturalHeight/rows);
 const canvas=document.createElement('canvas');canvas.width=sw;canvas.height=sh;const c=canvas.getContext('2d',{willReadFrequently:true});if(region){c.beginPath();for(const [i,[x,y]]of region.outline.entries()){if(i)c.lineTo(x,y);else c.moveTo(x,y)}c.closePath();c.clip()}c.drawImage(image,sx,sy,sw,sh,0,0,sw,sh);
 const pixels=c.getImageData(0,0,canvas.width,canvas.height).data;let top=canvas.height,bottom=0;for(let y=0;y<canvas.height;y++){let count=0;for(let x=0;x<canvas.width;x++)if(pixels[(y*canvas.width+x)*4+3]>96)count++;if(count>2){top=Math.min(top,y);bottom=Math.max(bottom,y+1)}}
 const anchor=region?.anchor??.48;
 const parts=[{sum:0,n:0,bottom:0},{sum:0,n:0,bottom:0}];for(let y=Math.max(top,bottom-30);y<bottom;y++)for(let x=0;x<canvas.width;x++){if(pixels[(y*canvas.width+x)*4+3]>96){const b=parts[x<canvas.width*anchor?0:1];b.sum+=x;b.n++;b.bottom=Math.max(b.bottom,y+1)}}const feet=parts.filter(b=>b.n>3).map(b=>({x:(b.sum/b.n-canvas.width*anchor)/canvas.height,gap:(bottom-b.bottom)/canvas.height}));
 const left=[],right=[];for(let y=top;y<bottom;y+=6){let a=0,b=canvas.width-1;while(a<canvas.width&&pixels[(y*canvas.width+a)*4+3]<=96)a++;while(b>a&&pixels[(y*canvas.width+b)*4+3]<=96)b--;if(b-a>2){left.push([a,y]);right.push([b,y])}}const outline=region?.outline||[...left,...right.reverse()];const faceRow=Math.min(canvas.height-1,Math.floor(top+(bottom-top)*.095));let faceSum=0,faceCount=0;for(let x=0;x<canvas.width;x++)if(pixels[(faceRow*canvas.width+x)*4+3]>96){faceSum+=x;faceCount++}const faceX=faceCount?(faceSum/faceCount-canvas.width*anchor)/Math.max(1,bottom-top):.065;const meta={anchor,top:top/canvas.height,bottom:(bottom||canvas.height)/canvas.height,feet,outline,faceX};const value={canvas,meta};poses.set(key,value);return value;
}
