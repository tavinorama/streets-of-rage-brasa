# Overview — Street Brasa e Streets of Rage Brasa

Estado conferido em 20/10/2026. Dois protótipos funcionais independentes para navegador, com base de instalação PWA. Ainda não são aplicativos nativos publicados nas lojas.

## Comparação dos produtos

| Item | Street Brasa | Streets of Rage Brasa |
| --- | --- | --- |
| Experiência | Duelo de luta 1 contra 1 | Campanha beat ’em up com rolagem e profundidade |
| Modos | CPU, versus local, treino e versus online | Solo, cooperativo local e salas online para duas pessoas |
| Elenco | 16 figuras públicas | 16 figuras públicas, com seleção por lado da campanha e participações livres |
| Progressão | Melhor de três rounds de 60 segundos | Sete bairros, três encontros por fase, chefes e três vidas iniciais |
| Cenários | Debate da Band, STF, GloboNews, seção eleitoral e Casa Branca | Sete bairros das cinco regiões e quatro missões fechadas: STF, GloboNews, seção eleitoral e Casa Branca |
| Confronto final | Janela e sequência de finalização individual | Chefão master: Flávio na campanha de esquerda; Lula na de direita |
| Fatalities | Implementados como cenas fictícias e estilizadas | Finalizações estilizadas de chefes com janela de vulnerabilidade |
| Multijogador | Duas pessoas no mesmo computador | Duas pessoas no mesmo computador |
| Pela internet | Salas de convite; publicação do servidor pendente | Salas de convite; publicação do servidor pendente |
| Repositório público | https://github.com/tavinorama/street-brasa | https://github.com/tavinorama/streets-of-rage-brasa |

## Conteúdo comum

Elenco: Lula, Flávio Bolsonaro, Nikolas Ferreira, Janja, André Janones, Daniella Marques, Tarcísio de Freitas, Flávio Dino, Alexandre de Moraes, André Mendonça, Daniel Vorcaro, Jair Bolsonaro, Ana Elisa, Roberta Luchsinger, Lulinha e Pablo Marçal. Nem todos são candidatos presidenciais; o elenco é satírico.

Seleção e combate usam o mesmo elenco reconstruído por IA em aparência fotográfica uniforme: 16 folhas refeitas, 48 poses e quatro poses dos chefes finais. Os retratos são enquadrados a partir da própria pose de guarda; as fotografias documentais com termos registrados permanecem no dossiê; quatro referências sem termos suficientes foram retiradas do pacote. Prompts e arquivos estão registrados em `PHOTOREAL-ART-PROMPTS.json`. As lutas usam essas reconstruções, com três poses de base por personagem e deformação procedural para caminhada, cabelo, roupa, capas e expressões. Os recortes usam silhuetas próprias, evitando partes de poses vizinhas. Isso não equivale a animação 3D, captura de movimento ou reprodução perfeita da aparência real.

A simulação funciona em passos fixos de 1/60 s, com gravidade, aceleração, frenagem, impulso, amortecimento e reações ao impacto. Sombras de contato e apoios dos pés acompanham a pose. Marcas de dano são sobreposições visuais estilizadas. A gravidade também continua depois de um round terminar, durante a derrota de inimigos e enquanto uma personagem aguarda reaparecer. As finalizações possuem exageros intencionais de ficção.

O áudio combina duas gravações instrumentais de hinos com velocidade ajustável, inicialmente 25% mais rápida e com volume de 10%, e efeitos procedurais distintos para impactos, defesa, passos e especiais. Música e efeitos possuem volumes separados; as preferências são salvas localmente. Não existem dublagem das falas públicas nem clonagem de voz.

O dossiê reúne histórico, posicionamentos e citações com fontes e datas. A conferência registrada foi em textos publicados; áudio e timestamps ainda não foram verificados. Piadas, golpes e cenas de combate são apresentados como ficção.

## Campanha de rua

