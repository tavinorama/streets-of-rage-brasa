# Inventário de mídia — revisão em 20/10/2026

Este registro identifica os arquivos atuais, suas fontes e condições declaradas pelos responsáveis. Não concede uma nova licença ao código, não promete exclusividade sobre imagens geradas por IA e não substitui análise jurídica para exploração comercial.

## Gravações

As gravações da página da PMESP foram retiradas: a página não informava claramente a autoria e a permissão específica da execução. Foram substituídas por arquivos com marcação de domínio público, distinguindo composição e execução:

- Hino Nacional Brasileiro: Francisco Manuel da Silva; execução da United States Navy Band. [Arquivo, origem e condições](https://commons.wikimedia.org/wiki/File:Hino_Nacional_Brasileiro_instrumental.ogg).
- Hino à Bandeira: Francisco Braga; execução atribuída à banda do Exército Brasileiro pelo catálogo. [Arquivo, origem e condições](https://commons.wikimedia.org/wiki/File:Brazilian_Flag_Anthem.ogg).

Os Ogg originais foram convertidos localmente para MP3 a 160 kbps. Não foram criados novos arranjos nem removidas vozes. O controle de velocidade atua apenas na reprodução. Os hashes dos MP3 distribuídos estão em `music-sources.json`.

## Fotografias documentais

`dist/photo-credits.json` registra fotógrafo, origem e condições de cada referência. As fotografias aparecem apenas quando o usuário abre o dossiê; os retratos da seleção são reconstruções próprias a partir dos sprites.

As fotos documentais de Vorcaro, Roberta, Lulinha e Janones foram excluídas do pacote atual: havia direitos reservados, contestação da licença ou versão/termos insuficientemente identificados. Permanecem links externos de referência e uma reconstrução visual no lugar da foto local. As imagens de Dino e Mendonça tiveram seus registros completados com os termos de atribuição do STF reproduzidos nas páginas dos respectivos arquivos.

As licenças CC BY e CC BY-SA das demais fotografias são mantidas nas fichas individuais. Recortes continuam identificados como tais; a licença de uma fotografia não é apresentada como licença de todo o jogo. O inventário abrange os arquivos atuais e não reescreve o histórico Git ou publicações anteriores.

## Arte do jogo

Sprites, cenários, retratos reconstruídos e figurinos foram gerados para o projeto. Prompts e referências: `ART-PROMPTS.json`, `ART-UPDATES.json`, `PHOTOREAL-ART-PROMPTS.json`, `STREET-ART-PROMPTS.json`, `REGIONAL-ART-PROMPTS.json` e `DIVERSIDADE-ARTE.json`. Nomes e fotografias de referência não são apresentados como endosso das pessoas retratadas. Ícones nativos são exportações do SVG próprio `dist/icon.svg`.

## Pesquisa e bairros

As fontes, datas e limites estão em `dist/research.json` e `dist/neighborhood-sources.json`. A campanha contém uma seleção editorial de bairros com identidade local e registros consultados; não é um ranking dos sete bairros mais violentos do Brasil. A dificuldade é uma decisão do jogo. Nenhuma revisão de áudio ou timestamp de declarações públicas é alegada; o dossiê informa que as citações foram conferidas em textos.

## Verificação reproduzível

`node scripts/check-licenses.mjs` verifica presença de créditos e links de condições, hashes das gravações e ausência dos arquivos excluídos. Esse teste verifica o inventário; não determina direitos de imagem nem confirma sozinho todas as afirmações das fontes.
