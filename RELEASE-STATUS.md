# Beta técnica — entregas e validação

Atualizado em 20/10/2026. Este arquivo distingue implementação de validação externa.

- [x] Salvamento local de campanha com retomada do combate, dupla, lado, fase, vidas, energia, inimigos e pontos; corrupção/armazenamento bloqueado tratados.
- [x] Dificuldades História, Padrão e Arcade; cadência/reação ajustáveis; limite de atacantes simultâneos e preparação dos golpes.
- [x] Ciclos procedurais distintos de movimento, defesa, impacto, salto e ataques; transição entre poses de base, com opção de movimento reduzido. As folhas continuam com três poses principais; não há alegação de novos sprites desenhados quadro a quadro.
- [x] Corpos derrotados usam pose rígida, sem caminhada, respiração ou oscilação de tecido, inclusive na derrota por tempo; gravidade e contato com o chão preservados nos dois jogos.
- [x] Adversários e chefes regionais são criminosos fictícios, com siglas integradas aos figurinos e referências datadas a facções por bairro; masters políticos mantidos como sátira separada.
- [x] Remapeamento 1P/2P, contraste, texto ampliado, tamanho do toque, qualidade visual e redução de movimento.
- [x] Medição local de 20 segundos com exportação de FPS/tempos de quadro; cache de texturas limitado.
- [x] Gravações substituídas por fontes com condições documentadas; quatro fotografias com termos insuficientes retiradas do pacote; verificador de inventário.
- [x] Servidor de salas para dois convidados com WebSockets, host autoritativo, validação de pacotes e limite de participantes; verificação local com dois clientes.
- [x] Criação, entrada e presença de dois jogadores conferidas no navegador no endereço público para os dois jogos; desconexão com pausa verificada.
- [x] Servidor online publicado no Cloudflare; teste remoto com dois WebSockets e restrições de participantes/pacotes aprovado.
- [x] Projetos Android e iOS gerados para os dois jogos, com ícones derivados do SVG próprio e workflow de compilação.
- [x] Builds remotos Android/iOS concluídos para os dois jogos; APK de depuração e aplicativo iOS para simulador disponíveis nas releases beta dos repositórios.
- [ ] Medições e testes em aparelhos físicos: não há Android/iPhone conectado ou toolchain nativa completa neste ambiente.
- [ ] Rodadas de balanceamento com jogadores humanos e testes de latência em redes diferentes.
- [ ] Envio às lojas: depende das contas de desenvolvedor, assinatura, ficha, classificação e revisão de Apple/Google.

A seleção dos bairros segue documentada como editorial e não como ranking nacional. Os testes de inventário não substituem análise jurídica; a indicação 16+ do protótipo não é classificação oficial das lojas.

Atualização v31: 15 folhas de figurino refeitas com letras nas próprias roupas; etiquetas flutuantes e equipamentos sobrepostos retirados. Dezesseis finalizações com quatro etapas, cenários e falas de paródia individuais, além de prévia com linha do tempo. Mute de música persistente dentro da arena, inclusive em tela cheia; propriedade nativa muted e pausa explícita.

## Atualização 0.3.3 / build 33

- Corrigida a rotação do primeiro quadro da queda: zero não é mais substituído por um corpo completamente deitado. Regressão verifica continuidade e contato com o piso.
- Golpes passam por antecipação, contato e recuperação seguindo o relógio do dano; pausa de impacto limitada a 30–65 ms. Gravidade de derrotados continua normalmente. Finalizações recebem aproximação de câmera no impacto, respeitando movimento reduzido. A arte continua baseada em três poses, sem novos ciclos desenhados quadro a quadro.
- Chefes e cobradores recompõem a guarda após golpes consecutivos; especiais deixam de dar proteção quase contínua. Energia e pontuação contam o dano efetivo, evitando bônus por dano excedente.
- 28 campanhas automatizadas completas: 16 personagens no Padrão e combinações dos dois lados, três dificuldades, solo e dupla. Todas chegaram à fase 7 e à vitória, sem estado inválido. São bots com comandos normais, não sessões humanas. Relatório: validation/campaign-balance.json; reprodução: node scripts/balance-campaign.mjs no repositório Streets.
- 77 testes locais aprovados; mais quatro verificações do relay público, incluindo snapshots reais dos dois jogos, atrasos de envio de 40–230 ms, pausa/retomada e reconexão de host e convidado. Relatório: validation/online-resilience.json. Os dois clientes foram executados neste computador, sem alegação de redes físicas diferentes.
- Cliente online descarta snapshots antigos, limpa comandos presos na reconexão, cancela tentativas de uma sala abandonada e exibe tempo de resposta ao servidor.
- Projetos nativos atualizados para 0.3.3 / 33. CI passa a gerar AAB sem assinatura além de APK debug e app iOS de simulador. Workflow manual de assinatura Android preparado, dependente da chave do titular. Nenhum secret de assinatura disponível nos repositórios durante esta revisão.

Continuam dependentes de recursos externos: sessões humanas de balanceamento, aparelhos Android/iPhone, redes físicas distintas e assinatura/contas/revisão das lojas. Esses itens não foram marcados como concluídos.

- Toque: testes de múltiplos ponteiros e retomada após segundo plano; limpar todos os dedos na rotação, ao ocultar a página e ao abrir um modal evita comandos presos/inativos ao retornar.
