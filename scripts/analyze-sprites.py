"""Inspect alpha connectivity and write source-frame geometry, without changing artwork."""
from PIL import Image
from pathlib import Path
import re,json
result={}
for p in Path('dist/assets/sprites').glob('*.png'):
 im=Image.open(p);w,h=im.size;a=im.getchannel('A').tobytes();runs=[];parent=[];previous=[]
 def root(n):
  while parent[n]!=n:parent[n]=parent[parent[n]];n=parent[n]
  return n
 for y in range(h):
  current=[]
  for match in re.finditer(b'[\x61-\xff]+',a[y*w:(y+1)*w]):
   x1,x2=match.span();i=len(runs);parent.append(i);runs.append((x1,x2,y));current.append(i)
   for j in previous:
    u,v,_=runs[j]
    if v>=x1 and u<=x2:parent[root(j)]=root(i)
  previous=current
 groups={}
 for i,(x1,x2,y) in enumerate(runs):groups.setdefault(root(i),[]).append((x1,x2,y))
 big=sorted(groups.values(),key=lambda g:sum(x2-x1 for x1,x2,y in g),reverse=True)[:3]
 print(p.stem,[(sum(v-u for u,v,y in g),min(u for u,v,y in g),min(y for u,v,y in g),max(v for u,v,y in g),max(y for u,v,y in g))for g in big])
 if len(big)!=3 or any(sum(v-u for u,v,y in g)<50000 for g in big):continue
 big.sort(key=lambda g:min(u for u,v,y in g));frames=[]
 for g in big:
  x0=max(0,min(u for u,v,y in g)-3);x2=min(w,max(v for u,v,y in g)+3);top=min(y for u,v,y in g);bottom=max(y for u,v,y in g)+1
  rows={}
  for u,v,y in g:
   b=rows.setdefault(y,[w,0]);b[0]=min(b[0],u);b[1]=max(b[1],v)
  waist=[(u,v)for u,v,y in g if h*.44<y<h*.53];anchor=sum((u+v)/2*(v-u)for u,v in waist)/sum(v-u for u,v in waist)
  head=[(u,v)for u,v,y in g if top+15<y<top+65];face=sum((u+v)/2*(v-u)for u,v in head)/sum(v-u for u,v in head)
  left=[[max(0,rows[y][0]-x0-2),y]for y in sorted(rows)];right=[[min(x2-x0,rows[y][1]-x0+2),y]for y in sorted(rows,reverse=True)]
  footRuns=sorted((u,v,y)for u,v,y in g if y>bottom-35);clusters=[]
  for u,v,y in footRuns:
   if not clusters or u>clusters[-1]['right']+12:clusters.append({'left':u,'right':v,'bottom':y,'weight':v-u,'center':(u+v)/2*(v-u)})
   else:
    b=clusters[-1];b['right']=max(b['right'],v);b['bottom']=max(b['bottom'],y);b['weight']+=v-u;b['center']+=(u+v)/2*(v-u)
  feet=[{'x':round((b['center']/b['weight']-anchor)/h,5),'gap':round((bottom-b['bottom']-1)/h,5)}for b in clusters if b['weight']>30]
  frames.append({'feet':feet,'source' :[x0,0,x2-x0,h],'outline':left+right,'anchor':round((anchor-x0)/(x2-x0),5),'faceX':round((face-anchor)/h,5),'bottom':round(bottom/h,5),'top':round(top/h,5)})
 result[p.stem]=frames

Path("dist/assets/sprite-frames.json").write_text(json.dumps(result,separators=(",",":")))
