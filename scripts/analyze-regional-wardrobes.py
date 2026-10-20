"""Read alpha connectivity and emit crop metadata; original artwork is never modified.

Run from the repository root after adding a wardrobe entry to DIVERSIDADE-ARTE.json.
Requires Pillow, as does the existing roster analyzer.
"""
from pathlib import Path
from PIL import Image
import json,re
root=Path(__file__).resolve().parents[1]
manifest=json.loads((root/'DIVERSIDADE-ARTE.json').read_text())
wardrobes={}
for entry in manifest['regionalAssets']:
    path=root/entry['asset'];im=Image.open(path);width,height=im.size;alpha=im.getchannel('A').tobytes()
    runs=[];parents=[];previous=[]
    def find(n):
        while parents[n]!=n:
            parents[n]=parents[parents[n]];n=parents[n]
        return n
    for y in range(height):
        current=[]
        for match in re.finditer(b'[\x61-\xff]+',alpha[y*width:(y+1)*width]):
            x1,x2=match.span();i=len(runs);parents.append(i);runs.append((x1,x2,y));current.append(i)
            for j in previous:
                left,right,_=runs[j]
                if right>=x1 and left<=x2:parents[find(j)]=find(i)
        previous=current
    groups={}
    for i,run in enumerate(runs):groups.setdefault(find(i),[]).append(run)
    people=sorted(groups.values(),key=lambda g:sum(v-u for u,v,y in g),reverse=True)[:8]
    assert len(people)==8 and all(sum(v-u for u,v,y in g)>15000 for g in people),path
    people.sort(key=lambda g:min(y for u,v,y in g))
    people=sorted(people[:4],key=lambda g:min(u for u,v,y in g))+sorted(people[4:],key=lambda g:min(u for u,v,y in g))
    frames=[]
    for group in people:
        x0=max(0,min(u for u,v,y in group)-2);x2=min(width,max(v for u,v,y in group)+2)
        y0=max(0,min(y for u,v,y in group)-2);y2=min(height,max(y for u,v,y in group)+3)
        rows={}
        for u,v,y in group:
            row=rows.setdefault(y,[width,0]);row[0]=min(row[0],u);row[1]=max(row[1],v)
        # Follow the component silhouette; overlapping rectangular rows cannot clip toes or hair.
        left=[[max(0,rows[y][0]-x0-1),y-y0] for y in sorted(rows)]
        right=[[min(x2-x0,rows[y][1]-x0+1),y-y0] for y in sorted(rows,reverse=True)]
        waist=[(u,v) for u,v,y in group if y0+(y2-y0)*.43<y<y0+(y2-y0)*.57]
        anchor=sum((u+v)*.5*(v-u) for u,v in waist)/sum(v-u for u,v in waist)
        frames.append({'source':[x0,y0,x2-x0,y2-y0],'outline':left+right,'anchor':round((anchor-x0)/(x2-x0),6)})
    ident=entry['neighborhoodId']
    wardrobes[ident]={'neighborhoodId':ident,'src':entry['asset'].removeprefix('dist/'),'wardrobe':entry['wardrobe'],'layout':{'id':ident+'-white-v1','columns':[0,.25,.5,.75,1],'rows':[0,.5,1],'frames':frames}}
    print(ident,im.size,'8 isolated figures',[(f['source'][2],f['source'][3]) for f in frames])
source='// Per-neighborhood wardrobe variants. Crop metadata comes from alpha connectivity.\nexport const regionalLightWardrobes='+json.dumps(wardrobes,separators=(',',':'))+';\n'
source+="const indoorLight={src:'assets/inimigos-diversos.png',layout:{id:'indoor-light-v1',columns:[0,.28,.5,.75,1],rows:[0,.54,1]}};\n"
source+="export function enemyWardrobe(id,appearance='regional'){if(appearance==='light'){if(id&&regionalLightWardrobes[id])return regionalLightWardrobes[id];if(!id)return indoorLight}return {src:id?`assets/neighborhoods/${id}-adversarios.png`:'assets/inimigos-rua.png',layout:null}}\n"
(root/'dist/enemy-wardrobes.js').write_text(source)
