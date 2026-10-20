"""Measure transparent enemy atlas silhouettes. Does not edit pixels."""
from PIL import Image
from pathlib import Path
import re,json
root=Path(__file__).resolve().parent.parent
old=json.loads((root/'UNIFORM-ART-PROMPTS.json').read_text())['neighborhoods']

def measure(path,columns=4):
 im=Image.open(path);w,h=im.size;assert im.mode=='RGBA';alpha=im.getchannel('A').tobytes();runs=[];parent=[];previous=[]
 def find(i):
  while parent[i]!=i:parent[i]=parent[parent[i]];i=parent[i]
  return i
 for y in range(h):
  current=[]
  for match in re.finditer(b'[\x61-\xff]+',alpha[y*w:(y+1)*w]):
   a,b=match.span();i=len(runs);parent.append(i);runs.append((a,b,y));current.append(i)
   for j in previous:
    u,v,_=runs[j]
    if v>=a and u<=b:parent[find(j)]=find(i)
  previous=current
 groups={}
 for i,run in enumerate(runs):groups.setdefault(find(i),[]).append(run)
 groups=sorted(groups.values(),key=lambda g:sum(b-a for a,b,y in g),reverse=True)[:columns*2]
 assert len(groups)==columns*2 and all(sum(b-a for a,b,y in g)>5000 for g in groups),path
 groups.sort(key=lambda g:min(y for a,b,y in g));frames=[]
 for row in range(2):
  strip=sorted(groups[row*columns:(row+1)*columns],key=lambda g:min(a for a,b,y in g))
  for g in strip:
   x0=max(0,min(a for a,b,y in g)-3);x1=min(w,max(b for a,b,y in g)+3);y0=max(0,min(y for a,b,y in g)-3);y1=min(h,max(y for a,b,y in g)+4);rows={}
   for a,b,y in g:
    r=rows.setdefault(y,[w,0]);r[0]=min(r[0],a);r[1]=max(r[1],b)
   bodyh=y1-y0;waist=[(a,b)for a,b,y in g if y0+bodyh*.45<y<y0+bodyh*.53];anchor=sum((a+b)/2*(b-a) for a,b in waist)/sum(b-a for a,b in waist)
   left=[[max(0,rows[y][0]-x0-2),y-y0] for y in sorted(rows)[::2]];right=[[min(x1-x0,rows[y][1]-x0+2),y-y0] for y in sorted(rows,reverse=True)[::2]]
   frames.append({'source':[x0,y0,x1-x0,y1-y0],'outline':left+right,'anchor':round((anchor-x0)/(x1-x0),6)})
 print(path.name,im.size,len(frames),'isolated silhouettes')
 return {'id':path.stem+'-uniform-v2','columns':[i/columns for i in range(columns+1)],'rows':[0,.5,1],'frames':frames}
regional={};light={}
for id,entry in old.items():
 for kind,target in [('regional',regional),('light',light)]:
  src='assets/neighborhoods/'+id+'-adversarios'+('-brancos' if kind=='light' else '')+'.png'
  target[id]={'neighborhoodId':id,'src':src,'wardrobe':entry['wardrobe'],'layout':measure(root/'dist'/src)}
boss=measure(root/'dist/assets/chefes-regionais-clima.png',6)
source='// Clothing lettering is part of the raster artwork; layouts measure current alpha silhouettes.\n'
source+='export const regionalWardrobes='+json.dumps(regional,separators=(',',':'))+';\n'
source+='export const regionalLightWardrobes='+json.dumps(light,separators=(',',':'))+';\n'
source+='export const regionalBossLayout='+json.dumps(boss,separators=(',',':'))+';\n'
source+="const indoorLight={src:'assets/inimigos-diversos.png',layout:{id:'indoor-light-v1',columns:[0,.28,.5,.75,1],rows:[0,.54,1]}};\n"
source+="export function enemyWardrobe(id,appearance='regional'){if(id)return (appearance==='light'?regionalLightWardrobes:regionalWardrobes)[id];return appearance==='light'?indoorLight:{src:'assets/inimigos-rua.png',layout:null}}\n"
(root/'dist/enemy-wardrobes.js').write_text(source)
