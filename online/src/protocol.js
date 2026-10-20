export const VERSION=1;
export const allowedInputKeys=['left','right','up','down','jump','block'];
export function validOrigin(origin){return /^https:\/\/(brasa-arcade|tavinorama-street-brasa|tavinorama-streets-of-rage-brasa)(\.[a-z0-9-]+)?\.pages\.dev$/.test(origin)||/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)||origin==='capacitor://localhost'||origin==='https://localhost'}
export function validateConfig(v){if(!v||!['fighter','streets'].includes(v.game)||!Array.isArray(v.selected)||v.selected.length!==2||v.selected.some(x=>typeof x!=='string'||!/^[a-z]{2,14}$/.test(x)))throw Error('Elenco inválido');return {game:v.game,selected:v.selected,arena:['streets','band','stf','globonews','urna','oval'].includes(v.arena)?v.arena:v.game==='streets'?'streets':'band',side:v.side==='right'?'right':'left',stage:Number.isInteger(v.stage)&&v.stage>=0&&v.stage<7?v.stage:0,difficulty:['story','standard','arcade'].includes(v.difficulty)?v.difficulty:'standard',version:VERSION}}
export function validatePacket(value,role){if(!value||typeof value!=='object'||Array.isArray(value))return null;
 if(role==='host'&&value.type==='state'&&typeof value.state==='string'&&value.state.length<=150000)return {type:'state',state:value.state,paused:!!value.paused,seq:Math.max(0,Number(value.seq)||0)};
 if(value.type==='input'&&role==='guest'){const input={};for(const key of allowedInputKeys)input[key]=value.input?.[key]===true;return {type:'input',input,seq:Math.max(0,Number(value.seq)||0)}}
 if(value.type==='action'&&role==='guest'&&['punch','kick','special','super'].includes(value.kind))return {type:'action',kind:value.kind};
 if(value.type==='control'&&['pause','resume'].includes(value.action))return {type:'control',action:value.action};
 if(value.type==='finish'&&role==='guest'&&['down','forward','fatal'].includes(value.key))return {type:'finish',key:value.key};
 return null;
}
