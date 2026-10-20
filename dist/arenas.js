export const arenas=[
{id:'band',name:'ESTÚDIO DO DEBATE',place:'SÃO PAULO · BAND',image:'assets/arena-realista.png',color:'#6ca7e4',reflect:.15},
{id:'stf',name:'PLENÁRIO DO STF',place:'BRASÍLIA · SUPREMO TRIBUNAL FEDERAL',image:'assets/arena-stf.png',color:'#d6b37c',reflect:0},
{id:'globonews',name:'ESTÚDIO GLOBONEWS',place:'ESTÚDIO DE TELEVISÃO · GNEWS',image:'assets/arena-globonews.png',color:'#d24c43',reflect:.06},
{id:'urna',name:'SEÇÃO ELEITORAL',place:'BRASIL · CABINE DA URNA ELETRÔNICA',image:'assets/arena-urna.png',color:'#a7c5ac',reflect:.04},
{id:'oval',name:'CASA BRANCA',place:'WASHINGTON · SALÃO OVAL',image:'assets/arena-oval.png',color:'#c8af69',reflect:0}
];
let selected='band';const loaded=new Map();
export const getArena=()=>selected;
export const arenaInfo=(id=selected)=>arenas.find(a=>a.id===id)||arenas[0];
export function setArena(id){if(id==='streets'||arenas.some(a=>a.id===id))selected=id;const a=arenas.find(a=>a.id===id);if(a&&!loaded.has(id)){const img=new Image();img.src=a.image;loaded.set(id,img)}}
export function arenaImage(id=selected){const a=arenaInfo(id);if(!loaded.has(a.id)){const img=new Image();img.src=a.image;loaded.set(a.id,img)}return loaded.get(a.id)}
