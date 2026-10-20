// Real group names, fictional encounters. Dates and limits are in BAIRROS & FONTES.
// A recorded arrest or allegation is not evidence of exclusive territorial control.
export const factions={
 cv:{id:'cv',short:'CV',name:'Comando Vermelho',color:'#e87b70'},
 pcc:{id:'pcc',short:'PCC',name:'Primeiro Comando da Capital',color:'#d6d4cb'},
 katiara:{id:'katiara',short:'KATIARA',name:'Katiara',color:'#dca86c'},
 bdm:{id:'bdm',short:'BDM',name:'Bonde do Maluco',color:'#b8a3d2'},
 bnc:{id:'bnc',short:'BNC',name:'Bala na Cara',color:'#9dc7bd'},
 fictional:{id:'fictional',short:'QUADRILHA',name:'Quadrilha fictícia da missão',color:'#c6b492'}
};
export const stageCrime={
 'jorge-teixeira':{factions:['cv'],sourceIds:['crime-am'],period:'2026',note:'Reportagem de abril de 2026 registra prisão de integrante apontado como CV no Jorge Teixeira. Não estabelece controle integral do bairro.'},
 'bom-jardim':{factions:['cv'],sourceIds:['crime-ce','crime-ce-recent'],period:'2019 e 2026',note:'Pesquisa municipal registra presença do CV no Conjunto Palmares; reportagem de 2026 registra capturas no Bom Jardim. Grande Bom Jardim abrange vários bairros.'},
 pernambues:{factions:['cv'],sourceIds:['crime-pernambues'],period:'2026',note:'Reportagem de janeiro de 2026 atribui um crime no bairro a integrantes do CV. É registro de ocorrência, não mapa territorial.'},
 valeria:{factions:['katiara','bdm'],sourceIds:['crime-valeria'],period:'2023–2025',note:'Reportagem de abril de 2025, com fontes policiais, menciona Katiara associada ao CV e disputa anterior com o BDM. Os encontros misturam referências desse período, sem afirmar domínio atual.'},
 'sol-nascente':{factions:['pcc'],sourceIds:['crime-df','crime-df-operation'],period:'2023 e 2026',note:'Prisão de integrante apontado como PCC em 2023 e operação contra crime organizado em 2026. A localização de uma prisão não demonstra domínio do território.'},
 restinga:{factions:['bnc'],sourceIds:['crime-rs'],period:'Autos publicados em 2022',note:'Depoimentos reproduzidos em acórdão do STJ mencionam Bala na Cara na Restinga de Porto Alegre. Referência histórica e de alcance limitado; não confundir com Restinga Sêca nem inferir controle atual.'},
 alemao:{factions:['cv'],sourceIds:['crime-rj'],period:'2025',note:'Notícia institucional do MPRJ menciona integrantes do CV na Fazendinha, no Complexo do Alemão. O confronto master permanece uma sátira separada.'}
};
export const crimeRoles={street:'CAPANGA',runner:'OLHEIRO',heavy:'COBRADOR ARMADO',boss:'LÍDER DA CÉLULA'};
export function factionFor(neighborhoodId,index=0){const ids=stageCrime[neighborhoodId]?.factions||['fictional'];return factions[ids[Math.abs(index)%ids.length]]}
export function enemyCrime(neighborhoodId,type,index=0,identity=null){
 if(identity?.master)return {criminal:false,factionId:null,crimeRole:'MASTER SATÍRICO',equipment:null};
 const faction=identity?.factionId?factions[identity.factionId]:factionFor(neighborhoodId,index);
 return {criminal:true,factionId:faction.id,crimeRole:crimeRoles[type]||crimeRoles.street,equipment:{mask:true,radio:true,holster:true,vest:type==='heavy'||type==='boss',sling:type==='heavy'||type==='boss'}};
}
export function applyEnemyCrime(enemy,neighborhoodId,identity=null){const profile=enemyCrime(neighborhoodId,enemy.enemyType,enemy.index,identity);Object.assign(enemy,profile);enemy.bossIdentity=identity;const faction=factions[profile.factionId];enemy.data={...enemy.data,...(identity||{}),criminal:profile.criminal,factionId:profile.factionId,crimeRole:profile.crimeRole};if(!identity){enemy.data.name=enemy.data.short=profile.crimeRole+' · '+faction.short;enemy.data.color=faction.color}return enemy}