A rota passa por Jorge Teixeira (Manaus), Bom Jardim (Fortaleza), Pernambués e Valéria (Salvador), Sol Nascente (Brasília), Restinga (Porto Alegre) e Complexo do Alemão (Rio de Janeiro). Os chefes regionais são fictícios. Lula e Flávio aparecem como adversários finais em combates fictícios, conforme o lado escolhido. As quatro missões fechadas terminam após três ondas e não substituem a rota principal.

## Tecnologia e organização

HTML, CSS e JavaScript modular, Canvas 2D e Web Audio. Não há contas ou ranking global. As salas usam um Worker Cloudflare e Durable Objects para retransmitir comandos e estado, com a simulação no aparelho do criador. Node.js serve os arquivos no desenvolvimento e executa os testes; a hospedagem final pode ser estática em HTTPS.

A pasta `street-brasa/` é a integração dos dois jogos e da central de seleção. As pastas `repos/street-brasa/` e `repos/streets-of-rage-brasa/` são projetos executáveis independentes, com seus próprios motores, páginas, testes, manifestos e configuração de publicação. `scripts/export-games.mjs` sincroniza a base de integração para as distribuições; alterações específicas feitas diretamente nas distribuições precisam ser preservadas ao exportar novamente.

## Celular e aplicativo

Implementados: expansão para toda a área disponível, tela cheia nativa quando permitida e expansão dentro da página quando indisponível; composição em paisagem para celulares, botões de pelo menos 44 px, saída e pausa sempre acessíveis, ajuste a barras do navegador e áreas seguras; layout responsivo em retrato e paisagem, direcional e botões de toque, tratamento de múltiplos ponteiros, pausa, tela cheia quando disponível, menor resolução e malha de animação para toque. A base foi conferida em emulação de navegador; ainda faltam medições em celulares Android e iPhones físicos. Não há uma taxa de quadros garantida por aparelho.

A PWA contém manifesto, ícones, instalação pela tela inicial e cache de arquivos utilizados. O primeiro acesso depende de rede e o cache pode ser removido pelo navegador. A música não tem funcionamento offline garantido. Projetos Capacitor Android/iOS foram gerados para ambos os jogos, com compilação automatizada; veja NATIVE.md. Assinatura e envio às lojas continuam pendentes. A campanha salva e retoma o combate local; áudio, controles e acessibilidade também persistem.

## Validação e publicação

`npm run check` verifica referências estáticas, importações, entradas da PWA, arquivos do service worker, limites das imagens e 48 poses do elenco. Depois executa os testes das regras de jogo. Há testes específicos para a queda após o fim de round, inimigos derrotados no ar e jogadores derrotados antes do reaparecimento ou do game over.

A integração passou em 54 testes em 20/10/2026. As distribuições executam seus próprios subconjuntos, além dos testes do servidor online. Existem testes compartilhados, portanto os números não devem ser somados como casos únicos.

Os dois repositórios GitHub são públicos. Existe uma versão integrada hospedada em https://street-brasa-2026.otaviofranca.chatgpt.site, com acesso privado que exige login ChatGPT. Ela não é um endereço Pages da conta Cloudflare do usuário.

Cloudflare Pages: a central pública está em https://brasa-arcade.pages.dev, com os jogos em `/fighter` e `/streets`. As distribuições independentes também foram publicadas em https://tavinorama-street-brasa.pages.dev e https://tavinorama-streets-of-rage-brasa.pages.dev. Publicação por Direct Upload de `dist`, sem exigir login para jogar.

## Entregas e validação restante

Foram implementados ciclos procedurais e transições, três dificuldades, preparação dos ataques, limites de ataques simultâneos, retomada da campanha, remapeamento, acessibilidade, medição local de desempenho, inventário de mídia, salas online e projetos Android/iOS. A música foi substituída por gravações com condições de redistribuição documentadas.

O estado de publicação e compilação está em [RELEASE-STATUS.md](RELEASE-STATUS.md). Os testes em aparelhos físicos, sessões de balanceamento com jogadores, latência em redes diferentes e envio às lojas exigem validação externa. [DEVICE-TESTS.md](DEVICE-TESTS.md) registra o roteiro sem alegar que essas verificações já ocorreram.
