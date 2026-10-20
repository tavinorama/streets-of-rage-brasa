# Streets of Rage Brasa

Jogo independente de navegador para PC e celular, com controles por teclado e toque.

[Jogar Streets of Rage Brasa](https://brasa-arcade.pages.dev/streets) · [Central Brasa Arcade](https://brasa-arcade.pages.dev/)

Repositório público: [tavinorama/streets-of-rage-brasa](https://github.com/tavinorama/streets-of-rage-brasa).

Panorama dos dois produtos e próximas entregas: [OVERVIEW.md](OVERVIEW.md).

## Rodar

Node.js 20+: execute `npm start` e abra http://localhost:4173. Os arquivos de `dist/` também funcionam em hospedagem estática HTTPS. `npm test` verifica o motor e as regras do jogo. Use `npm run check` para verificar também arquivos, PWA e recortes do elenco.

## Cloudflare Pages gratuito

Publicado em [Streets of Rage Brasa](https://brasa-arcade.pages.dev/streets). A central compartilhada está em [Brasa Arcade](https://brasa-arcade.pages.dev/). Para atualizar esta distribuição, execute `npm run check` e depois `npm run deploy` com a conta Cloudflare conectada.

Alternativa: no painel Cloudflare, Workers & Pages → criar Pages → conectar este repositório GitHub → branch main → sem framework → comando de build vazio → pasta de saída `dist`. Nunca envie a pasta inteira do projeto como arquivos públicos.

## Aplicativo no celular

O manifesto e o service worker permitem instalar a PWA no Android e no Safari do iPhone. Primeiro abra a versão HTTPS e use Instalar ou Adicionar à Tela de Início. O áudio começa depois de tocar em Jogar. Os arquivos já visitados podem funcionar sem rede enquanto o navegador mantiver o cache; trilhas não são garantidas offline. Uma versão nativa para as lojas ainda não foi empacotada.

## Física e arte

Simulação 2D em passos de 1/60 s: gravidade, aceleração, frenagem, impulso e molas amortecidas para cabelo/tecido. As 48 poses do elenco usam recorte por silhueta, apoios dos pés e sombras de contato. Esta técnica não equivale a corpos 3D ou captura de movimento. As fotografias de seleção têm créditos em `dist/photo-credits.json`; poses de combate e cenários são reconstruções fictícias. Prompts e registros de pesquisa acompanham o projeto.

Música instrumental com volume inicial de 10% e reprodução 25% mais rápida, com ajustes independentes para trilha e efeitos. Créditos em `dist/music-credits.html`. Paródia independente; citações reais estão separadas das falas e ações fictícias.

Os adversários combinam personagens regionais e brancos em todas as fases, sem alterar suas regras de combate. Jogadores e inimigos compartilham a mesma altura visual; pesos pesados têm 6% a mais e chefões 8%. Registro da arte complementar: [DIVERSIDADE-ARTE.json](DIVERSIDADE-ARTE.json).
