import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
const root=resolve('dist'), port=Number(process.env.PORT||4173);
http.createServer(async(req,res)=>{try{const p=resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(p!==root&&!p.startsWith(root+sep)){res.writeHead(403).end();return}const file=p===root||p.endsWith(sep)?resolve(p,'index.html'):p;const b=await readFile(file);res.writeHead(200,{'Content-Type':({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.mp3':'audio/mpeg','.webp':'image/webp','.webmanifest':'application/manifest+json'})[extname(file)]||'application/octet-stream'}).end(b)}catch{res.writeHead(404).end('Não encontrado')}}).listen(port,'127.0.0.1',()=>console.log(`Local: http://localhost:${port}`));
