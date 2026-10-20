import {encodeState,hydrateState} from './state-codec.js';
import {StreetRun,stages} from './streets.js';
import {roster} from './roster.js';
const KEY='brasa-campaign-v1';
const validIds=new Set(roster.map(f=>f.id));
export class CampaignSave{
 constructor(storage=globalThis.localStorage){this.storage=storage;this.error=''}
 read(){try{const text=this.storage?.getItem(KEY);if(!text)return null;const envelope=JSON.parse(text);if(envelope.version!==1||!Number.isFinite(envelope.savedAt)||typeof envelope.state!=='string')throw Error();const run=hydrateState(envelope.state,StreetRun);if(!Number.isInteger(run.stageIndex)||run.stageIndex<0||run.stageIndex>=stages.length||!['left','right'].includes(run.campSide)||!['solo','local'].includes(run.mode)||run.arenaMission||!['intro','fight','stageclear'].includes(run.state))throw Error();for(const p of run.players){if(!validIds.has(p.data.id)||!Number.isInteger(p.lives)||p.lives<0||p.lives>3||p.hp<0||p.hp>100)throw Error()}if(run.players.every(p=>p.lives===0))throw Error();if(!Number.isFinite(run.score)||run.score<0||!Number.isInteger(run.wave)||run.wave<0||run.wave>3)throw Error();return {...envelope,stage:stages[run.stageIndex],mode:run.mode,campSide:run.campSide,run}}catch{this.error='O progresso salvo não pôde ser lido. Você pode começar uma nova campanha.';return null}}
 write(run){if(!run||run.arenaMission||!['intro','fight','stageclear'].includes(run.state)||!run.players.some(p=>p.lives>0))return false;try{this.storage.setItem(KEY,JSON.stringify({version:1,savedAt:Date.now(),state:encodeState(run)}));this.error='';return true}catch{this.error='Este navegador não permitiu salvar o progresso.';return false}}
 resume(emit){const entry=this.read();if(!entry)return null;const run=entry.run;run.emit=emit;for(const p of run.players)p.invincible=Math.max(p.invincible||0,2);return run}
 clear(){try{this.storage?.removeItem(KEY);this.error='';return true}catch{return false}}
}
