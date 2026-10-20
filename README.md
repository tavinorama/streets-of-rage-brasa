# Streets of Rage Brasa

Jogo independente de navegador para PC e celular, com controles por teclado e toque.

[Jogar Streets of Rage Brasa](https://brasa-arcade.pages.dev/streets) · [Central Brasa Arcade](https://brasa-arcade.pages.dev/)

Panorama dos dois produtos: [OVERVIEW.md](OVERVIEW.md). Entregas e validações pendentes: [RELEASE-STATUS.md](RELEASE-STATUS.md). Controles remapeáveis, acessibilidade e dificuldade estão no botão Configurações. A campanha de rua salva o progresso neste aparelho. Há salas para duas pessoas pela internet quando o servidor está conectado; veja [ONLINE.md](ONLINE.md). Inventário de mídia: [ASSET-LICENSES.md](ASSET-LICENSES.md).

## Rodar

Node.js 20+: execute `npm start` e abra http://localhost:4173. Os arquivos de `dist/` também funcionam em hospedagem estática HTTPS. `npm test` verifica o motor e as regras do jogo. Use `npm run check` para verificar também arquivos, PWA e recortes do elenco.

## Cloudflare Pages gratuito

Publicado em [Streets of Rage Brasa](https://brasa-arcade.pages.dev/streets). O projeto independente Cloudflare é `tavinorama-streets-of-rage-brasa`.

1. Execute `npx wrangler@4.151.3 login` e conclua o acesso no navegador.
2. Execute `npx wrangler@4.151.3 pages project create tavinorama-streets-of-rage-brasa --production-branch main`.
3. Execute `npm run deploy`.

Alternativa: no painel Cloudflare, Workers & Pages → criar Pages → conectar este repositório GitHub → branch main → sem framework → comando de build vazio → pasta de saída `dist`. Nunca envie a pasta inteira do projeto como arquivos públicos.

## Aplicativo no celular

O manifesto e o service worker permitem instalar a PWA no Android e no Safari do iPhone. Primeiro abra a versão HTTPS e use Instalar ou Adicionar à Tela de Início. O áudio começa depois de tocar em Jogar. Os arquivos já visitados podem funcionar sem rede enquanto o navegador mantiver o cache; trilhas não são garantidas offline. Projetos nativos Android/iOS e instruções de compilação estão em [NATIVE.md](NATIVE.md). Pacotes de teste ficam nos artefatos do workflow Native builds, em GitHub Actions.

## Física e arte

Simulação 2D em passos de 1/60 s: gravidade, aceleração, frenagem, impulso e molas amortecidas para cabelo/tecido. As 48 poses do elenco usam recorte por silhueta, apoios dos pés e sombras de contato. Esta técnica não equivale a corpos 3D ou captura de movimento. Retratos da seleção e poses de combate compartilham as mesmas reconstruções de aparência fotográfica. As fotografias documentais do dossiê têm créditos em `dist/photo-credits.json`; poses de combate e cenários são reconstruções fictícias. Prompts e registros de pesquisa acompanham o projeto.

Música instrumental com velocidade ajustável e efeitos procedurais. Créditos em `dist/music-credits.html`. Paródia independente; citações reais estão separadas das falas e ações fictícias.

## Pacotes de teste Android/iOS

[Baixar a beta técnica](https://github.com/tavinorama/streets-of-rage-brasa/releases/tag/beta-online-2026-10-20). APK Android de depuração e pacote iOS para o simulador do Xcode. Para instalar em iPhone físico ou enviar às lojas, veja [NATIVE.md](NATIVE.md).
