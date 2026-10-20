import {roster,getFighter} from './roster.js';
import {stageCrime,factionFor} from './faction-context.js';
export const campaignSides={left:{label:'ESQUERDA',opponent:'DIREITA',color:'#f07956',master:'flavio'},right:{label:'DIREITA',opponent:'ESQUERDA',color:'#81bbdf',master:'lula'}};
// These explicit campaign affiliations cover public political alignments only.
// The remaining cast are free guest characters; family or judicial office alone is not an affiliation.
const affiliations={lula:'left',janja:'left',janones:'left',ana:'left',flavio:'right',jair:'right',nikolas:'right',tarcisio:'right',marcal:'right',daniella:'right'};
export const eligibleFighters=side=>roster.filter(f=>!affiliations[f.id]||affiliations[f.id]===side);
export const fighterSide=id=>affiliations[id]||null;
const original=(id,name,type,power,speed,guard,symbol)=>({id,name,short:name,type,power,speed,guard,symbol,color:'#e5a173',special:type==='projectile'?'Rajada de energia':type==='area'?'Cerco do bando':type==='shield'?'Colete reforçado':type==='dash'?'Investida da célula':'Ataque ascendente',fictional:true});
const left=[original('iris','Mandante da Célula','shield',3,3,5,'✦'),original('lia','Chefe da Emboscada','projectile',3,4,3,'♫'),original('bento','Comandante do Bando','uppercut',5,2,3,'↑'),original('nara','Chefe do Cerco','area',4,3,3,'✦'),original('dora','Mandante da Cobrança','dash',3,5,3,'→'),original('caio','Chefe da Quadrilha','projectile',4,3,3,'★')];
const right=[original('anselmo','Cobrador da Célula','projectile',4,3,3,'◆'),original('dante','Mandante da Emboscada','dash',3,5,3,'→'),original('vera','Chefe da Ladeira','shield',4,2,5,'◆'),original('cesar','Mandante do Bloqueio','uppercut',5,2,3,'↑'),original('raul','Chefe da Cobrança','area',4,3,3,'◆'),original('helena','Mandante da Quadrilha','dash',4,4,3,'→')];
export const stages=[
 {id:'jorge-teixeira',name:'JORGE TEIXEIRA',city:'Manaus',uf:'AM',region:'Norte',subtitle:'A noite começa na Zona Leste de Manaus.',landmark:'Comércio de rua, casas em encostas e vegetação amazônica.',color:'#54b9ad',sign:'ZONA LESTE',weather:'rain',coords:[54,24],sourceIds:['am-2026','jorge-study'],bosses:{left:left[0],right:right[0]}},
 {id:'bom-jardim',name:'BOM JARDIM',city:'Fortaleza',uf:'CE',region:'Nordeste',subtitle:'O próximo encontro é na periferia de Fortaleza.',landmark:'Referência ao Centro Cultural Bom Jardim, murais e quadra.',color:'#f1bd6d',sign:'GRANDE BOM JARDIM',weather:'dry',coords:[84,30],sourceIds:['ccbj','ce-security'],bosses:{left:left[1],right:right[1]}},
 {id:'pernambues',name:'PERNAMBUÉS',city:'Salvador',uf:'BA',region:'Nordeste',subtitle:'Suba a ladeira. A rodada mudou de endereço.',landmark:'Casas nas encostas, escadarias e eixo da Avenida Paralela.',color:'#dd96aa',sign:'PERNAMBUÉS',weather:'dry',coords:[84,46],sourceIds:['pcba-2025','ba-culture'],bosses:{left:left[2],right:right[2]}},
 {id:'valeria',name:'VALÉRIA',city:'Salvador',uf:'BA',region:'Nordeste',subtitle:'Na borda da cidade, o confronto passa pela oficina.',landmark:'Paisagem suburbana junto ao corredor da BR-324 e oficinas.',color:'#d69a66',sign:'VALÉRIA · SALVADOR',weather:'dry',coords:[82,44],sourceIds:['pcba-2025','ba-culture'],bosses:{left:left[3],right:right[3]}},
 {id:'sol-nascente',name:'SOL NASCENTE',city:'Brasília',uf:'DF',region:'Centro-Oeste',subtitle:'O céu do Cerrado abre a reta do próximo desafio.',landmark:'Casas de tijolos, caixas-d’água e terra vermelha do Cerrado.',color:'#b49ae0',sign:'SOL NASCENTE · DF',weather:'dry',coords:[64,52],sourceIds:['df-data','df-sol'],bosses:{left:left[4],right:right[4]}},
 {id:'restinga',name:'RESTINGA',city:'Porto Alegre',uf:'RS',region:'Sul',subtitle:'A Esplanada recebe o penúltimo confronto.',landmark:'Esplanada, salão comunitário e referência às cores do samba local.',color:'#80b4c2',sign:'ESPLANADA DA RESTINGA',weather:'mist',coords:[54,86],sourceIds:['restinga-security','restinga-culture'],bosses:{left:left[5],right:right[5]}},
 {id:'alemao',name:'COMPLEXO DO ALEMÃO',city:'Rio de Janeiro',uf:'RJ',region:'Sudeste',subtitle:'Última fase. O adversário final está esperando.',landmark:'Encostas densas de tijolos e referência à estrutura do teleférico.',color:'#ee9b69',sign:'COMPLEXO DO ALEMÃO',weather:'rain',coords:[77,69],sourceIds:['alemao-violence'],master:true}
].map((s,i)=>({...s,crime:stageCrime[s.id],sourceIds:[...s.sourceIds,...stageCrime[s.id].sourceIds],index:i,length:3300,image:`assets/neighborhoods/${s.id}.png`,enemyImage:`assets/neighborhoods/${s.id}-adversarios.png`,wardrobe:[
 'Roupas leves, bermudas, sandálias e variações para o calor úmido.',
 'Camisetas de algodão, regatas, bermudas, chinelos e tênis.',
 'Regatas, bermudas, chinelos e tecidos leves no calor de Salvador.',
 'Roupas leves de rua e peças de oficina; botas apenas no trabalho.',
 'Algodão, bermudas e roupa de trabalho, com uma camada leve ao anoitecer.',
 'Moletons, corta-ventos, jaquetas leves e calçados fechados na noite fria.',
 'Bermudas, regatas, chinelos; alguns adversários sem camisa ou descalços.'
 ][i]}));
export function bossFor(stage,side='left'){
 side=campaignSides[side]?side:'left';const enemySide=side==='left'?'right':'left';
 const character=stage.master?getFighter(campaignSides[side].master):stage.bosses?.[enemySide];
 if(!character)return null;
 const faction=stage.master?null:factionFor(stage.id,enemySide==='left'?0:1);
 return {...character,name:stage.master?character.name:character.name+' · '+faction.short,short:stage.master?character.short:character.name+' · '+faction.short,criminal:!stage.master,factionId:faction?.id||null,campSide:enemySide,atlasColumn:stage.index,atlasRow:enemySide==='left'?0:1,master:!!stage.master,neighborhood:stage.name,title:stage.master?'CHEFÃO MASTER':`CONFRONTO DE ${stage.name}`,color:faction?.color||campaignSides[enemySide].color};
}
