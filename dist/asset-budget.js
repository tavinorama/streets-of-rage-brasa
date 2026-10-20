// Limit decoded scene images across a long campaign. WeakMap sprite crops can
// then be reclaimed with evicted images instead of retaining every past stage.
export function sceneImage(cache,key,create,limit=4){
 if(cache.has(key)){const value=cache.get(key);cache.delete(key);cache.set(key,value);return value}
 const value=create();cache.set(key,value);while(cache.size>limit)cache.delete(cache.keys().next().value);return value;
}
export function trimCast(cache,protectedKeys,limit=6){const keep=new Set(protectedKeys);for(const key of cache.keys()){if(cache.size<=limit)break;if(!keep.has(key))cache.delete(key)}}
// Rotate around a support point derived from the silhouette, so a defeated
// body reaches the floor without rotating its torso below the floor plane.
export function fallContact(meta,height,amount,sourceWidth=512,sourceHeight=1024){
 const angle=-Math.max(0,Math.min(1,amount))*1.48;
 const points=meta.outline?.length?meta.outline:[[0,meta.top*sourceHeight],[sourceWidth,meta.top*sourceHeight],[sourceWidth,meta.bottom*sourceHeight],[0,meta.bottom*sourceHeight]];
 let low=0;for(const [px,py]of points){const x=(px/sourceWidth-meta.anchor)*height*sourceWidth/sourceHeight,y=(py/sourceHeight-meta.bottom)*height;low=Math.max(low,Math.sin(angle)*x+Math.cos(angle)*y)}
 return {angle,y:-low};
}
