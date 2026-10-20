// All actors use the same visible body height and street perspective.
export const STREET_BODY_HEIGHT=190;
export const streetScale=lane=>1+(lane-422)*.0005;
export const spriteHeight=(meta,height=STREET_BODY_HEIGHT)=>height/Math.max(.1,meta.bottom-(meta.top??0));
export const enemySize=type=>type==='boss'?1.08:type==='heavy'?1.06:1;
